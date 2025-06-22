import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const app = express();
app.use(cors());
app.use(express.json());

// Créer dossier uploads si absent
const uploadsDir = path.resolve('./uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);

// Multer config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Servir les images statiques
app.use('/uploads', express.static(uploadsDir));

let db;

(async () => {
  db = await open({
    filename: './portfolio.db',
    driver: sqlite3.Database
  });

  // Tables pour sections dynamiques
  // Migration : ajouter les colonnes si besoin
  await db.exec(`CREATE TABLE IF NOT EXISTS about (id INTEGER PRIMARY KEY, content TEXT);
    CREATE TABLE IF NOT EXISTS skills (id INTEGER PRIMARY KEY, name TEXT, tech TEXT);
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY,
      title TEXT,
      description TEXT,
      tech TEXT,
      status TEXT,
      github TEXT,
      demo TEXT,
      photos TEXT
    );
  `);
  // Ajout des colonnes manquantes si la table existe déjà
  try { await db.exec('ALTER TABLE projects ADD COLUMN github TEXT'); } catch {}
  try { await db.exec('ALTER TABLE projects ADD COLUMN demo TEXT'); } catch {}
  try { await db.exec('ALTER TABLE projects ADD COLUMN photos TEXT'); } catch {}
})();

// --- API PUBLIC ---
app.get('/api/about', async (req, res) => {
  const about = await db.get('SELECT * FROM about ORDER BY id DESC LIMIT 1');
  res.json(about || {});
});

app.get('/api/skills', async (req, res) => {
  const skills = await db.all('SELECT * FROM skills');
  res.json(skills.map(s => ({ ...s, tech: JSON.parse(s.tech) })));
});

app.get('/api/projects', async (req, res) => {
  const projects = await db.all('SELECT * FROM projects');
  res.json(projects.map(p => ({
    ...p,
    tech: JSON.parse(p.tech),
    photos: p.photos ? JSON.parse(p.photos) : []
  })));
});

// --- UPLOAD IMAGES ---
app.post('/api/upload', upload.array('photos', 10), (req, res) => {
  // Retourne les URLs accessibles côté front
  const files = req.files.map(f => `/uploads/${f.filename}`);
  res.json({ files });
});

// --- API ADMIN (CRUD) ---
app.post('/api/admin/about', async (req, res) => {
  const { content } = req.body;
  await db.run('INSERT INTO about(content) VALUES(?)', content);
  res.json({ success: true });
});

app.post('/api/admin/skills', async (req, res) => {
  const { name, tech } = req.body;
  await db.run('INSERT INTO skills(name, tech) VALUES(?,?)', name, JSON.stringify(tech));
  res.json({ success: true });
});

app.post('/api/admin/projects', async (req, res) => {
  const { title, description, tech, status, github, demo, photos } = req.body;
  await db.run(
    'INSERT INTO projects(title, description, tech, status, github, demo, photos) VALUES(?,?,?,?,?,?,?)',
    title,
    description,
    JSON.stringify(tech),
    status,
    github || '',
    demo || '',
    JSON.stringify(photos || [])
  );
  res.json({ success: true });
});

app.put('/api/admin/skills/:id', async (req, res) => {
  const { name, tech } = req.body;
  await db.run('UPDATE skills SET name=?, tech=? WHERE id=?', name, JSON.stringify(tech), req.params.id);
  res.json({ success: true });
});

app.put('/api/admin/projects/:id', async (req, res) => {
  const { title, description, tech, status, github, demo, photos } = req.body;
  await db.run(
    'UPDATE projects SET title=?, description=?, tech=?, status=?, github=?, demo=?, photos=? WHERE id=?',
    title,
    description,
    JSON.stringify(tech),
    status,
    github || '',
    demo || '',
    JSON.stringify(photos || []),
    req.params.id
  );
  res.json({ success: true });
});

app.delete('/api/admin/skills/:id', async (req, res) => {
  await db.run('DELETE FROM skills WHERE id=?', req.params.id);
  res.json({ success: true });
});

app.delete('/api/admin/projects/:id', async (req, res) => {
  await db.run('DELETE FROM projects WHERE id=?', req.params.id);
  res.json({ success: true });
});

app.listen(4000, () => {
  console.log('Backend running on http://localhost:4000');
});

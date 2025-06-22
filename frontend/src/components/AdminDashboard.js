import React, { useEffect, useState } from "react";

function AdminDashboard() {
  const [editSkillId, setEditSkillId] = useState(null);
  const [editSkill, setEditSkill] = useState({ name: '', tech: '' });
  const [editProjectId, setEditProjectId] = useState(null);
  const [editProject, setEditProject] = useState({ title: '', description: '', tech: '', status: 'Dev', github: '', demo: '' });

  // Pour éditer une skill
  const handleEditSkill = (skill) => {
    setEditSkillId(skill.id);
    setEditSkill({ name: skill.name, tech: skill.tech.join(', ') });
  };
  const saveEditSkill = async (id) => {
    await fetch(`http://localhost:4000/api/admin/skills/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: editSkill.name, tech: editSkill.tech.split(',').map(t => t.trim()) })
    });
    setEditSkillId(null);
    fetch("http://localhost:4000/api/skills").then(r => r.json()).then(setSkills);
  };
  // Pour éditer un projet
  const handleEditProject = (project) => {
    setEditProjectId(project.id);
    setEditProject({
      title: project.title,
      description: project.description,
      tech: project.tech.join(', '),
      status: project.status,
      github: project.github || '',
      demo: project.demo || ''
    });
  };
  const saveEditProject = async (id) => {
    await fetch(`http://localhost:4000/api/admin/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: editProject.title,
        description: editProject.description,
        tech: editProject.tech.split(',').map(t => t.trim()),
        status: editProject.status,
        github: editProject.github,
        demo: editProject.demo,
        photos: projects.find(p => p.id === id)?.photos || []
      })
    });
    setEditProjectId(null);
    fetch("http://localhost:4000/api/projects").then(r => r.json()).then(setProjects);
  };

  const [tab, setTab] = useState("about");
  // About
  const [about, setAbout] = useState("");
  const [aboutSaved, setAboutSaved] = useState(false);
  // Skills
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState({ name: "", tech: "" });
  // Projects
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({ title: "", description: "", tech: "", status: "Dev", github: "", demo: "", photos: [] });
  const [uploading, setUploading] = useState(false);

  // Charger données existantes
  useEffect(() => {
    fetch("http://localhost:4000/api/about").then(r => r.json()).then(data => setAbout(data.content || ""));
    fetch("http://localhost:4000/api/skills").then(r => r.json()).then(setSkills);
    fetch("http://localhost:4000/api/projects").then(r => r.json()).then(setProjects);
  }, []);

  // About
  const saveAbout = async () => {
    await fetch("http://localhost:4000/api/admin/about", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: about })
    });
    setAboutSaved(true);
    setTimeout(() => setAboutSaved(false), 2000);
  };

  // Skills
  const addSkill = async () => {
    await fetch("http://localhost:4000/api/admin/skills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newSkill.name, tech: newSkill.tech.split(",").map(t => t.trim()) })
    });
    setNewSkill({ name: "", tech: "" });
    fetch("http://localhost:4000/api/skills").then(r => r.json()).then(setSkills);
  };
  const deleteSkill = async (id) => {
    await fetch(`http://localhost:4000/api/admin/skills/${id}`, { method: "DELETE" });
    fetch("http://localhost:4000/api/skills").then(r => r.json()).then(setSkills);
  };

  // Projects
  const addProject = async () => {
    await fetch("http://localhost:4000/api/admin/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newProject.title,
        description: newProject.description,
        tech: newProject.tech.split(",").map(t => t.trim()),
        status: newProject.status,
        github: newProject.github,
        demo: newProject.demo,
        photos: newProject.photos.filter(Boolean)
      })
    });
    setNewProject({ title: "", description: "", tech: "", status: "Dev", github: "", demo: "", photos: [""] });
    fetch("http://localhost:4000/api/projects").then(r => r.json()).then(setProjects);
  };
  const deleteProject = async (id) => {
    await fetch(`http://localhost:4000/api/admin/projects/${id}`, { method: "DELETE" });
    fetch("http://localhost:4000/api/projects").then(r => r.json()).then(setProjects);
  };

  return (
    <div className="p-8 max-w-3xl mx-auto font-mono text-sm text-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-cyan-400">Admin Dashboard</h2>
      <div className="flex space-x-4 mb-8">
        <button onClick={() => setTab("about")}
          className={`px-4 py-2 border-b-2 ${tab === "about" ? "border-cyan-400 text-cyan-400" : "border-transparent"}`}>About</button>
        <button onClick={() => setTab("skills")}
          className={`px-4 py-2 border-b-2 ${tab === "skills" ? "border-cyan-400 text-cyan-400" : "border-transparent"}`}>Skills</button>
        <button onClick={() => setTab("projects")}
          className={`px-4 py-2 border-b-2 ${tab === "projects" ? "border-cyan-400 text-cyan-400" : "border-transparent"}`}>Projects</button>
      </div>
      {tab === "about" && (
        <div>
          <h3 className="text-lg mb-2">Modifier About</h3>
          <textarea className="w-full p-2 bg-black border border-cyan-400 mb-2" rows={4} value={about} onChange={e => setAbout(e.target.value)} />
          <button className="bg-cyan-400 text-black px-4 py-2 font-bold" onClick={saveAbout}>Enregistrer</button>
          {aboutSaved && <span className="ml-4 text-green-400">✔ Enregistré</span>}
        </div>
      )}
      {tab === "skills" && (
        <div>
          <h3 className="text-lg mb-2">Ajouter une Skill</h3>
          <input className="p-2 bg-black border border-cyan-400 mr-2 mb-2" placeholder="Nom" value={newSkill.name} onChange={e => setNewSkill(s => ({ ...s, name: e.target.value }))} />
          <input className="p-2 bg-black border border-cyan-400 mr-2 mb-2" placeholder="Technos (séparées par ,)" value={newSkill.tech} onChange={e => setNewSkill(s => ({ ...s, tech: e.target.value }))} />
          <button className="bg-cyan-400 text-black px-4 py-2 font-bold" onClick={addSkill}>Ajouter</button>
          <div className="mt-6">
            <h4 className="mb-2">Liste des Skills</h4>
            {skills.map(skill => (
              <div key={skill.id} className="flex items-center mb-1">
                {editSkillId === skill.id ? (
                  <>
                    <input className="p-1 bg-black border border-cyan-400 mr-2" value={editSkill.name} onChange={e => setEditSkill(s => ({ ...s, name: e.target.value }))} />
                    <input className="p-1 bg-black border border-cyan-400 mr-2" value={editSkill.tech} onChange={e => setEditSkill(s => ({ ...s, tech: e.target.value }))} />
                    <button className="text-green-400 mr-2" onClick={() => saveEditSkill(skill.id)}>Sauvegarder</button>
                    <button className="text-gray-400" onClick={() => setEditSkillId(null)}>Annuler</button>
                  </>
                ) : (
                  <>
                    <span className="mr-2">{skill.name} [{skill.tech.join(", ")}]</span>
                    <button className="ml-2 text-cyan-400" onClick={() => handleEditSkill(skill)}>Éditer</button>
                    <button className="ml-2 text-red-400" onClick={() => deleteSkill(skill.id)}>Supprimer</button>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === "projects" && (
        <div>
          <h3 className="text-lg mb-2">Ajouter un Project</h3>
          <input className="p-2 bg-black border border-cyan-400 mr-2 mb-2" placeholder="Titre" value={newProject.title} onChange={e => setNewProject(p => ({ ...p, title: e.target.value }))} />
          <input className="p-2 bg-black border border-cyan-400 mr-2 mb-2" placeholder="Description" value={newProject.description} onChange={e => setNewProject(p => ({ ...p, description: e.target.value }))} />
          <input className="p-2 bg-black border border-cyan-400 mr-2 mb-2" placeholder="Technos (séparées par ,)" value={newProject.tech} onChange={e => setNewProject(p => ({ ...p, tech: e.target.value }))} />
          <input className="p-2 bg-black border border-cyan-400 mr-2 mb-2" placeholder="Lien GitHub" value={newProject.github} onChange={e => setNewProject(p => ({ ...p, github: e.target.value }))} />
          <input className="p-2 bg-black border border-cyan-400 mr-2 mb-2" placeholder="Lien Démo" value={newProject.demo} onChange={e => setNewProject(p => ({ ...p, demo: e.target.value }))} />
          {/* Upload images */}
          <div className="mb-2">
            <span className="block text-xs text-gray-400 mb-1">Photos (upload) :</span>
            <input
              type="file"
              multiple
              accept="image/*"
              className="mb-2"
              onChange={async e => {
                const files = Array.from(e.target.files);
                if (!files.length) return;
                setUploading(true);
                const formData = new FormData();
                files.forEach(f => formData.append('photos', f));
                const res = await fetch('http://localhost:4000/api/upload', {
                  method: 'POST',
                  body: formData
                });
                const data = await res.json();
                setNewProject(p => ({ ...p, photos: [...p.photos, ...data.files] }));
                setUploading(false);
              }}
            />
            {uploading && <span className="text-cyan-400 ml-2">Upload en cours...</span>}
            <div className="flex flex-wrap gap-2 mt-2">
              {newProject.photos.map((url, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={`http://localhost:4000${url}`}
                    alt="miniature"
                    className="w-16 h-16 object-cover rounded shadow transition-transform duration-200 group-hover:scale-150 z-10 border-2 border-cyan-400"
                    style={{ cursor: 'pointer' }}
                  />
                  <button
                    className="absolute top-0 right-0 bg-black bg-opacity-70 text-red-400 text-xs px-1 rounded-bl"
                    onClick={() => setNewProject(p => ({ ...p, photos: p.photos.filter((_, i) => i !== idx) }))}
                  >✕</button>
                </div>
              ))}
            </div>
          </div>
          <select className="p-2 bg-black border border-cyan-400 mr-2 mb-2" value={newProject.status} onChange={e => setNewProject(p => ({ ...p, status: e.target.value }))}>
            <option value="Dev">Dev</option>
            <option value="Beta">Beta</option>
            <option value="Live">Live</option>
          </select>
          <button className="bg-cyan-400 text-black px-4 py-2 font-bold" onClick={addProject}>Ajouter</button>
          <div className="mt-6">
            <h4 className="mb-2">Liste des Projects</h4>
            {projects.map(project => (
              <div key={project.id} className="flex flex-col md:flex-row md:items-center mb-2 border-b border-cyan-900 pb-2">
                {editProjectId === project.id ? (
                  <div className="flex flex-col md:flex-row md:items-center w-full gap-2">
                    <input className="p-1 bg-black border border-cyan-400 mr-2" value={editProject.title} onChange={e => setEditProject(p => ({ ...p, title: e.target.value }))} placeholder="Titre" />
                    <input className="p-1 bg-black border border-cyan-400 mr-2" value={editProject.description} onChange={e => setEditProject(p => ({ ...p, description: e.target.value }))} placeholder="Description" />
                    <input className="p-1 bg-black border border-cyan-400 mr-2" value={editProject.tech} onChange={e => setEditProject(p => ({ ...p, tech: e.target.value }))} placeholder="Technos" />
                    <input className="p-1 bg-black border border-cyan-400 mr-2" value={editProject.github} onChange={e => setEditProject(p => ({ ...p, github: e.target.value }))} placeholder="GitHub" />
                    <input className="p-1 bg-black border border-cyan-400 mr-2" value={editProject.demo} onChange={e => setEditProject(p => ({ ...p, demo: e.target.value }))} placeholder="Demo" />
                    <select className="p-1 bg-black border border-cyan-400 mr-2" value={editProject.status} onChange={e => setEditProject(p => ({ ...p, status: e.target.value }))}>
                      <option value="Dev">Dev</option>
                      <option value="Beta">Beta</option>
                      <option value="Live">Live</option>
                    </select>
                    <button className="text-green-400 mr-2" onClick={() => saveEditProject(project.id)}>Sauvegarder</button>
                    <button className="text-gray-400" onClick={() => setEditProjectId(null)}>Annuler</button>
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row md:items-center w-full">
                    <span className="mr-2">{project.title} [{project.tech.join(", ")}] ({project.status})</span>
                    <button className="ml-2 text-cyan-400" onClick={() => handleEditProject(project)}>Éditer</button>
                    <button className="ml-2 text-red-400" onClick={() => deleteProject(project.id)}>Supprimer</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;

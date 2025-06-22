# Portfolio

Portfolio est une application web fullstack moderne permettant de présenter vos projets, expériences et compétences avec un design professionnel. Elle comprend un tableau de bord d'administration pour gérer dynamiquement le contenu.

## Technologies utilisées

- **Frontend** : React, Tailwind CSS
- **Backend** : Express.js, SQLite (API REST)
- **Autres** : Google Fonts, Webpack

## Fonctionnalités principales

- Présentation des projets et expériences
- Tableau de bord d'administration sécurisé
- Ajout/modification/suppression de contenu
- Responsive design et typographie moderne

## Installation et démarrage

### 1. Cloner le dépôt
```bash
git clone https://github.com/aminecharro01/portfolio.git
cd portfolio
```

### 2. Installer et lancer le backend
```bash
cd backend
npm install
npm run dev
```
Le backend sera accessible sur `http://localhost:5000`

### 3. Installer et lancer le frontend
```bash
cd ../frontend
npm install
npm start
```
Le frontend sera accessible sur `http://localhost:3000`

## Structure du projet
```
portfolio/
├── backend/       # API Express, base SQLite, uploads
├── frontend/      # Application React, Tailwind, assets
├── package.json   # Dépendances racine (optionnel)
└── README.md      # Ce guide
```

## Personnalisation
- Modifiez les composants React dans `frontend/src/components`.
- Ajoutez vos projets/expériences via le dashboard admin.
- Changez les styles dans `frontend/src/index.css` ou via Tailwind.

## Licence
Ce projet est open-source et libre d'utilisation.

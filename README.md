# CampuSOA

Application web de gestion de cité universitaire — gestion des étudiants, chambres, bâtiments, réservations et commentaires.

## Stack technique

**Backend** (`back/`)
- Node.js + Express 5
- MySQL / MariaDB via `mysql2`
- API REST sur `http://localhost:3001`

**Frontend** (`frontend/tamby/`)
- React 19 (Create React App)
- React Router DOM v7
- Axios (appels API)
- Tailwind CSS (styles)
- AOS (animations au scroll)
- React Icons

## Dépendances

### Backend

| Package | Rôle |
|---|---|
| `express` | Serveur HTTP et routage de l'API |
| `mysql2` | Connexion et requêtes vers la base MySQL/MariaDB |
| `cors` | Autorise les requêtes cross-origin depuis le frontend |
| `body-parser` | Parsing du JSON et des données de formulaire dans les requêtes |
| `nodemon` | Redémarrage automatique du serveur en développement |

### Frontend

| Package | Rôle |
|---|---|
| `react` / `react-dom` | Librairie UI |
| `react-router-dom` | Routage entre les pages (étudiants, chambres, réservations...) |
| `axios` | Appels vers l'API backend |
| `react-icons` | Icônes utilisées dans l'interface |
| `aos` | Animations au scroll |
| `react-scripts` | Scripts de build/dev fournis par Create React App |
| `@testing-library/*` | Outils de test des composants React |

## Prérequis

- Node.js (v18 ou supérieur recommandé)
- npm
- MySQL ou MariaDB installé et lancé localement

## Installation et lancement

### 1. Base de données

Créer la base de données à partir du dump SQL fourni :

```bash
mysql -u root -p < back/db/cite_v2.sql
```

Cela crée la base `cite_v2` avec les tables `etudiant`, `chambre`, `batiment`, `reservation` et `commentaire`.

> La connexion à la base est actuellement configurée en dur dans `back/db/cite.js` (`host: localhost`, `user: root`, `password: ''`, `database: cite_v2`). Adapter ces valeurs si votre configuration MySQL diffère.

### 2. Backend

```bash
cd back
npm install
npm start
```

Le serveur Express démarre sur **http://localhost:3001**.

Routes API disponibles :
- `GET/POST /api/etudiants` — liste et création d'étudiants
- `GET/PUT/DELETE /api/etudiants/:id` — détail, modification, suppression
- `GET/POST /api/chambres`, `/api/chambres/:id`
- `GET/POST /api/batiments`, `/api/batiments/:id`
- `GET/POST /api/reservations`, `/api/reservations/:id`
- `GET/POST /api/commentaires`, `/api/commentaires/:id`

### 3. Frontend

Dans un second terminal :

```bash
cd frontend/tamby
npm install
npm start
```

L'application React démarre sur **http://localhost:3000** et communique avec l'API backend sur le port 3001.

## Structure du projet

```
campusoa/
├── back/
│   ├── controllers/     # Logique métier par entité
│   ├── routes/          # Définition des routes Express
│   ├── db/               # Connexion MySQL + dump SQL (cite_v2.sql)
│   └── server.js         # Point d'entrée du serveur
└── frontend/
    └── tamby/
        ├── src/
        │   ├── pages/         # Pages principales (accueil, étudiants, chambres, réservations...)
        │   ├── components/    # Composants réutilisables, organisés par domaine
        │   ├── services/      # Appels API (axios)
        │   ├── hooks/         # Hooks React personnalisés
        │   └── utils/         # Fonctions utilitaires
        └── public/
```

## Modules fonctionnels

- **Étudiants** — création, modification, suppression, fiche détail, statistiques
- **Chambres** — gestion, filtres avancés, statistiques
- **Bâtiments** — gestion des établissements, fiche détail, statistiques
- **Réservations** — attribution de chambres aux étudiants, historique, statistiques
- **Commentaires** — avis des étudiants liés à un bâtiment
- **Authentification** — pages de connexion, mot de passe oublié et réinitialisation côté frontend (l'API d'authentification reste à implémenter côté backend)

## Notes

- Aucune variable d'environnement n'est utilisée actuellement : les paramètres de connexion à la base sont à modifier directement dans `back/db/cite.js` si nécessaire.
- Le backend et le frontend doivent être lancés séparément, dans deux terminaux distincts.

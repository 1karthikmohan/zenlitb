# Zenlit Web (React + GitHub Pages)

A mobile-responsive web app for “Nearby Connect” with dummy authentication, dummy data, and a Leaflet “Nearby” map.

## Features
- Dummy Sign In & Sign Up (no backend; data stored in localStorage).
- Profile setup with avatar upload (base64).
- Leaflet map showing user’s location and dummy nearby users.
- Chat interface with dummy message threads.
- Simple navigation bar and bottom tab bar for mobile view.
- Hosted on GitHub Pages via `gh-pages`.
- Logo created as an SVG (`logo.svg`).

## Getting Started

1. **Clone this repo**  
   ```bash
   git clone https://github.com/<YOUR_GITHUB_USERNAME>/zenlit-web.git
   cd zenlit-web
   ```
2. Install dependencies
   ```bash
   npm install
   ```
3. Run locally
   ```bash
   npm start
   ```
4. Deploy to GitHub Pages
   ```bash
   npm run deploy
   ```

Directory structure:

```
zenlit-web/
├─ public/
│   ├─ index.html
│   └─ logo.svg
├─ src/
│   ├─ components/
│   │   ├─ Logo.jsx
│   │   ├─ NavBar.jsx
│   │   ├─ SignIn.jsx
│   │   ├─ SignUp.jsx
│   │   ├─ Profile.jsx
│   │   ├─ NearbyMap.jsx
│   │   └─ Chat.jsx
│   ├─ data/
│   │   ├─ dummyUsers.js
│   │   └─ dummyMessages.js
│   ├─ routes.js
│   ├─ App.jsx
│   ├─ index.js
│   ├─ styles.css
│   └─ MobileContainer.jsx
├─ package.json
└─ README.md
```

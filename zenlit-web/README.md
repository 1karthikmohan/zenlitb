# Zenlit Web

This project was bootstrapped with [Create React App](https://create-react-app.dev/). It is configured for deployment to GitHub Pages.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Run locally**
   ```bash
   npm start
   ```
   This starts the development server at `http://localhost:3000`.

## Deployment

1. Edit `package.json` and replace `<YOUR_GITHUB_USERNAME>` in the `homepage` field with your actual GitHub username.
2. Run the deploy script:
   ```bash
   npm run deploy
   ```
   This builds the project and publishes the `build` folder to the `gh-pages` branch so it can be hosted on GitHub Pages.

Make sure your repository is named `zenlit-web` on GitHub, or adjust the `homepage` field accordingly.


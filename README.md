# Academic Portfolio Starter

This is a configurable one-page portfolio site

## Files
- `index.html`: page structure
- `styles.css`: visual design and responsive layout
- `main.js`: renders sections from config and enables reveal animations
- `site.config.js`: all editable content

## Configure your content
Edit `site.config.js` and update:
- `profile`: name, role, tagline, email, profile image
- `quickLinks`: top pills (Scholar, GitHub, CV, etc.)
- `about`: intro paragraphs
- `research`: publications/projects
- `news`: timeline entries
- `service`: teaching and service items
- `contact`: final section links

If you have a headshot, set:
- `profile.profileImage = "./your-photo.jpg"`

Then place that image in the project root.

## Run locally
```bash
python3 -m http.server 8000
```
Open `http://localhost:8000`.

## Deploy on GitHub Pages
1. Create a GitHub repository and push these files.
2. In GitHub: `Settings` -> `Pages`.
3. Set `Build and deployment` source to `Deploy from a branch`.
4. Choose branch `main` and folder `/ (root)`.
5. Save and wait for the deploy URL.

## Optional custom domain
1. Add a `CNAME` file in the root with your domain (for example `me.example.com`).
2. Point DNS to GitHub Pages as documented by GitHub.

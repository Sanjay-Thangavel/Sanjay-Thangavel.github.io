# Deployment Instructions — Sanjay-Thangavel GitHub Pages Portfolio

## Target

Deploy the React/Vite portfolio as a **GitHub Pages User Site**.

GitHub profile:
`https://github.com/Sanjay-Thangavel`

GitHub username:
`Sanjay-Thangavel`

Final website:
`https://sanjay-thangavel.github.io/`

Repository name must be exactly:
`Sanjay-Thangavel.github.io`

Do not use a project-site repository such as `portfolio` or `personal-website`.

---

## Deployment Architecture

```text
LOCAL PORTFOLIO
      |
      | git push
      v
GitHub Repository
Sanjay-Thangavel.github.io
      |
      v
GitHub Actions
      |
      ├── npm ci
      ├── npm run build
      ├── Generate dist/
      ├── Upload Pages artifact
      └── Deploy to GitHub Pages
      |
      v
https://sanjay-thangavel.github.io/
```

The user must **not** manually upload the `dist/` folder.

---

## 1. Inspect the Existing Project

Before changing anything, inspect the existing project.

Verify the appropriate files exist, such as:

```text
package.json
src/
public/
index.html
vite.config.ts
```

Do not blindly overwrite existing configuration.

---

## 2. Verify Package Scripts

The `package.json` must support:

```bash
npm run build
```

A typical configuration is:

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview"
  }
}
```

Preserve existing working scripts.

The build must generate:

```text
dist/
```

---

## 3. Configure Vite

This is a **GitHub Pages User Site**, so the site is served from the root:

`https://sanjay-thangavel.github.io/`

Use:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/",
});
```

Preserve other existing Vite settings.

Do NOT use:

```ts
base: "/Sanjay-Thangavel.github.io/"
```

or:

```ts
base: "/portfolio/"
```

The correct base is:

```text
/
```

---

## 4. GitHub Repository

Repository:

```text
Sanjay-Thangavel.github.io
```

Repository URL:

```text
https://github.com/Sanjay-Thangavel/Sanjay-Thangavel.github.io
```

Production URL:

```text
https://sanjay-thangavel.github.io/
```

If the repository does not exist, tell the user to create it before pushing unless GitHub credentials/API access are explicitly available.

---

## 5. GitHub Actions Workflow

Create:

```text
.github/workflows/deploy.yml
```

Use:

```yaml
name: Deploy Portfolio to GitHub Pages

on:
  push:
    branches:
      - main

  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v6

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: lts/*
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Build application
        run: npm run build

      - name: Configure GitHub Pages
        uses: actions/configure-pages@v5

      - name: Upload Pages artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: ./dist

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

Requirements:

- Trigger on pushes to `main`
- Allow manual workflow execution
- Run `npm ci`
- Run `npm run build`
- Upload `./dist`
- Deploy using GitHub Pages
- Use the `github-pages` environment
- Have required Pages permissions

---

## 6. GitHub Pages Settings

In the repository:

```text
Settings
  -> Pages
  -> Build and deployment
  -> Source
  -> GitHub Actions
```

Use **GitHub Actions** as the publishing source.

---

## 7. Initial Git Setup

If the project is not connected to GitHub:

```bash
git init
git add .
git commit -m "Initial portfolio website"
git branch -M main
git remote add origin https://github.com/Sanjay-Thangavel/Sanjay-Thangavel.github.io.git
git push -u origin main
```

If a remote already exists, inspect it first:

```bash
git remote -v
```

Do not blindly add a second `origin`.

---

## 8. Do Not Commit Secrets

Check for:

```text
.env
.env.local
.env.production
API keys
tokens
credentials
private keys
```

Recommended `.gitignore` entries:

```gitignore
node_modules/
dist/
.env
.env.*
!.env.example
.DS_Store
```

Never place private credentials in frontend code.

---

## 9. Test Locally

Run:

```bash
npm install
npm run build
```

Verify that:

```text
dist/
```

is generated successfully.

Optionally:

```bash
npm run preview
```

Verify:

- Hero
- Navigation
- Images
- Fonts
- Animations
- Projects
- GitHub links
- LinkedIn
- Resume
- Mobile layout

---

## 10. Check Asset Paths

After:

```bash
npm run build
```

inspect `dist/`.

Verify CSS, JavaScript, images and fonts exist.

Prefer Vite imports:

```ts
import profileImage from "./assets/profile.png";
```

or static files in `public/`.

Avoid incorrect absolute/repository-relative paths.

---

## 11. Routing

Prefer a single-page application with section navigation.

Use:

```text
/#about
/#experience
/#skills
/#projects
/#contact
```

or section IDs.

Avoid unnecessary routes such as:

```text
/about
/projects
/contact
```

unless routing is genuinely required.

---

## 12. SEO

Canonical URL:

```text
https://sanjay-thangavel.github.io/
```

Example:

```html
<link
  rel="canonical"
  href="https://sanjay-thangavel.github.io/"
/>
```

Website title:

```text
Sanjay Thangavel | Technology Analyst | Data Science
```

Configure appropriate:

- Meta description
- Open Graph title
- Open Graph description
- Open Graph URL
- Favicon
- Social preview image if available

---

## 13. Deployment Flow

After configuration:

```text
Code change
    |
    v
git add .
    |
    v
git commit
    |
    v
git push
    |
    v
GitHub Actions
    |
    ├── npm ci
    ├── npm run build
    ├── Generate dist/
    ├── Upload artifact
    └── Deploy
    |
    v
GitHub Pages
```

Future deployments should require only:

```bash
git add .
git commit -m "Update portfolio"
git push
```

---

## 14. Verify GitHub Actions

Open:

`https://github.com/Sanjay-Thangavel/Sanjay-Thangavel.github.io`

Then open **Actions**.

Verify the workflow:

```text
Deploy Portfolio to GitHub Pages
```

shows successful steps:

```text
✓ Checkout repository
✓ Setup Node.js
✓ Install dependencies
✓ Build application
✓ Configure GitHub Pages
✓ Upload Pages artifact
✓ Deploy to GitHub Pages
```

---

## 15. Verify Production

Open:

`https://sanjay-thangavel.github.io/`

Verify:

### Hero
- Name appears
- Visual/profile image loads
- Typography works
- Animations work
- CTA buttons work

### Navigation
- Navigation works
- Section scrolling works
- Sticky navbar works

### Projects
- Project cards load
- GitHub links work
- Demo links work where available

### Experience
- Company information is accurate
- Dates are accurate
- Descriptions are accurate

### Contact
- LinkedIn works
- GitHub works
- Email works

### Responsive
Test approximately:

```text
375px
390px
768px
1024px
1440px
```

---

## 16. Troubleshooting

### Blank page

Check `vite.config.ts`:

```ts
base: "/"
```

Then rebuild:

```bash
npm run build
```

### CSS/images missing

Inspect `dist/` and verify generated assets. Check for incorrect paths.

### `npm ci` fails

Verify `package.json` and `package-lock.json`.

Run:

```bash
npm ci
npm run build
```

locally.

### GitHub Pages returns 404

Verify:

```text
Repository:
Sanjay-Thangavel.github.io

Pages Source:
GitHub Actions
```

Also verify the Actions deployment succeeded.

### Works locally but not on GitHub Pages

Check:

1. `vite.config.ts`
2. `base: "/"`
3. Asset paths
4. GitHub Pages settings
5. GitHub Actions status
6. Browser console
7. Generated `dist/`

---

## 17. Do Not Use Manual Deployment

Do not use:

```text
npm run build
  ->
manually upload dist/
```

Use:

```text
GitHub Repository
+
GitHub Actions
+
GitHub Pages
```

---

## 18. Final Checklist

- [ ] Repository is `Sanjay-Thangavel.github.io`
- [ ] Repository belongs to `Sanjay-Thangavel`
- [ ] Project is in repository root
- [ ] `package.json` exists
- [ ] `package-lock.json` exists
- [ ] `npm ci` works
- [ ] `npm run build` works
- [ ] `dist/` is generated
- [ ] Vite uses `base: "/"`
- [ ] `.github/workflows/deploy.yml` exists
- [ ] GitHub Pages source is GitHub Actions
- [ ] GitHub Actions succeeds
- [ ] No secrets are committed
- [ ] Production URL works
- [ ] CSS loads
- [ ] JavaScript loads
- [ ] Images load
- [ ] Fonts load
- [ ] Navigation works
- [ ] Projects work
- [ ] GitHub links work
- [ ] LinkedIn links work
- [ ] Mobile layout works
- [ ] SEO metadata is configured
- [ ] Open Graph metadata is configured

---

## Final Success Criteria

The deployment is successful only when:

```text
GitHub Repository
        |
        v
Sanjay-Thangavel.github.io
        |
        v
GitHub Actions
        |
        v
SUCCESS
        |
        v
GitHub Pages
        |
        v
https://sanjay-thangavel.github.io/
```

opens the completed portfolio correctly.

The final website must be a **root-level GitHub Pages personal website**, not a repository subdirectory website.

END OF DEPLOYMENT SPECIFICATION.

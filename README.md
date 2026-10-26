# Hanqi Huang (黄瀚祺) - Personal Academic & Engineering Website

A clean, minimalist personal website and portfolio tailored for **GitHub Pages** (`https://<username>.github.io/`), inspired by the academic aesthetic of [ngaizean.com](https://ngaizean.com/) and minimal Hugo themes (Gokarna).

Built with modern semantic **HTML5, CSS3, and vanilla JavaScript**, requiring **zero build steps** or third-party framework dependencies.

---

## ✨ Features

- **Academic Profile & Sticky Sidebar (ngaizean.com style)**:
  - Clean two-column layout on the [About](about.html) page with a sticky sidebar (photo, affiliations, locations, quick contact links) and timeline-based main content.
- **Dark / Light Mode**:
  - Automatically respects user OS system preference (`prefers-color-scheme`).
  - Persistent manual toggle stored in `localStorage` with smooth SVG animations.
- **Scientific & Academic Ready**:
  - **KaTeX** integration for LaTeX equations (e.g., $R^2$, MAE, RMSE).
  - Academic publication cards with DOI links, PDF full text access, and a **One-Click BibTeX Copy** button.
- **Portfolio & Project Showcase**:
  - Interactive project filtering by category (*All*, *AI & LLMs*, *Materials Informatics & HPC*, *Full-Stack & Systems*).
- **Responsive & Mobile Friendly**:
  - Collapsible navigation bar for smartphones and tablets.
- **Ready for GitHub Pages**:
  - `.nojekyll` included to bypass Jekyll build quirks.
  - Zero dependencies, 100% Lighthouse performance.

---

## 📁 Project Structure

```text
online-resume/
├── index.html                  # Homepage (Hero, News, Featured Research, Quick Links)
├── about.html                  # About Me (Bilingual Bio, Education, Internships, Skills)
├── projects.html               # Comprehensive Project & Research Portfolio with Filters
├── publications.html           # Academic Papers with BibTeX Copy & DOI Badges
├── posts.html                  # Technical Blog & Research Notes Directory
├── posts/
│   ├── hyposelect-simrag.html  # In-depth walkthrough of IEEE ICCEIC 2025 Paper
│   └── materials-ml-cgcnn.html # High-Throughput DFT + CGCNN Research Monograph
├── assets/
│   ├── css/
│   │   └── style.css           # Clean Gokarna-inspired typography & theme styles
│   ├── js/
│   │   └── main.js             # Theme toggle, mobile menu, filters, BibTeX copy
│   ├── images/
│   │   ├── avatar.jpg          # Profile photo
│   │   └── profile-life.jpg    # Lifestyle photo
│   └── docs/
│       ├── HUANG_Hanqi_CV.pdf  # English Resume (PDF)
│       ├── HUANG_Hanqi_CV_CN.pdf # Chinese Resume (PDF)
│       ├── HypoSelectSimRAG_Paper.pdf # IEEE ICCEIC Paper (PDF)
│       └── Materials_ML_Paper.pdf     # Materials ML Monograph (PDF)
├── .nojekyll                   # GitHub Pages bypass file
└── README.md                   # Documentation & Deployment Guide
```

---

## 🚀 Local Preview

You can open `index.html` directly in any web browser, or launch a local preview server:

```bash
# Using Python
python -m http.server 8000
```

Then visit [http://localhost:8000](http://localhost:8000) in your browser.

---

## 🌐 How to Deploy to GitHub Pages (github.io)

### Method 1: Deploy to `<username>.github.io` (Recommended for Root Site)

1. On GitHub, create a new public repository named:
   ```
   Hanson5732.github.io
   ```
   *(Replace `Hanson5732` with your actual GitHub username if different)*

2. In this project folder (`d:\Code\online-resume`), initialize git and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of personal website"
   git branch -M main
   git remote add origin https://github.com/Hanson5732/Hanson5732.github.io.git
   git push -u origin main
   ```

3. Go to your repository on GitHub &rarr; **Settings** &rarr; **Pages**:
   - **Source**: Select `Deploy from a branch`
   - **Branch**: Select `main` / `/ (root)` &rarr; click **Save**.
4. In about 1–2 minutes, your website will be live at:
   ```
   https://Hanson5732.github.io/
   ```

---

## ✍️ How to Add Content Later

- **Adding a new blog post**: Create an `.html` file inside `posts/` (you can duplicate `posts/hyposelect-simrag.html` as a template) and add an entry card inside `posts.html`.
- **Updating CV**: Replace `assets/docs/HUANG_Hanqi_CV.pdf` with your updated PDF.
- **Updating photo**: Replace `assets/images/avatar.jpg`.

# BUILD A PERSONAL PORTFOLIO WEBSITE: COMPLETE SPECIFICATION (v3)

Owner: **Sanjay Thangavel**
Audience: **Master's admissions committees** and **job recruiters**
Theme: **Template 3, "Pop" (Bold & Playful)**

> v3 supersedes v1 and v2. All content below comes from Sanjay's LinkedIn screenshots and his own messages.
> Items marked **[TO CONFIRM]** are not yet known. Keep them as empty fields in `data/` and **do not render them**. Never guess.

---

## 0. READ FIRST

1. Build a **single-page React portfolio** with **one big interactive moment**: the **Professional ⇄ Personal toggle in the hero**.
2. **Gamification lives ONLY in the toggle and its transition.** Every other section is clean, bold, readable Pop styling with no game mechanics.
3. **Professional is the default and the main view.** Personal is the secondary view with photos of Sanjay and his clubs.
4. **Never invent** roles, dates, skills, scores, certifications, awards, metrics or links.
5. The site must deploy to GitHub Pages at `https://<username>.github.io/`.

---

## 1. TECHNOLOGY

- React + TypeScript + Vite + Tailwind CSS
- Framer Motion (toggle transition and section reveals only)
- Lucide React for icons
- Confetti and wipe effects are hand-built (CSS/canvas), with no extra libraries
- Vite `base` set for GitHub Pages. Section anchors only, no router. A refresh must never 404.
- GitHub Actions workflow to deploy to Pages

---

## 2. THEME: "POP" (exact tokens, follow these)

Mood: bold, friendly, confident and memorable, but credible. Playful in colour and shape, serious in content.

### 2.1 Colour tokens (use only these)
```css
:root {
  --bg:     #FFE9A8;  /* warm yellow page background */
  --ink:    #17171C;  /* all text, borders, shadows */
  --card:   #FFFFFF;  /* cards */
  --accent: #FF5A4F;  /* coral: Professional-mode accent, primary buttons */
  --accent2:#7FE0C9;  /* mint: Personal-mode accent, tags */
  --border: 3px solid var(--ink);
  --shadow: 5px 5px 0 var(--ink); /* hard shadow, no blur */
  --radius: 14px;
}
```
- Text on coral or mint is always `--ink`, never white (AA contrast).
- The page background stays yellow in both modes. Only the accent changes with the mode.

### 2.2 Shape and components
- Cards: white, `--border`, `--shadow`, `--radius`
- Buttons: pill, `--border`; primary = coral fill + ink text; secondary = white fill. On hover the shadow grows and the button lifts 2px; arrows nudge right.
- Tags/pills: mint fill, 2–3px ink border, small text
- Headline highlight: **one key word per heading** in a coral "sticker" (`<mark>`, rotated -2deg, bordered)
- Timeline: 3px ink vertical line, round coral dots with ink border
- Section headings: Bricolage Grotesque, 32–44px, with a thick underline or sticker

### 2.3 Typography
- Display: **Bricolage Grotesque** (500/800). Body: **Inter** (400/500/600). Always add `system-ui, sans-serif` fallbacks.
- Hero name: `clamp(42px, 8vw, 100px)`, weight 800, tight tracking
- Body 16–17px

### 2.4 Motion
- Reveal on scroll: fade up with staggered cards
- Hover lifts only, no other animations outside the toggle
- Respect `prefers-reduced-motion` (see §11)

---

## 3. PAGE STRUCTURE

```
NAVBAR  (sticky; links change with the mode)
HERO / INTRO BANNER  ← contains the GAMIFIED TOGGLE
──────────── content swaps with the toggle ────────────
PROFESSIONAL (default)            PERSONAL
 1. Experience (main focus)        1. Personal intro + photo
 2. Skills                         2. Four clubs with photos
 3. Projects                       3. Photo gallery (optional)
 4. Education
 5. Certifications (hidden until provided)
CONTACT (shared)
FOOTER (shared)
```

- Both views live on **the same page**. Toggling swaps content in place, with no reload and no route change.
- Sync the mode to the URL hash: `#professional` (default) and `#personal`. Direct links work and a refresh keeps the mode.
- Navbar: Professional shows `Experience · Skills · Projects · Education · Contact`. Personal shows `Clubs · Gallery · Contact`.

---

## 4. HERO / INTRO BANNER (highest design priority)

Full viewport (90–100vh on desktop), asymmetric and typography-first.

**Left**
- Label: `01 · INTRODUCTION`
- `HELLO, I'M` then **SANJAY THANGAVEL** (oversized; one word as a coral sticker)
- Descriptor: **Technology Analyst • Data Science Aspirant**. Never claim "Data Scientist".
- Sub-line (small sticker): `@ Citi · US Personal Banking Datalake`
- Statement, 2–3 lines: *Technology professional exploring data science, machine learning, Python, analytics and intelligent automation, turning real-world problems into practical technical solutions.*
- The **mode toggle** (§5)
- CTAs (Professional): `VIEW MY WORK →`, `GITHUB`, `LINKEDIN`, `DOWNLOAD CV` (only if the PDF is supplied)

**Right**
- Framed portrait (bordered, hard shadow, slight tilt). No portrait supplied means a neutral placeholder frame. **Never invent a human face.**
- Small stickers such as `DATA • CLOUD • AI`

**Bottom**: `SCROLL TO EXPLORE ↓` with a gentle bounce.

**Load animation (0.8–1.5s, staggered):** label → name → descriptor → statement → toggle → CTAs → portrait → scroll cue. The page is usable immediately.

**Mobile order:** label, name, descriptor, **toggle**, portrait, statement, CTAs, scroll cue. The toggle must be visible without scrolling.

---

## 5. THE GAMIFIED TOGGLE (the "wow" element)

### 5.1 Discoverability (visitors must notice it)
- Arcade-style label above it: **`PLAYER MODE`** (or `CHOOSE YOUR MODE`)
- Two large pill segments: `▶ PROFESSIONAL` | `★ PERSONAL`. The active segment is filled (coral for Professional, mint for Personal).
- Attention cues, which stop after the first use:
  - A speech-bubble sticker pointing at the inactive option: **"Psst! There's more of me. Press here."**
  - A gentle pulse or wiggle every ~4 seconds
  - A small bouncing arrow
  - Hint text: *"Same page, two sides of Sanjay. Try the switch."*
- Accessible: `role="switch"` or `tablist`, with Left/Right/Enter/Space support and a visible focus ring

### 5.2 Transition sequence (~1.2–1.6s, never blocks interaction)
1. **Press feedback:** the segment squishes down and pops back
2. **Screen wipe:** a halftone/pixel-block shutter in the target colour sweeps across the hero and content, like a game scene change
3. **Mode banner:** a centred sticker pops in then exits: **`LEVEL UNLOCKED: PERSONAL MODE`** or **`BACK TO CAREER MODE`**
4. **Confetti/pixel burst** from the toggle (~40 particles, palette colours only)
5. **Text scramble:** the descriptor and statement "decode" to the new text
6. **Portrait card-flip** to the other photo
7. **Content swap:** new content staggers in
8. **HUD badge** near the hero corner: `MODE: PROFESSIONAL` or `MODE: PERSONAL`. The first time Personal is opened, show a brief "+10 XP · New side discovered". It is a visual flourish only, with no stored score.
9. **Sound:** a short 8-bit blip, **off by default**, with a small mute/unmute button. Never autoplay.

### 5.3 What changes per mode
| | Professional | Personal |
|---|---|---|
| Accent | coral | mint |
| Descriptor | Technology Analyst • Data Science Aspirant | Entrepreneur • Techie • Performer • Rotaractor **[TO CONFIRM]** |
| Hero portrait | professional photo | casual/club photo |
| CTAs | View my work · GitHub · LinkedIn · CV | Meet my clubs · Say hi |

### 5.4 Rules
- No levels, XP bars, quests, avatars or achievements anywhere else on the site.
- Rapid toggling must never glitch (cancel or debounce overlapping animations).
- **Reduced motion:** use only a 200ms cross-fade. The banner shows as static text. No confetti, flip, scramble or sound.
- Announce the change through `aria-live="polite"`. Never expose the scrambled intermediate text to screen readers.

---

## 6. PROFESSIONAL VIEW (MAIN): CONTENT

All content below is already verified from the LinkedIn screenshots. Use it exactly and reword only for grammar.

### 6.1 Experience: grouped timeline (newest first)

**Group header: Citi** (logo + "Full-time, Chennai, India").
Compute the total duration in code from the first start date, Jul 2024 to the present (LinkedIn currently shows "2 yrs 4 mos"). Never hard-code it.

**① Technology Analyst · C10 · `CURRENT`**
Aug 2025 – Present · Team: **US Personal Banking Datalake**
- Building ELT pipelines in the cloud data lake: Snowflake ingestion
- Working on Databricks
- Cloud infrastructure activities:
  - Migration of data lake infrastructure from one AWS region to another
  - Migration of Snowflake from one Snowflake edition to another
  - Cloud infrastructure for Iceberg pipelines in the cloud data lake
- Handling infrastructure-related high-priority production incidents on a regular basis

*Tags:* Big Data · AWS · Snowflake · Databricks · Iceberg · Datalake

**② Technology Analyst · C09 · Full-time**
Jul 2024 – Jul 2025 · Chennai, Tamil Nadu, India · Team: **KYC Database Team**
- Designed, developed and optimised Python-based ETL pipelines for data extraction, transformation and processing, improving efficiency and reliability
- Contributed to the migration of ETL workflows from **Talend to Python**, translating existing transformation logic into Python pipelines for better flexibility, maintainability and integration
- Worked extensively on data transfer from **Oracle to Hive**: extraction, transformation and migration, ensuring accuracy, consistency and reliability across source and target systems
- Developed and maintained a **Node.js full-stack web application** that streamlined static data patching and database maintenance, enabling efficient data updates and reducing operational effort and cost
- Owned the application end-to-end as **Application Coordinator**: feature enhancements, production maintenance, troubleshooting and stakeholder coordination
- **Dockerized and deployed** the application on **OpenShift** for a scalable, portable deployment
- Applied Python, SQL, ETL, data transformation and data-processing concepts to large-scale data workflows

*Tags:* Python · SQL · ETL · Node.js · Angular · Docker · OpenShift · Talend · Oracle · Hive

**③ Summer Analyst (Internship) · Citi India**
May 2023 – Jul 2023 (3 mos) · Chennai, Tamil Nadu, India · Team: **KYC ETL Team**
- Developed ETL-based reporting solutions for accurate data extraction, transformation and loading for business insights
- Performed feed validation and data quality checks across multiple systems to ensure consistency, reliability and compliance with reporting standards

*Tags:* ETL · Shell Scripting · Big Data

**④ Internship · SACL** (logo supplied by Sanjay)
Dates and company full name **[TO CONFIRM]**. Place chronologically once dates are known.
- .NET application development
- Built an **internal application for the HR team**
- Built a **full-stack application** responsible for **certificate and report generation**
- Backend: **Microsoft SQL Server** with a **.NET** full-stack application

*Tags:* .NET · Microsoft SQL Server · Full-stack

**Display rules**
- Show the Citi logo on the group header and the SACL logo on its entry. Add alt text and a text fallback.
- `C10` and `C09` appear as small bordered stickers next to the titles. Make this configurable in `experience.ts` (`showBand: true/false`). Do not describe the C09 → C10 change as a "promotion" unless Sanjay says so.
- Do **not** display the "Summer Internship" letter attachment that appears on LinkedIn.
- Do not add metrics, percentages or claims that aren't listed above.

### 6.2 Skills (pills in category cards, no percentage bars)

Only skills visible in the screenshots or the experience text above. Show the core set by default, with a "show more" toggle for the rest.

| Category | Core (show by default) | More |
|---|---|---|
| **Data Engineering** | Big Data · Apache Spark · ETL / ELT Pipelines · Datalake · Snowflake · Databricks | Apache Iceberg · Hive · Talend |
| **Cloud & DevOps** | AWS · Amazon EKS · Kubernetes · OpenShift · Docker | Autosys |
| **Programming & Databases** | Python · SQL · Shell Scripting | Node.js · Angular · .NET · Oracle · Microsoft SQL Server |
| **Foundations & Learning** | Data Structures & Algorithms · Generative AI | n/a |

- The LinkedIn skills list in the screenshot is **cut off after "Autosys cli"**. Add any further skills only after Sanjay sends the rest. **[TO CONFIRM]**
- LinkedIn also shows a skill spelled "PQSQL". Do **not** display it until Sanjay confirms what it should be (PostgreSQL? PL/SQL?). **[TO CONFIRM]**

### 6.3 Projects

**Final-year project** (large featured card)
- IEEE Xplore: https://xploreqa.ieee.org/document/10739002
- arXiv: https://arxiv.org/abs/2407.01117v1
- Per paper: title, authors/venue/year, a 1–2 line plain-language summary, `READ PAPER →`. Pull these from the pages. State nothing beyond what the abstract says.
- **[TO CONFIRM]:** is it one project with two papers, or two projects? What is the project name?

**Mini projects**
- One card per GitHub repository: name, one-line purpose, tech tags, `GITHUB →` linking to the repo.
- **[TO CONFIRM]:** GitHub username and repository URLs. Do not render empty cards. Fetch repo descriptions at build time only, with no runtime API dependency.

### 6.4 Education (UG)
Single card with the Anna University logo:
- **Anna University, Chennai**
- **B.Tech, Information Technology (IT)**, Madras Institute of Technology (MIT Campus)
- **2020 – 2024**
- **First Class with Distinction**
- Related topics (LinkedIn): Generative AI · Data Structures and Algorithms
- Optional "Graduation Day" photo if Sanjay supplies the image
- **Do not show a CGPA or percentage** (not provided). **[TO CONFIRM]** if he wants one shown.

### 6.5 Certifications
No certifications appear on the screenshots. **Hide this section** until Sanjay provides: title, issuer, date and credential link. **[TO CONFIRM]**

### 6.6 Attention hierarchy
Hero → Experience → Projects → Skills → Education → Certifications → Contact

---

## 7. PERSONAL VIEW

Warm, human and image-led. The accent is mint, and the styling is the same as Professional. No game mechanics except the entry transition.

### 7.1 Intro
A 2–3 line note about who Sanjay is beyond work **[TO CONFIRM: he provides it, or a draft is written for his approval]**, plus a photo of Sanjay.

### 7.2 Clubs: four sections, each with photos
| # | Club | Theme | Details |
|---|---|---|---|
| A | **AUSEC MIT** | Entrepreneurship | full name, role, highlights **[TO CONFIRM]** |
| B | **ITA** | Information Technology | full name, role, highlights **[TO CONFIRM]** |
| C | **Variety Team** | College theatrical club | plays/performances, role **[TO CONFIRM]** |
| D | **RC MIT: Rotaract Club of MIT** | Community service / leadership | role, projects, highlights **[TO CONFIRM]** |

(MIT = Madras Institute of Technology, per the education details.)

Per club: logo (if supplied), 1–3 photos, role, years, 2–3 factual highlights. If Sanjay hasn't supplied details, show only the name, theme and photos.

### 7.3 Photos
- Files go in `src/assets/personal/<club>/`
- Display as a tilted polaroid-style collage per club, and a swipeable carousel on mobile
- Click opens an accessible lightbox. Every image has a descriptive alt text.
- Resize to max ~1600px, convert to WebP and lazy-load (except the hero portrait)

---

## 8. CONTACT AND FOOTER (shared)

- Heading **LET'S CONNECT**: "Have an opportunity, a program, or a problem worth solving? Let's talk."
- Buttons: `LINKEDIN` · `GITHUB` · `EMAIL` (`mailto:`) · `DOWNLOAD CV` (if supplied). No backend form.
- Footer: name, descriptor, social links, © 2026 Sanjay Thangavel

---

## 9. CODE ARCHITECTURE

```
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── ModeToggle.tsx          ← gamified switch
│   ├── ModeTransition.tsx      ← wipe, banner, confetti, HUD badge
│   ├── professional/ Experience, Skills, Projects, Education, Certifications
│   ├── personal/     PersonalIntro, ClubSection, Lightbox
│   ├── Contact.tsx
│   └── Footer.tsx
├── data/
│   ├── profile.ts   (name, roles, links, hero copy for both modes)
│   ├── experience.ts  (Citi group + 3 entries, SACL)
│   ├── skills.ts      (categories, core flag)
│   ├── projects.ts    (final-year papers, mini projects)
│   ├── education.ts
│   ├── certifications.ts
│   └── clubs.ts
├── hooks/useMode.ts   (state + URL hash sync)
├── assets/            (logos, portraits, personal/)
├── App.tsx
└── main.tsx
```

Components hold no hard-coded facts. Every link lives in `profile.ts`. Empty fields mean the element is not rendered.

---

## 10. ASSETS NEEDED FROM SANJAY

1. Professional portrait (hero, Professional)
2. Casual/personal portrait (hero, Personal)
3. Photos for each of the 4 clubs, and club logos if available
4. Logos: Citi, SACL, Anna University
5. Optional: the Graduation Day photo
6. Complete LinkedIn skills list (the screenshot was cut off)
7. Certifications (if any)
8. CV PDF (optional)
9. GitHub username and repo URLs, LinkedIn URL, email

Missing items mean placeholders in the data files. Do not invent a portrait.

---

## 11. ACCESSIBILITY, PERFORMANCE, SEO

**Accessibility:** semantic HTML, one `h1`, logical headings, keyboard-operable toggle and lightbox, visible 3px focus rings, alt text everywhere, AA contrast, `prefers-reduced-motion` honoured, no flashing over 3 times per second, sound off by default.

**Performance:** Lighthouse mobile ≥ 90. WebP images, lazy loading, 2 font families, `display=swap`, light effects with no video, and no runtime API calls required.

**SEO:** `<title>Sanjay Thangavel | Technology Analyst | Data Science Aspirant</title>`, meta description, Open Graph/Twitter tags, favicon, 1200×630 social preview image in Pop style, canonical URL.

---

## 12. CONTENT SAFETY

Never invent responsibilities, dates, years of experience, projects, certifications, awards, skills, metrics, grades, or club roles. Everything must come from this document, Sanjay's supplied files, or his confirmed answers.

---

## 13. ACCEPTANCE CHECKLIST

- 3 seconds: who he is and his role
- 5 seconds: the visitor notices the mode toggle
- 10 seconds: his direction (cloud data engineering, moving into data science)
- 20 seconds: Experience and Projects are easy to find
- 30 seconds: GitHub, LinkedIn and the CV are easy to find

Also check:
- [ ] Defaults to Professional; `#personal` opens Personal
- [ ] Toggle works by mouse, touch and keyboard, and repeats without glitches
- [ ] Transition shows wipe, banner, confetti, text scramble and portrait flip
- [ ] Reduced motion shows a clean cross-fade
- [ ] No gamification outside the toggle
- [ ] Citi roles, dates and bullets match §6.1 exactly
- [ ] No horizontal scroll at 360px
- [ ] All links work (IEEE, arXiv, GitHub, LinkedIn)
- [ ] Deploys to GitHub Pages and survives a refresh

END OF SPECIFICATION (v3)

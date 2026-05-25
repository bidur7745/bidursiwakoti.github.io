# EvilEverest OS

A macOS-inspired interactive portfolio website for **Bidur Siwakoti**. Instead of a traditional scrolling portfolio, this project presents Bidur's profile, projects, skills, resume, and contact information as a mini desktop operating system with windows, dock apps, desktop shortcuts, and system-style UI.

## Overview

EvilEverest OS is designed to feel like a personal portfolio desktop. Visitors can open apps, move through portfolio sections, preview the resume, explore projects, and interact with UI patterns inspired by macOS Ventura/Sonoma.

The project also acts as a practical experiment in vibe coding: building a real, polished portfolio with the help of AI coding agents while keeping the codebase readable and expandable.

## Features

- macOS-inspired desktop environment
- Boot/login style entry flow
- Top menu bar with system-style controls
- Desktop icons and resume PDF shortcut
- Bottom dock with animated app icons
- Draggable, resizable app windows
- Finder-style project browser
- Terminal-style developer introduction
- Resume and PDF preview apps
- Mail/contact workspace
- Premium Settings app with complete sections
- Wallpaper switching from desktop and Settings
- Smooth motion using Framer Motion
- Responsive layout for desktop and mobile screens

## Built With

- React
- Vite
- JavaScript / JSX
- Framer Motion
- Zustand
- Lucide React
- React Icons
- pdf.js
- CSS

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```text
src/
  assets/
    Documents/
    icon/
    appAssets.js
  components/
    apps/
      AboutApp.jsx
      FinderApp.jsx
      MailApp.jsx
      PdfPreviewApp.jsx
      ProjectsApp.jsx
      ResumeApp.jsx
      SettingsApp.jsx
      SkillsApp.jsx
      TerminalApp.jsx
    desktop/
      Desktop.jsx
      DesktopIcon.jsx
      Dock.jsx
      MenuBar.jsx
    window/
      Window.jsx
      WindowHeader.jsx
  data/
    links.js
    personalInfo.js
    projects.js
    skills.js
  store/
    windowStore.js
  styles/
    globals.css
```

## Main Apps

| App | Purpose |
| --- | --- |
| Finder | Browse projects in a folder-style interface |
| Terminal | Show developer identity in command-line style |
| Projects | Present selected work and builds |
| Skills | Display technical skills and tools |
| Resume | Show education, experience, and resume actions |
| Preview | Render the resume PDF inside the desktop |
| Mail | Provide contact links and message workspace |
| Settings | Control portfolio identity, appearance, desktop, privacy, and notifications |

## Data Sources

Project content is organized in `src/data/`:

- `personalInfo.js` contains identity, role, goals, and bio content.
- `projects.js` contains project information.
- `skills.js` contains skills and tool categories.
- `links.js` contains contact and social links.

Local planning/reference files such as `Plan.txt`, `Bidur siwakoti.txt`, `AGENTS.md`, and `vibe-coding-log.md` are intentionally ignored by Git.

## Design Direction

The portfolio preserves the **EvilEverest OS** idea: a personal website that feels like a small operating system. The interface prioritizes:

- glassmorphism with readable contrast
- macOS-style windows and controls
- app-based navigation instead of long-page scrolling
- polished desktop interactions
- expandable component structure

## Deployment

This is a Vite React app and can be deployed to platforms such as Vercel, Netlify, or any static hosting service that supports a production build from `npm run build`.

## Author

**Bidur Siwakoti**  
Also known as **EvilEverest**.

Bidur is a Nepal-based computing student and project-focused developer interested in web development, AI, cybersecurity, Shopify development, agriculture technology, social impact systems, and practical software projects.


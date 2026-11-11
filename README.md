# Sanni Kumar - Personal Portfolio Website

A clean, modern, and fully responsive developer portfolio built with semantic **HTML5**, modern **CSS3**, and vanilla **JavaScript (ES6+)**. This project serves as an internship submission demonstrating core web development competencies without external UI frameworks.

![Portfolio Preview](assets/images/project1.jpg)

---

## 🌟 Key Features

- **Semantic HTML Structure**: Built using strictly semantic markup (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) to promote accessibility (WCAG) and search engine optimization (SEO).
- **Fully Responsive Design**: Optimized mobile-first with dedicated breakpoints for:
  - Mobile screens (375px)
  - Tablet screens (768px)
  - Desktop displays (1280px+)
- **Interactive JavaScript Capabilities**:
  - **Dark / Light Theme Toggle**: Seamlessly toggles themes with persistence via `localStorage` and automatic OS color scheme detection.
  - **Mobile Navigation Drawer**: Accessible hamburger menu with smooth transitions, backdrop handling, and keyboard escape support.
  - **Interactive Project Filtering**: Instant category filtering (All, Frontend, Full Stack) with animated card transitions.
  - **Interactive Project Live Demos**: In-page modal preview showcasing functioning simulator controls for featured projects.
  - **Smooth Scroll Spy**: IntersectionObserver automatically highlights active navigation links as you scroll.
  - **Interactive Contact Form**: Client-side validation with real-time field error messaging and toast confirmation.
  - **One-Click Email Copying**: Clipboard copy utility with instant visual feedback.
  - **Back to Top Floating Action**: Smooth scrolling to the top of the viewport.

---

## 🛠️ Tech Stack

- **HTML5**: Semantic tags, accessible form attributes, meta tags.
- **CSS3**: CSS Custom Properties (Variables), Flexbox, CSS Grid, media queries, CSS transitions.
- **JavaScript**: Vanilla ES6+, DOM API, IntersectionObserver, Web Storage API, Event Listeners.

---

## 📁 Repository Structure

```text
portfolio-website/
├── index.html            # Main semantic HTML structure
├── style.css             # Comprehensive stylesheet with CSS variables & responsive rules
├── script.js             # Vanilla JavaScript interactive logic
├── README.md             # Documentation and setup instructions
└── assets/
    └── images/           # Optimized project assets and avatar
        ├── avatar.jpg    # Developer portrait
        ├── project1.jpg  # CloudPulse Analytics preview
        ├── project2.jpg  # FlowBoard Kanban preview
        └── project3.jpg  # NexusMarket E-Commerce preview
```

---

## 🚀 How to Run Locally

1. **Clone or Download the Repository**:
   ```bash
   git clone https://github.com/sani75/portfolio-website.git
   cd portfolio-website
   ```

2. **Run in Browser**:
   - **Option A (Instant)**: Double-click `index.html` to open it directly in any modern browser (Chrome, Firefox, Safari, Edge).
   - **Option B (VS Code Live Server)**:
     - Open the project folder in VS Code.
     - Install the **Live Server** extension (by Ritwick Dey).
     - Right-click `index.html` and select **"Open with Live Server"**.
   - **Option C (Python HTTP Server)**:
     ```bash
     python3 -m http.server 8000
     ```
     Navigate to `http://localhost:8000` in your web browser.

---

## 🧪 Testing Responsiveness

You can verify mobile and desktop responsiveness using your browser's Developer Tools:
1. Open DevTools (`F12` or `Cmd + Option + I`).
2. Toggle the **Device Toolbar** (`Ctrl + Shift + M` / `Cmd + Shift + M`).
3. Test against standard dimensions:
   - **Mobile**: 375px width (e.g., iPhone SE / iPhone 13)
   - **Tablet**: 768px width (e.g., iPad Mini)
   - **Desktop**: 1280px+ width

---

## 📬 Contact & Connect

- **Portfolio**: Sanni Kumar
- **Email**: [Sannikumarkhg2002@gmail.com](mailto:Sannikumarkhg2002@gmail.com)
- **GitHub**: [github.com/sani75](https://github.com/sani75)
- **LinkedIn**: [Sanni Kumar on LinkedIn](https://www.linkedin.com/in/sanni-k-853909264?trk=contact-info)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
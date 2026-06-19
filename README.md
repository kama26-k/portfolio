# Kamalesh S | Cybersecurity & Cloud Portfolio Website

A modern, dark-themed, responsive portfolio website built with pure HTML5, CSS3, and Vanilla JavaScript — no frameworks, no external libraries. Built specifically for internship and placement applications in cybersecurity, networking, and cloud computing.

## 🚀 Features

- **Cybersecurity Dark Aesthetic:** A modern dark-themed styling with glowing neon accents, cyber-inspired grid overlays, and glassmorphic panels.
- **Dynamic Particle Canvas Background:** An interactive particle network floating background in the Hero header area (respects `prefers-reduced-motion` settings).
- **Responsive Navigation & Menu:** Fixed glassmorphic navigation header that transitions on scroll and turns into a slide-out hamburger menu on mobile.
- **Custom Scroll-Reveal Animations:** Elements smoothly transition and fade into view as you scroll down, managed via a high-performance `IntersectionObserver`.
- **Dynamic Typing Typist:** Typing and deleting simulation of multiple roles on the hero intro.
- **Real-Time Client-Side Form Validation:** Fully validated contact form with regular expressions and custom inline error feedback.
- **Persistent Theme Toggle:** Toggle between dark mode and light mode, with preferences saved locally using `localStorage`.

## 📁 Folder Structure

```
portfolio/
├── index.html             # Entry point webpage
├── css/
│   ├── style.css          # Theme styles, variables, main layouts
│   ├── animations.css     # Scroll-reveal rules & keyframe animations
│   └── responsive.css     # Breakpoint-specific overrides
├── js/
│   ├── main.js            # General interface interactivity and validation logic
│   ├── animations.js      # Scroll reveal using IntersectionObserver
│   └── particles.js       # Background interactive particles canvas
├── assets/
│   └── images/            # Generated assets and photos
├── data/
│   └── resume-data.json   # Structured JSON file of portfolio content
└── robots.txt             # SEO configuration for crawlers
```

## 🛠️ Setup & Local Development

No server build process or NPM installation is required since the site uses native web standards.

To open the project locally:
1. Double-click the `index.html` file to run it directly in your browser.
2. Alternatively, serve it using any local server, such as Live Server in VS Code, Python's SimpleHTTPServer, or similar.

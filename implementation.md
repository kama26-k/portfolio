# Portfolio Website — Implementation Guide
**Kamalesh S | Cybersecurity & Cloud Portfolio**

---

## Project Overview

A modern, dark-themed, responsive portfolio website built with pure HTML5, CSS3, and Vanilla JavaScript — no frameworks, no libraries. Designed for internship and placement applications in cybersecurity, networking, and cloud computing.

---

## Project Structure

```
portfolio/
├── index.html
├── css/
│   ├── style.css          # Core styles, variables, layout
│   ├── animations.css     # Keyframe animations and transitions
│   └── responsive.css     # Breakpoint-specific overrides
├── js/
│   ├── main.js            # Core logic: navbar, scrolling, form validation
│   ├── animations.js      # Scroll-reveal via IntersectionObserver
│   └── particles.js       # Floating background canvas animation
├── assets/
│   ├── images/            # Profile photo, project screenshots
│   ├── icons/             # SVG skill icons
│   └── certificates/      # Certificate images (optional)
├── data/
│   └── resume-data.json   # All resume content in structured JSON
└── README.md
```

---

## Color System (CSS Variables)

Define these in `:root` inside `style.css`:

```css
:root {
  --bg-primary:    #0B1120;
  --bg-card:       #111827;
  --color-primary: #2563EB;
  --color-secondary: #4F46E5;
  --color-accent:  #06B6D4;
  --text-primary:  #F8FAFC;
  --text-muted:    #94A3B8;
  --border:        rgba(37, 99, 235, 0.2);
  --shadow:        0 4px 24px rgba(0, 0, 0, 0.4);
  --transition:    all 0.3s ease;
}
```

For light mode, override these same variables on `body.light-mode`.

---

## Typography

```css
/* Import in index.html <head> */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;500;700&display=swap');

/* Usage */
--font-display: 'Space Grotesk', sans-serif;   /* headings */
--font-body:    'Inter', sans-serif;            /* body text */
```

---

## Section-by-Section Implementation

### 1. Navigation Bar (`index.html` + `main.js`)

**HTML Structure:**
```html
<nav id="navbar">
  <div class="nav-logo">KS</div>
  <ul class="nav-links">
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#skills">Skills</a></li>
    <li><a href="#experience">Experience</a></li>
    <li><a href="#projects">Projects</a></li>
    <li><a href="#certifications">Certifications</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
  <button id="theme-toggle" aria-label="Toggle theme">🌙</button>
  <button id="hamburger" aria-label="Open menu">☰</button>
</nav>
```

**JS Behavior (`main.js`):**
- On scroll past 80px: add `.scrolled` class → darken navbar background
- Use `IntersectionObserver` on each section → add `.active` class to matching nav link
- Hamburger: toggle `.open` on `<ul class="nav-links">` + overlay

---

### 2. Hero Section

**HTML Structure:**
```html
<section id="home">
  <canvas id="particle-canvas"></canvas>
  <div class="hero-content">
    <p class="hero-eyebrow">Hello, I'm</p>
    <h1 class="hero-name">Kamalesh S</h1>
    <p class="hero-title">
      <span id="typed-text"></span><span class="cursor">|</span>
    </p>
    <p class="hero-bio">
      Aspiring cybersecurity professional with hands-on experience in
      penetration testing, vulnerability assessment, and cloud fundamentals.
    </p>
    <div class="hero-cta">
      <a href="assets/Kamalesh_Resume.pdf" download class="btn btn-primary">Download Resume</a>
      <a href="#contact" class="btn btn-outline">Get in Touch</a>
    </div>
  </div>
</section>
```

**Typing Effect (`main.js`):**
```js
const roles = [
  'Security Analyst Intern',
  'Ethical Hacker',
  'Cloud Enthusiast',
  'Network Engineer'
];
// Cycle through roles with character-by-character typing and deletion
```

**Particles (`particles.js`):**
- Draw small dots and connecting lines on a `<canvas>` element
- Animate them floating slowly across the hero section
- Keep subtle — not distracting

---

### 3. About Section

**Layout:** CSS Grid, two columns on desktop, single column on mobile.

```html
<section id="about">
  <div class="about-grid">
    <div class="about-text">
      <h2>About Me</h2>
      <p>Entry-level cybersecurity professional pursuing B.E. Computer Science Engineering
         at Saveetha Engineering College (2023–present). Passionate about vulnerability
         assessment, threat analysis, and incident response.</p>
      <ul class="about-highlights">
        <li>Currently Learning: Advanced Penetration Testing, AWS Security</li>
        <li>Interests: Red Teaming, Network Defense, Cloud Security</li>
        <li>Goal: Security Analyst / SOC Analyst role</li>
      </ul>
    </div>
    <div class="about-education">
      <div class="edu-card">
        <span class="edu-year">2023 – Present</span>
        <h3>B.E. Computer Science Engineering</h3>
        <p>Saveetha Engineering College, Sriperumbudur</p>
      </div>
    </div>
  </div>
</section>
```

---

### 4. Skills Section

**Categories and Content:**

| Category | Items |
|---|---|
| Programming Languages | C, Python, Java, HTML |
| Networking | CCNA, TCP/IP, Subnetting |
| Cybersecurity | Ethical Hacking, Vulnerability Assessment, Incident Response |
| Tools | Nmap, Metasploit, Wireshark |
| Cloud | AWS Cloud Foundations |
| Machine Learning | TensorFlow, scikit-learn, LSTM, Random Forest |

**HTML Pattern (one skill card):**
```html
<div class="skill-card" data-reveal>
  <div class="skill-icon"><!-- SVG or emoji icon --></div>
  <h3 class="skill-name">Python</h3>
  <div class="skill-bar">
    <div class="skill-fill" style="--pct: 80%"></div>
  </div>
</div>
```

**CSS for progress bar animation:**
```css
.skill-fill {
  width: 0;
  transition: width 1s ease;
}
.skill-card.revealed .skill-fill {
  width: var(--pct);
}
```

---

### 5. Experience Section (Timeline)

```html
<section id="experience">
  <div class="timeline">

    <div class="timeline-item" data-reveal>
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <span class="timeline-date">30 Days</span>
        <h3>Cybersecurity Intern</h3>
        <p class="timeline-org">Zybeak Technologies</p>
        <ul>
          <li>Performed network security auditing and penetration testing</li>
          <li>Used Nmap, Metasploit, and Wireshark for vulnerability assessment</li>
          <li>Learned ethical hacking methodologies and basic incident response</li>
        </ul>
      </div>
    </div>

    <div class="timeline-item" data-reveal>
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <span class="timeline-date">15 Days | Jul 2024</span>
        <h3>Inplant Training — Web Development</h3>
        <p class="timeline-org">Codebind Technologies</p>
        <ul>
          <li>Built responsive web applications using HTML, CSS, JavaScript</li>
          <li>Implemented backend functionality with XAMPP (Apache, PHP, MySQL)</li>
          <li>Gained experience in database management and server-side scripting</li>
        </ul>
      </div>
    </div>

  </div>
</section>
```

**CSS Timeline:** Use `::before` pseudo-element for the vertical line. Position `.timeline-dot` absolutely against the line.

---

### 6. Projects Section

```html
<section id="projects">
  <div class="projects-grid">
    <div class="project-card" data-reveal>
      <div class="project-header">
        <span class="project-tag">ML + Security</span>
      </div>
      <h3>Encryption Algorithm Classifier</h3>
      <p>ML models (LSTM, Random Forest) that classify AES, DES, and RSA ciphertexts
         by detecting patterns unique to each algorithm.</p>
      <div class="project-tech">
        <span>Python</span><span>TensorFlow</span><span>scikit-learn</span>
      </div>
      <div class="project-links">
        <a href="#" class="btn btn-sm">GitHub</a>
        <a href="#" class="btn btn-sm btn-outline">Live Demo</a>
      </div>
    </div>
  </div>
</section>
```

---

### 7. Certifications Section

```html
<section id="certifications">
  <div class="certs-grid">

    <div class="cert-card" data-reveal>
      <div class="cert-icon">🔐</div>
      <h3>CC — Certified in Cybersecurity</h3>
      <p class="cert-issuer">ISC²</p>
      <p class="cert-date">Nov 2025</p>
      <a href="#" class="btn btn-sm">View Credential</a>
    </div>

    <div class="cert-card" data-reveal>
      <div class="cert-icon">🌐</div>
      <h3>CCNA — Introduction to Networks</h3>
      <p class="cert-issuer">Cisco</p>
      <p class="cert-date">Nov 2025</p>
      <a href="#" class="btn btn-sm">View Credential</a>
    </div>

    <div class="cert-card" data-reveal>
      <div class="cert-icon">☁️</div>
      <h3>AWS Academy — Cloud Foundations</h3>
      <p class="cert-issuer">Amazon Web Services</p>
      <p class="cert-date">May 2026</p>
      <a href="#" class="btn btn-sm">View Credential</a>
    </div>

    <div class="cert-card" data-reveal>
      <div class="cert-icon">🛡️</div>
      <h3>Learn Ethical Hacking From Scratch 2024</h3>
      <p class="cert-issuer">Udemy</p>
      <p class="cert-date">Jan 2025</p>
      <a href="#" class="btn btn-sm">View Credential</a>
    </div>

  </div>
</section>
```

---

### 8. Achievements Section

```html
<section id="achievements">
  <div class="achievements-grid">
    <div class="achievement-card" data-reveal>
      <span class="achievement-icon">🏆</span>
      <h3>IBM Z DATATHON 2025</h3>
      <p>Led a team of 5 members. Developed communication, critical thinking,
         and decision-making skills under competitive conditions.</p>
      <span class="achievement-tag">Leadership</span>
    </div>
  </div>
</section>
```

---

### 9. Contact Section

```html
<section id="contact">
  <div class="contact-grid">

    <div class="contact-info">
      <h2>Get In Touch</h2>
      <p>Open to internship and entry-level opportunities in cybersecurity and networking.</p>
      <ul class="contact-links">
        <li>
          <a href="mailto:kamaleshsakthivel2006@gmail.com">
            📧 kamaleshsakthivel2006@gmail.com
          </a>
        </li>
        <li>
          <a href="https://www.linkedin.com/in/kamalesh3085732bS/" target="_blank">
            💼 LinkedIn
          </a>
        </li>
        <li>
          <a href="https://github.com/sakamalesh" target="_blank">
            🐙 GitHub
          </a>
        </li>
        <li>
          📞 +91 9444436536
        </li>
      </ul>
    </div>

    <form id="contact-form" novalidate>
      <div class="form-group">
        <label for="name">Name *</label>
        <input type="text" id="name" name="name" required placeholder="Your name" />
        <span class="error-msg" id="name-error"></span>
      </div>
      <div class="form-group">
        <label for="email">Email *</label>
        <input type="email" id="email" name="email" required placeholder="your@email.com" />
        <span class="error-msg" id="email-error"></span>
      </div>
      <div class="form-group">
        <label for="subject">Subject</label>
        <input type="text" id="subject" name="subject" placeholder="Internship Opportunity" />
      </div>
      <div class="form-group">
        <label for="message">Message *</label>
        <textarea id="message" name="message" rows="5" required
                  placeholder="Your message..."></textarea>
        <span class="error-msg" id="message-error"></span>
      </div>
      <button type="submit" class="btn btn-primary">Send Message</button>
      <p id="form-success" hidden>✅ Message sent! I'll get back to you soon.</p>
    </form>

  </div>
</section>
```

---

## JavaScript Modules

### `main.js` — Responsibilities

```
1. Smooth scrolling for all nav anchor links
2. Active nav link highlighting (IntersectionObserver on sections)
3. Sticky navbar style change on scroll
4. Hamburger menu open/close with body scroll lock
5. Theme toggle (dark/light) — saves to localStorage
6. Back-to-top button: show after 400px scroll, scroll to top on click
7. Contact form validation:
   - Required field checks
   - Email format regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
   - Inline error messages on submit
   - Success message on valid submit
```

### `animations.js` — Scroll Reveal

```js
// Use IntersectionObserver on all [data-reveal] elements
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```

**CSS animation classes (in `animations.css`):**

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
[data-reveal].revealed {
  opacity: 1;
  transform: translateY(0);
}
```

Add directional variants: `[data-reveal="left"]`, `[data-reveal="right"]`, `[data-reveal="scale"]`.

### `particles.js` — Canvas Background

```
- Create N particles (30–60) with random position, velocity, and size
- On each animation frame: move, wrap edges, draw dots
- Connect particles within 120px with a faint line
- Color: use --color-accent / --color-primary at low opacity
- Respect prefers-reduced-motion: skip animation if set
```

---

## Responsive Breakpoints (`responsive.css`)

```css
/* Mobile first — base styles are for 320px+ */

@media (min-width: 768px) {
  /* Tablet: show nav links, 2-col grids */
  .about-grid    { grid-template-columns: 1fr 1fr; }
  .certs-grid    { grid-template-columns: repeat(2, 1fr); }
}

@media (min-width: 1024px) {
  /* Laptop: larger type, 3-col skills/certs */
  .skills-grid   { grid-template-columns: repeat(3, 1fr); }
  .certs-grid    { grid-template-columns: repeat(3, 1fr); }
  .contact-grid  { grid-template-columns: 1fr 1fr; }
}

@media (min-width: 1440px) {
  /* Desktop: constrain max-width, increase spacing */
  .container { max-width: 1280px; }
}
```

---

## Theme Toggle (Dark / Light)

```js
// main.js
const toggle = document.getElementById('theme-toggle');
const saved  = localStorage.getItem('theme') || 'dark';
document.body.classList.toggle('light-mode', saved === 'light');

toggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const current = document.body.classList.contains('light-mode') ? 'light' : 'dark';
  localStorage.setItem('theme', current);
  toggle.textContent = current === 'light' ? '🌙' : '☀️';
});
```

**CSS Light Mode Overrides:**
```css
body.light-mode {
  --bg-primary: #F8FAFC;
  --bg-card:    #FFFFFF;
  --text-primary: #0F172A;
  --text-muted:   #475569;
  --border:     rgba(37, 99, 235, 0.15);
}
```

---

## SEO Configuration

Place inside `<head>` of `index.html`:

```html
<title>Kamalesh S | Cybersecurity & Cloud Portfolio</title>
<meta name="description"
      content="Aspiring cybersecurity professional with hands-on experience in
               penetration testing, ethical hacking, and AWS cloud." />
<meta name="keywords"
      content="cybersecurity, ethical hacking, CCNA, AWS, portfolio, internship" />

<!-- Open Graph -->
<meta property="og:title"       content="Kamalesh S | Portfolio" />
<meta property="og:description" content="Security Analyst Intern | Ethical Hacking | Cloud" />
<meta property="og:type"        content="website" />
<meta property="og:url"         content="https://your-domain.com" />
<meta property="og:image"       content="assets/images/og-preview.png" />

<!-- Favicon -->
<link rel="icon" href="assets/icons/favicon.ico" type="image/x-icon" />

<!-- Preconnect for Google Fonts -->
<link rel="preconnect" href="https://fonts.googleapis.com" />
```

Add `robots.txt` at root:
```
User-agent: *
Allow: /
Sitemap: https://your-domain.com/sitemap.xml
```

---

## Accessibility Checklist

- All `<img>` have descriptive `alt` attributes
- Nav uses `<nav>` with `aria-label="Main navigation"`
- Form inputs have associated `<label>` elements
- Buttons have `aria-label` where icon-only
- Color contrast ratio ≥ 4.5:1 for all body text
- Focus states visible (don't remove `outline`, customize it)
- Heading hierarchy: `h1` → `h2` → `h3` only
- Motion: wrap particle canvas in `@media (prefers-reduced-motion: no-preference)`

---

## Performance Targets

| Metric | Target |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibility | ≥ 90 |
| Lighthouse SEO | ≥ 90 |
| First Contentful Paint | < 1.5s |
| Total Blocking Time | < 200ms |

**Optimizations to apply:**
- Lazy-load images: `<img loading="lazy" />`
- Defer non-critical JS: `<script src="js/particles.js" defer></script>`
- Use WebP format for images where possible
- Avoid layout shifts: set explicit `width` and `height` on all images

---

## resume-data.json Structure

```json
{
  "personal": {
    "name": "Kamalesh S",
    "phone": "9444436536",
    "email": "kamaleshsakthivel2006@gmail.com",
    "github": "https://github.com/sakamalesh",
    "linkedin": "https://www.linkedin.com/in/kamalesh3085732bS/"
  },
  "education": [
    {
      "degree": "B.E. Computer Science Engineering",
      "institution": "Saveetha Engineering College, Sriperumbudur",
      "period": "2023 – Present"
    }
  ],
  "skills": {
    "programming": ["C", "Python", "Java", "HTML"],
    "networking": ["CCNA", "TCP/IP", "Subnetting"],
    "cybersecurity": ["Ethical Hacking", "Nmap", "Metasploit", "Wireshark"],
    "cloud": ["AWS Cloud Foundations"],
    "ml": ["TensorFlow", "scikit-learn", "LSTM", "Random Forest"]
  },
  "experience": [ ... ],
  "projects": [ ... ],
  "certifications": [ ... ],
  "achievements": [ ... ]
}
```

---

## Deployment Checklist

- [ ] All links and buttons functional
- [ ] Resume PDF present at `assets/Kamalesh_Resume.pdf`
- [ ] Contact form tested (validation + success state)
- [ ] Theme toggle tested (persists on refresh)
- [ ] Mobile hamburger menu tested on real device
- [ ] Run Lighthouse audit — fix any score below 90
- [ ] Push to GitHub Pages or Netlify (free hosting)
- [ ] Update `og:url` and `sitemap.xml` with live URL

---

*Built with HTML5 · CSS3 · Vanilla JavaScript — No frameworks. No dependencies.*

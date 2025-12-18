# GSAP Scroll Narratives – React + TypeScript + Vite

This project demonstrates an advanced **scroll-driven storytelling experience** built with **React 19**, **TypeScript**, **Vite**, and **GSAP (ScrollTrigger)**.

The main goal is to showcase how multiple pinned sections, complex timelines, and a global scroll progress narrator can work together to create a smooth, immersive narrative flow.
---

##  🔗 Live Demo
```bash
👉 https://gsap-basharsoft.vercel.app
```
---

## ✨ Features

* Scroll-driven animations using **GSAP ScrollTrigger**
* Circular orbital animation in the Hero section
* Pinned sections with scrubbed timelines
* Global **ScrollProgressNarrator** that reacts to page scroll
* Fixed animated background layer
* Modular, scalable component architecture
* Fully typed with TypeScript

---

## 🧩 Tech Stack

* **React 19**
* **TypeScript**
* **Vite**
* **GSAP 3 (ScrollTrigger)**
* **CSS (modular styles per component)**

---

## 📁 Project Structure

```txt
src/
├─ assets/
│  └─ images/
├─ components/
│  ├─ index.ts
│  ├─ background/
│  │  ├─ index.ts
│  │  ├─ style.css
│  │  └─ FixedBackground.tsx
│  ├─ heroSection/
│  ├─ gallerySection/
│  ├─ storiesSection/
│  ├─ finalCTASection/
│  ├─ scrollProgressNarrator/
│  └─ pageContent/
├─ App.tsx
├─ main.tsx
└─ index.css
```

---

## 🧠 Core Concept

The application is structured as a **scroll narrative**:

1. **HeroSection**

   * Idle circular rotation animation
   * On scroll: elements expand, fade, and transition
   * Section is pinned during scroll

2. **ScrollProgressNarrator**

   * Wraps multiple sections
   * Displays a fixed progress bar near the bottom of the viewport
   * Progress increases based on scroll position
   * Appears only after reaching the first wrapped section

3. **GallerySection / StoriesSection / FinalCTASection**

   * Each section controls its own GSAP timeline
   * Uses `pin`, `scrub`, and `anticipatePin` for smooth transitions

---

## 📊 Scroll Progress Narrator

The `ScrollProgressNarrator` component:

* Wraps multiple sections as children
* Tracks scroll progress across those sections
* Renders a fixed progress bar positioned at **10% from the bottom**
* Uses GSAP `ScrollTrigger` with `scrub` for smooth updates

Visual styling:

* Progress gradient:

  ```css
  background: linear-gradient(90deg, #C2D2FC 0%, #1C46A0 100%);
  ```

* Track background:

  ```css
  background: var(--status-skeleton, #E3E3E4);
  ```

---

## 🚀 Getting Started

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## ⚙️ GSAP Setup

GSAP ScrollTrigger is registered once at app startup:

```ts
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
```

Each section owns its animation lifecycle using `gsap.context()` to ensure clean mounting and unmounting.

---

## 🧪 Notes & Best Practices

* All scroll animations are **scrubbed**, not time-based
* `pinSpacing: false` is used to maintain tight narrative flow
* Heavy animations are isolated per section for performance
* Images are lazy-loaded where possible

---

## 📌 Use Cases

* Corporate storytelling websites
* Product launch pages
* Data-driven narrative landing pages
* GSAP + React reference implementation

---

## 👨‍💻 Author

**Mohamed Hassan**
Senior Front-End Developer
Specialized in React, TypeScript, and animation-driven UI

---

## 📄 License

This project is for educational and demonstration purposes.

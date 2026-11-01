# 💰 Budget & Expense Tracker

> A minimalist, responsive personal finance dashboard designed for effortless daily expense logging, savings monitoring across multiple platforms, and intelligent safe-spending guardrails.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Responsive](https://img.shields.io/badge/Design-Responsive-success.svg)](#responsive--mobile-first)

---

## ✨ Overview

**Budget & Expense Tracker** eliminates tracking friction with a focus on speed, clarity, and peace of mind. Built with pure vanilla technologies (zero build steps, zero external dependencies), it offers real-time financial feedback, dynamic category allocations, and multi-platform savings tracking right inside your browser.

---

## 🚀 Key Features

### 1. ⚡ Assistive Touch Floating Action Button
* **Always-Accessible Quick Entry:** A subtle, draggable floating button that stays on-screen at all times.
* **Smart Screen Clamping:** Automatically stays within viewport boundaries during dragging on both desktop mouse and mobile touch devices.
* **Instant Key-In:** Tap `+` from any screen or tab to immediately open the transaction modal without scrolling.

### 2. 🎯 Radial Balance Gauge & Zone Feedback
* **Dynamic Visual Ring:** An animated SVG progress gauge showing your remaining monthly spending power at a glance.
* **Blue & Pink Zone Guardrails:**
  * **Blue Zone:** Spending is healthy and well within safe buffer limits.
  * **Pink Zone Alert:** Automatically triggers warning alerts when the balance approaches or breaches the minimum buffer.
* **Privacy Toggle:** Mask or unmask your exact monetary balance with a single click (`••••••` privacy mode).

### 3. 🛡️ 3-Second Check
* **Instant Purchasing Decision:** Answers the question *"Can I afford this right now?"* in under 3 seconds.
* Displays the exact monetary headroom remaining before hitting your monthly 20% emergency reserve floor.

### 4. 🌱 Multi-Platform Savings Stash
* **Platform-by-Platform Tracking:** Track dedicated savings pots across different fintech apps and wallets (e.g., **Versa Cash**, **Shopee**, ASNB, bank vaults).
* **Direct Quick-Save:** Tap the `+` button on any platform card to log new deposits instantly.
* Real-time calculation of overall saved reserves and interest-bearing stashes.

### 5. 📊 Category Allocation & Budget Breakdown
* Visual progress meters for individual expense categories (e.g., Food & Dining, Grab/Transit, Utilities, Lifestyle).
* Real-time percentage consumption and remaining spending caps per category.

### 6. 📅 Past Monthly Performance Ledger (Settings)
* **Single-Line Historical Summary:** View your monthly performance (money saved vs. money spent) in a clean, non-overflowing 3-column table grid (`Month` | `Saved` | `Spent`).
* **Collapsible Drawer:** Kept tucked away by default under Preferences and smoothly expanded on demand.
* **Current Month Indicator:** Live active-cycle indicator dot (`●`) distinguishing past archived cycles from the active month.

### 7. 🔒 100% Client-Side & Private
* All financial transactions, categories, and savings records are stored locally in your browser via `localStorage`.
* Zero trackers, zero third-party telemetry, zero server storage requirements.
* Full offline support — works completely without an internet connection.

---

## 🛠️ Architecture & Tech Stack

```
Budget-Tracker/
├── index.html        # Semantic HTML5 single-page application structure & modals
├── styles.css        # Clean CSS3 design system, responsive grid/flexbox, dark accents
├── app.js            # Pure vanilla ES6+ application state, math engine, touch gestures
├── .gitignore        # Standard ignore patterns
├── LICENSE           # MIT open source license
└── README.md         # Project documentation & guides
```

* **HTML5:** Semantic architecture with native accessible dialogs and ARIA labeling.
* **CSS3:** Modern design tokens (CSS custom properties), smooth cubic-bezier transitions, CSS Grid, and multi-tier mobile media queries (`max-width: 768px`, `640px`, `420px`).
* **JavaScript (ES6+):** Pure vanilla JavaScript without heavy frameworks, reactive UI updates, localStorage synchronization, and unified mouse/touch gesture listeners.

---

## 💻 Getting Started

### Prerequisites
Any modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

### Quick Run
1. **Clone the repository:**
   ```bash
   git clone https://github.com/wanmuazzam88/Budget-Tracker.git
   cd Budget-Tracker
   ```

2. **Open the app:**
   * Simply double-click `index.html` to open it directly in your browser.
   * *Or* run a local static server:
     ```bash
     # Using Python
     python -m http.server 8000

     # Using Node.js (npx)
     npx serve
     ```
3. Open your browser to `http://localhost:8000` (or `http://localhost:3000`).

---

## 📱 Responsive & Mobile-First Design

The user interface was built mobile-first, ensuring an experience optimized for touch screens:
* Bottom navigation bar tailored for thumb reachability on mobile viewports.
* Safe-area padding support (`viewport-fit=cover`) for notched mobile screens.
* Modals adapt into smooth sliding bottom-sheets on smaller viewports.
* Data labels abbreviate automatically (e.g., `October 2026` to `Oct 2026`) to eliminate horizontal text clipping.

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

# 🌼 Happy Vishu — Interactive Festival Website

A smooth, animated Vishu greeting website built with **React + Vite** and **CSS Modules**.

---

## 📁 Project Structure

```
happy-vishu/
├── index.html
├── vite.config.js
├── package.json
├── src/
│   ├── main.jsx              ← Entry point
│   ├── App.jsx               ← Root state machine
│   ├── App.module.css        ← Root + HelpButton styles
│   ├── index.css             ← Global reset, CSS variables, keyframes
│   └── components/
│       ├── FireworksCanvas/  ← Canvas-based fireworks engine
│       ├── FloatingPetals/   ← Decorative falling petals
│       ├── HelpModal/        ← Guide overlay
│       ├── LoadingSection/   ← Intro screen with progress bar
│       ├── StartSection/     ← Landing + Begin button
│       ├── InputSection/     ← Name form
│       ├── GreetingSection/  ← Personalised wish + auto-advance
│       └── FinalSection/     ← Thank you + Leave button
```

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production

```bash
npm run build
```

---

## 🎨 Website Flow

```
Loading → Start → Input Names → Greeting (15s) → Final → Farewell
```

| Screen | Description |
|---|---|
| **Loading** | Fireworks + progress bar, auto-advances |
| **Start** | "Begin" button with spinning rings |
| **Input** | Real name (required) + Nick name (optional) |
| **Greeting** | Personalised wish, staggered text reveal, 15 s auto-advance |
| **Final** | Thank you screen, Leave → burst → fade to black |

---

## 🛠 Tech Stack

- **React 18** — functional components + hooks
- **Vite 5** — fast dev server & bundler
- **CSS Modules** — scoped styles per component
- **HTML Canvas** — custom fireworks engine (no library needed)
- **Google Fonts** — Cormorant Garamond + Noto Serif Malayalam

---

## 🎨 Design Tokens (index.css)

All colours and fonts live in `:root` CSS variables:

```css
--gold        #FFD700   /* primary accent */
--gold-mid    #c8a04a   /* secondary text */
--gold-dark   #c8900a   /* borders, dark gold */
--bg-base     #050308   /* app background */
--font-display 'Cormorant Garamond', serif
--font-mal    'Noto Serif Malayalam', serif
```

---

## 💡 Customisation Tips

- **Change greeting text** → edit `GreetingSection.jsx`
- **Adjust auto-advance timer** → change `15000` in `GreetingSection.jsx`
- **Change fireworks colours** → tweak the `hue` range in `FireworksCanvas.jsx`
- **Add more petals** → increase the `20` in `FloatingPetals.jsx`

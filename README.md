<div align="center">
  <img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="Project Banner" width="100%" />
  
  <br />
  <br />
  
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=24&pause=1000&color=3B82F6&center=true&vCenter=true&width=600&lines=Welcome+to+the+AI+Studio+App;Empowered+by+Google+Gemini;Built+with+React+%26+Vite" alt="Typing SVG" />

  <br />

  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
    <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
    <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" alt="Vite" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
    <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" alt="Stripe" />
    <img src="https://img.shields.io/badge/Google_Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white" alt="Gemini" />
  </p>
</div>

---

## 🚀 Overview

This repository contains everything you need to run and deploy your **AI Studio application**. Designed for seamless local execution and scalable deployment, this project leverages bleeding-edge web technologies to deliver an unparalleled generative AI experience.

🔗 **View your app in AI Studio:** [AI Studio Project Link](https://ai.studio/apps/a5b47769-c351-4394-b651-448328b58cac)

<div align="center">
  <img src="https://media.giphy.com/media/qgQUggCGvnPcs/giphy.gif" alt="Coding GIF" width="400" style="border-radius: 10px;" />
</div>

---

## ✨ Features & Architecture

- **Intelligent Core**: Powered by Google's `@google/genai` for advanced LLM capabilities.
- **Modern Frontend**: React 19 + Vite + Tailwind CSS (`@tailwindcss/vite`) + Framer Motion (`motion`) for buttery smooth animations.
- **Robust Backend**: Express server natively integrated for fast API handling.
- **Payments Ready**: Built-in Stripe components for seamless monetization.
- **Database & Auth**: Firebase Firestore integration securely configured.

---

## 📂 Project Structure

```text
📁 c:\Dev\allc
├── 📄 server.ts               # Express Backend Entry Point
├── 📄 vite.config.ts          # Vite configuration
├── 📄 package.json            # Project dependencies and scripts
├── 📄 firebase-applet-config.json # Applet settings
├── 📄 firestore.rules         # Firebase DB security rules
├── 📁 src/                    # Frontend source code (React + Tailwind)
│   ├── 📁 components/         # Reusable UI components
│   ├── 📁 hooks/              # Custom React hooks
│   └── 📄 main.tsx            # React application entry
├── 📁 node_modules/           # Dependencies
└── 📄 README.md               # You are here!
```

---

## 📈 Activity & Stats

<div align="center">
  <img src="https://github-readme-activity-graph.vercel.app/graph?username=github&bg_color=0D1117&color=58A6FF&line=58A6FF&point=FFFFFF&area=true&hide_border=true" alt="Activity Graph" />
</div>

---

## ⚙️ Getting Started (Local Setup)

Follow these instructions to run the application locally.

### Prerequisites
- Node.js
- A [Google Gemini API Key](https://ai.google.dev/)

### Setup Steps

1. **Install dependencies**  
   Fire up your terminal and install all required Node modules.
   ```bash
   npm install
   ```

2. **Configure Environment Variables**  
   Create or edit your `.env.local` file to include your Gemini API Key.
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run the Development Server**  
   Start both the Vite frontend and Express backend.
   ```bash
   npm run dev
   ```

<div align="center">
  <img src="https://media.giphy.com/media/LmNwrBhejkK9EFP504/giphy.gif" alt="Rocket Launch" width="250" />
  <p><i>Ready for liftoff!</i></p>
</div>

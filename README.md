# 🇲🇽 Mexico Salary Analysis 2025

**Live Demo:** [https://madfam-io.github.io/mercado-laboral-mexicano/](https://madfam-io.github.io/mercado-laboral-mexicano/)

A fully responsive, interactive Single Page Application (SPA) that provides a comprehensive analysis of the Mexican job market for 2025. This dashboard visualizes salary data across various industries, regions, career levels, and education levels.

*Crafted on a warm evening in Cuernavaca, Morelos (July 31, 2025).*

![Mexico Salary Dashboard Screenshot](placeholder.png)
*(Replace placeholder.png with a screenshot of your running application)*

---

## ✨ Key Features

* **Interactive Charts:** Data is visualized using Recharts with tooltips, legends, and responsive containers.
* **Bilingual Content:** Instantly switch between English (EN) and Spanish (ES).
* **Currency Conversion:** Toggle all monetary values between Mexican Pesos (MXN) and US Dollars (USD).
* **Dark & Light Mode:** A sleek, user-friendly interface that respects user preference.
* **Net Salary Calculator:** An interactive tool to estimate take-home pay based on gross annual salary and Mexican tax brackets.
* **Fully Responsive:** A seamless experience on desktop, tablet, and mobile devices.

---

## 🚀 Getting Started

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/madfam-io/mercado-laboral-mexicano
    cd mercado-laboral-mexicano
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 📦 Deployment

This project is configured for easy deployment to GitHub Pages.

1.  **Build the application:**
    ```bash
    npm run build
    ```
    This command creates an optimized `dist` folder with the production-ready files.

2.  **Deploy to GitHub Pages:**
    ```bash
    npm run deploy
    ```
    This script will push the contents of the `dist` folder to the `gh-pages` branch on your repository. Make sure your repository's Pages settings are configured to deploy from that branch.

---

## 🛠️ Tech Stack

* **Framework:** React 18
* **Build Tool:** Vite
* **Styling:** Tailwind CSS
* **Charting Library:** Recharts
* **Icons:** Lucide React

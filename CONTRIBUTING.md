# Contributing to SEC_DISPATCH // 2026

Thank you for your interest in contributing to the **SEC_DISPATCH // 2026 Cybersecurity Awareness Hub**! We welcome improvements to the threat intelligence modules, interactive simulators, UI components, and documentation.

---

## Getting Started

### Prerequisites

- **Node.js**: Version 18.x or 20.x or higher
- **npm**: Version 9.x or higher

### Local Development Setup

1. Fork and clone the repository:
   ```bash
   git clone https://github.com/arthemisz/Cybersecurity_Awareness_Month_DigitalNewsletter.git
   cd Cybersecurity_Awareness_Month_DigitalNewsletter
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

4. Verify production build:
   ```bash
   npm run build
   npm run preview
   ```

---

## Code Guidelines & Standards

- **React & JSX**: Use functional components with hooks. Keep components modular and focused in `src/components/`.
- **Styling**: Use Tailwind CSS utility classes following the existing Godly.website-inspired aesthetic (dark slate surfaces, 1px hairline borders, subtle glow highlights).
- **Icons**: Use [Lucide React](https://lucide.dev/) icons for visual indicators.
- **Git Commit Messages**: Write clear, imperative commit messages (e.g. `feat: add biometric simulator`, `fix: header inspector parsing`).

---

## Submitting a Pull Request

1. Create a descriptive feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Commit your changes with concise commit messages.
3. Push your branch to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
4. Open a Pull Request against the `master` branch.
5. Provide a summary of changes, motivation, and screenshots or video clips if UI elements were modified.

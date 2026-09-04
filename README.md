# AppCatalyst Studio

**AppCatalyst Studio** is an AI-powered development environment and project workspace designed for building, editing, and previewing web applications in real time.

---

## ✨ Features

- **AI-Powered Code Assistant**: Chat interface with live stream parsing, step-by-step reasoning, file generation, and granular event tracking.
- **Interactive Code Workspace**: Integrated file explorer, multi-tab code editor with CodeMirror syntax highlighting, and live diffs.
- **Live Preview & Runtime Catcher**: Instant interactive sandbox preview with an integrated runtime error interceptor and automated one-click error fixes.
- **Project Dashboard**: Organize, manage, rename, and download projects as ZIP archives.
- **Team Collaboration**: Granular role-based access control (Owner, Editor, Viewer) and project sharing.
- **Modern UI & Dark Theme**: Built with Radix UI primitives, Tailwind CSS, and polished micro-interactions.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Radix UI](https://www.radix-ui.com/) (shadcn/ui)
- **Code Editor**: [@uiw/react-codemirror](https://uiwjs.github.io/react-codemirror/)
- **State & Data**: [TanStack Query](https://tanstack.com/query/latest)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: [Vitest](https://vitest.dev/) + React Testing Library

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or later) and **npm** or **bun** installed on your system.

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-org/appcatalyst-studio.git
   cd appcatalyst-studio
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Start the development server:
   ```sh
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite development server |
| `npm run build` | Builds the production bundle |
| `npm run build:dev` | Builds the application in development mode |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs ESLint to check code quality |
| `npm run test` | Runs test suite via Vitest |
| `npm run test:watch` | Runs Vitest in watch mode |

---

## 📄 License

This project is proprietary and confidential to AppCatalyst Studio.

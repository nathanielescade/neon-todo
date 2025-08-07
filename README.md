<<<<<<< HEAD
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
=======
# 🌈 NeonTodo - Vibrant Task Manager

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)

A stunningly colorful todo app with powerful features, built with Next.js, TypeScript, and Tailwind CSS. This app combines a vibrant neon theme with professional-grade functionality to create a task management experience that stands out.

## ✨ Features

- 🎨 **Multiple Vibrant Themes**: Choose from Neon Purple, Sunset Orange, Forest Green, and Ocean Blue themes
- 🔐 **Authentication System**: Secure login and registration with session management
- 📝 **Advanced Task Management**:
  - Create, read, update, and delete tasks
  - Set priorities (Low, Medium, High, Urgent)
  - Organize tasks with categories and tags
  - Set due dates
  - Add detailed descriptions
  - Mark tasks as complete
- 🔍 **Powerful Filtering**: Filter tasks by category, priority, status, and search terms
- 📊 **Statistics Dashboard**: Visualize your task metrics with colorful stats cards
- 💾 **Local Storage**: All data is saved in your browser for persistence
- ✨ **Smooth Animations**: Enjoy a native app-like experience with transitions and micro-interactions
- 📱 **Responsive Design**: Works beautifully on all devices
- 🎯 **Drag and Drop**: Reorder tasks by dragging them (basic implementation)

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nathanielescade/neon-todo.git
   cd neon-todo


**Install dependencies:**

npm install
# or
yarn install
Run the development server:

npm run dev
# or
yarn dev
Open http://localhost:3000 in your browser.

**Project Structure**

neon-todo/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── auth/
│   │   └── Login.tsx
│   └── dashboard/
│       ├── Dashboard.tsx
│       ├── FilterBar.tsx
│       ├── Header.tsx
│       ├── Stats.tsx
│       ├── TodoForm.tsx
│       ├── TodoItem.tsx
│       └── TodoList.tsx
├── context/
│   ├── AuthContext.tsx
│   ├── ThemeContext.tsx
│   └── TodoContext.tsx
├── public/
│   └── favicon.ico
├── .gitignore
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
🎨 Themes
The app comes with four vibrant themes:

Neon Purple: A vibrant purple and cyan theme
Sunset Orange: Warm orange and yellow tones
Forest Green: Fresh green and lime colors
Ocean Blue: Cool blue and teal shades
Switch themes instantly from the header to match your mood!

🛠️ Technologies Used
Next.js: React framework for production
TypeScript: Type-safe JavaScript
Tailwind CSS: Utility-first CSS framework
React Context: State management
LocalStorage: Client-side data persistence
🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
📝 License
This project is licensed under the MIT License - see the LICENSE file for details.

🙏 Acknowledgments
Inspired by the need for a colorful, feature-rich todo app
Built with love for vibrant design and smooth user experiences
Made with ❤️ by Nathaniel Escade

35

### Final Steps

1. **Add Favicon:**
   - Create a simple neon-themed favicon and place it in `public/favicon.ico`

2. **Update package.json:**
```json
{
  "name": "neon-todo",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "next": "13.4.19",
    "react": "18.2.0",
    "react-dom": "18.2.0"
  },
  "devDependencies": {
    "@types/node": "20.5.9",
    "@types/react": "18.2.21",
    "@types/react-dom": "18.2.7",
    "autoprefixer": "10.4.15",
    "eslint": "8.48.0",
    "eslint-config-next": "13.4.19",
    "postcss": "8.4.29",
    "tailwindcss": "3.3.3",
    "typescript": "5.2.2"
  }
}
Commit and Push:
git add .
git commit -m "Add project files and documentation"
git push origin main
>>>>>>> 9397af99404dcff31e7ca6326a05fecf30840d1b

# Portfolio

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Showcases projects, skills, and contact information with smooth navigation and interactive UI elements.

## Features

- Responsive design for all devices
- Animated navigation bar with smooth scrolling to sections
- Projects showcase with interactive previews
- Skills orbiting animation
- Contact form with email integration (EmailJS)
- 3D astronaut and parallax backgrounds
- Built using React, Vite, and Tailwind CSS

## Folder Structure

```
PortWeb/
├── public/
│   └── assets/           # Images, logos, and static files
├── src/
│   ├── components/       # Reusable React components
│   ├── constants/        # Data/constants for the app
│   ├── sections/         # Main page sections (Hero, About, Projects, Contact, etc.)
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Getting Started

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd Portfolio
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Run the development server:**
   ```sh
   npm run dev
   ```
4. **Open in browser:**
   Visit `http://localhost:5173` (or the port shown in your terminal).

## Customization

- Update your personal info, skills, and projects in the `src/constants` and `src/sections` folders.
- Replace images/logos in `public/assets` as needed.
- Adjust styles in `src/index.css` or Tailwind config.

## Deployment

You can deploy this site to Vercel, Netlify, or any static hosting provider. To build for production:

```sh
npm run build
```

The output will be in the `dist/` folder.

**Made with ❤️ by Aadil Salman Butt**

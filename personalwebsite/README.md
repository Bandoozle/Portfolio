# Marco Areliano Suteja - Portfolio Website

A modern, cinematic portfolio website showcasing AI, Machine Learning, and Full-Stack Development projects.

## ✨ Features

- **Stunning Design**: Glassmorphism, gradients, and smooth animations inspired by premium design aesthetics
- **Fully Responsive**: Mobile-first design that looks great on all devices
- **Interactive Animations**: Powered by Framer Motion for smooth page transitions and element animations
- **Modern Tech Stack**: Built with React, Vite, Tailwind CSS v4, and TypeScript
- **SEO Optimized**: Complete meta tags and semantic HTML for better search engine visibility
- **Custom Cursor Glow**: Interactive lighting effect that follows the cursor
- **Dark Mode**: Beautiful dark theme with orange and teal accent colors

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Fonts**: Inter (Google Fonts)

## 📂 Project Structure

```
personalwebsite/
├── public/
│   ├── favicon.svg          # Custom MS logo favicon
│   └── resume.pdf           # Downloadable resume
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── CursorGlow.tsx
│   │   ├── Footer.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Navbar.tsx
│   │   ├── Stats.tsx
│   │   └── Timeline.tsx
│   ├── sections/            # Page sections
│   │   ├── About.tsx
│   │   ├── Contact.tsx
│   │   ├── Experience.tsx
│   │   ├── Hero.tsx
│   │   └── Projects.tsx
│   ├── App.tsx              # Main app component
│   ├── index.css            # Global styles & Tailwind config
│   └── main.tsx             # App entry point
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd personalwebsite
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready to deploy.

## 🎨 Customization

### Colors

The color scheme is defined in `src/index.css` using CSS variables in the `@theme` block. Main colors:
- **Primary**: Orange (#f97316) - Used for CTAs and accents
- **Accent**: Teal (#14b8a6) - Secondary accent color

### Content

Update the following files to customize content:
- `src/sections/Hero.tsx` - Hero section headline and introduction
- `src/sections/About.tsx` - Skills, stats, and tech stack
- `src/sections/Projects.tsx` - Project portfolio items
- `src/sections/Experience.tsx` - Work experience and education
- `src/sections/Contact.tsx` - Contact information and form

### Resume

Replace `public/resume.pdf` with your actual resume PDF file.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

### Other Platforms

The built files are static and can be deployed to:
- Netlify
- GitHub Pages
- AWS S3 + CloudFront
- Any static hosting service

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🎯 Performance

- **Fast Load Times**: Optimized assets and code splitting
- **Smooth Animations**: 60fps animations with Framer Motion
- **Optimized Images**: Lazy loading and proper sizing
- **SEO Ready**: Complete meta tags and semantic HTML

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 👤 Author

**Marco Areliano Suteja**
- Portfolio: [Your Website]
- LinkedIn: [Your LinkedIn]
- GitHub: [Your GitHub]

---

Built with ❤️ using React, Vite, and Tailwind CSS


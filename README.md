# LuminexClientFrontend

A modern, responsive client area frontend template built with Remix, TypeScript, and Tailwind CSS. This template provides a complete foundation for building beautiful dashboard applications, admin panels, and client portals.

## ✨ Features

- **Modern Tech Stack**: Built with Remix, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with beautiful layouts on all devices
- **Dark Theme**: Professional dark theme with glass morphism effects
- **Smooth Animations**: Powered by Framer Motion for delightful user interactions
- **Component Library**: Comprehensive set of reusable UI components
- **TypeScript**: Full type safety throughout the application
- **Performance Optimized**: Fast loading times and efficient rendering
- **Accessible**: Built with accessibility best practices using Radix UI

## 🚀 Quick Start

### Prerequisites

- Node.js 20.0.0 or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Nlxe/LuminexClientFrontend.git
cd LuminexClient
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm run typecheck` - Run TypeScript type checking
- `npm run lint` - Run ESLint

### Development Server

The development server runs on `http://localhost:5173` by default. The server supports:
- Hot module replacement (HMR)
- TypeScript compilation
- Automatic browser refresh

## 📁 Project Structure

```
app/
├── components/           # Reusable UI components
│   ├── ui/              # Base UI components (buttons, cards, etc.)
│   ├── dashboard/       # Dashboard-specific components
│   ├── auth/           # Authentication components
│   ├── services/       # Services management components
│   ├── invoices/       # Invoice management components
│   ├── tickets/        # Support ticket components
│   └── settings/       # Settings page components
├── lib/                # Utility functions and configurations
│   ├── data/           # Mock data and types
│   ├── types/          # TypeScript type definitions
│   └── utils.ts        # Utility functions
├── routes/             # Remix routes (pages)
├── styles/             # Global styles and Tailwind config
└── root.tsx           # Root application component
```

## 🎨 Design System

### Color Palette
The template uses a carefully crafted dark theme with:
- **Primary**: Blue gradient (#3B82F6 to #8B5CF6)
- **Background**: Dark grays with proper contrast ratios
- **Accent**: Subtle glass morphism effects
- **Text**: High contrast for accessibility

### Typography
- **Font Family**: System font stack for optimal performance
- **Scale**: Consistent typography scale using Tailwind CSS
- **Weights**: Regular (400), Medium (500), Semibold (600), Bold (700)

### Components
All components are built with:
- Consistent spacing using Tailwind's spacing scale
- Proper focus states for accessibility
- Hover and active states for better UX
- Responsive design patterns

## 🧩 Key Components

### Dashboard Components
- **StatsCard**: Display key metrics with trend indicators
- **QuickActions**: Action buttons for common tasks
- **RecentActivity**: Timeline of recent user actions
- **PageHeader**: Consistent page headers with descriptions

### UI Components
- **Button**: Multiple variants (primary, secondary, outline, ghost)
- **Card**: Container component with header, content, and footer
- **Input**: Form input with validation states
- **Modal**: Accessible modal dialogs
- **Navigation**: Responsive navigation with mobile support

### Layout Components
- **DashboardLayout**: Main dashboard layout with sidebar and topbar
- **AuthLayout**: Authentication pages layout
- **Layout**: Public pages layout

## 🔧 Technologies Used

### Core Framework
- **[Remix](https://remix.run/)** - Full-stack web framework with server-side rendering
- **[React 18](https://react.dev/)** - UI library with concurrent features
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript

### Styling & UI
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Development Tools
- **[Vite](https://vitejs.dev/)** - Fast build tool and dev server
- **[ESLint](https://eslint.org/)** - Code linting
- **[PostCSS](https://postcss.org/)** - CSS processing
- **[Autoprefixer](https://autoprefixer.github.io/)** - CSS vendor prefixing

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

This creates a `build/` directory with:
- `build/server/` - Server-side code
- `build/client/` - Client-side assets

### Deployment Options

#### Remix App Server (Recommended)
```bash
npm start
```

#### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY build ./build
EXPOSE 3000
CMD ["npm", "start"]
```

#### Popular Platforms
- **Vercel**: Deploy with zero configuration
- **Netlify**: Full-stack deployment support
- **Railway**: Simple deployment with automatic builds
- **Fly.io**: Global deployment platform

## 🎯 Customization

### Theming
The template uses CSS variables for easy theming. Modify `app/styles/globals.css`:

```css
:root {
  --background: 222.2 84% 4.9%;
  --foreground: 210 40% 98%;
  --primary: 217.2 91.2% 59.8%;
  /* ... other variables */
}
```

### Adding New Pages
1. Create a new route file in `app/routes/`
2. Add the route to navigation in `app/components/dashboard/sidebar.tsx`
3. Create page components in `app/components/`

### Modifying Components
All components are located in `app/components/` and can be easily customized:
- Modify styling by updating Tailwind classes
- Add new props for additional functionality
- Extend existing components for specific use cases

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help getting started:
- Check the [Issues](https://github.com/Nlxe/LuminexClientFrontend/issues) page
- Create a new issue for bugs or feature requests
- Review the code for implementation examples

---

**Built with ❤️ using modern web technologies**

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever css framework you prefer. See the [Vite docs on css](https://vitejs.dev/guide/features.html#css) for more information.

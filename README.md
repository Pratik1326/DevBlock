# DevBlocks - SaaS Tool Builder

A modern, drag-and-drop SaaS application builder built with Next.js 14, React 18, and TypeScript.

## 🚀 Features

- **Drag & Drop Builder**: Intuitive canvas-based interface for building SaaS applications
- **Pre-built Templates**: Ready-to-use templates for common SaaS applications
- **Widget Library**: Rich collection of customizable widgets (text, buttons, forms, charts, tables)
- **Real-time Preview**: See changes instantly as you build
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Authentication System**: User registration, login, and profile management
- **Project Management**: Save, load, and manage multiple projects
- **Dark Mode**: Beautiful dark/light theme support

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, CSS Modules
- **State Management**: Zustand
- **UI Components**: Custom components with Radix UI primitives
- **Authentication**: Local storage-based auth system
- **Deployment**: Vercel-ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Pratik1326/DevBlock.git
   cd DevBlock
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Demo Accounts

For quick testing, use these demo accounts:
- **Email**: `john@example.com` | **Password**: `demo123`
- **Email**: `sarah@example.com` | **Password**: `demo123`

## 🏗️ Project Structure

```
DevBlock/
├── app/                    # Next.js App Router pages
│   ├── auth/              # Authentication pages
│   ├── builder/           # Main builder interface
│   ├── dashboard/         # User dashboard
│   ├── templates/         # Template gallery
│   ├── profile/           # User profile
│   └── billing/           # Billing pages
├── components/            # Reusable React components
│   ├── canvas.tsx        # Main builder canvas
│   ├── navigation.tsx    # Navigation component
│   ├── auth-guard.tsx    # Authentication guard
│   └── loading.tsx       # Loading components
├── lib/                   # Utilities and store
│   └── store.ts          # Zustand state management
└── public/               # Static assets
```

## 🎨 Available Widgets

- **Text Widget**: Headers, paragraphs, labels
- **Button Widget**: Call-to-action buttons
- **Input Widget**: Form inputs, text areas
- **Table Widget**: Data tables with sorting
- **Chart Widget**: Data visualization
- **Todo Widget**: Task management

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Deploy automatically

2. **Environment Variables**
   - No environment variables required for basic functionality

3. **Custom Domain** (Optional)
   - Add your custom domain in Vercel dashboard

### Deploy to Other Platforms

The app is compatible with:
- **Netlify**: Use `npm run build` and deploy the `out` folder
- **Railway**: Direct deployment from GitHub
- **Heroku**: Use the Node.js buildpack

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Adding New Widgets

1. Create widget component in `components/widgets/`
2. Add widget type to store types
3. Update canvas rendering logic
4. Add to widget sidebar

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop (1200px+)
- Tablet (768px - 1199px)
- Mobile (320px - 767px)

## 🎯 Key Features

### Builder Interface
- Drag and drop widgets onto canvas
- Resize and reposition widgets
- Real-time property editing
- Keyboard shortcuts (Delete, Ctrl+Z, etc.)

### Template System
- Pre-built templates for common use cases
- Customizable template widgets
- One-click template application

### Project Management
- Save projects locally
- Load existing projects
- Project metadata tracking
- Recent projects list

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- State management with [Zustand](https://zustand-demo.pmnd.rs/)
- Icons from [Lucide React](https://lucide.dev/)

## 📞 Support

If you have any questions or need help:
- Create an issue on GitHub
- Contact: pratik1326@gmail.com

---

**Made with ❤️ by Pratik1326** 
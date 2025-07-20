# SaaS Tool Builder

A modern, drag-and-drop web application builder that allows users to create beautiful web apps without writing code. Built with Next.js, TypeScript, Tailwind CSS, and Framer Motion.

## 🚀 Features

### Core Functionality
- **Drag & Drop Builder**: Intuitive visual builder with real-time preview
- **Widget Library**: Text, Input, Button, Table, Chart, and To-Do widgets
- **Template System**: Pre-built templates for CRM, Budget Tracker, and To-Do apps
- **Real-time Preview**: Toggle between edit and preview modes
- **Properties Panel**: Customize widget appearance and behavior
- **Responsive Design**: Works on desktop and mobile devices

### User Experience
- **Modern UI**: Clean, professional interface with dark/light theme support
- **Smooth Animations**: Framer Motion powered transitions and interactions
- **Intuitive Navigation**: Easy-to-use interface for non-technical users
- **Export Options**: Save projects as JSON or export as images

### Authentication & Storage
- **User Accounts**: Optional login for saving and accessing projects
- **Project Management**: View, edit, and delete saved projects
- **Local Storage**: Projects persist in browser storage
- **Firebase Integration**: Ready for cloud storage and authentication

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: Zustand with persistence
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Authentication**: Firebase Auth (configured)
- **Database**: Firestore (configured)
- **Deployment**: Vercel ready

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd saas-tool-builder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎯 Usage

### Getting Started
1. **Landing Page**: Visit the homepage to see the builder overview
2. **Start Building**: Click "Start from Blank" or "Use Template"
3. **Add Widgets**: Drag widgets from the sidebar to the canvas
4. **Customize**: Select widgets to edit their properties
5. **Preview**: Toggle preview mode to see the final result
6. **Save**: Login to save your projects for later access

### Widget Types
- **Text**: Display static text content with customizable styling
- **Input**: Text input fields with placeholder and validation
- **Button**: Clickable buttons with custom colors and text
- **Table**: Data tables with sortable columns
- **Chart**: Simple bar charts for data visualization
- **To-Do**: Task lists with checkboxes

### Templates
- **To-Do App**: Complete task management application
- **CRM Dashboard**: Customer relationship management interface
- **Budget Tracker**: Personal finance and expense tracking

## 🏗️ Project Structure

```
├── app/                    # Next.js app directory
│   ├── auth/              # Authentication pages
│   ├── builder/           # Main builder interface
│   ├── dashboard/         # User project management
│   ├── templates/         # Template selection
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Landing page
├── components/            # React components
│   ├── ui/               # Reusable UI components
│   ├── widgets/          # Widget implementations
│   ├── canvas.tsx        # Main canvas component
│   ├── properties-panel.tsx
│   ├── theme-toggle.tsx
│   └── widget-sidebar.tsx
├── lib/                  # Utilities and configurations
│   ├── firebase.ts       # Firebase configuration
│   ├── store.ts          # Zustand state management
│   ├── templates.ts      # Pre-built templates
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project
2. Enable Authentication (Email/Password and Google)
3. Enable Firestore Database
4. Add your Firebase config to environment variables

### Customization
- **Themes**: Modify `tailwind.config.js` for custom colors
- **Widgets**: Add new widgets in `components/widgets/`
- **Templates**: Create templates in `lib/templates.ts`
- **Styling**: Update `app/globals.css` for global styles

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms
- **Netlify**: Build command: `npm run build`
- **Railway**: Add build script to package.json
- **Docker**: Use multi-stage build for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Tailwind CSS](https://tailwindcss.com/) for utility-first styling
- [Lucide](https://lucide.dev/) for beautiful icons

## 📞 Support

For support, email support@saasbuilder.com or create an issue in the repository.

---

Built with ❤️ using Next.js and TypeScript 
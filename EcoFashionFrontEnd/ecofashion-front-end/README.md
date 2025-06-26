# EcoFashion Frontend

Modern React application for sustainable fashion platform.

## Features

- 🌱 **Modern UI/UX** with Material-UI
- 🔐 **Authentication System** with JWT
- 🔄 **API Integration** with ASP.NET Core backend
- 📱 **Responsive Design** for all devices
- 🎨 **Beautiful Gradients** and animations

## Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Library**: Material-UI (MUI)
- **Routing**: React Router DOM
- **Form Validation**: Formik + Yup
- **Notifications**: React Toastify
- **Authentication**: JWT + Google OAuth (Firebase)

## Project Structure

```
src/
├── components/         # Reusable components
│   ├── Navigation.tsx     # Top navigation bar
│   └── ProtectedRoute.tsx # Route protection
├── pages/             # Page components
│   ├── Homepages.tsx     # Landing page
│   ├── Login.tsx         # Login form
│   ├── Register.tsx      # Registration form
│   └── admin/
│       └── Dashboard.tsx # Admin dashboard
├── services/          # API and auth services
│   ├── apiService.ts     # API client
│   ├── AuthContext.tsx   # Authentication context
│   └── firebase.ts      # Firebase config
└── App.tsx           # Main app component
```

## Environment Variables

Create `.env.local` for Firebase configuration (optional):

```
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## License

MIT License

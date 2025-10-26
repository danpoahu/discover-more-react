# Discover More - Anchor Church

A React web application for discovering spiritual gifts and personality types through surveys.

## Features

- User authentication with Firebase
- DISC Personality Assessment (20 questions)
- Spiritual Gifts Survey (72 questions covering 24 gifts)
- Personalized dashboard with Top 3 Spiritual Gifts
- Survey results and analysis
- User profile management
- Resources section
- Admin console for authorized users

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Firebase

Edit `src/firebase.js` and replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

You can find these values in your Firebase Console:
1. Go to Project Settings
2. Scroll down to "Your apps"
3. Select your web app or create a new one
4. Copy the configuration

### 3. Firestore Database Structure

Your Firestore database should have a `users` collection with documents structured like:

```javascript
{
  Name: "User Name",
  email: "user@example.com",
  Team: "AdminX", // or other team name, "AdminX" for admin access
  latestSGResponses: [1, 2, 3, ...], // Array of 72 integers (spiritual gifts survey)
  latestDISCResponses: [1, 2, 3, ...], // Array of 20 integers (DISC survey)
  // ... other user data
}
```

### 4. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## Deployment

### Firebase Hosting

```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

### Other Hosting Options

The built files in the `dist` folder can be deployed to any static hosting service:
- Vercel
- Netlify
- AWS S3
- GitHub Pages

## Project Structure

```
src/
├── components/         # React components
│   ├── Login.jsx      # Login page
│   ├── Dashboard.jsx  # Main dashboard with Top 3 Gifts
│   ├── Surveys.jsx    # Survey taking page (to be implemented)
│   ├── Results.jsx    # Survey results page (to be implemented)
│   ├── Profile.jsx    # User profile page (to be implemented)
│   ├── Resources.jsx  # Resources page (to be implemented)
│   ├── Admin.jsx      # Admin console (to be implemented)
│   └── GiftDetail.jsx # Individual gift details
├── data/
│   └── spiritualGifts.js  # 24 spiritual gifts data and scoring logic
├── firebase.js        # Firebase configuration
├── App.jsx           # Main app with routing
└── main.jsx          # Entry point
```

## Color Scheme

- Primary Green: `#5AB963`
- Accent Orange: `#FF8C42`
- Dark Blue: `#1E3A5F`
- Background: `#F5F5F0`

## Technology Stack

- React 18
- Vite
- React Router
- Firebase (Auth & Firestore)
- Tailwind CSS

## License

Copyright © Anchor Church. All rights reserved.

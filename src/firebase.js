import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNqa6JHHe2yuriloiCA_yjzzBAf0KQmbY",
  authDomain: "dm-auth-65cc4.firebaseapp.com",
  databaseURL: "https://dm-auth-65cc4-default-rtdb.firebaseio.com",
  projectId: "dm-auth-65cc4",
  storageBucket: "dm-auth-65cc4.appspot.com",
  messagingSenderId: "331110328467",
  appId: "1:331110328467:web:060b48abefdff486330566",
  measurementId: "G-4NV8SB33ME"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (optional)
export const analytics = getAnalytics(app);

export default app;

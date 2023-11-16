import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Your web app's Firebase configuration - Copied from FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyBGnqwsY-hjaNQi9AomheVARiJ5IoCvyRw",

  authDomain: "listedassignment-62fcf.firebaseapp.com",

  projectId: "listedassignment-62fcf",

  storageBucket: "listedassignment-62fcf.appspot.com",

  messagingSenderId: "970823432142",

  appId: "1:970823432142:web:f3831f03ca74e427a3dd9f",

  measurementId: "G-4PLNBZV10K"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };

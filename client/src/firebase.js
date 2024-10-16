// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-29da6.firebaseapp.com",
  projectId: "mern-blog-29da6",
  storageBucket: "mern-blog-29da6.appspot.com",
  messagingSenderId: "350004006816",
  appId: "1:350004006816:web:aa38d82b77bbc45dec1ec5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
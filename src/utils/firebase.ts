// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCxwr97kiVA27g-fWdKTP0dG4h5O5VjDQ8",
  authDomain: "netflixgpt-a6c21.firebaseapp.com",
  projectId: "netflixgpt-a6c21",
  storageBucket: "netflixgpt-a6c21.firebasestorage.app",
  messagingSenderId: "853624842531",
  appId: "1:853624842531:web:7d8bf8e363bda262f34496",
  measurementId: "G-V0DZ399C9F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();

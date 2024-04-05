// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjwJRZnT9uvzNUilf715WJ811HwZf1zJU",
  authDomain: "test-7f575.firebaseapp.com",
  projectId: "test-7f575",
  storageBucket: "test-7f575.appspot.com",
  messagingSenderId: "905488691374",
  appId: "1:905488691374:web:96151fe6f8fb62c0223d3f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


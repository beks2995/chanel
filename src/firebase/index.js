// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDi1XOZpuc5mnR6PUuwl5X0xs1fBqYlwog",
  authDomain: "chanel-eb453.firebaseapp.com",
  projectId: "chanel-eb453",
  storageBucket: "chanel-eb453.appspot.com",
  messagingSenderId: "988373950822",
  appId: "1:988373950822:web:61093b7b0ef8db6e64e8a7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);


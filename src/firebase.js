// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCx7Rnae7mUOGJnBVyWwwQsws98EQ-a2Eo",
  authDomain: "react-disney-plus-app-2ba3e.firebaseapp.com",
  projectId: "react-disney-plus-app-2ba3e",
  storageBucket: "react-disney-plus-app-2ba3e.appspot.com",
  messagingSenderId: "249334629313",
  appId: "1:249334629313:web:9275255e247b5aed002540"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app
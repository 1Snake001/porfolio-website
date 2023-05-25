// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getFirestore } from  "https://www.gstatic.com/firebasejs/9.1.1/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxAmUiCNm4p2nKa9AHjvS1wnlruyLuOko",
  authDomain: "portfolio-a223d.firebaseapp.com",
  projectId: "portfolio-a223d",
  storageBucket: "portfolio-a223d.appspot.com",
  messagingSenderId: "755663767482",
  appId: "1:755663767482:web:b803c30b5c33a3eb6c7f83"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth ,  createUserWithEmailAndPassword,signInWithEmailAndPassword ,onAuthStateChanged   } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore , doc , setDoc , getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB2wollOFBtiFA2OvcMYoFVyhL95G5I2bk",
    authDomain: "facebook-4a76a.firebaseapp.com",
    projectId: "facebook-4a76a",
    storageBucket: "facebook-4a76a.appspot.com",
    messagingSenderId: "909723182256",
    appId: "1:909723182256:web:4c689450de9742a6f40775"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {
    app,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    db,
    doc,
    setDoc,
    getDoc,
}
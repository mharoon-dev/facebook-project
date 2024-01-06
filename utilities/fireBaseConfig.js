import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { 
  getAuth,  
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged, 
  sendPasswordResetEmail,
  signOut    
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { 
  getFirestore, 
  collection, 
  addDoc, 
  setDoc, 
  doc, 
  getDoc, 
  getDocs,
  deleteDoc, 
  query, 
  where,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  ref,
  getStorage,
  getDownloadURL,
  uploadBytes,
  uploadBytesResumable
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";


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
const storage = getStorage(app);


export {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  db,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  getDocs,
  where,
  query,
  deleteDoc,
  storage,
  uploadBytes,
  signOut,
  ref,
  uploadBytesResumable,
  getDownloadURL,
}
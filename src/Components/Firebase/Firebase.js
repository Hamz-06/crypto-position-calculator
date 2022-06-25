// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDp8Yn2z7WsPJVaICzzwKLctyw1rb1oi3k",
  authDomain: "crytotracker-2a85b.firebaseapp.com",
  projectId: "crytotracker-2a85b",
  storageBucket: "crytotracker-2a85b.appspot.com",
  messagingSenderId: "861000309447",
  appId: "1:861000309447:web:c97953566139440fcbfce2",
  measurementId: "G-M228LWPC2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = firebase.getAnalytics(app);
const db = getFirestore();
const auth = getAuth(app)

export {db,auth};
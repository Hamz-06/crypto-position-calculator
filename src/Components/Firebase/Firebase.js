// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey:`${process.env.REACT_APP_APIKEY}`,
  authDomain:`${process.env.REACT_APP_APIAUTHDOM}`,
  projectId: `${process.env.REACT_APP_PROJID}`,
  storageBucket: `${process.env.REACT_APP_STORBUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGESENDER}`,
  appId: `${process.env.REACT_APP_APPID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENTID}`
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// const analytics = firebase.getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
getAnalytics(app);

export {db,auth};
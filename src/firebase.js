// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore, doc} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuiEr46d-ehypzd4CDfCje0yDFPTIpRSY",
  authDomain: "scaffold-app-594e2.firebaseapp.com",
  projectId: "scaffold-app-594e2",
  storageBucket: "scaffold-app-594e2.appspot.com",
  messagingSenderId: "588834299872",
  appId: "1:588834299872:web:e71ae5f0d2abedcdae9585",
  measurementId: "G-W54VCTTXMD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY, 
  authDomain:process.env.REACT_APP_FIREBASE_DOMAIN,
  projectId:"react-ecommerce-d30c9",
  storageBucket:"react-ecommerce-d30c9.appspot.com",
  messagingSenderId: "459037463945",
  appId: "1:459037463945:web:fa9653913525314e533d58"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
//2kings 8 26
//2 chronicle22 2
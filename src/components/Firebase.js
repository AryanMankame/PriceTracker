import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyA0T1n8I69dFSO1qO-lsmF0rQ6nLniQrnk",
    authDomain: "pricetracker-a372a.firebaseapp.com",
    projectId: "pricetracker-a372a",
    storageBucket: "pricetracker-a372a.appspot.com",
    messagingSenderId: "712555779795",
    appId: "1:712555779795:web:ffe5bea410e7891bba2626",
    measurementId: "G-5V2NBGLZ0M"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
const provider = new GoogleAuthProvider();
export {auth,provider};
export default db;

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
import { getAuth } from "firebase/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC48W3KZKVqxxLNSvVNQvFsOcxFHKwany8",
  authDomain: "moviesdatabase-bec96.firebaseapp.com",
  projectId: "moviesdatabase-bec96",
  storageBucket: "moviesdatabase-bec96.appspot.com",
  messagingSenderId: "235595577187",
  appId: "1:235595577187:web:563a0941e17c6817cbc556"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)
export const storage = getStorage(app)
export const auth = getAuth(app)
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBa9S6wW3F8Myhg4LsVIXRWDpgSjRruOZ4",
  authDomain: "video-f91ed.firebaseapp.com",
  projectId: "video-f91ed",
  storageBucket: "video-f91ed.appspot.com",
  messagingSenderId: "877479175283",
  appId: "1:877479175283:web:28c0d28a45ca56aa46b606"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const provider = new GoogleAuthProvider()
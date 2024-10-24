// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAzGJDPTVIHWmQKCX3ycm9LRfSBNbUizUk",
    authDomain: "blog-project-ae16f.firebaseapp.com",
    projectId: "blog-project-ae16f",
    storageBucket: "blog-project-ae16f.appspot.com",
    messagingSenderId: "858145237500",
    appId: "1:858145237500:web:952458fbe8de6c6d862a79"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
const auth = getAuth(app);

// Custom function to handle Google sign-in
const signInWithGoogle = () => {
    return signInWithPopup(auth, provider);
};

// Export everything needed
export { app, auth, provider, signInWithGoogle };

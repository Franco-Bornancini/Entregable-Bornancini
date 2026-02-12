// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDu378lhY8uL_hhhf3BVxKCQxBTuxYUGPY",
    authDomain: "cm88140-c5820.firebaseapp.com",
    projectId: "cm88140-c5820",
    storageBucket: "cm88140-c5820.firebasestorage.app",
    messagingSenderId: "852854475505",
    appId: "1:852854475505:web:534e2201e8cb1d2a433750"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { app, db };
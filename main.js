// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-analytics.js";
import { getFirestore, initializeFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
apiKey: "AIzaSyDZvbbf31nPviwSnNv63FRU7fk36__Pz_s",
authDomain: "fir-auth-38ff3.firebaseapp.com",
projectId: "fir-auth-38ff3",
storageBucket: "fir-auth-38ff3.appspot.com",
messagingSenderId: "1012232139925",
appId: "1:1012232139925:web:5deeb3feb69961f463979c",
measurementId: "G-NKFGCCTMS2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Reference to authorization service
export const auth = getAuth();
// Initializes a firestore connection
export const firestoreDb = initializeFirestore(app, { timestampsInSnapshots: true })
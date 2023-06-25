import { auth, firestoreDb } from '../main.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { setupGuides } from './index.js';
// Get data


// Listen for auth status changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log('user logged in: ', user);
        getDocs(collection(firestoreDb, 'guides')).then((snapshot) => {
            setupGuides(user, snapshot.docs)
        });
    } else {
        setupGuides(user, []);
    }
})


// Signing up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const modal = document.querySelector("#modal-signup");
        // Close the sign up form and reset the form
        M.Modal.getInstance(modal).close()
        signupForm.reset();
    });
})

// Logout
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut()
});

// Login
const loginForm = document.querySelector("#login-form");
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    signInWithEmailAndPassword(auth, email, password).then((cred) => {
        // Close the login modal and reset the form
        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close()
        loginForm.reset();
    })
})

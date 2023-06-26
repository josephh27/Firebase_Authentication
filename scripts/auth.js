import { auth, firestoreDb } from '../main.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";
import { collection, getDocs, addDoc, onSnapshot, doc, setDoc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { setupGuides, setupUI } from './index.js';
// Get data

// Listen for auth status changes
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log(user.uid);
        onSnapshot(collection(firestoreDb, 'guides'), (snapshot) => {
            setupGuides(user, snapshot.docs);
            setupUI(user);
        }, err => {
            console.log(err.message);
        });
    } else {
        setupUI();
        setupGuides(user, []);
    }
})

// Create new guide
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    addDoc(collection(firestoreDb, 'guides'), {
        title: createForm['title'].value,
        content: createForm['content'].value
    }).then(() => {
        const modal = document.querySelector("#modal-create");
        // Close the create guide form and reset the form
        M.Modal.getInstance(modal).close()
        createForm.reset();
    }).catch(err => {
        console.log(err.message);
    });

})

// Signing up
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
        const usersRef = doc(firestoreDb, 'users', userCredential.user.uid);
        return setDoc(usersRef, {bio: signupForm['signup-bio'].value});
    }).then(() => {
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
    }).catch((err) => {
        alert(err.message);
    })
})

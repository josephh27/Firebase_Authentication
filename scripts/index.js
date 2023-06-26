import { getDoc, doc } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { firestoreDb } from "../main.js";

const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');
const accountDetails = document.querySelector('.account-details');

export const setupUI = (user) => {
    if (user) { 
        getDoc(doc(firestoreDb, 'users', user.uid)).then(doc => {
            //Account info
            const html = `
            <div>Logged in as ${user.email}</div>
            <div>${doc.data().bio}</div>
            `;
            accountDetails.innerHTML = html;
        })
        
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    } else {
        // Hide account info
        accountDetails.innerHTML = '';
        // Toggle UI elements
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
    }
}



// Setup materialize components
document.addEventListener('DOMContentLoaded', () => {
    let modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);

    let items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
})

// Setup guides
const guideList = document.querySelector('.guides');
export const setupGuides = (user, data) => {
    if (data.length && user) {
        let html = '';
        data.forEach((doc) => {
            const guide = doc.data();
            const li = `
                <li>
                    <div class="collapsible-header grey lighten-4">${guide.title}</div>
                    <div class="collapsible-body white">${guide.content}</div>
                <li>
            `;
            html += li;
        });
        guideList.innerHTML = html;
    } else if (!data.length && user){
        guideList.innerHTML = '<h5 class="center">No data stored yet.</h5>';
    } else {
        guideList.innerHTML = '<h5 class="center">Please login to view guides.</h5>';
    }
    
}
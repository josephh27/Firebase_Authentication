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
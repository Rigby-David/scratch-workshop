import { createParticipant, getWorkshops, checkAuth, logout } from '../fetch-utils.js';

const from = document.getElementById('participant-form');
const logoutButton = document.getElementById('logout-button');

logoutButton.addEventListener('click', () => {
    logout();
});

from.addEventListener('submit', async (e) => {
    e.preventDefault;

    const data = new FormData(form);


});
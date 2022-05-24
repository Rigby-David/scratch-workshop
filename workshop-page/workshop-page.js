import { checkAuth, logout, getWorkshops, deleteParticipant } from '../fetch-utils.js';

checkAuth();

const logoutButton = document.getElementById('logout-button');
const workshopsEl = document.querySelector('.workshops-container');
const createButton = document.getElementById('create-button');

logoutButton.addEventListener('click', () => {
    logout();
});

createButton.addEventListener('click', () => {
    window.location.href = '../create.page';
});

async function displayParticipants() {
    //fetch workshops from supabase
    const workshops = await getWorkshops();
    // clear out the workshopEl 
    workshopsEl.textContent = '';
    //create three elements for each workshop, one for the workshop, one to hold the name, and one to hold the bunnies
    for (let workshop of workshops) {
        // HTML elements should look like this:
        // <div class="workshop"></div>
        const workshopDiv = document.createElement('div');
        workshopDiv.classList.add('workshop');
        // <h3>Underwater Basket Weaving</h3>
        // put the workshop name in the name element
        const h3 = document.createElement('h3');
        h3.textContent = workshop.name;
        // <div class="participants">
        // <div class="participant"></div>
        // <div class="participant"></div>
        const participantsDiv = document.createElement('div');
        participantsDiv.classList.add('participants');
        // add the participants css class to the participants el, and the workshop css class to the workshop el
        //  </div>
        //</div>
        // for each of this workshop's participants
        for (let participant of workshop.participants) {
            // make an element with the css class 'participant', and put the participants' name in the text content
            const participantDiv = document.createElement('div');
            participantDiv.classList.add('participant');
            participantDiv.textContent = participant.name;
            // add an event listener to the participant el. On click, delete the participant, then refetch and redisplay all workshops
            participantDiv.addEventListener('click', async () => {
                await deleteParticipant();
                displayParticipants();
            });
            // append this participantEl to the participantsEl
            participantsDiv.append(participantDiv);
        }
        // append the participantsEl and the nameEl to the workshopEl
        workshopDiv.append(participantsDiv, h3);
        // append the workshopEl to the workshopsEl
        workshopsEl.append(workshopDiv);
    }
}
displayParticipants();
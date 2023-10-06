const addButton = document.getElementById('add-button');
const findButton = document.getElementById('find-button');
const returnButton = document.getElementById('return-button');
const defaultList = document.getElementById('default-case');
const addCase = document.getElementById('add-case');
const findCase = document.getElementById('find-case');
const findTable = document.getElementById('find-table');

// view add options when add button clicked
addButton.addEventListener('click', () => {
    addButton.classList.add('selected');
    findButton.classList.remove('selected');
    returnButton.classList.remove('hidden');
    returnButton.classList.add('return-button')
    findCase.classList.add('hidden');
    defaultList.classList.add('hidden');
    addCase.classList.remove('hidden');
    addCase.classList.add('input');


});

// view serch options when find button clicked
findButton.addEventListener('click', () => {
    findButton.classList.add('selected');
    addButton.classList.remove('selected');
    addCase.classList.add('hidden');
    findCase.classList.remove('hidden');
    returnButton.classList.remove('hidden');
    returnButton.classList.add('return-button');

    defaultList.classList.add('hidden');
});

returnButton.addEventListener('click', () => {
    returnButton.classList.add('hidden');
    findButton.classList.remove('selected');
    addButton.classList.remove('selected');

    addCase.classList.add('hidden');
    findCase.classList.add('hidden');

    defaultList.classList.remove('hidden');
});


console.log('userID: ' + user_ID);
let contacts = []
function set_contacts() {
    // Replace 5 with the actual user ID you want to retrieve contacts for
    retrieve_contacts(user_ID)
        .then(data => {
            if (data) {
                // Handle the retrieved contacts here
                console.log(data); // Array of contact objects

                // Assign the retrieved contacts to the "contacts" variable
                contacts = data;

                console.log('contacts:' + JSON.stringify(contacts));
                // You can also load the contacts into the table here if needed
                loadContacts(contacts, 'contact-list-body'); // Load into the default table
            }
        })
        .catch(error => {
            console.error('An error occurred while retrieving contacts: ' + error);
        });
}
// Default list functionality

const contactListBody = document.getElementById('contact-list-body');
//const searchBar = document.getElementById('search-bar');

function loadContacts(contactArray, targetTableId) {
    const contactsToDisplay = contactArray || contacts;
    const targetTable = document.getElementById(targetTableId);

    if (contactsToDisplay.length === 0) {
        targetTable.innerHTML = '<tr><td colspan="4">You have no contacts saved in your list.</td></tr>';
    } else {
        targetTable.innerHTML = '';
        contactsToDisplay.forEach((contact, index) => {
            const contactRow = document.createElement('tr');

            // Create table cells for each piece of contact information
            const nameCell = document.createElement('td');
            nameCell.textContent = `${contact.first_name} ${contact.last_name}`;

            const phoneCell = document.createElement('td');
            phoneCell.textContent = contact.phone;

            const emailCell = document.createElement('td');
            emailCell.textContent = contact.email;

            const dateAddedCell = document.createElement('td');
            dateAddedCell.textContent = contact.date;

            // Append the cells to the row
            contactRow.appendChild(nameCell);
            contactRow.appendChild(phoneCell);
            contactRow.appendChild(emailCell);
            contactRow.appendChild(dateAddedCell);
            if(targetTableId === 'search-result-list-body'){
                const kebabCell = document.createElement('td');
                const kebabButton = document.createElement('kebab-button');
                kebabButton.classList.add('kebab-button');
                //editButton.textContent = 'Edit';
                editButton.setAttribute('type', 'button');
                editCell.appendChild(editButton);
                contactRow.appendChild(editCell);
            }

            // Add odd/even row class for alternating background colors
            if (index % 2 === 0) {
                contactRow.classList.add('odd');
            }

            // Append the row to the target table
            targetTable.appendChild(contactRow);
        });
    }
}

function contactMatch() {
    let searchBarInput = searchBar.value;
    let matchingContacts = [];
    if (searchBarInput.length > 2) {
        findTable.classList.remove('hidden');
        matchingContacts = contacts.filter(contact => {
            const fullName = `${contact.first_name} ${contact.last_name}`.toLowerCase();
            const email = contact.email.toLowerCase();
            const phone = contact.phone.toLowerCase();
            const searchInputLower = searchBarInput.toLowerCase();

            // Implement your matching logic here

            // For example, you can check if any of the fields contain the search input:
            return fullName.includes(searchInputLower) || email.includes(searchInputLower) || phone.includes(searchInputLower);
        });
        console.log(matchingContacts);
        // Now you have the `matchingContacts` array, and you can do something with it.

        // Load the matching contacts into the corresponding table
        loadContacts(matchingContacts, 'search-result-list-body');
    } else {
        findTable.classList.add('hidden');
        // If the search input is less than 3 characters, load the entire list into the default table
        loadContacts(null, 'contact-list-body');
    }
}

// Initial load of all contacts into the default table
loadContacts(null, 'contact-list-body');

// Add event listener to search bar for real-time matching
//searchBar.addEventListener('input', contactMatch);

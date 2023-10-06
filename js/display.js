import { searchInput, deleteContact } from "./search.js";

const jsonData = [
    { contact_id: 1, "first_name": "John", "last_name": "Doe", "email": "john@example.com", "phone": "1234567890", "date": new Date(2023, 0, 1, 12, 30)},
    { contact_id: 2, "first_name": "Jane", "last_name": "Smith", "email": "jane@example.com", "phone": "9876543210", "date": new Date(2023, 0, 2, 14, 15)},
];
function populateTable(data) {
    // const tableBody = document.getElementById('table-body');
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = ''; // Clear the table
    data.forEach(item => {
        // create row for each item
        const row = createTableRow(item);
        // add to table
        tableBody.appendChild(row);
    });
}

function createTableRow(item) {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    const emailCell = document.createElement('td');
    const phoneCell = document.createElement('td');
    const timeCell = document.createElement('td');
    const opsCell = document.createElement('td');

    nameCell.textContent = item.first_name + ' ' + item.last_name;
    emailCell.textContent = item.email;
    phoneCell.textContent = formatPhoneN(item.phone);
    timeCell.textContent = formatTime(item.date);
    // let format4 = 
    // console.log(format4); // 23-7-2022
    opsCell.appendChild(createDropdownMenu(item));

    row.appendChild(nameCell);
    row.appendChild(emailCell);
    row.appendChild(phoneCell);
    row.appendChild(timeCell);
    row.appendChild(opsCell);

    return row;
}

function formatPhoneN(number) {
    return '(' + number.slice(0, 3) + ') ' + number.slice(3, 6) + '-' + number.slice(6)
}

function formatTime(time) {
    const now = new Date();
    const diff = now - time;
    const msPerMinute = 60 * 1000;
    const msPerHour = msPerMinute * 60;
    const msPerDay = msPerHour * 24;
    const msPerMonth = msPerDay * 30;
    const msPerYear = msPerDay * 365;
    if (diff < msPerMinute) {
        return 'now';
    } else if (diff < msPerHour) {
        return Math.round(diff / msPerMinute) + 'm';
    } else if (diff < msPerDay) {
        return Math.round(diff / msPerHour) + 'h';
    } else if (diff < msPerMonth) {
        return Math.round(diff / msPerDay) + 'd';
    } else if (diff < msPerYear) {
        return Math.round(diff / msPerMonth) + 'mo';
    } else {
        return Math.round(diff / msPerYear) + 'y';
    }
}

function createDropdownMenu(item) {
    // create this with div:
    // <div class="dropdown">
    //     <button class="icon" type="button" data-toggle="dropdown"><i class="fa-solid fa-ellipsis"></i></button>
    //     <div class="dropdown-menu" aria-labelledby="more">
    //         <a class="dropdown-item" href="edit.html">Edit</a>
    //         <a class="dropdown-item" href="#">Delete</a>
    //       </div>
    //   </div>
    const dropdownDiv = document.createElement('div');
    dropdownDiv.classList.add('dropdown');

    const dropdownButton = document.createElement('button');
    dropdownButton.classList.add('icon');
    dropdownButton.type = 'button';
    dropdownButton.dataset.toggle = 'dropdown';
    dropdownButton.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';

    const dropdownMenuDiv = document.createElement('div');
    dropdownMenuDiv.classList.add('dropdown-menu');
    dropdownMenuDiv.setAttribute('aria-labelledby', 'more');

    const editLink = document.createElement('a');
    editLink.classList.add('dropdown-item');
    editLink.href = '#';
    editLink.textContent = 'Edit';
    editLink.addEventListener('click', editEventHandler(item));

    const deleteLink = document.createElement('a');
    deleteLink.classList.add('dropdown-item');
    deleteLink.href = '#';
    deleteLink.textContent = 'Delete';
    deleteLink.addEventListener('click', () => deleteEventHandler(item));

    dropdownMenuDiv.appendChild(editLink);
    dropdownMenuDiv.appendChild(deleteLink);

    dropdownDiv.appendChild(dropdownButton);
    dropdownDiv.appendChild(dropdownMenuDiv);

    return dropdownDiv;
}

// populateTable(jsonData);
// -------------------------------------------

// --------create overlay---------------------
const createButton = document.getElementById('create');
const overlay = document.querySelector('.overlay');
createButton.addEventListener('click', () => {
    document.getElementById('first').value = '';
    document.getElementById('last').value = '';
    document.getElementById('phone_inp').value = '';
    document.getElementById('email_inp').value = '';
    const head = document.getElementById('heading');
    head.textContent = 'Create Contact';

    // Show the overlay and modal
    overlay.style.display = 'block';
});
// ------------------------------------------

// --------create/edit save-----------------------
const saveButton = document.getElementById('createBtn');
saveButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    
    // get values from the input fields
    const firstName = document.getElementById('first').value;
    const lastName = document.getElementById('last').value;
    const phone = document.getElementById('phone_inp').value;
    const email = document.getElementById('email_inp').value;
    const time = new Date();

    const editContactId = saveButton.dataset.editContactId; // Get the edited contact ID
    if (editContactId) {
        // TODO: input_correct
        const editedContact = {
            "contact_id": editContactId, // Add the ID to the edited contact
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "phone": phone,
            "date": time,
        };
        const index = jsonData.findIndex(item => item.contact_id == editContactId);

        if (index !== -1) {
            jsonData[index] = editedContact;
            // api 
        }

        // reset save button
        saveButton.dataset.editContactId = '';
        
        const overlay = document.querySelector('.overlay');
        overlay.style.display = 'none';
        saveButton.dataset.editContactId = '';

        const tableBody = document.getElementById('table-body');
        tableBody.innerHTML = ''; // Clear the table
        populateTable(jsonData);
        return;
    }

        // TODO: if input_correct
        // js object with the contact data
        const newContact = {
            // id: number-from-backEnd,
            "first_name": firstName,
            "last_name": lastName,
            "email": email,
            "phone": phone,
            "data": new Date(),
        };
    // }
    // add the new contact to the array we print from = api
    jsonData.push(newContact);
    // TODO: add to API

    // clear the input fields
    document.getElementById('first').value = '';
    document.getElementById('last').value = '';
    document.getElementById('phone_inp').value = '';
    document.getElementById('email_inp').value = '';

    // close the overlay
    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'none';

    // add to the table
    const newRow = createTableRow(newContact);
    const tableBody = document.getElementById('table-body');
    tableBody.appendChild(newRow);
});
// -------------------------------------------

// ---------------edit button-----------------
function editEventHandler(data) {
    // Show the overlay and modal
    return () => editOverlay(data);
}

function editOverlay(data) {
    const overlay = document.querySelector('.overlay');
    overlay.style.display = 'block';
    const head = document.getElementById('heading');
    head.textContent = 'Edit Contact';


    document.getElementById('first').value = data.first_name;
    document.getElementById('last').value = data.last_name;
    document.getElementById('phone_inp').value = data.phone;
    document.getElementById('email_inp').value = data.email;

    const saveButton = document.getElementById('createBtn');
    saveButton.dataset.editContactId = data.contact_id;
    console.log(data.contact_id);
}
// -------------------------------------------

// -------------delete-------------------------
const confirmButton = document.getElementById('confirmDelete');
function deleteEventHandler(item) {
    confirmButton.dataset.contact_id = item.contact_id;
    // confirmButton.dataset.contactId = item.contact_id;

    // Show the confirmation modal
    $('#confirmationModal').modal('show');
}
const deleteConfirmed = document.getElementById('confirmDelete');
deleteConfirmed.addEventListener('click', function() {
    const contactId = deleteConfirmed.dataset.contact_id;
    if (contactId) {
        deleteContact(contactId);
        $('#confirmationModal').modal('hide'); // Hide the modal
    }
});
// function deleteContact(contactId) {
//     const index = jsonData.findIndex(item => item.contact_id == contactId);

//     // if (index !== -1) {
//     //     jsonData.splice(index, 1);
//     //     // api 
//     // }

//     const tableBody = document.getElementById('table-body');
//     tableBody.innerHTML = ''; // Clear the table
//     populateTable(jsonData);
// }
// --------------------------------------------

// ------------close---------------------------
const close = document.getElementById('close');
close.addEventListener('click', function() {
    overlay.style.display = 'none';
    document.getElementById('first').value = '';
    document.getElementById('last').value = '';
    document.getElementById('phone_inp').value = '';
    document.getElementById('email_inp').value = '';

});
// --------------------------------------------

// -------------input in search bar-------------
const input = document.getElementById('search-bar-input');
input.addEventListener('input', () => {
    searchInput();
    // populateTable(jsonData);
});
// ---------------------------------------------

// // -------------input in search bar-------------
// const load = document.querySelector(".table");
// load.addEventListener('onload', () => {
//     // searchInput();
//     let user_id = 1;
//     loadAllContact(user_id);
//     // populateTable(jsonData);
// });
// // ---------------------------------------------


export { populateTable };
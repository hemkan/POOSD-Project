// ----------create table function -------
function populateTable(data) {
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
    nameCell.classList.add('name');
    
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name-container');

    // ---------dropdown for stacked view-------
    const stacked = document.createElement('div');
    const stackedDrop = document.createElement('button');
    stackedDrop.classList.add('dropdown_S');
    stackedDrop.classList.add('icon');
    stackedDrop.type = 'button';
    stackedDrop.dataset.toggle = 'dropdown';
    stackedDrop.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';

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

    stacked.appendChild(stackedDrop);
    stacked.appendChild(dropdownMenuDiv);
    // -------------------------------------------

    const nameText = document.createTextNode(item.first_name + ' ' + item.last_name);

    nameDiv.appendChild(nameText);
    nameDiv.appendChild(stacked);
    nameCell.appendChild(nameDiv);

    const emailCell = document.createElement('td');
    const phoneCell = document.createElement('td');
    const timeCell = document.createElement('td');
    const opsCell = document.createElement('td');

    emailCell.textContent = item.email;
    phoneCell.textContent = formatPhoneN(item.phone);
    timeCell.textContent = formatTime(item.date);
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
    if (typeof time === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(time)) {
        const [year, month, day] = time.split('-');
        return (month + '/' + day + '/' + year);
    } else {
        return 'Invalid Date';
    }
}

function createDropdownMenu(item) {
    // create this with div design:
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
// -------------------------------------------

// --------create overlay---------------------
const createButton = document.getElementById('create');
const overlay = document.querySelector('.overlay');
createButton.addEventListener('click', () => {
    document.getElementById('first').value = '';
    document.getElementById('last').value = '';
    document.getElementById('phone_inp').value = '';
    document.getElementById('email_inp').value = '';
    document.getElementById('invalidMessage').style.display = 'none';
    const head = document.getElementById('heading');
    head.textContent = 'Create Contact';

    showOverlay(overlay);
});
// ------------------------------------------

const chevron = document.querySelector('.fa-solid.fa-chevron-left');
chevron.addEventListener('click', ()=>
{
    document.getElementById('invalidMessage').style.display = 'none';
})

// --------create/edit save-----------------------
const saveButton = document.getElementById('createBtn');
saveButton.addEventListener('click', async function (event) {
    event.preventDefault(); // prevent the default form submission
    
    // get values from the input fields
    const firstName = document.getElementById('first').value;
    const lastName = document.getElementById('last').value;
    const phone = document.getElementById('phone_inp').value;
    const email = document.getElementById('email_inp').value;
    const time = new Date();

    //check if valid info
    if (!isValid(firstName, lastName, phone, email)) {
        document.getElementById('invalidMessage').style.display = 'block';
        return;
    }

    const editContactId = saveButton.dataset.editContactId;
    if (editContactId) {
        const editedContact = {
            "contact_id": editContactId,
            "new_first": firstName,
            "new_last": lastName,
            "new_email": email,
            "new_phone": deFormatPhone(phone),
        };

        updateContact(editedContact, function(result) {
            if (result) {
                if (result === 2) {
                    document.getElementById('invalidMessage').textContent = 'A contact with the same email already exists.';
                    document.getElementById('invalidMessage').style.display = 'block';
                    return;
                    
                } else if (result === 1) {
                    document.getElementById('invalidMessage').textContent = 'A contact with the same phone number already exists.';
                    document.getElementById('invalidMessage').style.display = 'block';
                    return;

                } else if (result === 3) {
                    document.getElementById('invalidMessage').textContent = 'A contact with the entered email and phone number already exists.';
                    document.getElementById('invalidMessage').style.display = 'block';
                    return
                    
                } else if (result === 4){
                    searchInput();
              
                    saveButton.dataset.editContactId = '';
        
                    const overlay = document.querySelector('.overlay');
                    hideOverlay(overlay);
                    saveButton.dataset.editContactId = '';
            
                    const tableBody = document.getElementById('table-body');
                    tableBody.innerHTML = ''; // Clear the table
                }
            }
                    document.getElementById('first').value = '';
                    document.getElementById('last').value = '';
                    document.getElementById('phone_inp').value = '';
                    document.getElementById('email_inp').value = '';
                    document.getElementById('invalidMessage').style.display = 'none';
        });      

        return;
    }
    const newContact = {
        "first_name": firstName,
        "last_name": lastName,
        "email": email,
        "phone": deFormatPhone(phone),
    };
     
    createContact(newContact, function(result){
        if (result)
        {
            if(result === 1)
            {
                //success
                document.getElementById('first').value = '';
                document.getElementById('last').value = '';
                document.getElementById('phone_inp').value = '';
                document.getElementById('email_inp').value = '';

                // close the overlay
                const overlay = document.querySelector('.overlay');
                hideOverlay(overlay);

                // Calling empty search method repopulates the table.
                searchInput();

            } else
            {
                // info is missing
                document.getElementById('invalidMessage').innerHTML = result;
                document.getElementById('invalidMessage').style.display = 'block';
                return;
                

            } 
        }
    });
    return;
});
// -------------------------------------------

// ---------------edit button-----------------
function editEventHandler(data) {
    document.getElementById('first').value = '';
    document.getElementById('last').value = '';
    document.getElementById('phone_inp').value = '';
    document.getElementById('email_inp').value = '';
    // Show the overlay
    return () => editOverlay(data);
}

function editOverlay(data) {
    const overlay = document.querySelector('.overlay');
    showOverlay(overlay);
    const head = document.getElementById('heading');
    head.textContent = 'Edit Contact';

    document.getElementById('first').value = data.first_name;
    document.getElementById('last').value = data.last_name;
    document.getElementById('phone_inp').value = data.phone;
    document.getElementById('email_inp').value = data.email;

    const saveButton = document.getElementById('createBtn');
    saveButton.dataset.editContactId = data.contact_id;
}
// -------------------------------------------

// -------------delete-------------------------
const confirmButton = document.getElementById('confirmDelete');
function deleteEventHandler(item) {
    confirmButton.dataset.contact_id = item.contact_id;

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
// --------------------------------------------

// ------------close---------------------------
const close = document.getElementById('close');
close.addEventListener('click', function() {
    hideOverlay(overlay);
    document.getElementById('first').value = '';
    document.getElementById('last').value = '';
    document.getElementById('phone_inp').value = '';
    document.getElementById('email_inp').value = '';
});
// --------------------------------------------

// -------------input in search bar-------------
const input = document.getElementById('search-bar-input');
const inputC = document.getElementById('search-bar-container');
const searchIcon = document.getElementById('search-icon');
const search_bar = document.getElementById('search-bar-input-stacked');

inputC.addEventListener('mouseenter', () => {
    if (window.innerWidth <= 425) {
        searchIcon.style.transform = 'scale(1.1)';
    }
    else {
        input.focus();
        input.style.width = '150px';
        input.style.borderBottom = '1px solid #ccc';
    }
});

inputC.addEventListener('mouseleave', () => {
    if (window.innerWidth <= 425) {
        searchIcon.style.removeProperty('transform');
    }
    else {
        if (document.getElementById('search-bar-input').value === '')
        {
            input.style.width = '0px';
            input.style.borderBottom = '';
        }
    }
});

input.addEventListener('input', () => {
    if (document.getElementById('search-bar-input').value === '')
    {
        input.style.width = '0px';
        input.style.borderBottom = '';
    }
    searchInput();
    // populateTable(jsonData);
});

searchIcon.addEventListener('click', function () {
    if (window.innerWidth <= 425) {
        if (search_bar.style.display === 'block') {
            
            search_bar.style.width = '0'; // shrink width with ease
            setTimeout(() => {
                search_bar.style.display = 'none';
            }, 300);
            search_bar.value = '';
            input.value = '';
            searchInput();

            return;
        }
        else {
            search_bar.style.display = 'block';
            setTimeout(() => {
                search_bar.style.width = '100%';
                search_bar.focus();
            }, 0);
        }    
    }
});

function handleScreenWidthChange() {
    var screenWidth = window.innerWidth;
    const search_bar = document.getElementById('search-bar-input-stacked');
    const input = document.getElementById('search-bar-input');
    
    if (screenWidth <= 425) {
        if (input.value !== '') {
            search_bar.value = input.value;
            search_bar.style.display = 'block';
            search_bar.style.width = '100%';
            search_bar.focus();
        }
        input.style.display = 'none';

        
    } else {
        search_bar.style.display = 'none';
        input.style.display = 'inline-block';

        if (search_bar.value !== '') {
            input.value = search_bar.value;
            input.style.width = '150px';
            input.style.borderBottom = '1px solid #ccc';
            input.focus();
            return;
        }
    }
}

handleScreenWidthChange();
  
window.addEventListener("resize", handleScreenWidthChange);
// ---------------------------------------------

// ------------load user's name-----------------
const nameL = document.getElementById('logout');
const name_2 = document.getElementById('logoutC');
document.addEventListener("DOMContentLoaded", (event) => {
    nameL.textContent = getUserName();
    name_2.textContent = nameL.textContent;
});

// ---------------------------------------------

// ---------------isValid functions----------------
function isValid(first, last, phone, email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPhoneValidd = isPhoneValid(phone);
    if (first === '' || last ==='' || email === '' || phone === '') {
        document.getElementById('invalidMessage').textContent = 'Please fill out all fields.';
        return false;
    }
    else if (!isEmailValid) {
        document.getElementById('invalidMessage').textContent = 'Invalid email address. Please enter a valid email.';        
        return false;
    }
    else {
        return isPhoneValidd;
    }
}

function isPhoneValid(phone) {
    const numericPhone = deFormatPhone(phone);
    const phoneRegex = /^\d{10}$/;
    const isPhoneValid = phoneRegex.test(numericPhone);
    if (isPhoneValid) {
        return true;
    } else {
        document.getElementById('invalidMessage').textContent = 'Invalid phone. Please enter a valid phone number.';        
        return false;
    }
}
// --------------------------------------------

// -------------other functions-------------------
function deFormatPhone(number) {
    const numericPhone = number.replace(/\D/g, '');
    return numericPhone;
}

function showOverlay(overlay) {
    overlay.style.pointerEvents = "auto";
    setTimeout(function() {
        overlay.style.opacity = "1"; // Fade it in
    }, 10);
    overlay.style.display = "block"; // Show the overlay
}

function hideOverlay(overlay) {
    overlay.style.pointerEvents = "none";
    overlay.style.opacity = "0"; // Fade it out
    setTimeout(function() {
        overlay.style.display = "none"; // Hide the overlay
    }, 300);
}
// ----------------------------------------------
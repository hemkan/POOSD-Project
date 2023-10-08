//import { searchInput, deleteContact } from "./search.js";

// const jsonData = [
//     { contact_id: 1, "first_name": "John", "last_name": "Doe", "email": "john@example.com", "phone": "1234567890", "date": new Date(2023, 0, 1, 12, 30)},
//     { contact_id: 2, "first_name": "Jane", "last_name": "Smith", "email": "jane@example.com", "phone": "9876543210", "date": new Date(2023, 0, 2, 14, 15)},
// ];

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
    nameCell.classList.add('name'); // Add a class for styling
    
    const nameDiv = document.createElement('div');
    nameDiv.classList.add('name-container');

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

    const nameText = document.createTextNode(item.first_name + ' ' + item.last_name);

    nameDiv.appendChild(nameText);
    nameDiv.appendChild(stacked);
    nameCell.appendChild(nameDiv);

    const emailCell = document.createElement('td');
    const phoneCell = document.createElement('td');
    const timeCell = document.createElement('td');
    const opsCell = document.createElement('td');

    // nameCell.textContent = item.first_name + ' ' + item.last_name;
    emailCell.textContent = item.email;
    phoneCell.textContent = formatPhoneN(item.phone);
    console.log('itemdata: ', item.date);
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
    if (typeof time === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(time)) {
        const [year, month, day] = time.split('-');
        return (month + '/' + day + '/' + year);
    } else {
        console.log('time: ',time);
        return 'Invalid Date';
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
    document.getElementById('invalidMessage').style.display = 'none';
    const head = document.getElementById('heading');
    head.textContent = 'Create Contact';

    // Show the overlay and modal
    showOverlay(overlay);
    // overlay.style.display = 'block';
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
    event.preventDefault(); // Prevent the default form submission behavior
    
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

    const editContactId = saveButton.dataset.editContactId; // Get the edited contact ID
    if (editContactId) {
        // TODO: input_correct
        const editedContact = {
            "contact_id": editContactId, // Add the ID to the edited contact
            "new_first": firstName,
            "new_last": lastName,
            "new_email": email,
            "new_phone": deFormatPhone(phone),
            //"date": time,
        };

        updateContact(editedContact, function(result) {
            console.log('reuslt', result);
            if (result) {
                console.log('result: ', result);
                if (result === 2) {
                    console.log('display update: duplicate email')
                    document.getElementById('invalidMessage').textContent = 'Duplicate detected. Please enter another email.';
                    document.getElementById('invalidMessage').style.display = 'block';
                    return;
                    
                } else if (result === 1) {
                    console.log('display update: duplicate phone')

                    document.getElementById('invalidMessage').textContent = 'Duplicate detected. Please enter another phone number.';
                    document.getElementById('invalidMessage').style.display = 'block';
                    return;
                    
                } else if (result === 3) {
                    console.log('display update: duplicate both')

                    document.getElementById('invalidMessage').textContent = 'Duplicate detected. Please enter another email and phone number.';
                    document.getElementById('invalidMessage').style.display = 'block';
                    return
                    
                }else if (result === 4){
                    searchInput();
        
        
                    
                    saveButton.dataset.editContactId = '';
        

                    const overlay = document.querySelector('.overlay');
                    // overlay.style.display = 'none';
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

        // TODO: if input_correct
        // js object with the contact data
         const newContact = {
             // id: number-from-backEnd,
             "first_name": firstName,
             "last_name": lastName,
             "email": email,
             "phone": deFormatPhone(phone),
         };
     // }
     // add the new contact to the array we print from = api
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
                    overlay.style.display = 'none';

                    // Calling empty search method repopulates the table.
                    searchInput();

                }else
                {
                    console.log('else case: result: ', result);
                    // info is missing
                    document.getElementById('invalidMessage').innerHTML = result;
                    document.getElementById('invalidMessage').style.display = 'block';
                    return;
                    

                 } }//else if (result === 3)
            //     {
            //         // email wrong format
            //         document.getElementById('invalidMessage').textContent = 'Invalid Email. Please enter a valid phone number.';
            //         document.getElementById('invalidMessage').style.display = 'block';
            //         return;
                    

            //     }else if (result === 4)
            //     {
            //         // phone number wrong format
            //         document.getElementById('invalidMessage').textContent = 'Invalid phone number. Please enter a valid phone number.';
            //         document.getElementById('invalidMessage').style.display = 'block';
            //         return;
                    

            //     }else if (reslut === 5)
            //     {
            //         // duplicate pone and email

            //     }else if (result === 6)
            //     {
            //         // same phone                    

            //     }else if (result === 7)
            //     {
            //         // same email
            //     }else if (result === 8)
            //     {
            //         // invalid phone and 
            //     }
            // }
        });
        return;
        // let ifCreated = createContact(newContact);
        // if (ifCreated)
        // {
        //     if (ifCreated === 1) {
        //         document.getElementById('invalidMessage').textContent = 'Duplicate detected. Please enter another email.';
        //         document.getElementById('invalidMessage').style.display = 'block';
        //     } else if (ifCreated === 2) {
        //         document.getElementById('invalidMessage').textContent = 'Duplicate detected. Please enter another phone number.';
        //         document.getElementById('invalidMessage').style.display = 'block';
        //     }
        // }

    // clear the input fields
    document.getElementById('first').value = '';
    document.getElementById('last').value = '';
    document.getElementById('phone_inp').value = '';
    document.getElementById('email_inp').value = '';

    // close the overlay
    const overlay = document.querySelector('.overlay');
    // overlay.style.display = 'none';
    hideOverlay(overlay);

    // Calling empty search method repopulates the table.
    searchInput();

});
// -------------------------------------------

// ---------------edit button-----------------
function editEventHandler(data) {
    document.getElementById('first').value = '';
    document.getElementById('last').value = '';
    document.getElementById('phone_inp').value = '';
    document.getElementById('email_inp').value = '';
    // Show the overlay and modal
    return () => editOverlay(data);
}

function editOverlay(data) {
    const overlay = document.querySelector('.overlay');
    // overlay.style.display = 'block';
    showOverlay(overlay);
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
    // overlay.style.display = 'none';
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
            
            // search_bar.style.display = 'none';
            search_bar.style.width = '0'; // Shrink width smoothly
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
                search_bar.style.width = '100%'; // Set width to 100% after displaying
                search_bar.focus();
            }, 0); // Delay for reflow before transitioning
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
            // console.log('here');
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
const nameL = document.getElementById('logout');
const name_2 = document.getElementById('logoutC');
document.addEventListener("DOMContentLoaded", (event) => {
    nameL.textContent = getUserName();
    name_2.textContent = nameL.textContent;
});



// // -------------input in search bar-------------
// const load = document.querySelector(".table");
// load.addEventListener('onload', () => {
//     // searchInput();
//     let user_id = 1;
//     loadAllContact(user_id);
//     // populateTable(jsonData);
// });
// // ---------------------------------------------
function isValid(first, last, phone, email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isEmailValid = emailRegex.test(email);
    const isPhoneValidd = isPhoneValid(phone);
    // console.log('phone', isPhoneValidd);
    if (first === '' || last ==='' || email === '' || phone === '') {
        console.log("here");
        document.getElementById('invalidMessage').textContent = 'Please fill out all fields.';
        return false;
    }
    else if (!isEmailValid) {
        // console.log('here', isEmailValid, email);
        document.getElementById('invalidMessage').textContent = 'Invalid email address. Please enter a valid email.';        
        return false;
    }
    else {
        // console.log('here', isEmailValid, email);
        // document.getElementById('invalidMessage').textContent = 'Invalid email address. Please enter a valid email.';        
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
function deFormatPhone(number) {
    const numericPhone = number.replace(/\D/g, '');
    return numericPhone;
}

function showOverlay(overlay) {
    // overlay.style.display = 'flex';
    overlay.style.pointerEvents = "auto";
    setTimeout(function() {
        overlay.style.opacity = "1"; // Fade it in
    }, 10);
    overlay.style.display = "block"; // Show the overlay
}
function hideOverlay(overlay) {
    overlay.style.pointerEvents = "none";
    // overlay.style.display = 'none';
    overlay.style.opacity = "0"; // Fade it out
    setTimeout(function() {
        overlay.style.display = "none"; // Hide the overlay
    }, 300); // Wait for the transition to complete
}

//export { populateTable };

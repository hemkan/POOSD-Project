<?php
// check for session
// session_start();
// if(!isset($_SESSION['user']))
// {
//     echo '<p>You are being redirected to log in...</p>';
//     error_log('session not valid');
//     header('Location: ../');
    
//     exit;
// }else{
//     error_log('session_data from user page: ' . print_R($_SESSION['user'], true));
// }

?>

<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title></title>
        <meta name="description" content="">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        <script src="https://kit.fontawesome.com/5d8ee741cc.js" crossorigin="anonymous"></script>
        <style>
            .icon {
                border: none;
                margin-right: 10px;
                text-align: center;
                text-decoration: none;
                display: inline-block;
                font-size: 16px;
                border-radius: 45%;
                background-color: pink;
            }
            #search-bar-input {
                width: 0;
                border: none;
                
                outline: none;
                transition: width 0.3s;
            }
            #search-bar-container:hover #search-bar-input {
                width: 150px;
                border-bottom: 1px solid #ccc;
            }
            #create:hover, #close:hover {
                transform: scale(1.1);
            }
            #login {
                color: #2a2e34;
            }
            #login:hover {
                color: pink;
            }
            #loginC {
                color: #2a2e34;
            }
            #loginC:hover {
                color: pink;
            }
            
            .table th {
                border: none;
                text-transform: uppercase;
                color: #2a2e34;
            }
            .overlay {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgb(255, 255, 255);
                z-index: 999;
                transition: .3s;
            }
            #heading {
                text-transform: uppercase;
                font-size: 3.4vh;
                padding-top: 2vh;
                padding-bottom: 2vh;
                text-align: center;
            }
        </style>
        <script type="module" src="../js/search.js"></script>

    </head>
    <body>
        <header>
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="#"><img src="../images/logo.png" alt="Home" width="50px"></a>
                <a href="../index.html" id="login" class="btn ml-auto">Logout</a>
            </nav>
        </header>
        <div class="container mt-3">
            <div class="row justify-content-between">
                <div class="col-auto">
                    <h2>Contacts</h2>
                </div>
                <div class="col-auto">
                    <button id="create" class="icon"><i class="fa-solid fa-plus"></i></button>
                    <div class="overlay">
                        <nav class="navbar navbar-expand-lg">
                            <a class="" id="close"><i class="fa-solid fa-chevron-left"></i></a>
                            <a href="index.html" id="loginC" class="btn ml-auto">Logout</a>
                        </nav>
                        <div class="container mt-5">
                            <form class="container mt-5" style="width: 60vh;">
                                <h1 id="heading">Create Contact</h1>
                                <div class="form-row">
                                    <div class="form-group col-md-6">
                                        <label for="first">First Name</label>
                                        <input type="text" class="form-control" id="first" placeholder="First">
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="last">Last Name</label>
                                        <input type="text" class="form-control" id="last" placeholder="Last">
                                    </div>
                                  </div>
                                  <div class="form-group">
                                    <label for="phone_inp">Phone</label>
                                    <input type="tel" class="form-control" id="phone_inp" placeholder="(123)-457-789">
                                </div>
                                <div class="form-group">
                                    <label for="email_inp">Email</label>
                                    <input type="email" class="form-control" id="email_inp" placeholder="abc@gmail.com">
                                </div>
                                <center><button class="text-center btn" id="createBtn" type="submit">Save</button></center>
                            </form>
                        </div>
                    </div>
                    <span id="search-bar-container">
                        <button class="icon"><i class="fa-solid fa-search"></i></button>
                        <input id="search-bar-input" type="text" placeholder="Search">
                    </span>
                </div>
            </div>
            <div class="table-responsive">
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Time</th>
                            <th scope="col" style="color:transparent;"></th>
                        </tr>
                    </thead>
                    <tbody id="table-body">

                    </tbody>
                </table>
            </div>
            <div class="modal fade" id="confirmationModal" tabindex="-1" role="dialog" aria-labelledby="confirmationModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="confirmationModalLabel">Confirm Deletion</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            Are you sure you want to delete this contact?
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
                            <button type="button" class="btn btn-danger" id="confirmDelete">Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- bootstrap js -->
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        <!-- <script src="../js/display.js"></script> -->
        <script>
        //    //-------table---------------------------->
        //      const jsonData = [
        //         { contact_id: 1, "first_name": "John", "last_name": "Doe", "email": "john@example.com", "phone": "1234567890", "date": new Date(2023, 0, 1, 12, 30)},
        //         { contact_id: 2, "first_name": "Jane", "last_name": "Smith", "email": "jane@example.com", "phone": "9876543210", "date": new Date(2023, 0, 2, 14, 15)},
        //     ];
        //     function populateTable(data) {
        //         const tableBody = document.getElementById('table-body');
        //         data.forEach(item => {
        //             // create row for each item
        //             const row = createTableRow(item);
        //             // add to table
        //             tableBody.appendChild(row);
        //         });
        //     }

        //     function createTableRow(item) {
        //         const row = document.createElement('tr');
        //         const nameCell = document.createElement('td');
        //         const emailCell = document.createElement('td');
        //         const phoneCell = document.createElement('td');
        //         const timeCell = document.createElement('td');
        //         const opsCell = document.createElement('td');

        //         nameCell.textContent = item.first_name + ' ' + item.last_name;
        //         emailCell.textContent = item.email;
        //         phoneCell.textContent = formatPhoneN(item.phone);
        //         timeCell.textContent = formatTime(item.date);
        //         // let format4 = 
        //         // console.log(format4); // 23-7-2022
        //         opsCell.appendChild(createDropdownMenu(item));

        //         row.appendChild(nameCell);
        //         row.appendChild(emailCell);
        //         row.appendChild(phoneCell);
        //         row.appendChild(timeCell);
        //         row.appendChild(opsCell);

        //         return row;
        //     }

        //     function formatPhoneN(number) {
        //         return '(' + number.slice(0, 3) + ') ' + number.slice(3, 6) + '-' + number.slice(6)
        //     }

        //     function formatTime(time) {
        //         const now = new Date();
        //         const diff = now - time;
        //         const msPerMinute = 60 * 1000;
        //         const msPerHour = msPerMinute * 60;
        //         const msPerDay = msPerHour * 24;
        //         const msPerMonth = msPerDay * 30;
        //         const msPerYear = msPerDay * 365;
        //         if (diff < msPerMinute) {
        //             return 'now';
        //         } else if (diff < msPerHour) {
        //             return Math.round(diff / msPerMinute) + 'm';
        //         } else if (diff < msPerDay) {
        //             return Math.round(diff / msPerHour) + 'h';
        //         } else if (diff < msPerMonth) {
        //             return Math.round(diff / msPerDay) + 'd';
        //         } else if (diff < msPerYear) {
        //             return Math.round(diff / msPerMonth) + 'mo';
        //         } else {
        //             return Math.round(diff / msPerYear) + 'y';
        //         }
        //     }
            
        //     function createDropdownMenu(item) {
        //         // create this with div:
        //         // <div class="dropdown">
        //         //     <button class="icon" type="button" data-toggle="dropdown"><i class="fa-solid fa-ellipsis"></i></button>
        //         //     <div class="dropdown-menu" aria-labelledby="more">
        //         //         <a class="dropdown-item" href="edit.html">Edit</a>
        //         //         <a class="dropdown-item" href="#">Delete</a>
        //         //       </div>
        //         //   </div>
        //         const dropdownDiv = document.createElement('div');
        //         dropdownDiv.classList.add('dropdown');

        //         const dropdownButton = document.createElement('button');
        //         dropdownButton.classList.add('icon');
        //         dropdownButton.type = 'button';
        //         dropdownButton.dataset.toggle = 'dropdown';
        //         dropdownButton.innerHTML = '<i class="fa-solid fa-ellipsis"></i>';

        //         const dropdownMenuDiv = document.createElement('div');
        //         dropdownMenuDiv.classList.add('dropdown-menu');
        //         dropdownMenuDiv.setAttribute('aria-labelledby', 'more');

        //         const editLink = document.createElement('a');
        //         editLink.classList.add('dropdown-item');
        //         editLink.href = '#';
        //         editLink.textContent = 'Edit';
        //         editLink.addEventListener('click', editEventHandler(item));

        //         const deleteLink = document.createElement('a');
        //         deleteLink.classList.add('dropdown-item');
        //         deleteLink.href = '#';
        //         deleteLink.textContent = 'Delete';
        //         deleteLink.addEventListener('click', () => deleteEventHandler(item));

        //         dropdownMenuDiv.appendChild(editLink);
        //         dropdownMenuDiv.appendChild(deleteLink);

        //         dropdownDiv.appendChild(dropdownButton);
        //         dropdownDiv.appendChild(dropdownMenuDiv);

        //         return dropdownDiv;
        //     }
          
        //     populateTable(jsonData);
        //     // -------------------------------------------

        //     // --------create overlay---------------------
        //     const createButton = document.getElementById('create');
        //     const overlay = document.querySelector('.overlay');
        //     createButton.addEventListener('click', () => {
        //         document.getElementById('first').value = '';
        //         document.getElementById('last').value = '';
        //         document.getElementById('phone_inp').value = '';
        //         document.getElementById('email_inp').value = '';
        //         const head = document.getElementById('heading');
        //         head.textContent = 'Create Contact';

        //         // Show the overlay and modal
        //         overlay.style.display = 'block';
        //     });
        //     // ------------------------------------------

        //     // --------create/edit save-----------------------
        //     const saveButton = document.getElementById('createBtn');
        //     saveButton.addEventListener('click', function (event) {
        //         event.preventDefault(); // Prevent the default form submission behavior
                
        //         // get values from the input fields
        //         const firstName = document.getElementById('first').value;
        //         const lastName = document.getElementById('last').value;
        //         const phone = document.getElementById('phone_inp').value;
        //         const email = document.getElementById('email_inp').value;
        //         const time = new Date();

        //         const editContactId = saveButton.dataset.editContactId; // Get the edited contact ID
        //         if (editContactId) {
        //             // TODO: input_correct
        //             const editedContact = {
        //                 "contact_id": editContactId, // Add the ID to the edited contact
        //                 "first_name": firstName,
        //                 "last_name": lastName,
        //                 "email": email,
        //                 "phone": phone,
        //                 "date": time,
        //             };
        //             const index = jsonData.findIndex(item => item.contact_id == editContactId);

        //             if (index !== -1) {
        //                 jsonData[index] = editedContact;
        //                 // api 
        //             }

        //             // reset save button
        //             saveButton.dataset.editContactId = '';
                    
        //             const overlay = document.querySelector('.overlay');
        //             overlay.style.display = 'none';
        //             saveButton.dataset.editContactId = '';

        //             const tableBody = document.getElementById('table-body');
        //             tableBody.innerHTML = ''; // Clear the table
        //             populateTable(jsonData);
        //             return;
        //         }

        //             // TODO: if input_correct
        //             // js object with the contact data
        //             const newContact = {
        //                 // id: number-from-backEnd,
        //                 "first_name": firstName,
        //                 "last_name": lastName,
        //                 "email": email,
        //                 "phone": phone,
        //                 "data": new Date(),
        //             };
        //         // }
        //         // add the new contact to the array we print from = api
        //         jsonData.push(newContact);
        //         // TODO: add to API

        //         // clear the input fields
        //         document.getElementById('first').value = '';
        //         document.getElementById('last').value = '';
        //         document.getElementById('phone_inp').value = '';
        //         document.getElementById('email_inp').value = '';

        //         // close the overlay
        //         const overlay = document.querySelector('.overlay');
        //         overlay.style.display = 'none';

        //         // add to the table
        //         const newRow = createTableRow(newContact);
        //         const tableBody = document.getElementById('table-body');
        //         tableBody.appendChild(newRow);
        //     });
        //     // -------------------------------------------

        //     // ---------------edit button-----------------
        //     function editEventHandler(data) {
        //         // Show the overlay and modal
        //         return () => editOverlay(data);
        //     }

        //     function editOverlay(data) {
        //         const overlay = document.querySelector('.overlay');
        //         overlay.style.display = 'block';
        //         const head = document.getElementById('heading');
        //         head.textContent = 'Edit Contact';


        //         document.getElementById('first').value = data.first_name;
        //         document.getElementById('last').value = data.last_name;
        //         document.getElementById('phone_inp').value = data.phone;
        //         document.getElementById('email_inp').value = data.email;

        //         const saveButton = document.getElementById('createBtn');
        //         saveButton.dataset.editContactId = data.contact_id;
        //         console.log(data.contact_id);
        //     }
        //     // -------------------------------------------

        //     // -------------delete-------------------------
        //     const confirmButton = document.getElementById('confirmDelete');
        //     function deleteEventHandler(item) {
        //         confirmButton.dataset.contact_id = item.contact_id;
        //         // confirmButton.dataset.contactId = item.contact_id;

        //         // Show the confirmation modal
        //         $('#confirmationModal').modal('show');
        //     }
        //     const deleteConfirmed = document.getElementById('confirmDelete');
        //     deleteConfirmed.addEventListener('click', function() {
        //         const contactId = deleteConfirmed.dataset.contact_id;
        //         if (contactId) {
        //             deleteContact(contactId);
        //             $('#confirmationModal').modal('hide'); // Hide the modal
        //         }
        //     });
        //     function deleteContact(contactId) {
        //         const index = jsonData.findIndex(item => item.contact_id == contactId);

        //         if (index !== -1) {
        //             jsonData.splice(index, 1);
        //             // api 
        //         }
        //         const tableBody = document.getElementById('table-body');
        //         tableBody.innerHTML = ''; // Clear the table
        //         populateTable(jsonData);
        //     }
        //     // --------------------------------------------

        //     // ------------close---------------------------
        //     const close = document.getElementById('close');
        //     close.addEventListener('click', function() {
        //         overlay.style.display = 'none';
        //         document.getElementById('first').value = '';
        //         document.getElementById('last').value = '';
        //         document.getElementById('phone_inp').value = '';
        //         document.getElementById('email_inp').value = '';

        //     });
        //     // --------------------------------------------

        </script>
    </body>
</html>
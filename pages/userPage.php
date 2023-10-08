<?php
// check if user is authenticated
session_start();
if(!isset($_SESSION['user']))
{
    echo '<p>You are being redirected to log in...</p>';
    error_log('session not valid');
    header('Location: ../');
    
    exit;
}else{
    error_log('session_data from user page: ' . print_R($_SESSION['user'], true));
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome</title>
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="/css/user_page.css">

    
</head>



<body>
    <h1>
        Welcome <?php echo $_SESSION['user']['first_name'];?>
    </h1>
    <div id="content-container" class="content_container">
        <div id="manage_contacts" class ="h2-extended">
            <h2>
                Manage your contacts
            </h2>
            <div id="return-button" class="hidden">
                <button class="button" type="select">Return to List</button>
            </div>
        </div>
        <div class="button-container">
            <button class="button" type='select' id='add-button'>Add</button>
            <div class="separator"></div>
            <button class="button" type='select' id='find-button'>Find</button>
        </div>
        <div id='create'></div>
        <hr>
        <div id="default-case" class="default-case"> 
            <!--displays a list of all contacts in this users list-->
            Your Contacts 
            <hr>
            <div id="contact-list" class="contact-list">
                <table class="clickable-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Date Added</th>
                      </tr>
                    </thead>
                    <tbody id="contact-list-body">
                      <!-- Contact rows will be dynamically added here -->
                    </tbody>
                  </table>
            </div>
        </div>
        <div id="add-case" class="hidden">
            <!--Displays input boxes for adding a contact-->
            <div id="input-boxes" class="input">
                <input type="text" id="first_name" placeholder="First Name: John" required>
                <br>
                <input type="text" id="last_name"  placeholder="Last Name: Doe" required>
                <br>
                <input type="email" id="create-email" placeholder="Email: John@example.com" required>
                <br>
                <input type="tel" id="create-phone" placeholder="Phone: (123)-456-7890" required>
                <br>
                <button id="create_button" class="button" type="submit">Create</button>
              </div>

        </div>
        <div id="find-case" class="hidden">
            <!--Brings up a search bar then displpays contacts-->
            <input type="search" id="search-bar" placeholder="Search by name, email, or phone number."><br>

            <div id="find-table" class="default-case hidden">
                <table class="clickable-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Date Added</th>
                      </tr>
                    </thead>
                    <tbody id="search-result-list-body">
                      <!-- Contact rows will be dynamically added here -->
                    </tbody>
                  </table>
            </div>
            
        </div>
    </div>
    <script>
    // Extract the user_ID from PHP and assign it to a JavaScript variable
    var user_ID = <?php echo $_SESSION['user']['user_id'];?>;
    console.log('user_ID embeded script: ' + user_ID);
    </script>
    <script src="../js/user_page.js"></script>
    <script src="../js/searchHandler.js"></script>
    <script src="../js/create_contact_handler.js"></script>
    <script src="../js/toggleUpdateInput.js"></script>
</body>



<script>updateSearchResults('/0');</script>

</html>

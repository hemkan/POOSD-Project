<?php
// check for session

session_set_cookie_params(0); // expire cookies on exit
ini_set('session.gc_maxlifetime', 1800); 
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if(!isset($_SESSION['user']))
{
    echo '<p>You are being redirected to log in...</p>';
    error_log('session not valid');

    header('Location: ../index.html');
    session_abort();
    exit;
}else{
    error_log('session_data from user page: ' . print_r($_SESSION['user'], true));
}

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
        <!-- <script type="module" src="../js/search.js"></script> -->
        

    </head>
    <body>
        <header>
            <nav class="navbar navbar-expand-lg">
                <a class="navbar-brand" href="#"><img src="../images/logo.png" alt="Home" width="50px"></a>

                <a href="/api/logout.php" id="login" class="btn ml-auto">Logout</a>

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
                            <a href="../index.html" id="loginC" class="btn ml-auto">Logout</a>
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
        <script src="../js/createContactHandler_slp7.js"></script>
        <script src="../js/search.js"></script>
        <script src="../js/display.js"></script>
        <script src="../js/search.js"></script>
        
       

    <!-- </script> -->
    </body>

</html>


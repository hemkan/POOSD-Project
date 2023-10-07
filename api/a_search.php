<?php

    include 'functions.php';

    session_start();
    if(!isset($_SESSION['user']))
    {
        // echo '<p>You are being redirected to log in...</p>';
        // error_log('session not valid');
        header('Location: ../index.html');
        
        exit;
    }
    else{
        error_log('session_data from search page: ' . print_R($_SESSION['user'], true));
    }
    // $_SESSION['user']['user_id'] = 1;
    $user_id = $_SESSION['user']['user_id'];

    // 'GET' OR 'POST'
    if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $json_data = file_get_contents('php://input');
        $post_data = json_decode($json_data, true);
        // echo $post_data["access_id"];
    
        $contact = new Contact();
        // $result = $contact->load_contact(2);
        $result = $contact->search($user_id, $post_data);

        // ...goes back to the js
        
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

?>
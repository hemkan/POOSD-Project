<?php

    include 'functions.php';

    session_start();
    // session_unset();
    // $_SESSION['user']['user_id'] = 1;
    if(!isset($_SESSION['user']))
    {
        // echo '<p>You are being redirected to log in...</p>';
        // error_log('session not valid');
        header('Location: ../index.html');
        
        exit;
    }
    else{
        error_log('session_data from user page: ' . print_R($_SESSION['user'], true));
    }
    $user_id = $_SESSION['user']['user_id'];

    
    // 'GET' OR 'POST'
    if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        // print_r($_SESSION['user']);

        // $json_data = file_get_contents('php://input');
        // $post_data = json_decode($json_data, true);

        $contact = new Contact();
        $result = $contact->load_contact($user_id);
        // $result = $contact->load_contact($post_data['id']);
        // $result = $contact->load_contact(1);
        // print_r($result);

        // ...goes back to the js
        // $decoded = json_encode($result, JSON_PRETTY_PRINT);
        // echo "<script>var data =$decoded;</script>"
        
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

?>
<?php

    include 'functions.php';

    if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $json_data = file_get_contents('php://input');
        $post_data = json_decode($json_data, true);
    
        // echo 
        $contact = new Contact();
        // $result = $contact->delete_contact(5);
        // print_r( $result);

        echo json_encode($post_data, JSON_PRETTY_PRINT);
        // echo $post_data['id'];
        $result = $contact->delete_contact($post_data['id']);

        // echo $result;
        echo json_encode($result, JSON_PRETTY_PRINT);
    }
?>
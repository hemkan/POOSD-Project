<?php

    include '../functions.php';

    // 'GET' OR 'POST'
    if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $json_data = file_get_contents('php://input');
        $post_data = json_decode($json_data, true);
        // echo $post_data["access_id"];
    
        $contact = new Contact();
        // $result = $contact->load_contact(2);
        $result = $contact->search($post_data);

        // ...goes back to the js
        
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

?>
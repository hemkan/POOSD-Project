<?php

    include '../functions.php';

    // 'GET' OR 'POST'
    if ($_SERVER['REQUEST_METHOD'] === 'POST')
    {
        $json_data = file_get_contents('php://input');
        $post_data = json_decode($json_data, true);

        $contact = new Contact();
        // $result = $contact->load_contact(1);
        // echo $result[0]["first_name"];
        // echo $post_data["id"];
        $result = $contact->load_contact($post_data['id']);

        // ...goes back to the js
        // $decoded = json_encode($result, JSON_PRETTY_PRINT);
        // echo "<script>var data =$decoded;</script>"
        
        echo json_encode($result, JSON_PRETTY_PRINT);
    }

?>
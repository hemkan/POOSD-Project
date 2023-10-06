<?php

    function connect_db()
    {
        $db_servername = "localhost";
        $db_username = "root";
        $db_password = "password";
        $db_name = "crud_test";
    
        $connect = new mysqli($db_servername, $db_username, $db_password, $db_name);
        if (!$connect)
        {
            die();
        }
        // echo "SUCCESS";
        return $connect;
    }
    
    // connect_db();

?>

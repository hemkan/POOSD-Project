<?php

    function connect_db()
    {
        $db_servername = "localhost";
        $db_username = "root"; // change the user name
        $db_password = "25WindmillCat71323";
        $db_name = "slp_7";
    
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

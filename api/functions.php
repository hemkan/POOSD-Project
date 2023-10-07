<?php

    include "connectDB.php";
    // header('Content-Type: application/json');
    session_start();
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

    class Contact
    {
        // const $connect = connect_db();
        private $connect;
        // private $user_id;

        function _construct()
        {
            // $this->user_id = $_SESSION["user"]["user_id"];
            $this->connect = connect_db();
            echo "connected";
        }

        // load the array with the info from the db
        function load_array($sql_result)
        {
            $result = array();
            $curr_index = 0;
            while ($info = mysqli_fetch_array($sql_result))
            {
                $result[$curr_index]["contact_id"] = $info["contact_id"];            
                $result[$curr_index]["first_name"] = $info["first_name"];
                $result[$curr_index]["last_name"] = $info["last_name"];
                $result[$curr_index]["phone"] = $info["phone"];
                $result[$curr_index]["email"] = $info["email"];
                $result[$curr_index]["date"] = $info["date"];

                $curr_index++;
            }

            return $result;
        }

        function load_contact($access_id)
        {
            error_log('access id: ' . print_r($access_id,true));
            $connect = connect_db();
            $sql = "SELECT * FROM contacts C WHERE C.access_id = '$access_id'";
            $sql_result = mysqli_query($connect, $sql);

            // $result = array();
            // $curr_index = 0;
            // while ($info = mysqli_fetch_array($sql_result))
            // {
            //     // $info[...] - '...' would need be replaced by the table
            //     // name of that on the remote db
            //     $result[$curr_index]["access_id"] = $info["access_id"];            
            //     $result[$curr_index]["first_name"] = $info["first_name"];
            //     $result[$curr_index]["last_name"] = $info["last_name"];
            //     $result[$curr_index]["phone"] = $info["phone"];
            //     $result[$curr_index]["email"] = $info["email"];
            //     $result[$curr_index]["date"] = $info["date"];

            //     $curr_index++;
            // }

            $result = $this->load_array($sql_result);
            error_log('load array: ' . print_r($result, true));
            return ($result);
        }

        function delete_contact($contact_id)
        {
            $connect = connect_db();
            $sql = "DELETE FROM contacts C WHERE C.contact_id = '$contact_id'";
            $sql_result = mysqli_query($connect, $sql);

            // echo $sql_result;
            if ($sql_result)
            {
                return ['success' => 'User info deleted successfully.'];
            }
            else
            {
                return ['error' => 'Couldn\'t delete the user'];
            }
        }

        function search($user_id, $post_data)
        {
            $connect = connect_db();
            $access_id = $user_id;
            $text = $post_data['search_string'];
            // $access_id = 1;
            // $text = 'josh';

            // change the table and the variable name to remote db
            $sql = "SELECT * FROM contacts C
                                        -- WHERE LOCATE('$text', C.first_name) > 0
                                        WHERE (C.first_name LIKE '%$text%'
                                        OR C.last_name LIKE '%$text%')
                                        AND C.access_id = '$access_id'";
                                    // -- WHERE (C.first_name LIKE '$text' 
                                    // -- OR C.last_name LIKE '$text')
                                    // -- AND C.access_id= '$access_id'";
            $sql_result = mysqli_query($connect, $sql);

            return $this->load_array($sql_result);
        }
    }

    // $test = new Contact();
    // $result = $test->load_contact(1);
    // print_r($result);
    // $result = $test->search();
    // echo $result[0]["first_name"];
    // echo json_encode($result);
    // echo (json_encode($test->load_contact(2)));

?>
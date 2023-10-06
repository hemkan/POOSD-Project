<?php

    include "connectDB.php";
    // header('Content-Type: application/json');

    class Contact
    {
        // const $connect = connect_db();
        private $connect;

        function _construct()
        {
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
            $connect = connect_db();
            $sql = "SELECT * FROM Contact C WHERE C.access_id = '$access_id'";
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

            // return $result;
            return ($this->load_array($sql_result));
        }

        function delete_contact($contact_id)
        {
            $connect = connect_db();
            $sql = "DELETE FROM Contact C WHERE C.contact_id = '$contact_id'";
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

        function search($post_data)
        {
            $connect = connect_db();
            $access_id = $post_data['id'];
            $text = $post_data['search_string'];
            // $access_id = 1;
            // $text = 'josh';

            // change the table and the variable name to remote db
            $sql = "SELECT * FROM Contact C
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
    // $result = $test->search();
    // echo $result[0]["first_name"];
    // echo json_encode($result);
    // echo (json_encode($test->load_contact(2)));

?>
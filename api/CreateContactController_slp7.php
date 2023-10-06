<?php
// CreateContact.php

require_once('../config/database.php');
session_start();
if(!isset($_SESSION['user']))
{
    echo '<p>You are being redirected to log in...</p>';
    error_log('session not valid');
    header('Location: ../');
    
    exit;
}else{
    error_log('session_data from create contact: ' . print_R($_SESSION['user'], true));
    
}

error_log('session_data before assignment: ' . print_R($_SESSION['user'], true));

$access_id = $_SESSION['user']['user_id']; 

class CreateContact 
{
    private $pdo; // PDO instance

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function addContact($postData)
    {

        
        // validate input
        $access_id = $GLOBALS['access_id'];
        $first_name = $postData['first_name'];
        $last_name = $postData['last_name'];
        $email = $postData['email'];
        $phone = $postData['phone'];
        $addDate = date('m,d,y');

        error_log('postData top of addContact fucntion \n' . print_r($postData, true));
        error_log('access_id \n' . print_r($access_id, true));

        if(empty($access_id)||empty($first_name)||empty($last_name)||empty($email)||empty($phone)||empty($addDate))
        {
            return ['error' => 'Contact name, email, and phone number are required.'];
        }

        // Prepare SQL statement to insert contacts into the database
        $statement = $this->pdo->prepare("INSERT INTO contacts (access_id, first_name, last_name, email, phone, date) VALUES (:access_id, :first_name, :last_name, :email, :phone, :addDate)");

        // Bind parameters 
        $statement->bindParam(':access_id', $access_id);
        $statement->bindParam(':first_name', $first_name);
        $statement->bindParam(':last_name', $last_name);
        $statement->bindParam(':email', $email);
        $statement->bindParam(':phone', $phone);
        $statement->bindParam(':addDate', $addDate);

        // Execute the SQL statement 
        if($statement->execute())
        {
            return['success' => 'Contact added successfully'];
        }else{
            return ['error' => 'Failed to add contact.'];
        }
    }
}

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw JSON data from the request body
    $json_data = file_get_contents('php://input');

    
    
    // Parse the JSON data into a PHP array
    $postData = json_decode($json_data, true);

    error_log('postData: ' . print_r($postData, true));

    // Create a PDO instance
    $pdo = createPDO();

    // Create an instance of CreateContact
    $controller = new CreateContact($pdo);

    // Call the addContact method with user input
    $result = $controller->addContact($postData);

    // Output the result as JSON
    echo json_encode($result);
}
?>

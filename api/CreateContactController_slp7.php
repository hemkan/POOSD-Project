<?php
// CreateContact.php

require_once('../config/database.php');
require_once('checkForDupe.php');

session_start();
if(!isset($_SESSION['user']))
{
    echo '<p>You are being redirected to log in...</p>';
    error_log('session not valid');
    header('Location: ../');
    
    exit;
}else{
    error_log('session_data from create contact: ' . print_r($_SESSION['user'], true));
    
}

error_log('session_data before assignment: ' . print_r($_SESSION['user'], true));

$access_id = $_SESSION['user']['user_id']; 

class CreateContact 
{
    const NEW_CONTACT_ID = -1;
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
            http_response_code(400);
            return ['error' => 'Contact name, email, and phone number are required.'];
        }else if (!filter_var($email, FILTER_VALIDATE_EMAIL) )
        {
            http_response_code(400);
            if(strlen($phone) != 10){
                return ['error' => 'Invalid phone number and email. Please enter a valid phone number and email.<br>P: (123)-456-7890 Email: example@example.com'];
            }
            
            return ['error' => 'Invalid email. Please follow format<br>example@example.com'];
            
        }else if(strlen($phone) != 10){

            http_response_code(400);
            return ['error' => 'Invalid phone number. Please enter 10 digitnumber<br>(123)-456-7890'];

        }

        // check if another contact_id mathces the phone or email
        $checker = new DuplicateChecker($this->pdo); // Reuse the existing $pdo instance
        $result = $checker->checkForDuplicateContacts($access_id, self::NEW_CONTACT_ID , $email, $phone);


        if(isset($result['error'])){
            http_response_code(409);
            return $result;
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

    if (isset($result['success'])) {
        // Create an associative array with just the success message
        $response = $result['success'];
        // Encode the response as JSON and send it
        
    } elseif (isset($result['error'])) {
        // Handle error case here
        // You can access the error message as $result['error']
        // Set appropriate HTTP response code for errors
        $response = $result['error'];
    }

    echo json_encode($response);
}
?>

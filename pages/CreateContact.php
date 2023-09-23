<?php
// CreateContact.php

require_once('/var/www/html/config/mysqlConfig.php');
require_once('/var/www/html/config/database.php');

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
        $access_id = $postData['access_id'];
        $first_name = $postData['first_name'];
        $last_name = $postData['last_name'];
        $email = $postData['email'];
        $phone = $postData['phone'];
        $addDate = $postData['addDate'];

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

// Example:
$pdo = new PDO('mysql:host=localhost;dbname=SLP-7_DB', 'webuser', '25WindmillCat71323');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw JSON data from the request body
    $json_data = file_get_contents('php://input');
    
    // Parse the JSON data into a PHP array
    $postData = json_decode($json_data, true);

    // Create a PDO instance
    $pdo = new PDO('mysql:host=localhost;dbname=SLP-7_DB', 'webuser', '25WindmillCat71323');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create an instance of CreateContact
    $controller = new CreateContact($pdo);

    // Call the addContact method with user input
    $result = $controller->addContact($postData);

    // Output the result as JSON
    echo json_encode($result);
}
?>

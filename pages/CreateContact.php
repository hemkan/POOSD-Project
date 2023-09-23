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

$controller = new CreateContact($pdo);
//$now = date('Y-m-d H:i:s');
$postData = [
    'access_id' => '1',
    'first_name' => 'jonj4040',
    'last_name' => 'joslin',
    'phone' => '3217281392',
    'email' => 'jonj4040@gmail.com',
    'addDate' => date('Y-m-d H:i:s')
];
$result = $controller->addContact($postData);

echo json_encode($result);
?>

<?php
// RegistrationContorller_slp7.php

//require_once('../config/mysqlConfig.php');
require_once '../config/database.php';

class RegistrationController
{
    private $pdo; // PDO instance

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function registerUser($postData)
    {
        // Validate user input: username and password are required
        if (empty($postData['first_name']) || empty($postData['last_name']) 
                || empty($postData['phone']) || empty($postData['email']) || empty($postData['password'])) 
        {
            error_log('bad credentials');
            error_log(print_r($postData, true));
            return ['error' => 'Username and password are required.'];
        }

        // Hash the user's password using PHP's built-in password hasher
        $hashedPassword = password_hash($postData['password'], PASSWORD_DEFAULT);

        // Prepare SQL statement to insert user into database
        $statement = $this->pdo->prepare("INSERT INTO users_2 (first_name, last_name, phone, email, hashed_password) 
            VALUES (:first_name, :last_name, :phone, :email, :hashed_password )");

        // Bind parameters
        $statement->bindParam(':first_name', $postData['first_name']);
        $statement->bindParam(':last_name', $postData['last_name']);
        $statement->bindParam(':phone', $postData['phone']);
        $statement->bindParam(':email', $postData['email']);
        $statement->bindParam(':hashed_password', $hashedPassword);
        

        // Execute SQL statement
        try {
            $statement->execute();
            return ['success' => 'User registered successfully.'];
        }catch(PDOException $e) {
            // handle database insertion error
            error_log('insertion error');
            error_log('SQL Query: ' . $statement->queryString);
            error_log(print_r($postData, true)); // Print the data being inserted

            return['error' => 'Registration failed. ' . $e->getMessage()];
        }
    }
}

// create PDO instance

$pdo = createPDO();

// Check if the request method is POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get the raw JSON data from the request body
    $json_data = file_get_contents('php://input');
    
    // Parse the JSON data into a PHP array
    $postData = json_decode($json_data, true);

    // Create an instance of RegistrationController
    $controller = new RegistrationController($pdo);

    // Call the registerUser method with user input
    $result = $controller->registerUser($postData);

    if (isset($result['success'])) {
        echo json_encode(['success' => 'User registered successfully']);
    } else {
        echo json_encode(['error' => 'Registration failed']);
    }
}
?>
<?php
// RegistrationController.php
//require_once('../config/mysqlConfig.php');
require_once'../config/database.php';

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
        if (empty($postData['username']) || empty($postData['password'])) {
            return ['error' => 'Username and password are required.'];
        }

        // Hash the user's password using PHP's built-in password hasher
        $hashedPassword = password_hash($postData['password'], PASSWORD_DEFAULT);

        // Prepare SQL statement to insert user into database
        $statement = $this->pdo->prepare("INSERT INTO users (username, hashed_password, first_name, last_name) VALUES (:username, :hashed_password, :first_name, :last_name)");

        // Bind parameters
        $statement->bindParam(':username', $postData['username']);
        $statement->bindParam(':hashed_password', $hashedPassword);
        $statement->bindParam(':first_name', $postData['first_name']);
        $statement->bindParam(':last_name', $postData['last_name']);

        // Exacute SQL statement
        try {
            $statement->execute();
            return ['success' => 'User registered successfully.'];
        }catch(PDOException $e) {
            // handle database insertion error
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
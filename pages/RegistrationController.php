<?php
// RegistrationController.php
require_once('/var/www/html/config/mysqlConfig.php');
require_once('/var/www/html/config/database.php');

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

        // Prepare SQL statement to insrt user into database
        $statement = $this->pdo->prepare("INSERT INTO users (username, hashed_password) VALUES (:username, :hashed_password)");

        // Bind parameteres
        $statement->bindParam(':username', $postData['username']);
        $statement->bindParam(':hashed_password', $hashedPassword);

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
        /*
        // Simulate saving user data (you should save it to a database in a real application)
        $userData = [
            'username' => $postData['username'],
            'hashed_password' => $hashedPassword
        ];
        */
// Create PDO instance

$pdo = new PDO('mysql:host=localhost;dbname=SLP-7_DB', 'webuser', '25WindmillCat71323');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

// Example:
$controller = new RegistrationController($pdo);
$postData = ['username' => 'test1', 'password' => 'examplePassword1'];
$result = $controller->registerUser($postData);

// Output 
echo json_encode($result);
?> 

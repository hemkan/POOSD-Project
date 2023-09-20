<?php
// RegistrationController.php
require_one('/var/www/html/config/mysqlConfig.php');
require_once('/var/www/html/config/database.php');

class RegistrationController
{
    public function registerUser($postData)
    {
        // Validate user input: username and password are required
        if (empty($postData['username']) || empty($postData['password'])) {
            return ['error' => 'Username and password are required.'];
        }

        // Hash the user's password using PHP's built-in password hasher
        $hashedPassword = password_hash($postData['password'], PASSWORD_DEFAULT);

        // Simulate saving user data (you should save it to a database in a real application)
        $userData = [
            'username' => $postData['username'],
            'hashed_password' => $hashedPassword
        ];

        // Return the user data as a success response (in a real application, you might also generate a token or session)
        return ['success' => 'User registered successfully.', 'user_data' => $userData];
    }
}

// Example usage:
$controller = new RegistrationController();
$postData = ['username' => 'jon joslin', 'password' => 'examplePassword'];
$result = $controller->registerUser($postData);

// Output the result (you should handle the response accordingly in your application)
echo json_encode($result);
?>

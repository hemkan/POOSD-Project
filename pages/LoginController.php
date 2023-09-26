<?php
require_once 'PerformLogin.php';
require_once '../config/mysqlConfig.php';
require_once '../config/database.php'; // Adjust the path as needed

class LoginController
{
    private $db;

    public function __construct(PDO $db)
    {
        $this->db = $db;
    }

    public function loginUser($postData)
    {
        if (empty($postData['username']) || empty($postData['password'])) {
            return ['error' => 'Username and password are required'];
        }

        $user = $this->retrieveUser($postData['username']);

        if (!$user || !password_verify($postData['password'], $user['password'])) {
            throw new Exception('Invalid username or password.');
        }

        PerformLogin::performLogIn($user);

        return ['success' => 'Login successful'];
    }

    public function retrieveUser($username)
    {
        try {
            $statement = $this->db->prepare("SELECT * FROM users WHERE username = :username");
            $statement->bindParam(':username', $username, PDO::PARAM_STR);
            $statement->execute();

            $user = $statement->fetch(PDO::FETCH_ASSOC);

            return $user;
        } catch (PDOException $e) {
            throw new Exception('Database query error: ' . $e->getMessage());
        }
    }
}

try {
    $pdo = new PDO("mysql:host=" . DB_HOST . ";dbname=" . DB_NAME, DB_USER, DB_PASS);
    $loginController = new LoginController($pdo);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Assuming you have POST data for username and password
        $postData = [
            'username' => $_POST['username'],
            'password' => $_POST['password'],
        ];

        $result = $loginController->loginUser($postData);

        if (isset($result['error'])) {
            echo $result['error'];
        } elseif (isset($result['success'])) {
            echo $result['success'];
        }
    }
} catch (PDOException $e) {
    echo 'Database connection error: ' . $e->getMessage();
} catch (Exception $e) {
    echo 'Login error: ' . $e->getMessage();
}
?>

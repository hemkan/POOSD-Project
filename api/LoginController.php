<?php
require_once 'PerformLogin.php';
require_once '../config/database.php'; // Adjust the path as needed

class LoginController
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function loginUser($postData)
    {
        if (empty($postData['username']) || empty($postData['password'])) 
        {
            return ['error' => 'Username and password are required'];
        }

        $user = $this->retrieveUser($postData['username']);

        if($user && password_verify($postData['password'], $user['hashed_password']))
        {
            new PerformLogin($user);
            return ['success' => 'Login Successful'];
        }else if (!$user){
            http_response_code(404);
            return ['error' => 'Username not recognized.'];
        }else
        {   
            http_response_code(401);
            return ['error' => 'Invalid Username or Password'];

        }

        

    }

    // look for mathcing user data in the server
    public function retrieveUser($username)
    {
        try {
            $statement = $this->pdo->prepare("SELECT * FROM users WHERE username = :username");
            $statement->bindParam(':username', $username, PDO::PARAM_STR);
            $statement->execute();

            $user = $statement->fetch(PDO::FETCH_ASSOC);

            return $user;
        } catch (PDOException $e) 
        {
            throw new Exception('Database query error: ' . $e->getMessage());
        }
    }
}

try {
    $pdo = createPDO();

    if ($_SERVER['REQUEST_METHOD'] === 'POST') 
    {

        $json_data = file_get_contents('php://input');
        $postData = json_decode($json_data, true);

        $loginController = new LoginController($pdo);

        $result = $loginController->loginUser($postData);

        if(isset($result['success'])){
            http_response_code(200);
        }

        header('Content-Type: application/json');

        echo json_encode($result);
    }
} catch (PDOException $e) 
{
    echo 'Login error: ' . $e->getMessage();
}
?>

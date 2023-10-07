<?php
require_once 'PerformLogin.php';
require_once '../config/database.php'; // Adjust the path as needed
error_log('LoginController: ');

class LoginController
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function loginUser($postData)
    {
        // check if email and password match
        if (empty($postData['email']) || empty($postData['password'])) 
        {
            error_log('invalid input');
            error_log(print_r($postData, true));
            return ['error' => 'email and password are required'];
        }

        $email = $this->retrieveUser($postData['email']);

        if($email && password_verify($postData['password'], $email['hashed_password']))
        {
            new PerformLogin($email);
            return ['success' => 'Login Successful'];
        }else if (!$email){
            http_response_code(404);
            return ['error' => 'email not recognized.'];
        }else
        {   
            error_log('not recognized');
            http_response_code(401);
            return ['error' => 'Invalid email or Password'];

        }

        

    }

    // look for mathcing user data in the server
    public function retrieveUser($email)
    {
        try {
            $statement = $this->pdo->prepare("SELECT * FROM users_2 WHERE email = :email");
            $statement->bindParam(':email', $email, PDO::PARAM_STR);
            $statement->execute();

            $email = $statement->fetch(PDO::FETCH_ASSOC);

            return $email;
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

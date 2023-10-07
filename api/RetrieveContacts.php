<?php
session_start();
if(!isset($_SESSION['user']))
{
    echo '<p>You are being redirected to log in...</p>';
    error_log('session not valid');
    header('Location: ../');
    
    exit;
}else{
    error_log('session_data from retrieve: ' . print_R($_SESSION['user'], true));
}
require_once '../config/database.php';
// RetrieveContacts.php
/*
retieve every contact from the database whose access_ID matches the users ID 
is returnded as object of strings 
fisrt_name
last_name
phone
email
data
*/
class RetrieveContacts
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function retrieveContacts($user_ID)
    {
        $statement = $this->pdo->prepare("SELECT first_name, last_name, phone, email, date FROM contacts WHERE  access_id = :access_id");

        // bind parameters
        $statement->bindParam(':access_id', $user_ID, PDO::PARAM_INT);

        $statement->execute();

        $result = $statement->fetchALL(PDO::FETCH_ASSOC);

        return $result;
    }


}

try{
    if($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['user_ID']))
    {
        $user_ID = $_SESSION['user']['user_id'];
        error_log('user_ID: ' . print_r($user_ID, true));

        $pdo = createPDO();

        $contactsHandler = new RetrieveContacts($pdo);

        $contacts = $contactsHandler->retrieveContacts($user_ID);

        // Log the retrieved contacts
        error_log(print_r($contacts, true));


        echo json_encode($contacts);
    }else
    {
        $user_ID = $_SESSION['user']['user_id'];
        error_log('user_ID: ' . $user_ID);
        echo json_encode(array('error' => 'Invalid Request to retrieve.'));
    }
}catch
(PDOException $e){
    echo json_encode(array('error' => "Database connection error: " . $e->getMessage()));
}
?>
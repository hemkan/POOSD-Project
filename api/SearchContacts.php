<?php
// Ensure the user is logged in
session_start();
if (!isset($_SESSION['user'])) {
    echo '<p>You are being redirected to log in...</p>';
    error_log('Session not valid');
    header('Location: ../');
    exit;
} else {
    $user_id = $_SESSION['user']['user_id'];
    error_log('Session data from Search: ' . print_r($_SESSION['user'], true));
}

require_once '../config/database.php';

class RetrieveContacts
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function retrieveContacts($input)
    {
        // Check if the input is empty or null
        if ($input === '/0') {
            error_log('Input is empty');
            $statement = $this->pdo->prepare("SELECT first_name, last_name, phone, email, date 
            FROM contacts 
            WHERE access_id = :access_id");

            $statement->bindParam(':access_id', $GLOBALS['user_id'], PDO::PARAM_INT);
        } else {
            $input = "%$input%";
            $statement = $this->pdo->prepare("SELECT first_name, last_name, phone, email, date 
                FROM contacts 
                WHERE access_id = :access_id 
                AND (
                    LOWER(first_name) LIKE LOWER(:input)
                    OR LOWER(last_name) LIKE LOWER(:input)
                    OR LOWER(email) LIKE LOWER(:input)
                    OR LOWER(phone) LIKE LOWER(:input)
                )");

            // Bind parameters
            error_log('Global user ID: ' . print_r($GLOBALS['user_id'], true));
            $statement->bindParam(':access_id', $GLOBALS['user_id'], PDO::PARAM_INT);
            $statement->bindParam(':input', $input, PDO::PARAM_STR);
        }

        if (!$statement->execute()) {
            error_log("Query execution failed: " . print_r($statement->errorInfo(), true));
        }

        $result = $statement->fetchAll(PDO::FETCH_ASSOC);

        error_log('Result: ' . print_r($result, true));

        return $result;
    }
}

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['input'])) {
        $input = $_GET['input'];
        error_log('Input: ' . print_r($input, true));

        $pdo = createPDO();

        $contactsHandler = new RetrieveContacts($pdo);

        $contacts = $contactsHandler->retrieveContacts($input);

        // Log the retrieved contacts
        error_log(print_r($contacts, true));

        echo json_encode($contacts);
    } else {
        $input = $_GET['input'];
        error_log('In the else block on the search contacts file');
        error_log('Input: ' . print_r($input, true));
        echo json_encode(array('error' => 'Invalid request to search.'));
    }
} catch (PDOException $e) {
    echo json_encode(array('error' => "Database connection error: " . $e->getMessage()));
}
?>

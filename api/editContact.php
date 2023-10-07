<?php
// editContact.php
require_once('../config/database.php');
session_start();

if (!isset($_SESSION['user'])) {
    header('Location: ../index.html');
    exit;
} else {
    error_log('session_data from a_read page: ' . print_R($_SESSION['user'], true));
}
$access_id = $_SESSION['user']['user_id'];

class UpdateContact
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function updateContact($postData)
    {
        error_log('$postData in function: ' . print_r($postData, true));

        $access_id = $GLOBALS['access_id'];
        $contact_id = $postData['contact_id'];
        $new_first = $postData['new_first'];
        $new_last = $postData['new_last'];
        $new_email = $postData['new_email'];
        $new_phone = $postData['new_phone'];

        // Construct SQL query with placeholders
        $sql = "UPDATE contacts 
                SET first_name = :first_name, 
                    last_name = :last_name, 
                    email = :email, 
                    phone = :phone 
                WHERE access_id = :access_id AND contact_id = :contact_id";

        error_log('SQL Query: ' . $sql);

        // Prepare statement
        $statement = $this->pdo->prepare($sql);

        $statement->bindParam(':access_id', $access_id, PDO::PARAM_INT);
        $statement->bindParam(':contact_id', $contact_id, PDO::PARAM_INT);
        $statement->bindParam(':first_name', $new_first, PDO::PARAM_STR);
        $statement->bindParam(':last_name', $new_last, PDO::PARAM_STR);
        $statement->bindParam(':email', $new_email, PDO::PARAM_STR);
        $statement->bindParam(':phone', $new_phone, PDO::PARAM_STR);

        // Execute the statement
        if ($statement->execute()) {
            return ['success' => 'Contact updated successfully'];
        } else {
            return ['error' => 'Contact update failed'];
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_data = file_get_contents('php://input');
    $postData = json_decode($json_data, true);
    error_log('edit post data: ' . print_r($postData, true));

    $pdo = createPDO();
    $updater = new UpdateContact($pdo);

    $result = $updater->updateContact($postData);

    error_log('result: ' . print_r($result, true));

    echo json_encode($result);
}
?>

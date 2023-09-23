<?php

require_once('/var/www/html/config/mysqlConfig.php');
require_once('/var/www/html/config/database.php');
try {
    // Create a PDO instance
    $pdo = new PDO('mysql:host=localhost;dbname=SLP-7_DB', 'webuser', '25WindmillCat71323');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Test SQL statement
    $username = 'testuser';
    $hashedPassword = password_hash('testpassword', PASSWORD_DEFAULT);

    $statement = $pdo->prepare("INSERT INTO users (username, hashed_password) VALUES (:username, :hashed_password)");
    $statement->bindParam(':username', $username);
    $statement->bindParam(':hashed_password', $hashedPassword);

    // Execute SQL statement
    $statement->execute();

    echo 'Test record inserted successfully.';
} catch (PDOException $e) {
    echo 'Error: ' . $e->getMessage();
}
?>

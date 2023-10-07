<?php
//database.php
function createPDO(){
    try
    {
        $pdo = new PDO('mysql:host=localhost;dbname=slp_7', 'webuser', '25WindmillCat71323');
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    }
    catch (PDOException $e)
    {
        // handle database connection errors
        die('Database connection failed: ' . $e->getMessage());
    }
}
?>
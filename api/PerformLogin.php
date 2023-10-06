<?php
// PerformLogIn.php
class PerformLogIn
{
    public function __construct($user) 
    {
        // start session (if not already started)
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        $_SESSION['user'] = $user;
    }
    
}
?>
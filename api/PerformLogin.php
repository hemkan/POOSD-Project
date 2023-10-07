<?php
// PerformLogIn.php
class PerformLogin
{
    public function __construct($user) 
    {
        // start session (if not already started)
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        $_SESSION['user'] = $user;
        error_log('session_data: ' . print_R($user, true));
        //header('Location: /pages/user_page.php');
    }
    
}
?>
<?php
session_set_cookie_params(0); // expire cookies on exit
ini_set('session.gc_maxlifetime', 1800);

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

if (!isset($_SESSION['user'])) {
    echo '<p>You are being redirected to log in...</p>';
    error_log('session not valid');
    header('Location: ../index.html');
    session_abort();
    exit;
} else {
    error_log('session_data from user page: ' . print_r($_SESSION['user'], true));
}
?>

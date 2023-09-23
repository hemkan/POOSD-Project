<?php
// LoginContoller.php
require_once 'PerformLogin.php';

class LoginContoller
{
    public function loginUser($postData){
        // validat user input
        if(empty($postData['username']) || empty($postData['password'])){
            return ['error' => 'User name and password required'];
        }else {
            // search database for name & password combo
            $user = $this->retrieveUser($postData['username']);

            if($user && password_verify($postData['password'], $user['password'])){
                // user name and password match
                PerformLogin::performLogIn($user);
            }else{
                //
                return ['error' => 'User name and password pair not found'];
            }
        }
    }
    public function retrieveUser($postData){
        // search database for user by enterd name
    }
}
?>
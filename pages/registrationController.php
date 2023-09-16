<?php
//registrationController.php


class registrationController
{
        public function registerUser($postData)
        {
                //validate user input must have user name and password
                if (empty($postData['userName']) || empty($postData['password']>
                {
                        return['error' => 'Username and password required.'];
                }


                //hash users password with  built in php passeod hasher
                $hashedPasswrd = password_hash($postData['password'], PASSWORD_>




                // save user data
                $userData = [
                        'username' => $postData['username']

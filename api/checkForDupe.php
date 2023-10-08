<?php
class DuplicateChecker
{
    private $pdo;

    public function __construct($pdo)
    {
        $this->pdo = $pdo;
    }

    public function checkForDuplicateContacts($access_id, $contact_id,
    $new_email, $new_phone)
    {
        $value = [':email', ':phone'];
        $column = ['email', 'phone'];

        $emailFlag = false;
        $phoneFlag = false;


        $matchingContactIDs = array();

        for($i = 0 ; $i < 2; $i++){
            $checkForDupe = "SELECT " . $column[$i] .
            " FROM contacts
            WHERE access_id = :access_id 
            And contact_id != :contact_id
            AND " .$column[$i]. " = ".$value[$i];

            $dupeStmnt = $this->pdo->prepare($checkForDupe);

            $dupeStmnt->bindParam(':access_id', $access_id, PDO::PARAM_INT);
            $dupeStmnt->bindParam(':contact_id', $contact_id, PDO::PARAM_INT);
            
            

            if ($i == 0){
                // bind email
                $dupeStmnt->bindParam(':email', $new_email, PDO::PARAM_STR);
            }
            if ($i == 1){
                // bind phone
                $dupeStmnt->bindParam(':phone', $new_phone, PDO::PARAM_STR);
            }

            $execurteResult=$dupeStmnt->execute();
            error_log('result of check: ' . print_r($execurteResult, true));
            error_log('row count' . print_r($dupeStmnt->rowCount(), true));
            if($dupeStmnt->rowCount() > 0){
             
                if ($i == 0){
                    $emailFlag = true;
                }
                if ($i == 1){
                    $phoneFlag = true;
                }
            }
        }

        if (!empty($matchingContactIDs)) {
            
            
        }        
        
        if($phoneFlag){
            if($emailFlag){
                // both found in database
                return ['error' => 'Contact exist with same phone number and email.'];
            }
           
            error_log('Contact exist with same phone number.');
            return ['error'=> 'Contact exist with same phone number.'];
            
            
        }else if ($emailFlag) {
            
            error_log('Contact exist with same email.');
            return ['error'=> 'Contact exist with same email.'];            
        }
    }
}
?>
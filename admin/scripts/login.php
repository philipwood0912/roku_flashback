<?php

function login($email, $password){
    $pdo = Database::getInstance()->getConnection();
    // query chekcing user existance
    $check_exist_query = 'SELECT COUNT(*) FROM `tbl_users` WHERE User_Email =:email';
    $user_set = $pdo->prepare($check_exist_query);
    $user_set->execute(
        array(
            ':email'=>$email
        )
    );

    if($user_set->fetchColumn()>0){
            //check if match
            $check_match_query = 'SELECT * FROM `tbl_users` WHERE User_Email =:email';
            $check_match_query .= ' AND User_Pass =:password';
            $user_match = $pdo->prepare($check_match_query);
            $user_match->execute(
                array(
                    ':email'=>$email,
                    ':password'=>$password
                )
            );

            //Updating user ip login date and login time
            while($founduser = $user_match->fetch(PDO::FETCH_ASSOC)){
                $id = $founduser['ID'];
            }
            if(isset($id)){
                $_SESSION['loggedin'];
                $_SESSION['loggedin'] = true;
                return true;
            } else {
                //return true for specific message
                return "Password is wrong";
            }
           
    } else {
        //return false for another message
        return "Email does not exist";
    }
}
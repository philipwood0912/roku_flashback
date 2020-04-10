<?php

    function signup($firstname, $lastname, $email, $password){
        $pdo = Database::getInstance()->getConnection();
        $check_user_exist = 'SELECT COUNT(*) FROM `tbl_users` WHERE User_Email =:email';
        $user_set = $pdo->prepare($check_user_exist);
        $user_set->execute(
            array(
                ':email'=>$email
            )
        );
        if($user_set->fetchColumn()<1){
            // hash the password to be set in database
            $password_hash = password_hash($password, PASSWORD_DEFAULT);
            $insert_query = 'INSERT INTO `tbl_users` (F_Name, L_Name, User_Email, User_Pass)';
            $insert_query .= ' VALUES (:fname, :lname, :email, :pass)';
            $user_insert = $pdo->prepare($insert_query);
            $user_insert->execute(
                array(
                    ':fname'=>$firstname,
                    ':lname'=>$lastname,
                    ':email'=>$email,
                    ':pass'=>$password_hash
                )
            );
            return "Account successfully created";
        } else {
            return "Email is already active";
        }
    }
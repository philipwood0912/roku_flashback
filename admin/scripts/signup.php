<?php

    function signup($firstname, $lastname, $email, $username, $password, $section){
        $pdo = Database::getInstance()->getConnection();
        $check_user_exist = 'SELECT COUNT(*) FROM `tbl_users` WHERE User_Name =:username';
        $user_set = $pdo->prepare($check_user_exist);
        $user_set->execute(
            array(
                ':username'=>$username
            )
        );
        if($user_set->fetchColumn()<1){
            $insert_query = 'INSERT INTO `tbl_users` (F_Name, L_Name, User_Email, User_Name, User_Pass, User_Section)';
            $insert_query .= ' VALUES (:fname, :lname, :email, :user, :pass, :section)';
            $user_insert = $pdo->prepare($insert_query);
            $user_insert->execute(
                array(
                    ':fname'=>$firstname,
                    ':lname'=>$lastname,
                    ':email'=>$email,
                    ':user'=>$username,
                    ':pass'=>$password,
                    ':section'=>$section
                )
            );
            return "Account successfully created";
        } else {
            return "Username is already active";
        }
    }
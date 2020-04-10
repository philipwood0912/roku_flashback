<?php

function login($email, $password){
    $pdo = Database::getInstance()->getConnection();
    // query checking user existance
    $check_exist_query = 'SELECT COUNT(*) FROM `tbl_users` WHERE User_Email =:email';
    $user_set = $pdo->prepare($check_exist_query);
    $user_set->execute(
        array(
            ':email'=>$email
        )
    );

    if($user_set->fetchColumn()>0){
        //if user exists run select query with user email and password as conditions
            $check_match_query = 'SELECT tbl_users.ID, tbl_users.F_Name, tbl_users.User_Email, tbl_users.User_Pass, tbl_profiles.Profile_ID, tbl_profiles.Profile_Name,';
            $check_match_query .= ' tbl_profiles.Profile_Permissions, tbl_profiles.Profile_Avatar, tbl_profiles.Profile_Admin';
            $check_match_query .= ' FROM tbl_users INNER JOIN tbl_profiles ON tbl_users.ID = tbl_profiles.Profile_Link';
            $check_match_query .= ' WHERE tbl_users.User_Email =:email';
            $user_match = $pdo->prepare($check_match_query);
            $user_match->execute(
                array(
                    ':email'=>$email
                )
            );
            // pull user info and add to array
            $users = array();
            while($founduser = $user_match->fetch(PDO::FETCH_ASSOC)){
                // verify input password with hash from database - returns true on match
                $password_verify = password_verify($password, $founduser['User_Pass']);
                $user = array();
                $user['id'] = $founduser['ID'];
                $user['fname'] = $founduser['F_Name'];
                $user['pid'] = $founduser['Profile_ID'];
                $user['pname'] = $founduser['Profile_Name'];
                $user['permissions'] = $founduser['Profile_Permissions'];
                $user['avatar'] = $founduser['Profile_Avatar'];
                $user['admin'] = $founduser['Profile_Admin'];
                $users[] = $user;
            }
            // if users is not empty and password verify is true return users
            if(!empty($users) && $password_verify){
                return $users;
            } else {
                // else it means that the user has no profiles yet
                // run another query grabbing basic info about account
                $check_match_query = 'SELECT ID, F_Name, User_Pass FROM tbl_users WHERE User_Email =:email';
                $user_match = $pdo->prepare($check_match_query);
                $user_match->execute(
                    array(
                        ':email'=>$email
                    )
                );
                // add info pulled plus info that will be needed and edited on client side to array
                $users = array();
                while($founduser = $user_match->fetch(PDO::FETCH_ASSOC)){
                    // check pass again
                    $password_verify = password_verify($password, $founduser['User_Pass']);
                    // set blank fields in return array to be mutated when first profile is created
                    $user = array();
                    $user['id'] = $founduser['ID'];
                    $user['fname'] = $founduser['F_Name'];
                    $user['pid'] = "";
                    $user['pname'] = "";
                    $user['permissions'] = "";
                    $user['avatar'] = "";
                    $user['admin'] = "";
                    $users[] = $user;
                }
                // if password verify true, return users
                if($password_verify){
                    return $users;
                } else {
                    return "Password does not match";
                }
            }
    } else {
        return "User does not exist!";
    }
}

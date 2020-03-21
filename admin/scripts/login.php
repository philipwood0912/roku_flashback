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
            $check_match_query = 'SELECT tbl_users.ID, tbl_users.F_Name, tbl_users.User_Email, tbl_profiles.Profile_Name,';
            $check_match_query .= ' tbl_profiles.Profile_Permissions, tbl_profiles.Profile_Avatar, tbl_profiles.Profile_Admin';
            $check_match_query .= ' FROM tbl_users INNER JOIN tbl_profiles ON tbl_users.ID = tbl_profiles.Profile_Link';
            $check_match_query .= ' WHERE tbl_users.User_Email =:email AND tbl_users.User_Pass =:password';
            $user_match = $pdo->prepare($check_match_query);
            $user_match->execute(
                array(
                    ':email'=>$email,
                    ':password'=>$password
                )
            );
            $users = array();
            //Updating user ip login date and login time
            while($founduser = $user_match->fetch(PDO::FETCH_ASSOC)){
                $user = array();
                $user['id'] = $founduser['ID'];
                $user['fname'] = $founduser['F_Name'];
                $user['pname'] = $founduser['Profile_Name'];
                $user['permissions'] = $founduser['Profile_Permissions'];
                $user['avatar'] = $founduser['Profile_Avatar'];
                $user['admin'] = $founduser['Profile_Admin'];
                $users[] = $user;
            }

            if(!empty($users)){
                return $users;
            } else {
                $check_match_query = 'SELECT ID, F_Name FROM tbl_users WHERE User_Email =:email AND User_Pass =:password';
                $user_match = $pdo->prepare($check_match_query);
                $user_match->execute(
                    array(
                        ':email'=>$email,
                        ':password'=>$password
                    )
                );
                $users = array();
                //Updating user ip login date and login time
                while($founduser = $user_match->fetch(PDO::FETCH_ASSOC)){
                    $user = array();
                    $user['id'] = $founduser['ID'];
                    $user['fname'] = $founduser['F_Name'];
                    $user['pname'] = "";
                    $user['permissions'] = "";
                    $user['avatar'] = "";
                    $user['admin'] = 1;
                    $users[] = $user;
                }
                return $users;
            }
    } else {
        
    }
}

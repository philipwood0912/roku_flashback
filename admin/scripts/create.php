<?php
    function createUser($link, $name, $section, $avatar){
        $pdo = Database::getInstance()->getConnection();
        // check if there is any info in profile table according to profile link
        $check_query = 'SELECT * FROM tbl_profiles WHERE Profile_Link = :link';
        $check_exist = $pdo->prepare($check_query);
        $check_exist->execute(
            array(
                ':link'=>$link
            )
        );
        // if that returns less than 1 it means its their first profile
        if($check_exist->fetchColumn()<1){
            // first profile created is automatically set to admin
            // run insert query
            $admin = 1;
            $new_user_query = 'INSERT INTO tbl_profiles (Profile_Link, Profile_Name, Profile_Permissions, Profile_Avatar, Profile_Admin)';
            $new_user_query .= ' VALUES (:link, :name, :section, :avatar, :admin)';
            $new_user = $pdo->prepare($new_user_query);
            $new_user->execute(
                array(
                    ':link'=>$link,
                    ':name'=>$name,
                    ':section'=>$section,
                    ':avatar'=>$avatar,
                    ':admin'=>$admin
                )
            );
            // return array with original parameters 
            $firstuser = array();
            $firstuser['pname'] = $name;
            $firstuser['section'] = $section;
            $firstuser['avatar'] = $avatar;
            $firstuser['admin'] = $admin;
            return $firstuser;
        } else {
            // else it is not their first profile
            // auto set profile as not a admin and run insert query
            $admin = 0;
            $new_user_query = 'INSERT INTO tbl_profiles (Profile_Link, Profile_Name, Profile_Permissions, Profile_Avatar, Profile_Admin)';
            $new_user_query .= ' VALUES (:link, :name, :section, :avatar, :admin)';
            $new_user = $pdo->prepare($new_user_query);
            $new_user->execute(
                array(
                    ':link'=>$link,
                    ':name'=>$name,
                    ':section'=>$section,
                    ':avatar'=>$avatar,
                    ':admin'=>$admin
                )
            );
            // return array with original parameters
            $returnuser = array();
            $returnuser['pname'] = $name;
            $returnuser['section'] = $section;
            $returnuser['avatar'] = $avatar;
            $returnuser['admin'] = $admin;
            return $returnuser;
        }
    }
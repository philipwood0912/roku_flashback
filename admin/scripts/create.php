<?php
    function createUser($link, $name, $section, $avatar){
        $pdo = Database::getInstance()->getConnection();
        $check_query = 'SELECT * FROM tbl_profiles WHERE Profile_Link = :link';
        $check_exist = $pdo->prepare($check_query);
        $check_exist->execute(
            array(
                ':link'=>$link
            )
        );
        if($check_exist->fetchColumn()<1){
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
            $firstuser = array();
            $firstuser['pname'] = $name;
            $firstuser['section'] = $section;
            $firstuser['avatar'] = $avatar;
            $firstuser['admin'] = $admin;
            return $firstuser;
        } else {
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
            $returnuser = array();
            $returnuser['pname'] = $name;
            $returnuser['section'] = $section;
            $returnuser['avatar'] = $avatar;
            $returnuser['admin'] = $admin;
            return $returnuser;
        }
    }
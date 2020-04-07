<?php

    function editProfile($id, $name, $oldname, $avatar, $permissions, $admin){
        $pdo = Database::getInstance()->getConnection();
        $update_query = 'UPDATE tbl_profiles SET Profile_Name =:name,';
        $update_query .= ' Profile_Permissions =:permission, Profile_Avatar =:avatar,';
        $update_query .= ' Profile_Admin =:admin WHERE Profile_Link =:id AND Profile_Name =:oldname';
        $update_profile = $pdo->prepare($update_query);
        $update_profile->execute(
            array(
                ':name'=>$name,
                ':oldname'=>$oldname,
                ':avatar'=>$avatar,
                ':permission'=>$permissions,
                ':admin'=>$admin,
                ':id'=>$id
            )
        );
        $newprofile = array();
        $newprofile['pname'] = $name;
        $newprofile['avatar'] = $avatar;
        $newprofile['permissions'] = $permissions;
        $newprofile['admin'] = $admin;
        return $newprofile;
    }
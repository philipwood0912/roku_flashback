<?php

    function deleteProfile($pid){
        $pdo = Database::getInstance()->getConnection();
        $delete_query = 'DELETE FROM tbl_profiles WHERE Profile_ID =:pid';
        $delete_profile = $pdo->prepare($delete_query);
        $delete_success = $delete_profile->execute(
            array(
                ':pid'=>$pid
            )
        );
        if($delete_success){
            return "User Deleted!";
        } else {
            return "Something went wrong..";
        }
    }
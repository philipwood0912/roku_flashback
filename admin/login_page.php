<?php 
    require_once '../load.php';

    if(isset($_POST['email'])){
        $email = trim($_POST['email']);
        $password = trim($_POST['password']);

        if(!empty($email) && !empty($password)){
            //Log user in
            $message = login($email, $password);
        }else{
            $message = 'Please fill out the required field';
        }
        echo json_encode($message);
    }

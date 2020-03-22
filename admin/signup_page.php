<?php
    require_once '../load.php';
    if(isset($_POST['fname'])){
        $fname = trim($_POST['fname']);
        $lname = trim($_POST['lname']);
        $email = trim($_POST['email']);
        $password = trim($_POST['password']);
        $data = signup($fname, $lname, $email, $password);
        echo json_encode($data);
    }
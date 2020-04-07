<?php
    require_once '../load.php';
    if(isset($_POST['name'])){
        $id = trim($_POST['id']);
        $name = trim($_POST['name']);
        $oldname = $_POST['oldname'];
        $avatar = trim($_POST['avatar']);
        $permissions = trim($_POST['section']);
        $admin = trim($_POST['admin']);
        $newprofile = editProfile($id, $name, $oldname, $avatar, $permissions, $admin);
        echo json_encode($newprofile);
    }
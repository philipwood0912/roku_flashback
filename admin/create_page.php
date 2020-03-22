<?php
    require_once '../load.php';
    if(isset($_POST['name'])){
        $link = $_POST['link'];
        $name = trim($_POST['name']);
        $section = $_POST['section'];
        $avatar = $_POST['avatar'];
        $new_profile = createUser($link, $name, $section, $avatar);
        echo json_encode($new_profile);
    }
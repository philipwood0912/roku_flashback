<?php
    require_once '../load.php';
    if(isset($_GET['section'])){
        $section = $_GET['section'];
        $music_data = getMusic($section);
        echo json_encode($music_data);
    }
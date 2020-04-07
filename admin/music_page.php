<?php
    require_once '../load.php';
    if(isset($_GET['section'])){
        $section = $_GET['section'];
        //if($_GET['section'] == "General"){
            $music_data = getMusic($section);
        //} else {
            //$music_data = getMusic($section);
       // }
        echo json_encode($music_data);
    }
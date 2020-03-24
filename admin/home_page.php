<?php
require_once '../load.php';

if(isset($_GET['type'])){
    $type = $_GET['type'];
    $data = getHomeMoviesTv($type);
    echo json_encode($data);
    //var_dump($data);
}
<?php
require_once '../../load.php';

//$string = $_GET['type'];
$table = $_GET['table'];

$pdo = Database::getInstance()->getConnection();
$home_query = 'SELECT * FROM '.$table.' LIMIT 10';
//$home_query = 'SELECT * FROM `tbl_movie_tv` WHERE type =:hold LIMIT 10';
//$home_query = 'SELECT * FROM `tbl_movie_tv` WHERE (type REGEXP "movies") AND (date_added REGEXP "2019") AND (country REGEXP "states") LIMIT 40';
$home = $pdo->prepare($home_query);
$home->execute(
    array(
        ':hold'=>$table
    )
);
$result = array();
while($row = $home->fetch(PDO::FETCH_ASSOC)) {
    $result[] = $row;
}
echo json_encode($result, JSON_PRETTY_PRINT);
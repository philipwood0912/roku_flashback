<?php
    
    function getHomeMoviesTv($type){
        $pdo = Database::getInstance()->getConnection();

        $home_query = 'SELECT * FROM tbl_movies_tv WHERE (type REGEXP :hold) AND (country REGEXP "States") ORDER BY RAND() LIMIT 5';
        $home = $pdo->prepare($home_query);
        $success = $home->execute(
            array(
                ':hold'=>$type
            )
        );
        $result = array();
        while($row = $home->fetch(PDO::FETCH_ASSOC)) {
            $result[] = $row;
        }
        return $result;
    }
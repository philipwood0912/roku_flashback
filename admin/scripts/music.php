<?php

    function getMusic($section){
        $pdo = Database::getInstance()->getConnection();
        $music_query = 'SELECT * FROM tbl_music WHERE Band_Section =:section';
        $music_select = $pdo->prepare($music_query);
        $music_select->execute(
            array(
                ':section'=>$section
            )
        );
        $music_data = array();
        while($data = $music_select->fetch(PDO::FETCH_ASSOC)){
            $add_data = array();
            $add_data['artist'] = $data['Band_Name'];
            $add_data['album'] = $data['Band_Album'];
            $add_data['tracks'] = $data['Band_Tracks'];
            $add_data['image'] = $data['Band_Image'];
            $music_data[] = $add_data;
        }
        return $music_data;
    }
<?php 
    date_default_timezone_set('America/Toronto');
    ini_set('display_errors', 1);

    session_start();

    define('ABSPATH', __DIR__);
    define('ADMIN_PATH', ABSPATH.'/admin');
    define('ADMIN_SCRIPT_PATH', ADMIN_PATH.'/scripts');

    require_once ABSPATH.'/config/config.php';
    require_once ADMIN_SCRIPT_PATH.'/functions.php';
    require_once ADMIN_SCRIPT_PATH.'/login.php';
    require_once ADMIN_SCRIPT_PATH.'/signup.php';
    require_once ADMIN_SCRIPT_PATH.'/create.php';
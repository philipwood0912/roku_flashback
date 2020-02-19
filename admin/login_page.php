<?php
    session_start();
    require_once '../load.php';
    if(isset($_POST['submit'])){
        $username = trim($_POST['username']);
        $password = trim($_POST['password']);

        if(!empty($username) && !empty($password)){
            $message = login($username, $password);
            if($message){
                $_SESSION['loggedin'] == true;
                redirect_to('../index.php');
            }
        } else {
            $message = "Please fill out required fields";
        }
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php echo !empty($message)?$message:'';?>
    <form action="login_page.php" method="post">
        <label>Username:</label>
        <input name="username" type="text" value="">
        <label>Password:</label>
        <input name="password" type="password" value="">
        <button name="submit">Sign-In</button>
    </form>
</body>
</html>
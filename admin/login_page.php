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
    <link rel="stylesheet" href="../css/main.css">
    <title>Flashback Log-In</title>
</head>
<body id="login-body">
    <div id="login-content">
        <img src="../images/roku_logo.svg" alt="logo">
        <h2 id="login-title"><?php echo !empty($message)?$message:'Please Sign-In';?></h2>
        <form id="login" action="login_page.php" method="post">
            <label class="yo">Username</label>
            <input name="username" type="text" value="">
            <label>Password</label>
            <input name="password" type="password" value="">
            <button name="submit">Sign-In</button>
        </form>
        <a href="signup_page.php"><h2>Don't have an account?<br>Click to sign-up now</h2></a>
    </div>
</body>
</html>
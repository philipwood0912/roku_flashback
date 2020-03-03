<?php
    require_once '../load.php';
    if(isset($_POST['submit'])){
        $firstname = trim($_POST['firstname']);
        $lastname = trim($_POST['lastname']);
        $email = trim($_POST['email']);
        $conemail = trim($_POST['conemail']);
        $password = trim($_POST['password']);
        $conpassword = trim($_POST['conpassword']);
        if(!empty($firstname) && !empty($lastname) && !empty($email) && !empty($conemail) && !empty($password) && !empty($conpassword)){
            if($email === $conemail){
                if($password === $conpassword) {
                    $message = signup($firstname, $lastname, $email, $password);
                } else {
                    $message = "Passwords do not match";
                }
            } else {
                $message = "Emails do not match";
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
    <title>Flashback Sign-Up</title>
</head>
<body id="signup-body">
    <div id="signup-content">
        <img src="../images/roku_logo.svg" alt="logo">
        <h2 id="signup-title"><?php echo !empty($message)?$message:'Account Creation';?></h2>
        <form id="signup" action="signup_page.php" method="post">
            <label>First Name</label>
            <input name="firstname" type="text" value="">
            <label>Last Name</label>
            <input name="lastname" type="text" value="">
            <label>Email</label>
            <input name="email" type="email" value="">
            <label>Confirm Email</label>
            <input name="conemail" type="email" value="">
            <label>Password</label>
            <input name="password" type="password" value="">
            <label>Confirm Password</label>
            <input name="conpassword" type="password" value="">
            <button name="submit">Sign-Up</button>
        </form>
        <a href="login_page.php"><h2>Sign-In</h2></a>
    </div>
</body>
</html>
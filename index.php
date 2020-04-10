<?php 
    require_once 'load.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="images/favicon.ico" type="image/x-icon" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.css">
    <link href="https://fonts.googleapis.com/css?family=Oswald:200&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/main.css">
    <script src="https://unpkg.com/vue/dist/vue.js"></script>
    <script src="https://unpkg.com/vue-router/dist/vue-router.js"></script>
     <script src="https://unpkg.com/vue-cookies@1.7.0/vue-cookies.js"></script>
    <title>Flashback App</title>
</head>
<body>
    <main id="app">
            <div v-if="!mainlock">
                <mainhead :colorclass="'main-header-border'" :color="'#6c3c97'" :user="this.user"></mainhead>
            </div>
            <div v-else>
                <mainhead :colorclass="'kid-header-border'" :color="'#6FB270'" :user="this.user"></mainhead>
            </div>
        <router-view></router-view>
            <div v-if="!mainlock">
                <mainfoot :colorclass="'main-footer-border'" :color="'#6c3c97'"></mainfoot>
            </div>
            <div v-else>
                <mainfoot :colorclass="'kid-footer-border'" :color="'#6FB270'"></mainfoot>
            </div>
    </main>
    <script defer src="js/main.js" type="module"></script>
</body>
</html>
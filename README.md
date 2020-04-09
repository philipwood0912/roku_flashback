![Logo](images/roku_logo.svg)
# <span style="color:purple;">ROKU Flashback Application</span>

## Description

A video and audio application designed for Roku - browse Movies, TV Shows and Music from all decades!  

**For use on screen sizes larger than 768px**

### Features
* Account Sign-In / Sign-Up
* Custom Profiles + Avatars
* Admin Editing
* Search Bar for Movies + TV Shows
* TMDB Connection for Endless Movies and Shows
* Kids Area

**Check out the <a href="https://invis.io/RQWCOICTE73" target="_blank">Prototype</a>**

### Prerequisites

Web browser and MAMP/WAMP installed on computer.

## Getting Started

Change directories to either htdocs(Mac) or www(Windows) within MAMP/WAMP and clone the repo!
```
$ git clone https://github.com/philipwood0912/roku_flashback
```
### Installing

Navigate to phpMyAdmin in MAMP/WAMP and import database/db_flashback.sql into a database with the same name as file.

Or if you're a legend, install using command line.

####Example: Mac
Connect to mysql:
```
$ /Applications/MAMP/Library/bin/mysql -uroot -proot
```
Create / use database and import .sql file:
```
mysql> CREATE DATABASE db_flashback;
mysql> USE db_flashback;
mysql> SOURCE /Applications/MAMP/htdocs/roku_flashback/database/db_flashback.sql;
```
Congratulations, you've imported the database!

--------
## Deployment

If file was cloned into htdocs / www directory, navigate to MAMP/WAMP webpage and open up the website.

Or on a Mac navigate to URL:
```
http://localhost:8888/roku_flashback/
```

If file was cloned / database imported properly, you should see a login screen.

--------
## Built With

* <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">JavaScript</a>  
* <a href="https://vuejs.org/v2/api/" target="_blank">Vue.js</a>
* <a href="https://router.vuejs.org/api/" target="_blank">Vue-Router</a>
* <a href="https://www.npmjs.com/package/vue-cookies" target="_blank">Vue-Cookies</a>
* <a href="https://www.php.net/docs.php" target="_blank">PHP</a>
* <a href="https://dev.mysql.com/doc/" target="_blank">SQL</a>
* <a href="https://sass-lang.com/documentation" target="_blank">SASS</a>

--------------
## Issues

### Browser compatibility

* Chrome - 100%
* Firefox - 100%
* Safari - 100%
* IE - Unknown at the moment

## Authors

* **Philip Wood** ~ Developer
* **Brisk Yunus** ~ Designer

## Design / Development Documents

* <a href="https://drive.google.com/open?id=1fnphM3YjfE49DG0pja3jp-6gZ1Wdp7yJ" target="_blank">Design / Development Docs</a>


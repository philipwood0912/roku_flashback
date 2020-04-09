-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Apr 09, 2020 at 08:57 PM
-- Server version: 5.7.26
-- PHP Version: 7.3.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_flashback`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_music`
--

CREATE TABLE `tbl_music` (
  `Band_ID` int(11) NOT NULL,
  `Band_Name` varchar(63) NOT NULL,
  `Band_Album` varchar(63) NOT NULL,
  `Band_Tracks` text NOT NULL,
  `Band_Image` varchar(127) NOT NULL,
  `Band_Section` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_music`
--

INSERT INTO `tbl_music` (`Band_ID`, `Band_Name`, `Band_Album`, `Band_Tracks`, `Band_Image`, `Band_Section`) VALUES
(1, 'A Tribe Called Quest', 'The Low End Theory', '1. Excursions^2. Buggin’ Out^3. Rap Promoter^4. Butter^5. Verses From The Abstract^6. Show Business^7. Vibes and Stuff^8. The Infamous Date Rape^9. Check The Rhime^10. Everything Is Fair^11. Jazz (We’ve Got)^12. Skypager^13. What?^14. Scenario', 'a-tribe-called-quest_the-low-end-theory.jpg', 'General'),
(2, 'ACDC', 'Back in Black', '1. Hells Bells^2. Shoot to Thrill^3. What Do You Do For Money Honey^4. Givin The Dog A Bone^5. Let Me Put My Love into You^6. Back in Black^7. You Shook Me All Night Long^8. Have A Drink On Me^9. Shake A Leg^10. Rock and Roll Ain’t Noise Pollution', 'acdc_back-in-black.jpg', 'General'),
(3, 'Bob Dylan', 'Freewheelin', '1. Blowin’ in the Wind^2. Girl From the North Country^3. Master of War^4. Down the Highway^5. Bob Dylan’s Blues^6. A Hard Rain’s A-Gonna Fall^7. Don’t Think Twice, It’s All Right^8. Bob Dylan’s Dream^9. Oxford Town^10. Talking Walk War III Blues^11. Corrina, Corrina^12. Honey, Just Allow Me One More Chance^13. I Shall Be Free', 'bob-dylan_freewheelin.jpg', 'General'),
(4, 'Elton John', 'Elton John', '1. Your Song^2. I Need You to Turn To^3. Take Me to the Pilot^4. No Shoe Strings on Louise^5. First Episode at Hienton^6. Sixty Years On^7. Border Song^8. The Greatest Discovery^9. The Cage^10. The King Must Die', 'elton-john_elton-john.jpg', 'General'),
(5, 'Jimi Hendrix', 'Band of Gypsys', '1. Who Knows^2. Machine Gun^3. Changes^4. Power to Love^5. Message of Love^6. We Gotta Live Together^7. Hear My Train A Comin^8. Foxy Lady^9. Stop', 'jimi-hendrix_band-of-gypsys.jpg', 'General'),
(6, 'Michael Jackson', 'Thriller', '1. Wanna Be Startin’ Something^2. Baby Be Mine^3. The Girl Is Mine^4. Thriller^5. Beat It^6. Billie Jean^7. Human Nature^8. P.Y.T^9. The Lady in My Life', 'michael-jackson_thriller.jpg', 'General'),
(7, 'N.W.A.', 'Straight Outta Compton', '1. Straight Outta Compton^2. Fuck Tha Police^3. Gangsta Gangsta^4. If It Ain’t Ruff^5. Parental Discretion Iz Advised^6. Express Yourself^7. Compton’s N the House^8. I Ain’t tha 1^9. Dopeman^10. Quiet on tha Set', 'nwa_straight-outta-compton.jpg', 'General'),
(8, 'Pink Floyd', 'The Dark Side of the Moon', '1. Speak to Me^2. On the Run^3. Time^4. The Great Gig in the Sky^5. Money^6. Us and Them^7. Any Colour You Like^8. Brain Damage^9. Eclipse', 'pink-floyd_the-dark-side-of-the-moon.jpg', 'General'),
(9, 'Queen', 'Queen II', '1. Procession^2. Father to Son^3. White Queen (As It Begins)^4. Some Day One Day^5. The Loser in the End^6. Ogre Battle^7. The Fairy Feller’s Master-Stroke^8. Nevermore^9. The March of the Black Queen^10. Funny How Love Is^11. Seven Seas of Rhye^12. See What a Fool I’ve Been', 'queen_queen-ll.jpg', 'General'),
(10, 'Slick Rick', 'The Great Adventures of Slick Rick', '1. Treat Her A Prostitute^2. The Ruler’s Back^3. Children’s Story^4. Moment I Feared^5. Let’s Get Crazy^6. Indian Girl (An Adult Story)^7. Teenage Love^8. Mona Lisa^9. Kit (What’s the Scoop)^10. Hey Young World^11. Teacher, Teacher^12. Lick the Balls', 'slick-rick_the-great-adventures-of-slick-rick.jpeg', 'General'),
(11, 'The Beatles', 'A Hard Days Night', '1. A Hard Day’s Night^2. Tell Me Why^3. I’ll Cry Instead^4. I Should Have Known Better^5. I’m Happy Just to Dance with You^6. And I Love Her^7. If I Fell^8. And I Love Her^9. Ringo’s Theme^10. Can’t Buy Me Love^11. A Hard Day’s Night', 'the-beatles_a-hard-days-night.jpg', 'General'),
(12, 'The Wiggles', 'Big Red Car', '1. Wags the Dog^2. Henry’s Dance^3. Five Little Joeys^4. Can You (Point Your Fingers and do The Twist)^5. Di Dicki Do Dum^6. Cow^7. I’m a Cow^8. Bouncing Ball^9. Dorothy’s Dance Party^10. The Four Presents', 'the-wiggles_big-red-car.jpg', 'Kids'),
(13, 'Kidz Bop', 'Kidz Bop Vol. #1', '1. All Star^2. Steal My Sunshine^3. Bye Bye Bye^4. My Love Is Your Love^5. Slide^6. Livin La Vida Loca^7. Fly^8. Bring It All To Me^9. Believe^10. One Week^11. What A Girl Wants', 'kidz-bop_kidz-bop-vol-1.jpg', 'Kids'),
(14, 'Justin Bieber', 'My World', '1. One Time^2. Favourite Girl^3. Down To Earth^4. Bigger^5. One Less Lonely Girl^6. First Dance^7. Love Me^8. Common Denominator^9. Baby^10. Somebody To Love^11. Stuck In The Moment^12. U Smile^13. Runaway Love', 'justin-bieber_my-world.jpg', 'Kids'),
(15, 'Sesame Street', 'A Sesame Street Christmas', '1. Sesame Street Christmas Overture^2. We Wish You A Merry Christmas^3. Deck the Halls^4. I Hate Christmas^5. Have Yourself A Merry Little Christmas^6. Twelve Days^7. A True-Blue Miracle^8. All I Want for Christmas is My Two Front Teeth', 'sesame-street_a-sesame-street-christmas.jpg', 'Kids'),
(16, 'One Direction', 'Up All Night', '1. What Makes You Beautiful^2. Gotta Be You^3. One Thing^4. More Than This^5. Up All Night^6. I Wish^7. Tell Me a Lie^8. Taken^9. I Want^10. Everything About You^11. Same Mistakes^12. Save you Tonight^13. Stole My Heart', 'one-direction_up-all-night.jpg', 'Kids'),
(17, 'Ziggy Marley', 'Family Time', '1. Family Time^2. I Love You Too^3. Cry, Cry, Cry^4. Take Me to Jamaica^5. Ziggy Says^6. This Train^7. Wings of an Eagle^8. ABC^9. Hold Em Joe^10. Walk Tall^11. Future Man, Future Lady^12. Cause I Los My Helping Hand', 'ziggy-marley_family-time.jpg', 'Kids'),
(18, 'Peppa Pig', 'My First Album', '1. It’s Peppa Pig^2. Bing Bong Zoo^3. Let’s Get Ready!^4. Expert Daddy Pig^5. Rainbow, Rainbow^6. Super Potato’s Theme^7. Peppa And Friends^8. The Class of Madame Gazelle^9. Festival Fun!^10. Jumping In Muddy Puddles^11. Holidays!^12. Traffic^13. Balloon Ride', 'peppa-pig_my-first-album.jpg', 'Kids'),
(19, 'They Might Be Giants', 'Here Comes Science', '1. Science Is Real^2. Meet the Elements^3. I Am a Paleontologist^4. The Bloodmobile^5. Electric Car^6. My Brother the Ape^7. What Is a Shooting Star?^8. How Many Plants?^9. Roy G. Biv^10. Put It to the Test^11. Photosynthesis^12. Cells^13. Speed and Velocity', 'they-might-be-giants_here-comes-science.jpg', 'Kids'),
(20, 'Katy Perry', 'Teenage Dream', '1. Teenage Dream^2. Last Friday Night^3. California Gurls^4. Firework^5. Peacock^6. Circle The Drain^7. The One That Got Away^8. E.T.^9. Peal^10. Not Like The Movies^11. Part of Me^12. Wide Awake^13. Dressin’ Up', 'katy-perry_teenage-dream.jpg', 'General'),
(21, 'Taylor Swift', 'Beautiful Eyes', '1. Beautiful Eyes^2. Should’ve Said No^3. Teardrops on My Guitar^4. Picture to Burn^5. I’m Only Me When I’m With You^6. I Heart?', 'taylor-swift_beautiful-eyes.jpg', 'General');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_profiles`
--

CREATE TABLE `tbl_profiles` (
  `ID` int(11) NOT NULL,
  `Profile_Link` int(11) NOT NULL,
  `Profile_Name` varchar(64) NOT NULL,
  `Profile_Permissions` tinyint(1) NOT NULL,
  `Profile_Avatar` varchar(128) NOT NULL,
  `Profile_Admin` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_profiles`
--

INSERT INTO `tbl_profiles` (`ID`, `Profile_Link`, `Profile_Name`, `Profile_Permissions`, `Profile_Avatar`, `Profile_Admin`) VALUES
(1, 1, 'Philip', 1, 'pokeball.svg', 1),
(2, 1, 'Kidz', 0, 'chicken.svg', 0),
(3, 1, 'General', 1, 'smile.svg', 0),
(4, 2, 'Brisky', 1, 'sick.svg', 1);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_users`
--

CREATE TABLE `tbl_users` (
  `ID` int(11) NOT NULL,
  `F_Name` varchar(40) NOT NULL,
  `L_Name` varchar(40) NOT NULL,
  `User_Email` varchar(60) NOT NULL,
  `User_Pass` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `tbl_users`
--

INSERT INTO `tbl_users` (`ID`, `F_Name`, `L_Name`, `User_Email`, `User_Pass`) VALUES
(1, 'Philip', 'Wood', 'philipwood0912@gmail.com', 'imsofly'),
(2, 'Brisk', 'Yunus', 'briskyboy@gmail.com', '123');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_music`
--
ALTER TABLE `tbl_music`
  ADD PRIMARY KEY (`Band_ID`);

--
-- Indexes for table `tbl_profiles`
--
ALTER TABLE `tbl_profiles`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `tbl_users`
--
ALTER TABLE `tbl_users`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_music`
--
ALTER TABLE `tbl_music`
  MODIFY `Band_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `tbl_profiles`
--
ALTER TABLE `tbl_profiles`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_users`
--
ALTER TABLE `tbl_users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

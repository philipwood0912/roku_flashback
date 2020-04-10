export default {
        props: ['colorclass', 'color', 'user'],
        template: `
        <div v-if="this.$parent.profilepick" :class="'main-header ' + colorclass">
            <div v-if="!this.$parent.mainlock">
            <img class="logo-image" src="images/roku_logo.svg" alt="logo">
            </div>
            <div v-else>
            <img class="logo-image" src="images/kids_logo.svg" alt="logo">
            </div>
            <div class="header-content">
                <div class="main-content">
                    <div v-if="!this.$parent.mainlock">
                        <div id="search">
                            <select v-model="choice">
                                <option value="">Choose</option>
                                <option value="movie">Movies</option>
                                <option value="tv">TV Shows</option>
                            </select>
                            <input v-model="searchBar" :placeholder="this.searchmessage">
                            <button class="headerButton" @mouseover="$parent.hovEff($event.currentTarget)" @mouseout="$parent.hovEff($event.currentTarget)" v-on:click="search(searchBar, choice)"><i class="fas fa-search fa-2x" :style="{color: color}"></i></button>
                        </div>
                    </div> 
                    <div v-if="!this.$parent.adminlock">
                        <button class="headerButton" @mouseover="$parent.hovEff($event.currentTarget)" @mouseout="$parent.hovEff($event.currentTarget)" v-on:click="accountSetting()"><i class="fas fa-cog fa-2x" :style="{color: color}"></i></button>
                    </div>
                    <button class="headerButton" @mouseover="$parent.hovEff($event.currentTarget)" @mouseout="$parent.hovEff($event.currentTarget)" v-on:click="profilePicker()"><img class="userIcon" :src="'images/user/' + this.avatarcheck"></button>
                    <button class="headerButton" @mouseover="$parent.hovEff($event.currentTarget)" @mouseout="$parent.hovEff($event.currentTarget)" v-on:click="logout()" id="logout" name="logout"><i class="fas fa-sign-out-alt fa-2x" :style="{color: color}"></i></button>
                </div>
                <div class="nav" v-if="!this.$parent.mainlock">
                    <router-link to="/home">Home</router-link>
                    <router-link to="/movies">Movies</router-link>
                    <router-link to="/tv">TV-Shows</router-link>
                    <router-link to="/music">Music</router-link>
                </div>
            </div> 
        </div>
        <div v-else></div>`,
        data: function() {
            return {
                searchBar: "",
                choice: "",
                searchmessage: "Search"
            }
        },
        methods: {
            // account setting function
            // set profilepick to false - route to account page
            accountSetting() {
                this.$parent.profilepick = false;
                this.$router.push('/account');
            },
            // logout function
            // reset all variables - cookies will reset on login page creation
            logout(){
                this.$parent.authenticated = false;
                this.$parent.profilepick = false;
                this.$parent.isadmin = false;
                this.$parent.permissions = false;
                this.$parent.users = [];
                this.$parent.user = {};
                this.$router.push('/login');
            },
            // profilePicker function
            // reset currentuser array and profilepick
            profilePicker() {
                this.$parent.user = {};
                this.$parent.profilepick = false;
            },
            // search function - takes 2 parameters
            // str - input string being searched, type - type of media, either movie or tv
            search(str, type){
                // make sure searchArr is clear
                this.$parent.searchArr = [];
                // if str and type empty - set message
                if(str == "" && type == "" ){
                    this.searchmessage = "Nothing found.. go figure";
                // else if str empty and type is not - set message and reset type
                } else if(str == "" && type != ""){
                    this.searchmessage = "Please type something..";
                    this.choice = "";
                // else if type empty and str is not - set message and reset str
                } else if(str != "" && type == ""){
                    this.searchmessage = "Movie or TV Show??";
                    this.searchBar = "";
                // else run search fetch
                } else {
                    let url;
                    // URI encode str to be used in fetch
                    let strEncode = encodeURI(str);
                    // if type = movie set url else set other url
                    if(type === "movie"){
                        url = `https://api.themoviedb.org/3/search/movie?api_key=6c056957a2e9be6e0e41a303073bae05&language=en-US&query=${strEncode}&page=1&include_adult=false&region=US`;
                    } else {
                        url = `https://api.themoviedb.org/3/search/tv?api_key=6c056957a2e9be6e0e41a303073bae05&language=en-US&page=1&query=${strEncode}&include_adult=false`
                    }
                    fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        for(var i = 0; i < data.results.length; i++){
                            if(data.results[i].poster_path == null){
                                continue;
                            } else{
                                this.$parent.searchArr.push(data.results[i]);
                            }
                        }
                        // if router currentPath is not equal to whats being searched, route to page
                        // prevents router from trying to route to same page
                        if(this.$router.currentRoute.path != `/search/${type}/${str}`){
                            this.$router.push({path:`/search/${type}/${str}`});
                        }
                    })
                    .catch(err => console.log(err))
                }
            }
        },
        // set avatar with computed function
        // if no user set, return default pic
        // prevents errors after login before one has picked their profile
        computed: {
            avatarcheck: function(){
                if(this.user == null){
                    return "default.svg";
                } else {
                    return this.user.avatar;
                }
            }
        },
}
export default {
        props: ['colorclass', 'color'],
        template: `
        <div v-if="this.$parent.profilepick" :class="'main-header ' + colorclass">
            <div v-if="!mainlock">
            <img class="logo-image" src="images/roku_logo.svg" alt="logo">
            </div>
            <div v-else>
            <img class="logo-image" src="images/kids_logo.svg" alt="logo">
            </div>
            <div class="header-content">
                <div class="main-content">
                    <div v-if="!mainlock">
                        <div id="search">
                            <select v-model="choice">
                                <option value="">Choose</option>
                                <option value="movie">Movies</option>
                                <option value="tv">TV Shows</option>
                            </select>
                            <input v-model="searchBar" :placeholder="this.searchmessage">
                            <button v-on:click="search(searchBar, choice)"><i class="fas fa-search fa-2x" :style="{color: color}"></i></button>
                        </div>
                    </div> 
                    <div v-if="!adminlock">
                        <button><i class="fas fa-cog fa-2x" style="color:#6c3c97;"></i></button>
                    </div>
                    <button v-on:click="profilePicker()"><i class="fas fa-user fa-2x" :style="{color: color}"></i></button>
                    <button v-on:click="logout()" id="logout" name="logout"><i class="fas fa-sign-out-alt fa-2x" :style="{color: color}"></i></button>
                </div>
                <div class="nav">
                    <div v-if="!mainlock">
                        <router-link to="/home">Home</router-link>
                        <router-link to="/movies">Movies</router-link>
                        <router-link to="/tv">TV-Shows</router-link>
                        <router-link to="/music">Music</router-link>
                    </div>
                    <div v-else>
                        <router-link to="/kids">Kids</router-link>
                    </div>
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
            logout(){
                this.$parent.authenticated = false;
                this.$parent.profilepick = false;
                this.$parent.users = [];
                this.$parent.user = {};
                this.$router.push('/login');
            },
            profilePicker() {
                this.$parent.user = {};
                this.$parent.profilepick = false;
            },
            search(str, type){
                this.$parent.searchArr = [];
                if(str == "" && type == "" ){
                    this.searchmessage = "Nothing found.. go figure";

                } else if(str == "" && type != ""){
                    this.searchmessage = "Please type something..";
                    this.choice = "";

                } else if(str != "" && type == ""){
                    this.searchmessage = "Movie or TV Show??";
                    this.searchBar = "";

                } else {
                    let url;
                    let strEncode = encodeURI(str);
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
                        this.$router.push({path:`/search/${type}/${str}`});
                    })
                    .catch(err => console.log(err))
                }
            }
        },
        computed: {
            mainlock: function(){
                if(this.$parent.isadmin && this.$parent.permissions == true || !this.$parent.isadmin && this.$parent.permissions == true){
                    return false;
                } else {
                    return true;
                }
            },
            adminlock: function(){
                if(this.$parent.isadmin == true){
                    return false;
                } else {
                    return true;
                }
            }
        },
}
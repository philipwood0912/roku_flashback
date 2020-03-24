import ProfileComponent from './ProfileComponent.js';
import PopupComponent from './PopupComponent.js';
import LeftButton from './LeftButton.js';
import RightButton from './RightButton.js';
export default {
    template: `
        <div v-if="this.$parent.profilepick">
        <div id="home-content">
            <h2 class="title">Movies</h2>
            <div class="home-content">
                <div class="home-wrp">
                    <popup v-for="(movie, index) in movies" :array="this.movies" :movie="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="home-buttons">
                    <left :array="this.movies"></left>
                    <right :array="this.movies"></right>
                </div>
            </div>
            </div>
            <h2 class="title">TV-Shows</h2>
            <div class="home-content">
                <div class="home-wrp">
                    <div class="content" v-for="(tv, index) in tvshows" :key="index">
                    <div class="poster" v-on:click="showInfo($event, $event.path[3], index)">
                        <img :src="getImgUrl(tv.poster_path)" alt="movie poster">
                            <div class="content-info">
                                <transition name="popup">
                                <div v-if="popupComputed" class="poster-info">
                                    <img :src="getBckUrl(tv.backdrop_path)" alt="backdrop"">
                                    <div class="poster-info-con">
                                        <h2>{{tv.name}}</h2>
                                        <h3>{{tv.first_air_date}}</h3>
                                        <h4>Score: {{tv.vote_average}}</h4>
                                        <p>{{tv.overview}}</p>
                                    </div>
                                </div>
                                <div v-else></div>
                                </transition>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
        <div v-else>
        <profiles></profiles>
        </div>
    `,
    components: {
        //user: UserComponent
        profiles: ProfileComponent,
        popup : PopupComponent,
        right: RightButton,
        left: LeftButton
    },
    data: function() {
        return {
            movies: [],
            tvshows: [],
            music: [],
            movieclick: 0,
            showinfo: "",
            current: []
        }
    },
    computed: {
        popupComputed: function(el){
            //debugger;
        },
    },
    methods: {
        pullTopMovies(arr){
            let url = `https://api.themoviedb.org/3/movie/top_rated?api_key=6c056957a2e9be6e0e41a303073bae05&language=en-US&page=1&region=US`;
            fetch(url)
            .then(res => res.json())
            .then(data => {
                for(var i=0; i<data.results.length; i++){
                    arr.push(data.results[i]);
                }
            })
            .catch(err => console.log(err))
            console.log(arr);
        },
        pullTopShows(arr){
            let url = `https://api.themoviedb.org/3/tv/top_rated?api_key=6c056957a2e9be6e0e41a303073bae05&language=en-US&page=1`;
            fetch(url)
            .then(res => res.json())
            .then(data => {
                for(var i=0; i<data.results.length; i++){
                    arr.push(data.results[i]);
                }
            })
            .catch(err => console.log(err))
            console.log(arr);
        },
        pullInformation(str, arr){
            let url = `./admin/home_page.php?type=${str}`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    var i;
                    for(i=0; i<data.length; i++){
                        //arr1.push(data[i].title);
                        this.pullPosters(data[i].title, str, arr);
                    }
                    console.log(data);
                })
                .catch(err => {console.log(err)})
        },
        pullPosters(str, str2, arr){
            let dex = encodeURI(str);
            let url = `https://api.themoviedb.org/3/search/${str2}?api_key=6c056957a2e9be6e0e41a303073bae05&language=en-US&query=${dex}&page=1&include_adult=false`;
            fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                debugger;
                for(var i=0;i<data.results.length;i++){
                    if(data.results[i].poster_path === null){
                        continue;
                    } else {
                        let movOne = this.posterCheck(str, data.results[i].title);
                        let movTwo = this.posterCheck(str, data.results[i].original_title);
                        if(movOne === true || movTwo === true){
                        arr.push(data.results[i]);
                        debugger;
                        break
                        } else {
                            let tvOne = this.posterCheck(str, data.results[i].name);
                            let tvTwo = this.posterCheck(str, data.results[i].original_name);
                            if(tvOne === true || tvTwo === true){
                                arr.push(data.results[i]);
                                debugger;
                                break;
                            } else {
                                debugger;
                            }
                        }
                    }
                }
            })
            .catch(err => console.log(err))
            //console.log(arr);
        },
        posterCheck(str1, str2) {
            let regex = new RegExp(`[^${str1}$]`, "i");
            let match = regex.test(str2);
            if(match === true){
              return true
            }
        },
        getImgUrl(path){
            return "https://image.tmdb.org/t/p/w300" + path + "";
        },
        getBckUrl(path){
            return "https://image.tmdb.org/t/p/w780" + path + "";
        },
    },
    created: function() {
        // this.pullInformation("movie", this.movies);
        // this.pullInformation("tv", this.tvshows);
        this.pullTopMovies(this.movies);
        this.pullTopShows(this.tvshows);
    }
}
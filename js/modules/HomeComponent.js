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
                        <popup v-for="(movie, index) in movies" :obj="movie" :key="index" :offset="index">
                        </popup>
                    </div>
                    <div class="home-buttons">
                        <left :num="1" :array="this.movies"></left>
                        <right :num="0" :array="this.movies"></right>
                    </div>
                </div>
                <h2 class="title">Movies</h2>
                <div class="home-content">
                    <div class="home-wrp">
                        <popup v-for="(show, index) in tvshows" :obj="show" :key="index" :offset="index">
                        </popup>
                    </div>
                    <div class="home-buttons">
                        <left :num="3" :array="this.tvshows"></left>
                        <right :num="2" :array="this.tvshows"></right>
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
            showinfo: ""
        }
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
                    delete Object.assign(arr[i], {['release_date']: arr[i]['first_air_date'] })['first_air_date'];
                    delete Object.assign(arr[i], {['title']: arr[i]['name'] })['name'];
                }
            })
            .catch(err => console.log(err))
            console.log(arr);
        },
        getImgUrl(path){
            return "https://image.tmdb.org/t/p/w300" + path + "";
        },
        getBckUrl(path){
            return "https://image.tmdb.org/t/p/w780" + path + "";
        },
    },
    created: function() {
        this.pullTopMovies(this.movies);
        this.pullTopShows(this.tvshows);
    }
}
import ProfileComponent from './ProfileComponent.js';
import PopupComponent from './PopupComponent.js';
import LeftButton from './LeftButton.js';
import RightButton from './RightButton.js';
export default {
    template: `
        <div v-if="this.$parent.profilepick">
            <div class="content-body">
                <div class="title-wrp main-border-half">
                <h2 class="title main-border-less main-text-color">Top Movies - 2000s</h2>
                </div>
                <div class="content-main">
                    <div class="content-wrp main-border-full">
                        <popup class="main-popup" v-for="(movie, index) in movies" :type="true" :obj="movie" :key="index" :offset="index">
                        </popup>
                    </div>
                    <div class="content-buttons">
                        <left @hover="$parent.hovEff" :num="1" :match="0" :array="this.movies" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></left>
                        <right @hover="$parent.hovEff" :num="0" :match="1" :array="this.movies" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></right>
                    </div>
                </div>
                <div class="title-wrp main-border-half">
                <h2 class="title main-border-less main-text-color">Top Shows - 2000s</h2>
                </div>
                <div class="content-main">
                    <div class="content-wrp main-border-full">
                        <popup class="main-popup" v-for="(show, index) in tvshows" :type="false" :obj="show" :key="index" :offset="index">
                        </popup>
                    </div>
                    <div class="content-buttons">
                        <left @hover="$parent.hovEff" :num="3" :match="2" :array="this.tvshows" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></left>
                        <right @hover="$parent.hovEff" :num="2" :match="3" :array="this.tvshows" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></right>
                    </div>
                </div>
                <div class="title-wrp main-border-half">
                    <h2 class="title main-border-less main-text-color"></h2>
                </div>
            </div>
        </div>
        <div v-else>
        <profiles></profiles>
        </div>
    `,
    components: {
        profiles: ProfileComponent,
        popup: PopupComponent,
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
        // pull top movie function - takes an array to push to as parameter
        pullTopMovies(arr){
            let url = `https://api.themoviedb.org/3/discover/movie?api_key=6c056957a2e9be6e0e41a303073bae05&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=2000-01-01&primary_release_date.lte=2019-12-31&vote_average.gte=8&vote_average.lte=10&without_genres=16%2C%2010751`;
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
        // pull top shows function - takes an array to push to as parameter
        pullTopShows(arr){
            let url = `https://api.themoviedb.org/3/discover/tv?api_key=6c056957a2e9be6e0e41a303073bae05&language=en-US&sort_by=popularity.desc&first_air_date.gte=2000-01-01&first_air_date.lte=2019-12-31&page=1&timezone=America%2FNew_York&vote_average.gte=8&without_genres=16%2C%2010751&include_null_first_air_dates=false`;
            fetch(url)
            .then(res => res.json())
            .then(data => {
                for(var i=0; i<data.results.length; i++){
                    arr.push(data.results[i]);
                }
            })
            .catch(err => console.log(err))
            console.log(arr);
        }
    },
    created: function() {
        this.pullTopMovies(this.movies);
        this.pullTopShows(this.tvshows);
    },
}
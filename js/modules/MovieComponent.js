import ProfileComponent from './ProfileComponent.js';
import PopupComponent from './PopupComponent.js';
import LeftButton from './LeftButton.js';
import RightButton from './RightButton.js';
export default {
    template: `
    <div v-if="this.$parent.profilepick">
        <div id="home-content">
            <h2 class="title">Movies 2000s</h2>
            <div class="home-content">
                <div class="home-wrp">
                    <popup v-for="(movie, index) in this.moviesTen" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="home-buttons">
                    <left :num="1" :array="this.moviesTen"></left>
                    <right :num="0" :array="this.moviesTen"></right>
                </div>
            </div>
            <h2 class="title">Movies 1990s</h2>
            <div class="home-content">
                <div class="home-wrp">
                    <popup v-for="(movie, index) in this.moviesNine" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="home-buttons">
                    <left :num="1" :array="this.moviesNine"></left>
                    <right :num="0" :array="this.moviesNine"></right>
                </div>
            </div>
            <h2 class="title">Movies 1980s</h2>
            <div class="home-content">
                <div class="home-wrp">
                    <popup v-for="(movie, index) in this.moviesEight" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="home-buttons">
                    <left :num="1" :array="this.moviesEight"></left>
                    <right :num="0" :array="this.moviesEight"></right>
                </div>
            </div>
            <h2 class="title">Movies 1970s</h2>
            <div class="home-content">
                <div class="home-wrp">
                    <popup v-for="(movie, index) in this.moviesSeven" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="home-buttons">
                    <left :num="1" :array="this.moviesSeven"></left>
                    <right :num="0" :array="this.moviesSeven"></right>
                </div>
            </div>
            <h2 class="title">Movies 1960s</h2>
            <div class="home-content">
                <div class="home-wrp">
                    <popup v-for="(movie, index) in this.moviesSix" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="home-buttons">
                    <left :num="1" :array="this.moviesSix"></left>
                    <right :num="0" :array="this.moviesSix"></right>
                </div>
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
    data: function(){
        return {
            moviesTen: [],
            moviesNine: [],
            moviesEight: [],
            moviesSeven: [],
            moviesSix: [],
            showinfo: ""
        }
    },
    methods: {
        pullMovies(int1, int2, arr){
            let url = `https://api.themoviedb.org/3/discover/movie?api_key=6c056957a2e9be6e0e41a303073bae05&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${int1}-01-01&primary_release_date.lte=${int2}-12-31&vote_average.gte=7&vote_average.lte=10&without_genres=16%2C%2010751`;
            fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                for(var i = 0; i < data.results.length; i++){
                    arr.push(data.results[i]);
                }
            })
            .catch(err => console.log(err))
        },
        getImgUrl(path){
            return "https://image.tmdb.org/t/p/w300" + path + "";
        },
        getBckUrl(path){
            return "https://image.tmdb.org/t/p/w780" + path + "";
        },
    },
    created: function() {
        this.pullMovies(2000, 2019, this.moviesTen);
        this.pullMovies(1990, 1999, this.moviesNine);
        this.pullMovies(1980, 1989, this.moviesEight);
        this.pullMovies(1970, 1979, this.moviesSeven);
        this.pullMovies(1960, 1969, this.moviesSix);
    }

}
import ProfileComponent from './ProfileComponent.js';
import PopupComponent from './PopupComponent.js';
import LeftButton from './LeftButton.js';
import RightButton from './RightButton.js';
export default {
    template: `
    <div v-if="this.$parent.profilepick">
        <div class="content-body">
            <div class="title-wrp main-border-half">
                <h2 class="title main-border-less main-text-color">Movies - 2000s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp main-border-full">
                    <popup v-for="(movie, index) in this.moviesTen" :type="true" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left :num="1" :array="this.moviesTen" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></left>
                    <right :num="0" :array="this.moviesTen" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></right>
                </div>
            </div>
            <div class="title-wrp main-border-half">
            <h2 class="title main-border-less main-text-color">Movies - 1990s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp main-border-full">
                    <popup v-for="(movie, index) in this.moviesNine" :type="true" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left :num="3" :array="this.moviesNine" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></left>
                    <right :num="2" :array="this.moviesNine" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></right>
                </div>
            </div>
            <div class="title-wrp main-border-half">
            <h2 class="title main-border-less main-text-color">Movies - 1980s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp main-border-full">
                    <popup v-for="(movie, index) in this.moviesEight" :type="true" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left :num="5" :array="this.moviesEight" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></left>
                    <right :num="4" :array="this.moviesEight" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></right>
                </div>
            </div>
            <div class="title-wrp main-border-half">
            <h2 class="title main-border-less main-text-color">Movies - 1970s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp main-border-full">
                    <popup v-for="(movie, index) in this.moviesSeven" type="true" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left :num="7" :array="this.moviesSeven" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></left>
                    <right :num="6" :array="this.moviesSeven" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></right>
                </div>
            </div>
            <div class="title-wrp main-border-half">
            <h2 class="title main-border-less main-text-color">Movies - 1960s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp main-border-full">
                    <popup v-for="(movie, index) in this.moviesSix" :type="true" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left :num="9" :array="this.moviesSix" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></left>
                    <right :num="8" :array="this.moviesSix" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></right>
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
        }
    },
    created: function() {
        this.pullMovies(2000, 2019, this.moviesTen);
        this.pullMovies(1990, 1999, this.moviesNine);
        this.pullMovies(1980, 1989, this.moviesEight);
        this.pullMovies(1970, 1979, this.moviesSeven);
        this.pullMovies(1960, 1969, this.moviesSix);
    }

}
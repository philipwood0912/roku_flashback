import ProfileComponent from './ProfileComponent.js';
import PopupComponent from './PopupComponent.js';
import LeftButton from './LeftButton.js';
import RightButton from './RightButton.js';
export default {
    template: `
    <div v-if="this.$parent.profilepick">
        <div class="content-body">
            <div class="title-wrp kid-border-half kid-text-color">
            <h2 class="title kid-border-less">Kids Movies - 2000s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp kid-border-full">
                    <popup v-for="(movie, index) in kidsMoviesNew" type="true" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left :num="1" :array="this.kidsMoviesNew" :color="'#6FB270'"></left>
                    <right :num="0" :array="this.kidsMoviesNew" :color="'#6FB270'"></right>
                </div>
            </div>
            <div class="title-wrp kid-border-half">
            <h2 class="title kid-border-less kid-text-color">Kids Movies - 80s 90s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp kid-border-full">
                    <popup v-for="(show, index) in kidsMoviesOld" type="true" :obj="show" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left :num="3" :array="this.kidsMoviesOld" :color="'#6FB270'"></left>
                    <right :num="2" :array="this.kidsMoviesOld" :color="'#6FB270'"></right>
                </div>
            </div>
            <div class="title-wrp kid-border-half">
            <h2 class="title kid-border-less kid-text-color">Kids Shows - 2000s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp kid-border-full">
                    <popup v-for="(movie, index) in kidsShowsNew" type="false" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left :num="1" :array="this.kidsShowsNew" :color="'#6FB270'"></left>
                    <right :num="0" :array="this.kidsShowsNew" :color="'#6FB270'"></right>
                </div>
            </div>
            <div class="title-wrp kid-border-half">
            <h2 class="title kid-border-less kid-text-color">Kids Shows - 80s 90s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp kid-border-full">
                    <popup v-for="(show, index) in kidsShowsOld" type="false" :obj="show" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left :num="3" :array="this.kidsShowsOld" :color="'#6FB270'"></left>
                    <right :num="2" :array="this.kidsShowsOld" :color="'#6FB270'"></right>
                </div>
            </div>
            <div class="title-wrp kid-border-half">
                <h2 class="title kid-border-less kid-text-color"></h2>
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
            kidsMoviesNew: [],
            kidsMoviesOld: [],
            kidsShowsNew: [],
            kidsShowsOld: [],
            showinfo: ""
        }
    },
    methods: {
        pullKidsMovies(int1, int2, arr){
            let url = `https://api.themoviedb.org/3/discover/movie?api_key=6c056957a2e9be6e0e41a303073bae05&language=en-US&region=US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${int1}-01-01&primary_release_date.lte=${int2}-12-31&vote_average.gte=6&vote_average.lte=10&with_genres=16%2C%2010751`;
            fetch(url)
            .then(res => res.json())
            .then(data => {
                for(var i = 0; i < data.results.length; i++){
                    arr.push(data.results[i]);
                }
            })
            .catch(err => console.log(err))
        },
        pullKidsShows(int1, int2, arr){
            let url = `https://api.themoviedb.org/3/discover/tv?api_key=6c056957a2e9be6e0e41a303073bae05&language=en-US&sort_by=popularity.desc&first_air_date.gte=${int1}-01-01&first_air_date.lte=${int2}-12-31&page=1&timezone=America%2FNew_York&vote_average.gte=6&with_genres=16%2C%2010751&include_null_first_air_dates=false`;
            fetch(url)
            .then(res => res.json())
            .then(data => {
                for(var i = 0; i < data.results.length; i++){
                    arr.push(data.results[i]);
                }
            })
            .catch(err => console.log(err))
        }
    },
    created: function() {
        this.pullKidsMovies(2000, 2019, this.kidsMoviesNew);
        this.pullKidsMovies(1980, 1999, this.kidsMoviesOld);
        this.pullKidsShows(2000, 2019, this.kidsShowsNew);
        this.pullKidsShows(1980, 1999, this.kidsShowsOld);
    }
}
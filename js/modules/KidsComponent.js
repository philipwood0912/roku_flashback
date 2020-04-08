import ProfileComponent from './ProfileComponent.js';
import PopupComponent from './PopupComponent.js';
import MusicPopupComponent from './MusicPopupComponent.js';
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
                    <popup class="kid-popup" v-for="(movie, index) in kidsMoviesNew" :type="true" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left @hover="$parent.hovEff" :num="1" :match="0" :array="this.kidsMoviesNew" :color="'#6FB270'" :marginclass="'movie-tv-arrow-margin'"></left>
                    <right @hover="$parent.hovEff" :num="0" :match="1" :array="this.kidsMoviesNew" :color="'#6FB270'" :marginclass="'movie-tv-arrow-margin'"></right>
                </div>
            </div>
            <div class="title-wrp kid-border-half">
            <h2 class="title kid-border-less kid-text-color">Kids Movies - 80s 90s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp kid-border-full">
                    <popup class="kid-popup" v-for="(show, index) in kidsMoviesOld" :type="true" :obj="show" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left @hover="$parent.hovEff" :num="3" :match="2" :array="this.kidsMoviesOld" :color="'#6FB270'" :marginclass="'movie-tv-arrow-margin'"></left>
                    <right @hover="$parent.hovEff" :num="2" :match="3" :array="this.kidsMoviesOld" :color="'#6FB270'" :marginclass="'movie-tv-arrow-margin'"></right>
                </div>
            </div>
            <div class="title-wrp kid-border-half">
            <h2 class="title kid-border-less kid-text-color">Kids Shows - 2000s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp kid-border-full">
                    <popup class="kid-popup" v-for="(movie, index) in kidsShowsNew" :type="false" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left @hover="$parent.hovEff" :num="5" :match="4" :array="this.kidsShowsNew" :color="'#6FB270'" :marginclass="'movie-tv-arrow-margin'"></left>
                    <right @hover="$parent.hovEff" :num="4" :match="5" :array="this.kidsShowsNew" :color="'#6FB270'" :marginclass="'movie-tv-arrow-margin'"></right>
                </div>
            </div>
            <div class="title-wrp kid-border-half">
            <h2 class="title kid-border-less kid-text-color">Kids Shows - 80s 90s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp kid-border-full">
                    <popup class="kid-popup" v-for="(show, index) in kidsShowsOld" :type="false" :obj="show" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left @hover="$parent.hovEff" :num="7" :match="6" :array="this.kidsShowsOld" :color="'#6FB270'" :marginclass="'movie-tv-arrow-margin'"></left>
                    <right @hover="$parent.hovEff" :num="6" :match="7" :array="this.kidsShowsOld" :color="'#6FB270'" :marginclass="'movie-tv-arrow-margin'"></right>
                </div>
            </div>
            <div class="title-wrp kid-border-half">
                <h2 class="title kid-border-less kid-text-color">Kids Music</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp kid-border-full">
                    <musicpopup class="kid-popup" v-for="(album, index) in kidsMusic" :obj="album" :key="index" :offset="index"></musicpopup>
                </div>
                <div class="content-buttons">
                    <left @hover="$parent.hovEff" :num="9" :match="8" :array="this.kidsMusic" :color="'#6FB270'" :marginclass="'music-arrow-margin'"></left>
                    <right @hover="$parent.hovEff" :num="8" :match="9" :array="this.kidsMusic" :color="'#6FB270'" :marginclass="'music-arrow-margin'"></right>
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
        left: LeftButton,
        musicpopup: MusicPopupComponent
    },
    data: function(){
        return {
            kidsMoviesNew: [],
            kidsMoviesOld: [],
            kidsShowsNew: [],
            kidsShowsOld: [],
            kidsMusic: [],
            showinfo: ""
        }
    },
    methods: {
        // function to pull kid Movies - 3 parameters
        // int1 - range-start year, int2 - range-end year, arr - array to push to
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
        // function to pull kid Shows - 3 parameters
        // int1 - range-start year, int2 - range-end year, arr - array to push to
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
        },
        // pull kids music, takes array as parameter
        // same track split as other music function
        pullKidsMusic(arr){
            let url = `./admin/music_page.php?section=Kids`;
            fetch(url)
            .then(res => res.json())
            .then(data => {
                for(var i = 0; i < data.length; i++){
                    let trackSplit = data[i].tracks.split('^');
                    data[i].tracks = trackSplit;
                    arr.push(data[i]);
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
        this.pullKidsMusic(this.kidsMusic);
    }
}
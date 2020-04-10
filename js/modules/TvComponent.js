import ProfileComponent from './ProfileComponent.js';
import PopupComponent from './PopupComponent.js';
import LeftButton from './LeftButton.js';
import RightButton from './RightButton.js';
export default {
    template: `
    <div v-if="this.$parent.profilepick">
        <div class="content-bdy">
            <div class="title-wrp main-border-half">
            <h2 class="title main-border-less main-text-color">TV Shows - 2000s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp main-border-full">
                    <popup class="main-popup" v-for="(movie, index) in this.showsTen" :type="false" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left @hover="$parent.hovEff" :num="1" :match="0" :array="this.showsTen" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></left>
                    <right @hover="$parent.hovEff" :num="0" :match="1" :array="this.showsTen" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></right>
                </div>
            </div>
            <div class="title-wrp main-border-half">
            <h2 class="title main-border-less main-text-color">TV Shows - 1990s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp main-border-full">
                    <popup class="main-popup" v-for="(movie, index) in this.showsNine" :type="false" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left @hover="$parent.hovEff" :num="3" :match="2" :array="this.showsNine" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></left>
                    <right @hover="$parent.hovEff" :num="2" :match="3" :array="this.showsNine" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></right>
                </div>
            </div>
            <div class="title-wrp main-border-half">
            <h2 class="title main-border-less main-text-color">TV Shows - 1980s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp main-border-full">
                    <popup class="main-popup" v-for="(movie, index) in this.showsEight" :type="false" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left @hover="$parent.hovEff" :num="5" :match="4" :array="this.showsEight" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></left>
                    <right @hover="$parent.hovEff" :num="4" :match="5" :array="this.showsEight" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></right>
                </div>
            </div>
            <div class="title-wrp main-border-half">
            <h2 class="title main-border-less main-text-color">TV Shows - 1970s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp main-border-full">
                    <popup class="main-popup" v-for="(movie, index) in this.showsSeven" :type="false" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left @hover="$parent.hovEff" :num="7" :match="6" :array="this.showsSeven" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></left>
                    <right @hover="$parent.hovEff" :num="6" :match="7" :array="this.showsSeven" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></right>
                </div>
            </div>
            <div class="title-wrp main-border-half">
            <h2 class="title main-border-less main-text-color">TV Shows - 1960s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp main-border-full">
                    <popup class="main-popup" v-for="(movie, index) in this.showsSix" :type="false" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left @hover="$parent.hovEff" :num="9" :match="8" :array="this.showsSix" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></left>
                    <right @hover="$parent.hovEff" :num="8" :match="9" :array="this.showsSix" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></right>
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
            showsTen: [],
            showsNine: [],
            showsEight: [],
            showsSeven: [],
            showsSix: [],
            showinfo: ""
        }
    },
    methods: {
        // function for pulling shows - takes 3 parameters
        // int1 - range-start year, int2 - range-end year, arr - array to push to
        pullShows(int1, int2, arr){
            let url = `https://api.themoviedb.org/3/discover/tv?api_key=6c056957a2e9be6e0e41a303073bae05&language=en-US&sort_by=popularity.desc&first_air_date.gte=${int1}-01-01&first_air_date.lte=${int2}-12-31&page=1&timezone=America%2FNew_York&vote_average.gte=7&without_genres=16%2C%2010751&include_null_first_air_dates=false`;
            fetch(url)
            .then(res => res.json())
            .then(data => {
                // if poster path == null continue iterations
                // else push data into array
                for(var i = 0; i < data.results.length; i++){
                    if(data.results[i].poster_path == null){
                        continue;
                    } else{
                        Object.assign(data.results[i], {video: false});
                        arr.push(data.results[i]);
                    }
                }
            })
            .catch(err => console.log(err))
        },

    },
    created: function(){
        // on creation pull all content needed to display
        this.pullShows(2000, 2019, this.showsTen);
        this.pullShows(1990, 1999, this.showsNine);
        this.pullShows(1980, 1989, this.showsEight);
        this.pullShows(1970, 1979, this.showsSeven);
        this.pullShows(1960, 1969, this.showsSix);
    }
}
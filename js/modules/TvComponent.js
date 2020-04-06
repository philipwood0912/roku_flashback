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
                    <popup v-for="(movie, index) in this.showsTen" :type="false" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left :num="1" :array="this.showsTen"></left>
                    <right :num="0" :array="this.showsTen"></right>
                </div>
            </div>
            <div class="title-wrp main-border-half">
            <h2 class="title main-border-less main-text-color">TV Shows - 1990s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp main-border-full">
                    <popup v-for="(movie, index) in this.showsNine" :type="false" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left :num="1" :array="this.showsNine"></left>
                    <right :num="0" :array="this.showsNine"></right>
                </div>
            </div>
            <div class="title-wrp main-border-half">
            <h2 class="title main-border-less main-text-color">TV Shows - 1980s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp main-border-full">
                    <popup v-for="(movie, index) in this.showsEight" :type="false" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left :num="1" :array="this.showsEight"></left>
                    <right :num="0" :array="this.showsEight"></right>
                </div>
            </div>
            <div class="title-wrp main-border-half">
            <h2 class="title main-border-less main-text-color">TV Shows - 1970s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp main-border-full">
                    <popup v-for="(movie, index) in this.showsSeven" :type="false" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left :num="1" :array="this.showsSeven"></left>
                    <right :num="0" :array="this.showsSeven"></right>
                </div>
            </div>
            <div class="title-wrp main-border-half">
            <h2 class="title main-border-less main-text-color">TV Shows - 1960s</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp main-border-full">
                    <popup v-for="(movie, index) in this.showsSix" type="false" :obj="movie" :key="index" :offset="index">
                    </popup>
                </div>
                <div class="content-buttons">
                    <left :num="1" :array="this.showsSix"></left>
                    <right :num="0" :array="this.showsSix"></right>
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
        pullShows(int1, int2, arr){
            let url = `https://api.themoviedb.org/3/discover/tv?api_key=6c056957a2e9be6e0e41a303073bae05&language=en-US&sort_by=popularity.desc&first_air_date.gte=${int1}-01-01&first_air_date.lte=${int2}-12-31&page=1&timezone=America%2FNew_York&vote_average.gte=7&without_genres=16%2C%2010751&include_null_first_air_dates=false`;
            fetch(url)
            .then(res => res.json())
            .then(data => {
                for(var i = 0; i < data.results.length; i++){
                    if(data.results[i].poster_path == null){
                        continue;
                    } else{
                        arr.push(data.results[i]);
                    }
                }
            })
            .catch(err => console.log(err))
        },

    },
    created: function(){
        this.pullShows(2000, 2019, this.showsTen);
        this.pullShows(1990, 1999, this.showsNine);
        this.pullShows(1980, 1989, this.showsEight);
        this.pullShows(1970, 1979, this.showsSeven);
        this.pullShows(1960, 1969, this.showsSix);
    }
}
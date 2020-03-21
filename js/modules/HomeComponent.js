import ProfileComponent from './ProfileComponent.js';
export default {
    template: `
        <div v-if="this.$parent.profilepick">
        <div id="home-content">
            <h2 class="title">Movies</h2>
            <div class="actual-content">
                <div class="content" v-for="(movie, index) in movies" :key="index">
                    <h2 class="hidden">{{ movie.title }}</h2>
                    <img :src="getImgUrl(movie.poster_path)" alt="movie poster">
                </div>
            </div>
            <h2 class="title">TV-Shows</h2>
            <div class="actual-content">
                <div class="content" v-for="(tv, index) in tvshows" :key="index">
                    <h2 class="hidden">{{ tv.name }}</h2>
                    <img :src="getImgUrl(tv.poster_path)" alt="movie poster">
                </div>
            </div>
        </div>
        </div>
        <div v-else>
        <profiles></profiles>
        </div>
    `,
    props: ['movieGenre'],
    components: {
        //user: UserComponent
        profiles: ProfileComponent
    },
    data: function() {
        return {
            moviestitle: [],
            movies: [],
            tvshowstitle: [],
            tvshows: [],
            music: []
        }
    },
    methods: {
        pullInformation(str, str2, arr){
            let url = `./admin/scripts/home.php?table=${str}`;
            fetch(url)
                .then(res => res.json())
                .then(data => {
                    var i;
                    for(i=0; i<data.length; i++){
                        //arr1.push(data[i].title);
                        this.pullPosters(data[i].title, str2, arr);
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
                //console.log(data);
                var i;
                for(i=0;i<data.results.length;i++){
                    if(data.results[i].poster_path === null){
                        continue
                    } else {
                        let final = this.posterCheck(str, data.results[i].title);
                        if(final === true){
                        arr.push(data.results[i]);
                        break
                        } else {
                            let newfinal = this.posterCheck(str, data.results[i].name);
                            if(newfinal === true){
                                arr.push(data.results[i]);
                                break
                                }
                        }
                    }
                }
                //console.log(arr);
            })
            .catch(err => console.log(err))
        },
        posterCheck(str1, str2) {
            let regex = new RegExp(`^${str1}$`,"g");
            let match = regex.test(str2);
            if(match === true){
              return true
            }
        },
        getImgUrl(path){
            return "https://image.tmdb.org/t/p/w300" + path + "";
        },
    },
    created: function() {
        // this.pullInformation("movies", "movie", this.movies);
        // this.pullInformation("tvshows", "tv", this.tvshows);
    }
}
import HomeComponent from "./modules/HomeComponent.js";
import MovieComponent from "./modules/MovieComponent.js";
import TvComponent from "./modules/TvComponent.js";
import MusicComponent from "./modules/MusicComponent.js";
import ErrorComponent from "./modules/ErrorComponent.js";

const routes = [
    { path: '/', name: 'home', component: HomeComponent },
    { path: '/movies', name: 'movies', component: MovieComponent },
    { path: '/tv', name: 'tv', component: TvComponent },
    { path: '/music', name: 'music', component: MusicComponent },
    { path: '/*', name: 'error', component: ErrorComponent }
]

const router = new VueRouter({
    routes
})

const vm = new Vue({
    data: {
        movieGenre: [],
        tvGenre: []
    },

    methods: {
        pullGenres(str, arr){
            let url = `https://api.themoviedb.org/3/genre/${str}/list?api_key=6c056957a2e9be6e0e41a303073bae05&language=en-US`;
            fetch(url)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                arr.push(data);
            })
            .catch(err => console.log(err))
        }
    },
    mounted: function(){
        this.pullGenres('movie', this.movieGenre);
        this.pullGenres('tv', this.tvGenre);
    },
    router
}).$mount("#app");
import HomeComponent from "./modules/HomeComponent.js";
import MovieComponent from "./modules/MovieComponent.js";
import TvComponent from "./modules/TvComponent.js";
import MusicComponent from "./modules/MusicComponent.js";
import ErrorComponent from "./modules/ErrorComponent.js";
import LoginComponent from "./modules/LoginComponent.js";
import SignupComponent from "./modules/SignupComponent.js";
import CreateProfileComponent from "./modules/CreateProfileComponent.js";
import KidsComponent from "./modules/KidsComponent.js";
const routes = [
    { path: '/', redirect: { name: "login" } },
    { path: '/login', name: 'login', component: LoginComponent },
    { path: '/signup', name: 'signup', component: SignupComponent },
    { path: '/create', name: 'create', component: CreateProfileComponent },
    { path: '/kids', name: 'kids', component: KidsComponent },
    { path: '/home', name: 'home', component: HomeComponent },
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
        tvGenre: [],
        authenticated: false,
        profilepick: false,
        users: [],
        user: {}
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
        },
        logout(){
            this.authenticated = false;
            this.profilepick = false;
            this.users = [];
            this.user = {};
            this.$router.push('/login');
            debugger;
        }
    },
    created: function(){
        if(this.authenticated === false && this.$router.currentRoute.path != "/login"){
            //debugger;
            this.$router.push('/login');
        }
    },
    mounted: function(){
        // this.pullGenres('movie', this.movieGenre);
        // this.pullGenres('tv', this.tvGenre);
    },
    router
}).$mount("#app");

router.beforeEach((to, from, next) => {
    //console.log('router guard fired!', to, from, vm.authenticated);
    if(to.path !== "/login"){
        if (vm.authenticated == false && to.path != '/signup') {
            next('/login');
            debugger;
          } else {
              next();
              debugger;
          }
    } else {
        next();
        debugger;
    }
  });
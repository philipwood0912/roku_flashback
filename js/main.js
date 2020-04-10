import HomeComponent from "./modules/HomeComponent.js";
import MovieComponent from "./modules/MovieComponent.js";
import TvComponent from "./modules/TvComponent.js";
import MusicComponent from "./modules/MusicComponent.js";
import ErrorComponent from "./modules/ErrorComponent.js";
import LoginComponent from "./modules/LoginComponent.js";
import SignupComponent from "./modules/SignupComponent.js";
import CreateProfileComponent from "./modules/CreateProfileComponent.js";
import KidsComponent from "./modules/KidsComponent.js";
import HeaderComponent from "./modules/HeaderComponent.js";
import FooterComponent from "./modules/FooterComponent.js";
import SearchComponent from "./modules/SearchComponent.js";
import AccountComponent from './modules/AccountComponent.js';
import MediaComponent from "./modules/MediaComponent.js";
const routes = [
    { path: '/', redirect: { name: "login" } },
    { path: '/login', name: 'login', component: LoginComponent },
    { path: '/signup', name: 'signup', component: SignupComponent },
    { path: '/create', name: 'create', component: CreateProfileComponent },
    { path: '/search/:type/:name', name: 'search', component: SearchComponent, props: true},
    { path: '/account', name: 'account', component: AccountComponent},
    { path: '/home', name: 'home', component: HomeComponent },
    { path: '/kids', name: 'kids', component: KidsComponent },
    { path: '/movies', name: 'movies', component: MovieComponent },
    { path: '/tv', name: 'tv', component: TvComponent },
    { path: '/music', name: 'music', component: MusicComponent },
    { path: '/media/:type/:name', name: 'media', component: MediaComponent, props: true},
    { path: '/*', name: 'error', component: ErrorComponent }
]

const router = new VueRouter({
    routes
})

const vm = new Vue({
    data: {
        authenticated: false,
        profilepick: false,
        user: {},
        users: [],
        isadmin: false,
        permissions: false,
        searchArr: [],
    },
    components: {
        mainhead: HeaderComponent,
        mainfoot: FooterComponent
    },
    methods: {
        // poster url function
        getImgUrl(path){
            return "https://image.tmdb.org/t/p/w300" + path + "";
        },
        //backdrop url function
        getBckUrl(path){
            return "https://image.tmdb.org/t/p/w780" + path + "";
        },
        // hover effect function for buttons / arrows
        hovEff(target){
            if(this.$router.currentRoute.path != '/kids'){
                target.classList.toggle('main-buttons-hover');
            } else {
                target.classList.toggle('kid-buttons-hover');
            }
        },
        
    },
    created: function() {
        // set vue data with cookies on creation - no data lost on page refresh
        this.authenticated = this.$cookies.get('authenticated');
        this.profilepick = this.$cookies.get('profile');
        this.isadmin = this.$cookies.get('isadmin');
        this.permissions = this.$cookies.get('permissions');
        this.user = this.$cookies.get('currentuser');
        // route to home on creation if currentRoute is search route
        if(this.$router.currentRoute.matched[0].path == "/search/:type/:name"){
            this.$router.push('/home');
        }
    },
    // computed funcitons for admin / permissions handling
    computed: {
        // mainlock is used for determining if profile is kids or general
        mainlock: function(){
            // if admin and permissions are true or admin is false and permissions are true return true
            if(this.isadmin == true && this.permissions == true || this.isadmin == false && this.permissions == true){
                return false;
            } else {
                // else return false to view kids
                return true;
            }
        },
        // adminlock is used to determine if profile is admin or not - if admin return true else return false
        adminlock: function(){
            if(this.isadmin == true){       
                return false;
            } else {         
                return true;
            }
        }
    },
    router
}).$mount("#app");

router.beforeEach((to, from, next) => {
    if(to.path !== "/login"){
        if (vm.authenticated == false && to.path != '/signup') {
            next('/login');
        } else if(vm.permissions == true && to.path == '/kids' || vm.permissions == false && from.path == '/kids' && to.path != '/create'){
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
  });
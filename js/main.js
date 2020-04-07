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
        getImgUrl(path){
            return "https://image.tmdb.org/t/p/w300" + path + "";
        },
        getBckUrl(path){
            return "https://image.tmdb.org/t/p/w780" + path + "";
        },
        
    },
    created: function() {
        this.authenticated = this.$cookies.get('authenticated');
        this.profilepick = this.$cookies.get('profile');
        this.isadmin = this.$cookies.get('isadmin');
        this.permissions = this.$cookies.get('permissions');
        this.user = this.$cookies.get('currentuser');
    },
    // created: function(){
    //     if(this.authenticated === false && this.$router.currentRoute.path != "/login"){
    //         this.$router.push('/login');
    //     }
    // },
    computed: {
        mainlock: function(){
            if(this.isadmin == true && this.permissions == true || this.isadmin == false && this.permissions == true){
                return false;
            } else {
                return true;
            }
        },
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
    if(to.path !== "/login" && to.path !== '/kids' && to.path !== "/home"){
        if (vm.authenticated == false && to.path != '/signup') {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
  });
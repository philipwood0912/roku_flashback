import ProfileComponent from './ProfileComponent.js';
import PopupComponent from './PopupComponent.js';
import LeftButton from './LeftButton.js';
import RightButton from './RightButton.js';
export default {
    template: `
        <div v-if="this.$parent.profilepick">
            <div class="content-body">
                <div class="title-wrp main-border-half">
                    <h2 class="title main-border-less main-text-color">Searched: {{$route.params.name}}</h2>
                </div>
                <div class="content-main">
                    <div class="content-wrp">
                        <popup v-for="(search, index) in this.$parent.searchArr" :type="typeTest" :obj="search" :key="index" :offset="index">
                        </popup>
                    </div>
                    <div class="content-buttons">
                        <left :num="1" :match="0" :array="this.$parent.searchArr" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></left>
                        <right :num="0" :match="1" :array="this.$parent.searchArr" :color="'#6c3c97'" :marginclass="'movie-tv-arrow-margin'"></right>
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
    computed: {
        // computed property for :type prop passed to popup component
        // take route param and either returns true for movie and false for tv
        typeTest: function(){
            if(this.$route.params.type === "movie"){
                return true;
            } else {
                return false;
            }
        }
    }
}
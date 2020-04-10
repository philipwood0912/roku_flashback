import ProfileComponent from './ProfileComponent.js';
import MusicPopupComponent from './MusicPopupComponent.js';
import LeftButton from './LeftButton.js';
import RightButton from './RightButton.js';
export default {
    template: `
    <div v-if="this.$parent.profilepick">
        <div class="content-body">
            <div class="title-wrp main-border-half">
            <h2 class="title main-border-less main-text-color">Featured Albums</h2>
            </div>
            <div class="content-main">
                <div class="content-wrp main-border-full">
                    <musicpopup class="main-popup" v-for="(album, index) in this.music" :obj="album" :key="index" :offset="index"></musicpopup>
                </div>
                <div class="content-buttons">
                    <left @hover="$parent.hovEff" :num="1" :match="0" :array="this.music" :color="'#6c3c97'" :marginclass="'music-arrow-margin'"></left>
                    <right @hover="$parent.hovEff" :num="0" :match="1" :array="this.music" :color="'#6c3c97'" :marginclass="'music-arrow-margin'"></right>
                </div>
            </div>
            <div class="title-wrp main-border-half">
                <h2 class="title main-border-less main-text-color">Stay turned for more music updates!</h2>
            </div>
        </div>
    </div>
    <div v-else>
    <profiles></profiles>
    </div>
    `,
    components: {
        profiles: ProfileComponent,
        musicpopup: MusicPopupComponent,
        left: LeftButton,
        right: RightButton
    },
    data: function(){
        return {
            music: []
        }
    },
    methods: {
        // pull music function for general
        // passed as a GET section = General
        pullMusic(arr){
            let url = `./admin/music_page.php?section=General`;
            fetch(url)
            .then(res => res.json())
            .then(data => {
                // music track have to be split into an array for display purposes
                for(var i = 0; i < data.length; i++){
                    // on each iteration, split the track on specific character
                    // and update the data property, then push to array
                    let trackSplit = data[i].tracks.split('^');
                    data[i].tracks = trackSplit;
                    Object.assign(data[i], {audio: false});
                    arr.push(data[i]);
                }
            })
            .catch(err => console.log(err))
        }
    },
    created: function() {
        // on creation pull music
        this.pullMusic(this.music);
    }
}
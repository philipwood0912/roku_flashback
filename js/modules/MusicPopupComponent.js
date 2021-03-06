export default {
    props: ['obj', 'offset'],
    template: `
    <div class="popUpHold">
        <div class="music-wrp" v-on:click="showInfo($event, offset)">
            <img :src="'images/music/' + obj.image" alt="album">
            <div class="music-content">
                <transition name="popup">
                    <div v-if="this.show" class="music-info">
                        <h2>{{obj.artist}} - {{obj.album}}</h2>
                        <ul class="song-list">
                            <li v-for="song in obj.tracks">{{song}}</li>
                        </ul>
                    </div>
                </transition>
            </div>
        </div>
        <div class="popUpButtonsMusic" v-if="this.show">
            <button class="popUpButton" type="button" @click="rateThis">Rate <i class="fas fa-star fa-1x"></i></button>
            <button class="popUpButton" type="button" @click="navToMedia(obj)">Listen <i class="fas fa-music fa-1x"></i></button>
        </div>
    </div>
    `,
    data: function() {
        return {
            show: false
        }
    },
    methods: {
        rateThis() {
            alert('Not currently working. Check back later chief');
        },
        navToMedia(obj){
            let type = "music",
                name = obj.album;
            this.$root.profilepick = false;
            this.$cookies.set('media', JSON.stringify(obj), 0);
            this.$router.push({name: 'media', params: {type: type, name: name}});
        },
        // same as normal popup function - could add to vue root
        // for reusability as the template is the only thing that changed
        showInfo(event, index){
            let poster = event.currentTarget,
                popup = poster.children[1],
                buttondiv = this.$el.parentElement.parentElement.lastChild,
                buttons = [buttondiv.firstChild, buttondiv.lastChild],
                slide = this.$el.parentElement;          
            if(this.show === true){
                let scroll = -300 * index;
                slide.scrollLeft = scroll;
                this.show = false;             
            } else {
                let scroll = 300 * index;
                slide.scrollLeft = scroll;
                this.show = true;           
            }
            buttons.forEach(button => {
                button.classList.toggle('button-opacity');
            });
            popup.classList.toggle('add-zindex');
            
        },
    }
}
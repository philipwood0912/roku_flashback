export default {
    props: ['obj', 'offset'],
    template: `
    <div class="popUpHold">
        <div class="music-wrp" v-on:click="showInfo($event, offset)">
            <img :src="'images/music/' + obj.image" alt="album">
            <div class="music-content">
                <transition name="popup">
                    <div v-if="this.show" class="music-info">
                        <h2>{{obj.name}} - {{obj.album}}</h2>
                        <ul class="song-list">
                            <li v-for="song in obj.tracks">{{song}}</li>
                        </ul>
                    </div>
                </transition>
            </div>
        </div>
        <div class="popUpButtonsMusic" v-if="this.show">
            <button>Rate <i class="fas fa-star fa-1x"></i></button>
            <button>Listen <i class="fas fa-music fa-1x"></i></button>
        </div>
    </div>
    `,
    data: function() {
        return {
            show: false
        }
    },
    methods: {
        showInfo(event, index){
            let poster = event.currentTarget,
                popup = poster.children[1],
                buttondiv = this.$el.parentElement.parentElement.lastChild,
                buttons = [buttondiv.firstChild, buttondiv.lastChild],
                slide = this.$el.parentElement;
                debugger;
            if(this.show === true){
                let scroll = -300 * index;
                slide.scrollLeft = scroll;
                this.show = false;
                debugger;
            } else {
                let scroll = 300 * index;
                slide.scrollLeft = scroll;
                this.show = true;
                debugger;
            }
            buttons.forEach(button => {
                button.classList.toggle('button-opacity');
            });
            popup.classList.toggle('add-zindex');
            debugger;
        },
    }
}
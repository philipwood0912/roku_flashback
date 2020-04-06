export default {
    props: ['obj', 'offset', 'type'],
    template: `
        <div class="popUpHold">
            <div class="content" v-on:click="showInfo($event, offset)">
                <div class="poster">
                    <img :src="this.$root.getImgUrl(obj.poster_path)" alt="movie poster">
                    <div class="content-info">
                        <transition name="popup">
                            <div v-if="this.show" class="poster-info">
                                <div v-if="obj.backdrop_path != null"><img :src="this.$root.getBckUrl(obj.backdrop_path)" alt="backdrop""></div>
                                <div v-if="type" class="poster-info-con">
                                    
                                    <h2>{{obj.title}}</h2>
                                    <div class="flex"><h3>Score: {{obj.vote_average}}</h3><h3> ~ </h3>
                                    <h3>Released: {{obj.release_date}}</h3></div>
                                    <p>{{obj.overview}}</p>
                                    
                                </div>
                                <div v-else class="poster-info-con">

                                    <h2>{{obj.name}}</h2>
                                    <div class="flex"><h3>Score: {{obj.vote_average}}</h3><h3> ~ </h3>
                                    <h3>Released: {{obj.first_air_date}}</h3></div>
                                    <p>{{obj.overview}}</p>
                                
                                </div>
                            </div>
                        </transition>
                    </div>
                </div>
            </div>
            <div class="popUpButtons" v-if="this.show">
                <button>Rate <i class="fas fa-star fa-1x"></i></button>
                <button>Watch <i class="fas fa-tv fa-1x"></i></button>
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
            let poster = event.currentTarget.firstChild,
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
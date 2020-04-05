export default {
    props: ['obj', 'offset'],
    template: `
        <div class="content" v-on:click="showInfo($event, $event.path[3], offset)">
        <div class="poster">
            <img :src="this.$root.getImgUrl(obj.poster_path)" alt="movie poster">
            <div class="content-info">
                <transition name="popup" v-on:before-enter="beforeEnter" v-on:before-leave="beforeLeave">
                    <div v-if="this.show" class="poster-info">
                        <div v-if="obj.backdrop_path != null"><img :src="this.$root.getBckUrl(obj.backdrop_path)" alt="backdrop""></div>
                        <div class="poster-info-con">
                            
                            <h2>{{obj.title}}</h2>
                            <div><h3>Score: {{obj.vote_average}}</h3><h3> ~ </h3>
                            <h3>Released: {{obj.release_date}}</h3></div>
                            <p>{{obj.overview}}</p>
                            
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        </div>
    `,
    data: function() {
        return {
            show: false
        }
    },
    methods: {
        beforeEnter(el) {
        },
        beforeLeave(el) {
        },
        showInfo(event, slide, index){
            let poster = event.currentTarget.firstChild,
                popup = poster.children[1];
            if(this.show === true){
                let scroll = -300 * index;
                let newslide = slide.offsetParent;
                if(slide.className == "poster"){
                    newslide.scrollLeft = scroll;
                    this.show = false;
                    debugger;
                } else if(slide.className == "content"){
                    newslide.scrollLeft = scroll;
                    this.show = false;
                } else {
                    slide.scrollLeft = scroll;
                    this.show = false;
                    debugger;
                }
            } else {
                let scroll = 300 * index;
                slide.scrollLeft = scroll;
                this.show = true;
                debugger;
            }
            popup.classList.toggle('add-zindex');
            debugger;
        },
    }
}
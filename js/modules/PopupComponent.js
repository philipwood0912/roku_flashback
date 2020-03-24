export default {
    props: ['movie', 'offset', 'array'],
    template: `
        <div class="content">
        <div class="poster" v-on:click="showInfo($event, $event.path[3], offset)">
            <img :src="this.$parent.getImgUrl(movie.poster_path)" alt="movie poster">
            <div class="content-info">
                <transition name="popup" v-on:before-enter="beforeEnter" v-on:before-leave="beforeLeave">
                    <div v-if="this.show" class="poster-info">
                        <img :src="this.$parent.getBckUrl(movie.backdrop_path)" alt="backdrop"">
                        <div class="poster-info-con">
                            <h2>{{movie.title}}</h2>
                            <h3>{{movie.release_date}}</h3>
                            <h4>Score: {{movie.vote_average}}</h4>
                            <p>{{movie.overview}}</p>
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
            let poster = event.currentTarget,
                popup = poster.lastChild;
            if(this.show === true){
                this.show = false;
                debugger;
            } else {
                this.$parent.current.push(poster);
                if(this.$parent.current.length <= 1){
                    let clickNum = poster.offsetLeft / 300;
                    this.$parent.$children[0].clicked += clickNum;
                    this.$parent.$children[1].clicked += clickNum;
                    let scroll = 300 * index;
                    slide.scrollLeft = scroll;
                    this.show = true;
                    debugger;
                } else {
                    let clickDiff = this.$parent.current[1].offsetLeft - this.$parent.current[0].offsetLeft;
                    let clickNum = clickDiff / 300;
                    this.$parent.$children[0].clicked += clickNum;
                    this.$parent.$children[1].clicked += clickNum;
                    let scroll = 300 * index;
                    slide.scrollLeft = scroll;
                    this.show = true;
                    debugger;
                    this.$parent.current.shift();
                    debugger;
                }
            }
            popup.classList.toggle('add-zindex');
        },
    }
}
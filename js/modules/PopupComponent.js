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
                <button class="popUpButton" type="button" @click="rateThis">Rate <i class="fas fa-star fa-1x"></i></button>
                <button class="popUpButton" type="button" @click="navToMedia(obj)">Watch <i class="fas fa-tv fa-1x"></i></button>
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
            let type,
                name;
            if(obj.title != null){
                type = "movie";
                name = obj.title;
            } else {
                type = "tv";
                name = obj.name;
            }
            this.$root.profilepick = false;
            this.$cookies.set('media', JSON.stringify(obj), 0);
            this.$router.push({name: 'media', params: {type: type, name: name}});
        },
        // popup function takes 2 parameters vue event, index
        showInfo(event, index){
            // variable declaration
            let poster = event.currentTarget.firstChild,
                popup = poster.children[1],
                buttondiv = this.$el.parentElement.parentElement.lastChild,
                buttons = [buttondiv.firstChild, buttondiv.lastChild],
                slide = this.$el.parentElement;      
                
            if(this.show === true){
                // resets popup on click - scrolls poster to original location
                let scroll = -300 * index;
                slide.scrollLeft = scroll;
                this.show = false;     
            } else {
                // poster scrolls over, popup is shown
                let scroll = 300 * index;
                slide.scrollLeft = scroll;
                this.show = true;      
            }
            // toggle button opacity
            buttons.forEach(button => {
                button.classList.toggle('button-opacity');
            });
            // toggle popup z-index
            popup.classList.toggle('add-zindex');
            
        },
    }
}
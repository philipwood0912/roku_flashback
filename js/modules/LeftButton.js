export default {
    props: ['array'],
    template: `
        <div class="arrowbuttons arrowleft"><button @click.prevent="getScroll($event, $event.path[4].firstChild, array)"><i class="far fa-caret-square-left fa-5x" style="color:#6c3c97;"></i></button></div>
    `,
    data: function() {
        return {
            clicked: 0
        }
    },
    methods: {
        getScroll(event, slide, array){
            if(this.clicked !== 0){
                if(this.clicked >= 1){
                    var lastItem = array.pop();
                    array.unshift(lastItem);
                }
                this.clicked -= 1;
                this.$parent.$children[1].clicked -= 1;
                slide.scrollLeft += -300;
            }
            debugger;
        }
    } 

}
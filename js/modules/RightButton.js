export default {
    props: ['array'],
    template: `
        <div class="arrowbuttons arrowright"><button @click.prevent="getScroll($event, $event.path[4].firstChild, array)"><i class="far fa-caret-square-right fa-5x" style="color:#6c3c97;"></i></button></div>
    `,
    data: function() {
        return {
            clicked: 0
        }
    },
    methods: {
        getScroll(event, slide, array){
            //click += 1;
            this.clicked += 1;
            this.$parent.$children[0].clicked += 1;
            if(this.clicked >= 1){
                slide.scrollLeft = -300 * this.clicked;
                var firstItem = array.shift();
                array.push(firstItem);
            }
            debugger;
        }
    } 

}
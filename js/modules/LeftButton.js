export default {
    props: ['num', 'array', 'color', 'marginclass'],
    template: `
        <div :class="'arrowbuttons arrowleft ' + marginclass"><button @click.prevent="getScroll(num, $event.path[4].firstChild, array)"><i class="far fa-caret-square-left fa-5x" :style="{color: color}"></i></button></div>
    `,
    data: function() {
        return {
            clicked: 0
        }
    },
    methods: {
        getScroll(num, slide, array){
            if(this.clicked !== 0){
                if(this.clicked >= 1){
                    var lastItem = array.pop();
                    array.unshift(lastItem);
                    debugger;
                }
                this.clicked -= 1;
                this.$parent.$children[num].clicked -= 1;
                slide.scrollLeft += -300;
                debugger;
            }
            debugger;
        }
    } 

}
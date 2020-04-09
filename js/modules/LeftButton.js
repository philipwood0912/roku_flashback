export default {
    props: ['num', 'match', 'array', 'color', 'marginclass'],
    template: `
        <div :class="'arrowbuttons arrowleft ' + marginclass"><button @mouseover="$emit('hover', $el.firstChild)" @mouseout="$emit('hover', $el.firstChild)" @click.prevent="getScroll(array)"><i class="far fa-caret-square-left fa-5x" :style="{color: color}"></i></button></div>
    `,
    data: function() {
        return {
            clicked: 0,
            clickedLink: ""
        }
    },
    created: function(){
        // on right button creation link to corresponding left button
        // comparing right button num prop to left button match prop
        for(var i = 0; i < this.$parent.$children.length; i++){
            if(this.$parent.$children[i].clicked == null){
                // if clicked is null continue iterations
                continue;
            } else if(this.$parent.$children[i].match === this.num){
                // if match = num, clickedLink is set, break iteration
                this.clickedLink = this.$parent.$children[i];
                break;
            }
        }
    },
    methods: {
        getScroll(array){
            let slide = this.$el.offsetParent.firstChild;
            // if clicked = 0 do nothing
            if(this.clicked !== 0){
                if(this.clicked >= 1){
                    // take item off end of array
                    // and add it to the beginning of array
                    var lastItem = array.pop();
                    array.unshift(lastItem);
                }
                // clicked - 1, clickedLink - 1
                this.clicked -= 1;
                this.clickedLink.clicked -= 1;
                slide.scrollLeft += -300;
                debugger;
            }
        }
    } 

}
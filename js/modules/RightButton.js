export default {
    props: ['num', 'match', 'array', 'color', 'marginclass'],
    template: `
        <div :class="'arrowbuttons arrowright ' + marginclass">
            <button @mouseover="$emit('hover', $el.firstChild)" @mouseout="$emit('hover', $el.firstChild)" @click.prevent="getScroll(array)">
                <i class="far fa-caret-square-right fa-5x" :style="{color: color}"></i>
            </button>
        </div>
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
        // scroll function for right button
        // takes 1 parameter: array - the array to be mutated
        getScroll(array){
            let slide = this.$el.offsetParent.firstChild;
            // clicked + 1, clickedLink + 1
            this.clicked += 1;
            this.clickedLink.clicked += 1;
            // if clicked is greater than or equal to 1, sliding div is moved
            // 300px multipled by clicked number
            if(this.clicked >= 1){
                slide.scrollLeft = -300 * this.clicked;
                // first item on array is pulled out of array
                // and is added to end of array
                var firstItem = array.shift();
                array.push(firstItem);
                debugger;
            }
            debugger;
        }
    } 

}
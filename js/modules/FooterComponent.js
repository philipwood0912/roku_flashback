export default {
    props: ['colorclass', 'color'],
    template: `
    <div v-if="this.$parent.profilepick">
        <footer :class="colorclass">
            <h3 :style="{color: color}">Copyright 2020</h3>
        </footer>
    </div>
    <div v-else></div>
    `
}
export default {
    props: ['user'],
    template: `
    <div class="account-user" v-on:click="$parent.edit(user, $event)" v-on:mouseover="show = true">
        <img class="account-image" :src="'images/user/' + user.avatar" alt="avatar">
        <transition name="name" v-on:before-enter="beforeEnter" v-on:before-leave="beforeLeave">
        <div v-if="show" class="account-popup" v-on:mouseleave="show = false">
            <h3>{{user.pname}}</h3>
        </div>
        </transition>
    </div>
    `,
    data: function(){
        return {
            show: false
        }
    },
    methods: {
        beforeEnter(el) {
            el.classList.add('moveup');
        },
        beforeLeave(el) {
            el.classList.remove('moveup');
        }
    }
}
export default {
    props: ['liveuser'],
    template: `
        <div class="profile-con" @click="$parent.navToUserHome(liveuser)">
            <div class="profile-body" @mouseover="show = true">
                <img :src="'images/user/' + liveuser.avatar" class="profiles">
                <transition name="name" v-on:before-enter="beforeEnter" v-on:before-leave="beforeLeave">
                    <div v-if="show" @mouseout="show = false" @click="$parent.navToUserHome(liveuser)" class="profile-popup">
                        <h2>{{ liveuser.pname }}</h2>
                    </div>
                </transition>
            </div>
        </div>`,
    data: function() {
        return {
            show: false
        }
    },
    //set newprofile data as true if avatar is empty.
    // pointless now though, if user logs in without a profile created
    // it auto redirects them to profile create page
    created: function() {
        if(this.liveuser.avatar == ""){
            this.$parent.newProfile = true;
        }
    },
    // animation hooks - vue tranistions are great
    methods: {
        beforeEnter(el) {
            el.classList.add('moveup');
        },
        beforeLeave(el) {
            el.classList.remove('moveup');
        }
    }

}
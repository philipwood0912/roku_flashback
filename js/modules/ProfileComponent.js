import UserComponent from './UserComponent.js';
export default {
    template: `
    <div id="prof-con">
        <div id="prof-item">
            <div id="prof-title">
                <h2 class="user-message">Hello {{username}}! Who is watching?</h2>
            </div>
            <div v-if="!newProfile" id="prof-wrap">
                <div id="prof-inwrap">
                    <user v-for="(user, index) in this.$root.users" :liveuser="user" :key="index"></user>
                </div>
            </div>
            <div v-else></div>
            <div id="addbut"><li @click="navToCreate"><i class="fas fa-plus-circle fa-7x"></i></li></div>
        </div>
    </div>
    `,
    data: function(){
        return {
            username: this.$root.users[0].fname,
            newProfile: false
        }
    },
    components: {
        user: UserComponent
    },
    methods: {
        navToUserHome(data){
            this.$root.profilepick = true;
            this.$root.user = data;
            if(data.permissions == false){
                this.$router.replace('/kids');
                debugger;
            }
        },
        navToCreate(){
            this.$router.push('/create');
        }
    }
}
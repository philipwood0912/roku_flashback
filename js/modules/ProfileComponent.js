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
                    <user v-for="(user, index) in users" :liveuser="user" :key="index"></user>
                </div>
            </div>
            <div v-else></div>
            <div id="addbut"><li @click="navToCreate"><i class="fas fa-plus-circle fa-7x"></i></li></div>
        </div>
    </div>
    `,
    data: function(){
        return {
            username: "",
            newProfile: false,
            users: []
        }
    },
    created: function(){
        let userArr = JSON.parse(this.$cookies.get('users'));
        for(var i = 0; i < userArr.length; i++){
            this.users.push(userArr[i]);
        }
        this.username = this.users[0].fname;
    },
    components: {
        user: UserComponent
    },
    methods: {
        navToUserHome(data){
            this.$cookies.set('profile', true, 0);
            this.$cookies.set('currentuser', JSON.stringify(data), 0);
            this.$cookies.set('isadmin', data.admin, 0);
            this.$cookies.set('permissions', data.permissions, 0);
            this.$root.profilepick = true;
            this.$root.user = data;
            this.$root.isadmin = data.admin;
            this.$root.permissions = data.permissions;
            if(this.$cookies.get('permissions') == false){
                this.$router.push('/kids').catch(err => {});
                debugger;
            } else if (this.$router.currentRoute.path == '/kids'){
                this.$router.push('/home').catch(err => {});
                debugger;
            }
        },
        navToCreate(){
            this.$router.push('/create');
        }
    }
}
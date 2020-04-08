import UserComponent from './UserComponent.js';
export default {
    template: `
    <div id="prof-con">
        <div id="prof-item">
            <div id="prof-title">
                <h2 class="user-message">Hello {{username}}! Who is watching?</h2>
            </div>
            <div v-if="!newProfile" class="prof-wrap">
                <div class="prof-inwrap">
                    <user v-for="(user, index) in users" :liveuser="user" :key="index"></user>
                </div>
            </div>
            <div v-else>
            </div>
            <div class="add-wrap">
                <div id="addbg">
                    <div @click="navToCreate" @mouseover="popupmsg = true" @mouseout="popupmsg = false" id="addbut">
                        <i class="fas fa-plus fa-7x" style="color:#6c3c97;"></i>
                    </div>
                </div>
                <transition name="popup">
                    <div class="add-msg" v-if="popupmsg">
                        <h2>Create New Profile</h2>
                    </div>
                </transition>
            </div>
        </div>
    </div>
    `,
    data: function(){
        return {
            username: "",
            newProfile: false,
            users: [],
            popupmsg: false
        }
    },
    created: function(){
        // on creation of profile component, update users array
        // to grb latest users and render them
        // incase it had been reset by page refresh
        let userArr = JSON.parse(this.$cookies.get('users'));
        for(var i = 0; i < userArr.length; i++){
            this.users.push(userArr[i]);
        }
        // set username on profile page
        this.username = this.users[0].fname;
    },
    components: {
        user: UserComponent
    },
    methods: {
        navToUserHome(data){
            // re-set cookies on profile pick
            this.$cookies.set('profile', true, 0);
            this.$cookies.set('currentuser', JSON.stringify(data), 0);
            this.$cookies.set('isadmin', data.admin, 0);
            this.$cookies.set('permissions', data.permissions, 0);
            // also update main vue variables
            this.$root.profilepick = true;
            this.$root.user = data;
            this.$root.isadmin = data.admin;
            this.$root.permissions = data.permissions;
            // if permissions of clicked user is false, route to kids page
            // elseif the router current path is kids - route to home page
            if(this.$cookies.get('permissions') == false){
                this.$router.push('/kids').catch(err => {});
            } else if (this.$router.currentRoute.path == '/kids'){
                this.$router.push('/home').catch(err => {});   
            }
        },
        navToCreate(){
            // push to create page
            this.$router.push('/create');
        }
    }
}
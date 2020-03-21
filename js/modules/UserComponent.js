export default {
    props: ['liveuser'],

    template: `
    <div class="col-xs-12 col-sm-6 col-md-4 mx-auto">
        <div class="card rounded" @click="$parent.navToUserHome(liveuser)">
            <div class="card-body text-center">
                <img :src="'images/user/' + liveuser.avatar" class="profiles">
                <h2 class="hidden">{{ liveuser.pname }}</h2>
            </div>
        </div>
    </div>`,
    created: function() {
        if(this.liveuser.avatar == ""){
            this.$parent.newProfile = true;
        }
        if(this.liveuser.avatar === "none"){
            this.liveuser.avatar = "temp_avatar.jpg";
        }
    },

}
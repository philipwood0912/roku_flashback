import AccountUserComponent from './AccountUserComponent.js';
export default {
    template: `
        <div id="account-bdy">
            <div id="account-wrp">
            <div class="account-title"><h2>Account Settings</h2><button class="account-back" type="button" v-on:click="goBack"><i class="fas fa-arrow-circle-left fa-1x" style="color:#6c3c97"></i> Back</button></div>
            <div id="account-wht">
                <accountuser v-for="(user, index) in users" :key="index" :data-userref="index" :user="user"></accountuser>
            </div>
            <div class="account-form" v-if="accountedit">
                <h3>{{this.message}}</h3>
                <label class="account-label">Profile Name</label>
                <input class="name-input" v-model="input.name" value="input.name" type="text"><br>
                <div class="avatar-wrp">
                <label class="account-label">Profile Avatar</label>
                        <select v-model="input.avatar" name="avatar">
                            <option class="option" value="default.svg">Default</option>
                            <option class="option" value="invader.svg">Invader</option>
                            <option class="option" value="heart.svg">Heart</option>
                            <option class="option" value="pacman.svg">Pac-Man</option>
                            <option class="option" value="pokeball.svg">Pokeball</option>
                            <option class="option" value="chicken.svg">Chicken</option>
                            <option class="option" value="sick.svg">Sick</option>
                            <option class="option" value="smile.svg">Smile</option>
                        </select>
                        <img class="account-avatar" :src="'images/user/' + input.avatar" alt="avatar"><br>
                </div><br>
                <label class="account-label">Profile Settings</label>
                <div class="check-wrp chk-top">
                    <input class="check" type="checkbox" value="0" v-model="input.section">
                    <label class="chklabel">Kids Only</label>
                </div>
                <div class="check-wrp chk-bottom">
                    <input class="check" type="checkbox" value="1" v-model="input.section">
                    <label class="chklabel">General</label>
                </div>
                <label class="account-label">Profile Admin</label>
                <div class="check-wrp chk-top">
                    <input class="check" type="checkbox" value="1" v-model="input.admin">
                    <label class="chklabel">Admin</label>
                </div><br>
                <button v-on:click="editProfile()" type="button">Edit Profile</button>
            </div>
            <div v-else></div>
            </div>
        </div>
    `,
    data: function(){
        return {
            users: [],
            input: {
                name: "",
                avatar: "",
                section: [],
                admin: 0,
                number: 0
            },
            accountedit: false,
            message: "Edit Profile",
        }
    },
    components: {
        accountuser: AccountUserComponent
    },
    created: function(){
        let userArr = JSON.parse(this.$cookies.get('users'));
        for(var i = 0; i < userArr.length; i++){
            this.users.push(userArr[i]);
        }
        this.$parent.profilepick = false;
    },
    methods: {
        goBack(){
            this.$parent.profilepick = true;
            this.$router.back();
        },
        edit(user, event){
            this.accountedit = true;
            this.input.name = user.pname;
            this.input.avatar = user.avatar;
            this.input.number = event.currentTarget.dataset.userref;
        },
        editProfile(){
            if (this.input.name != "" && this.input.avatar != "" && this.input.section.length > 0) {
                if(this.input.section.length > 1){
                    this.message = "Only one section can be picked.";
                } else {
                    if(this.input.admin == ""){
                        this.input.admin = 0;
                    } else {
                        this.input.admin = 1;
                    }
                    let formData = new FormData();
                    formData.append('id', this.$parent.user.id);
                    formData.append("name", this.input.name);
                    formData.append("oldname", this.users[this.input.number].pname);
                    formData.append("avatar", this.input.avatar);
                    formData.append("section", this.input.section);
                    formData.append("admin", this.input.admin);
                    
                    let url = `./admin/edit_page.php`;

                    fetch(url, {
                        method: 'POST',
                        body: formData
                    })
                        .then(res => res.json())
                        .then(data => {
                            Object.assign(this.users[this.input.number], {
                                pname: data.pname,
                                avatar: data.avatar,
                                permissions: data.permissions,
                                admin: data.admin
                            });
                            this.$cookies.set('users', JSON.stringify(this.users), 0);
                            this.accountedit = false;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            } else {
                this.message = "Fill out required fields.";
            }
        }
    }

}
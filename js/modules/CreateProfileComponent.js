export default {
    template: `
        <div id="create-bdy">
            <div class="create-border-twelve">
            <div class="create-border-eleven">
            <div class="create-border-ten">
            <div class="create-border-nine">
            <div class="create-border-eight">
            <div class="create-border-seven">
            <div class="create-border-six">
            <div class="create-border-five">
            <div class="create-border-four">
            <div class="create-border-three">
            <div class="create-border-two">
            <div class="create-border-one">
                <div id="create-wrp">
                    <div id="create-wht">
                        <h2>Create New Profile</h2>
                        <form id="create-form">
                            <label>{{this.message}}</label><br>
                            <input v-model="input.name" name="name" type="text" value=""><br>
                            <label>Profile Setting</label><br>
                            <div class="check-wrp chk-top"><input class="check" type="checkbox" value="0" v-model="input.section"><label class="chklabel">Kids Only</label></div>
                            <div class="check-wrp"><input class="check" type="checkbox" value="1" v-model="input.section"><label class="chklabel">General</label></div>
                            <label>Avatar</label><br>
                            <div class="avatar-wrp">
                                <select v-model="input.avatar" id="avatar-select" name="avatar">
                                    <option class="option" value="default.svg">Default</option>
                                    <option class="option" value="invader.svg">Invader</option>
                                    <option class="option" value="heart.svg">Heart</option>
                                    <option class="option" value="pacman.svg">Pac-Man</option>
                                    <option class="option" value="pokeball.svg">Pokeball</option>
                                    <option class="option" value="chicken.svg">Chicken</option>
                                    <option class="option" value="sick.svg">Sick</option>
                                    <option class="option" value="smile.svg">Smile</option>
                                </select>
                                <img :src="'images/user/' + input.avatar" alt="avatar"><br>
                            </div>
                            <button v-on:click.prevent="createUser()" name="create">Create Profile</button>
                            <button @click.prevent="backHome()"><i class="fas fa-arrow-circle-left"></i> Back</button>
                        </form>
                    </div>
                </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
            </div>
        </div>
    `,
    data: function(){
        return {
            input: {
                name: "",
                section: [],
                avatar: "default.svg"
            },
            message: "Profile Name"
        }
    },
    created: function() {
        // on created set profilepick to false and reset users array
        // with current cookies info if array length is < 1
        this.$parent.profilepick = false;
        let userArr = JSON.parse(this.$cookies.get('users'));
        if(this.$parent.users.length < 1){
            for(var i = 0; i < userArr.length; i++){
                this.$parent.users.push(userArr[i]);
            }
        }
        
    },
    methods: {
        // back button function
        backHome(){
            this.$router.back();
        },
        // create profile function
        createUser(){
            if (this.input.name != "" && this.input.section.length > 0 && this.input.avatar != "") {
                // if more then one checkbox in section is checked, set message
                if(this.input.section.length > 1){
                    this.message = "You can't pick both..";
                } else {
                    let formData = new FormData();
                    formData.append("link", this.$parent.users[0].id);
                    formData.append("name", this.input.name);
                    formData.append("section", this.input.section);
                    formData.append("avatar", this.input.avatar);

                    let url = `./admin/create_page.php`;

                    fetch(url, {
                        method: 'POST',
                        body: formData
                    })
                        .then(res => res.json())
                        .then(data => {
                            
                            if (data === null || typeof data !== "object") { 
                                this.message = "Creation failed!";
                            } else {
                                // if users[0] pname is empty
                                // it is a new profile and will be handle as such
                                if(this.$parent.users[0].pname == ""){
                                    // set users[0] pname, permissions, avatar, admin
                                    this.$parent.users[0].pid = data.pid;
                                    this.$parent.users[0].pname = data.pname;
                                    this.$parent.users[0].permissions = data.section;
                                    this.$parent.users[0].avatar = data.avatar;
                                    this.$parent.users[0].admin = data.admin;
                                    // reset users cookie as new profile has been created and route to home
                                    this.$cookies.set('users', JSON.stringify(this.$parent.users), 0);
                                    
                                    this.$router.push('/home');
                                // else this is not their first profile and well be handle as such    
                                } else {
                                    // create object with info to be added to users array
                                    let obj = {
                                        id: this.$parent.users[0].id,
                                        fname: this.$parent.users[0].fname,
                                        pid: data.pid,
                                        pname: data.pname,
                                        permissions: data.section,
                                        avatar: data.avatar,
                                        admin: data.admin,
                                    };
                                    // push to users array
                                    this.$parent.users.push(obj);
                                    // reset users cookie with new info and set message
                                    
                                    this.$cookies.set('users', JSON.stringify(this.$parent.users), 0);
                                    this.$router.back();
                                    
                                }
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            } else {
                this.message = "Please fill out the required fields";
            }
        }
    }
}
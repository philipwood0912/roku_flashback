export default {
    template: `
        <div id="create-bdy">
            <div id="create-wrp">
                <div id="create-wht">
                    <h2>CREATE NEW USER</h2>
                    <h3>{{this.message}}</h3>
                    <form id="create-form">
                        <label>Profile Name</label><br>
                        <input v-model="input.name" name="name" type="text" value=""><br>
                        <label>Profile Setting</label><br>
                        <div id="chk-top" class="check-wrp"><input class="check" type="checkbox" value="0" v-model="input.section"><label class="chklabel">Kids Only</label></div>
                        <div class="check-wrp"><input class="check" type="checkbox" value="1" v-model="input.section"><label class="chklabel">General</label></div>
                        <label>Avatar</label><br>
                        <div id="avatar-wrp">
                            <select v-model="input.avatar" id="avatar-select" name="avatar">
                                <option class="option" value="default.jpg">Default</option>
                                <option class="option" value="invader.svg">Invader</option>
                                <option class="option" value="heart.svg">Heart</option>
                                <option class="option" value="pacman.svg">Pac-Man</option>
                                <option class="option" value="pokeball.svg">Pokeball</option>
                                <option class="option" value="sick.svg">Sick</option>
                                <option class="option" value="smile.svg">Smile</option>
                            </select>
                            <img :src="'images/user/' + input.avatar" alt="avatar"><br>
                        </div>
                        <button v-on:click.prevent="createUser()" name="create">Create Profile</button>
                        <button @click.prevent="backHome()">Back <i class="fas fa-arrow-circle-right"></i></button>
                    </form>
                </div>
            </div>
        </div>
    `,
    data: function(){
        return {
            input: {
                name: "",
                section: [],
                avatar: "default.jpg"
            },
            message: ""
        }
    },
    methods: {
        backHome(){
            this.$router.back();
        },
        createUser(){
            if (this.input.name != "" && this.input.section.length > 0 && this.input.avatar != "") {
                if(this.input.section.length > 1){
                    this.message = "You can't pick both..";
                    debugger;
                } else {
                    debugger;
                    // fetch the user from the DB
                    // generate the form data
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
                            if (data === null || typeof data !== "object") { // means that we're not getting a user object back
                                console.warn(data);
                                // just for testing
                                alert("creation failed, please try again");
                            } else {
                                if(this.$parent.users.length <= 1){
                                    this.$parent.users[0].pname = data.pname;
                                    this.$parent.users[0].permissions = data.section;
                                    this.$parent.users[0].avatar = data.avatar;
                                    this.$parent.users[0].admin = data.admin;
                                    this.message = "New profile created!";
                                    debugger;
                                } else {
                                    let obj = {
                                        id: this.$parent.users[0].id,
                                        fname: this.$parent.users[0].fname,
                                        pname: data.pname,
                                        permissions: data.section,
                                        avatar: data.avatar,
                                        admin: data.admin,
                                    };
                                    this.$parent.users.push(obj);
                                    this.message = "New profile created!";
                                    debugger;
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
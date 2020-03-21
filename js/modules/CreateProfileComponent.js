export default {
    template: `
        <div>
            <h2>CREATE NEW USER</h2>
            <form>
                <label>Profile Name</label>
                <input v-model="input.name" name="name" type="text" value="">
                <label>Section</label>
                <select v-model="input.section" id="section-select" name="section">
                    <option value="0">Kids</option>
                    <option value="1">General</option>
                </select>
                <label>Avatar</label>
                <select v-model="input.avatar" id="avatar-select" name="avatar">
                    <option value="invader.svg">Invader</option>
                </select>
                <button v-on:click.prevent="createUser()" name="create">Create Profile</button>
            </form>
            <li @click="backHome">HOME</li>
        </div>
    `,
    data: function(){
        return {
            input: {
                name: "",
                section: "",
                avatar: ""
            }
        }
    },
    methods: {
        backHome(){
            this.$router.back();
        },
        createUser(){
            if (this.input.name != "" && this.input.section != "" && this.input.avatar != "") {
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
                            //this.$router.push('/home');
                            debugger;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                console.log("A username and password must be present");
            }
        }
    }
}
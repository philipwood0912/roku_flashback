export default {
    template: `
    <div id="login-body">
        <div id="login-content">
            <div class="spiral sp-one"></div>
            <div class="spiral sp-two"></div>
            <div class="spiral sp-three"></div>
            <div class="spiral sp-four"></div>
            <form id="login">
                <img src="./images/roku_logo.svg" alt="logo">
                <label class="yo">Email</label>
                <input v-model="input.email" name="email" type="email">
                <label>Password</label>
                <input v-model="input.password" name="password" type="password">
                <div id="loginbut">
                    <button v-on:click.prevent="login()" name="submit">Sign-In</button>
                    <button @click.prevent="signup()">Sign Up Now!</button>
                </div>
            </form>
        </div>
    </div>
    `,
    data() {
        return {
            input: {
                email: "",
                password: ""
            },

        }
    },

    created: function(){
        this.$parent.profilepick = false;
        this.$cookies.set('authenticated', false, 0);
        this.$cookies.set('users', [], 0);
        this.$cookies.set('profile', false, 0);
        this.$cookies.set('currentuser', [], 0);
        this.$cookies.set('isadmin', false, 0);
        this.$cookies.set('permissions', false, 0);
    },

    methods: {
        signup() {
            this.$router.push('/signup');
        },
        login() {

            if (this.input.email != "" && this.input.password != "") {
                // fetch the user from the DB
                // generate the form data
                let formData = new FormData();

                formData.append("email", this.input.email);
                formData.append("password", this.input.password);

                let url = `./admin/login_page.php`;

                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.length === 0 || data === null || typeof data !== "object") { // means that we're not getting a user object back
                            console.warn(data);
                            // just for testing
                            alert("authentication failed, please try again");
                        } else {
                            for(var i=0; i<data.length; i++){
                                this.$parent.users.push(data[i]);
                            }
                            //this.$parent.authenticated = true;
                            this.$cookies.set('authenticated', true, 0);
                            this.$cookies.set('users', JSON.stringify(this.$parent.users), 0);
                            this.$router.push('/home');
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
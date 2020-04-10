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
                <label>{{this.message}}</label>
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
            message: "Email"
        }
    },

    created: function(){
        //login creation
        // reset vue variables
        this.$parent.profilepick = false;
        this.$parent.authenticated = false;
        this.$parent.users = [];
        this.$parent.user = {};
        this.$parent.permissions = false;
        this.$parent.admin = false;
        // reset vue cookies default values
        this.$cookies.set('authenticated', false, 0);
        this.$cookies.set('users', [], 0);
        this.$cookies.set('profile', false, 0);
        this.$cookies.set('currentuser', [], 0);
        this.$cookies.set('isadmin', false, 0);
        this.$cookies.set('permissions', false, 0);
    },

    methods: {
        // route to signup page
        signup() {
            this.$router.push('/signup');
        },
        // login function
        login() {
            if (this.input.email != "" && this.input.password != "") {
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
                            this.message = "Authentication failed!";
                        } else {
                            for(var i=0; i<data.length; i++){
                                this.$parent.users.push(data[i]);
                            }
                            // set vue authenication
                            this.$parent.authenticated = true;
                            // set cookies values on successful login
                            this.$cookies.set('currentuser', JSON.stringify(this.$parent.users[0]), 0);
                            this.$cookies.set('isadmin', this.$parent.users[0].admin, 0);
                            this.$cookies.set('permissions', this.$parent.users[0].permissions, 0);
                            this.$cookies.set('authenticated', true, 0);
                            this.$cookies.set('users', JSON.stringify(this.$parent.users), 0);
                            // if user logging in has no profile made, push to create profile page
                            // else push to home page
                            if(this.$parent.users[0].pname == ""){
                                this.$router.push('/create');
                            } else {
                                this.$router.push('/home');
                            }
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                this.message = "Please fill out required fields";
            }
        }
    }
}
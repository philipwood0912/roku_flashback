export default {
    template: `
        <div id="signup-bdy">
            <div id="signup-wrp">
                <div id="signup-wht">
                    <img src="images/roku_logo.svg" alt="logo">
                    <h2>Sign Up Now!</h2>
                    <h3>{{this.message}}</h3>
                    <form id="signup">
                        <label>First Name</label><br>
                        <input v-model="input.Fname" name="firstname" type="text"><br>
                        <label>Last Name</label><br>
                        <input v-model="input.Lname" name="lastname" type="text"><br>
                        <label>Email</label><br>
                        <input v-model="input.Email" name="email" type="email"><br>
                        <label>Confirm Email</label><br>
                        <input v-model="input.ConEmail" name="conemail" type="email"><br>
                        <label>Password</label><br>
                        <input v-model="input.Password" name="password" type="password"><br>
                        <label>Confirm Password</label><br>
                        <input v-model="input.ConPassword" name="conpassword" type="password"><br>
                        <button @click.prevent="signup()" name="submit">Sign-Up</button>
                        <button @click.prevent="goback()">Back <i class="fas fa-arrow-circle-right"></i></button>
                    </form>
                </div>
            </div>
        </div>
    `,
    data: function() {
        return {
            input: {
                Fname: "",
                Lname: "",
                Email: "",
                ConEmail: "",
                Password: "",
                ConPassword: ""
            },
            message: ""
        }
    },
    methods: {
        goback(){
            this.$router.push('/');
            debugger;
        },
        signup() {
            if (this.input.Fname != "" && this.input.Lname != "" && this.input.Email != "" && this.input.ConEmail != "" && this.input.Password != "" && this.input.ConPassword != "") {
                if(this.input.Email === this.input.ConEmail || this.input.Password === this.input.ConPassword){
                    let formData = new FormData();
                    formData.append("fname", this.input.Fname);
                    formData.append("lname", this.input.Lname);
                    formData.append("email", this.input.Email);
                    formData.append("password", this.input.Password);

                    let url = `./admin/signup_page.php`;

                    fetch(url, {
                        method: 'POST',
                        body: formData
                    })
                        .then(res => res.json())
                        .then(data => {
                            if (data === null || typeof data !== "string") { // means that we're not getting a user object back
                                console.warn(data);
                                alert("creation failed, please try again");
                            } else {
                                this.message = data;
                            }
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                } else {
                    this.message = "Email / Password must match";
                }
                
            } else {
                this.message = "Please fill out required fields";
            }
        }
    }
}
export default {
    template: `
        <div id="signup-bdy">
            <div id="signup-wrp">
                <div id="signup-wht">
                    <h2>Sign Up Now!</h2>
                    <form id="signup">
                        <label>First Name</label><br>
                        <input name="firstname" type="text"><br>
                        <label>Last Name</label><br>
                        <input name="lastname" type="text"><br>
                        <label>Email</label><br>
                        <input name="email" type="email"><br>
                        <label>Confirm Email</label><br>
                        <input name="conemail" type="email"><br>
                        <label>Password</label><br>
                        <input name="password" type="password"><br>
                        <label>Confirm Password</label><br>
                        <input name="conpassword" type="password"><br>
                        <button name="submit">Sign-Up</button>
                        <a @click="goback()">Go Back</a>
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
            }
        }
    },
    methods: {
        goback(){
            this.$router.push('/');
            debugger;
        }
    }
}
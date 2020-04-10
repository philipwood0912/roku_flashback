export default {
    template: `
        <div id="error-bdy">
            <div id="error-content">
                <h2>Oh no, there was an error</h2>
                <img src="images/error.svg" alt="error">
                <button @click="goBack" type="button"><i class="fas fa-arrow-circle-left"></i> Back</button>
            </div>
        </div>
    `,
    created: function() {
        this.$parent.profilepick = false;
    },
    methods: {
        goBack() {
            this.$parent.profilepick = true;
            this.$router.back();
        }
    }
}
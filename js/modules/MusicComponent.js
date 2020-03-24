import ProfileComponent from './ProfileComponent.js';
export default {
    template: `
        <div v-if="this.$parent.profilepick">
            <h2>Music Page</h2>
        </div>
        <div v-else>
            <profiles></profiles>
        </div>
    `,
    components: {
        profiles: ProfileComponent
    }
}
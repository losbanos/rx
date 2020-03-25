import {Component, Vue} from 'vue-property-decorator';
import {User} from '@components/user/User';
import {System} from '@components/system/System';

@Component
export default class SystemView extends Vue {
    private token: number;
    private id: string = 'System';

    constructor() {
        super();
    }

    protected mounted() {
        this.testUser();
    }

    private testUser() {
        const user: User = new User();
        const system: System = new System();

        user.add(system);
        user.login('kimtaehoon');
        user.logout();
        user.login('allen');
    }
}

import {Component, Vue} from 'vue-property-decorator';
import {lazyInject} from '@core/ServiceManager';
import ServiceInjectId from '@/const/ServiceInjectId';
import { PokeService } from '@/service/PokeService';
import {System} from '@components/system/System';
import {User} from '@components/user/User';

@Component
export default class Poke extends Vue {

    @lazyInject(ServiceInjectId.PokeService)
    protected pokeService: PokeService;

    public constructor() {
        super();
    }

    protected mounted() {
        const user: User = new User();
        const system: System = new System(user);

        system.check();
        user.login('Under Water');
        system.check();
        user.logout();
        system.check();
    }
}

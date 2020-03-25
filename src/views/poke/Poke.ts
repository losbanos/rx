import {Component, Vue} from 'vue-property-decorator';
import {lazyInject} from '@core/ServiceManager';
import ServiceInjectId from '@/const/ServiceInjectId';
import { PokeService } from '@/service/PokeService';

@Component
export default class Poke extends Vue {

    @lazyInject(ServiceInjectId.PokeService)
    protected pokeService: PokeService;

    public constructor() {
        super();
    }

    protected mounted() {
        // this.testUser();
    }
}

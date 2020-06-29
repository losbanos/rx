import {Component, Vue} from 'vue-property-decorator';
import {lazyInject} from '@core/ServiceManager';
import DependencyInjectId from '@/const/DependencyInjectId';
import { PokeService } from '@/service/PokeService';

@Component
export default class Poke extends Vue {

    @lazyInject(DependencyInjectId.PokeService)
    protected pokeService: PokeService;

    public constructor() {
        super();
    }

    protected mounted() {
        // this.testUser();
    }
}

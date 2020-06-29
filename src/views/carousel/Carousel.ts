import {Component, Vue} from 'vue-property-decorator';
import {lazyInject} from '@core/ServiceManager';
import DependencyInjectId from '@/const/DependencyInjectId';
import {ThroneService} from '@service/ThroneService';
import BaseComponent from '@core/BaseComponent';
import { GitHubService } from '@/service/github/GitHubService';
import { GitHubModel } from '@/service/github/GitHubModel';
import { GitHubItemModel } from '@/service/github/GitHubItemModel';

@Component
export default class Carousel extends BaseComponent {

    @lazyInject(DependencyInjectId.ThroneService)
    protected throneService: ThroneService;

    @lazyInject(DependencyInjectId.GitHubService)
    protected gitHubService: GitHubService;

    private items: Array<GitHubItemModel> = [];
    private itemLength: number = 0;

    protected created() {
        this.subscribe(this.gitHubService.profile$,
            (res: GitHubModel) => {
                this.itemLength = res.totalCount;
                this.items = res.items;
            });
    }

    protected mounted() {
        this.gitHubService.profile('typescript');

        const view: HTMLElement = this.$refs.carousel as HTMLElement;
        const container: HTMLElement = this.$refs.container as HTMLElement;

    }
}

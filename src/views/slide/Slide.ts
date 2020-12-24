import {Component, Prop, Ref} from 'vue-property-decorator';
import {Observable} from 'rxjs';
import {lazyInject} from '@core/ServiceManager';
import BasicView from '@/core/BasicView';
import DependencyInjectId from '@/const/DependencyInjectId';
import { GitHubService } from '@/service/github/GitHubService';
import { GitHubModel } from '@/service/github/GitHubModel';
import { GitHubItemModel} from '@/service/github/GitHubItemModel';
import { UserEventType } from '@/const/UserEvent';

@Component
export default class Slide extends BasicView {
    @lazyInject(DependencyInjectId.GitHubService)
    private gitHubService: GitHubService;

    @Ref()
    private container: HTMLElement;

    @Ref()
    private view: HTMLElement;

    private items: Array<GitHubItemModel> = [];
    private pannelLength: number = 0;
    private supportTouch: boolean = false;

    protected created() {
        this.subscribe(this.gitHubService.profile$,
            (res: GitHubModel) => {
                this.items = res.items;
                this.pannelLength = res.totalCount;
        });
    }
    protected mounted() {
        this.gitHubService.profile('losbanos');
    }
}

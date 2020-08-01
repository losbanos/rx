import {Component, Vue} from 'vue-property-decorator';
import {fromEvent, Observable, Observer, Subscriber, OperatorFunction, interval, Subscription, SubscriptionLike, TeardownLogic, of, range, merge, from} from 'rxjs';
import {map, takeUntil, mergeMap, switchMap, take, first, startWith, filter, withLatestFrom, tap, share} from 'rxjs/operators';
import {lazyInject} from '@core/ServiceManager';
import DependencyInjectId from '@/const/DependencyInjectId';
import {ThroneService} from '@service/ThroneService';
import BaseComponent from '@core/BaseComponent';
import { GitHubService } from '@/service/github/GitHubService';
import { GitHubModel } from '@/service/github/GitHubModel';
import { GitHubItemModel } from '@/service/github/GitHubItemModel';
import { USER_EVENT, SUPPORT_TOUCH, UserEventType } from '@/const/UserEvent';
import { Action } from 'rxjs/internal/scheduler/Action';

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

        const carousel: HTMLElement = this.$refs.carousel as HTMLElement;
        const container: HTMLElement = this.$refs.container as HTMLElement;

        type ActionEventType = UserEventType<TouchEvent | MouseEvent>;
        const toProps: (event: ActionEventType) => number = (event: ActionEventType) => {
            return event instanceof TouchEvent ? event.changedTouches[0].pageX : event.pageX;
        };

        const toProps2: (ov: Observable<ActionEventType>) => Observable<number> = (source$: Observable<ActionEventType>) => {
            return source$.pipe(
                map((event: ActionEventType) => {
                    return event instanceof TouchEvent ? event.changedTouches[0].pageX : event.pageX;
                })
            );
        };

        const start$: Observable<any> = fromEvent<ActionEventType>(carousel, USER_EVENT.START).pipe(toProps2);
        const move$: Observable<any> = fromEvent<ActionEventType>(carousel, USER_EVENT.MOVE).pipe(toProps2);
        const end$: Observable<any> = fromEvent<ActionEventType>(carousel, USER_EVENT.END);
        const size$: Observable<number> = fromEvent(window, 'resize').pipe(
            startWith(0),
            map((e: Event) => {
                console.log('e = ', e);
                return carousel.clientWidth;
            })
        );
        const drag$: Observable<number> = start$.pipe(
            switchMap(start => {
                return move$.pipe(
                    map(move => move - start),
                    takeUntil(end$),
                );
            }),
            share(),
        );

        const drop$: Observable<any> = drag$.pipe(
            switchMap(drag => {
                return end$.pipe(
                    map(event => drag),
                    first()
                );
            }),
            withLatestFrom(size$)
        );

        const carousel$: Observable<any> = merge(drag$, drop$);

        carousel$.subscribe(
            n => console.log('carousel = ', n)
        )
    }
}

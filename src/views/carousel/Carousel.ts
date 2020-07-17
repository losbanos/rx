import {Component, Vue} from 'vue-property-decorator';
import {fromEvent, Observable, Observer, Subscriber, OperatorFunction, interval, Subscription, SubscriptionLike, TeardownLogic, of} from 'rxjs';
import {map, takeUntil, mergeMap, switchMap} from 'rxjs/operators';
import {lazyInject} from '@core/ServiceManager';
import DependencyInjectId from '@/const/DependencyInjectId';
import {ThroneService} from '@service/ThroneService';
import BaseComponent from '@core/BaseComponent';
import { GitHubService } from '@/service/github/GitHubService';
import { GitHubModel } from '@/service/github/GitHubModel';
import { GitHubItemModel } from '@/service/github/GitHubItemModel';
import { USER_EVENT, SUPPORT_TOUCH, UserEventType } from '@/const/UserEvent';

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

        type ActionEventType = UserEventType<TouchEvent | MouseEvent>;
        const toProps: (event: ActionEventType) => number = (event: ActionEventType) => {
            return event instanceof TouchEvent ? event.changedTouches[0].pageX : event.pageX;
        };

        const toProps2: (ob$: Observable<ActionEventType>) => Observable<number> = (param$: Observable<ActionEventType>) => {
            return param$.pipe(
                map((event: ActionEventType) => {
                    return event instanceof TouchEvent ? event.changedTouches[0].pageX : event.pageX;
                })
            );
        };

        const toProps3: <T>(source: Observable<T>) => any = <T>(source: Observable<T>) => {
            
            return new Observable((subscriber: Subscriber<any>) => {
                subscriber.next('abc');
                subscriber.complete();
            });
        }

        const filterNil: <T, R>(project: (value: T) => R) => OperatorFunction<T, R> = <T, R>(project: (value: T) => R): OperatorFunction<T, R> => {
            return <U>(source: Observable<any>): Observable<U> => {
                const transformFn: any = project;
                return new Observable((subscriber: Subscriber<U>): TeardownLogic => {
                    const subscription: Subscription = source.subscribe(
                        n => {
                            if (n % 2 === 0) {
                                subscriber.next(transformFn(n));
                            }
                        },
                        e => {
                            subscriber.error(e);
                        },
                        () => {
                            console.log('complete');
                            subscriber.complete();
                        }
                    );
                    return () => subscription.unsubscribe();
                });
            };
        };

        const a: Subscription = interval(1000).pipe(
            map(v => {
                return v === 0 ? undefined : v;
            }),
            filterNil(v => {
                return v + 1;
            })
        ).subscribe(
            n => {
                console.log('n = ', n);
                if (n > 10) {
                    a.unsubscribe();
                }
            },
            e => console.log(e),
            () => console.log('complete')
        );

        const start$: Observable<any> = fromEvent<ActionEventType>(view, USER_EVENT.START).pipe(
            toProps2
        );
        const move$: Observable<any> = fromEvent<ActionEventType>(view, USER_EVENT.MOVE).pipe(
            toProps2
        );

        const end$: Observable<any> = fromEvent(view, USER_EVENT.END);

        const drag$: Observable<any> = start$.pipe( 
            switchMap(start => {
                return move$.pipe(
                    takeUntil(end$)
                );
            })
        );
    }
}

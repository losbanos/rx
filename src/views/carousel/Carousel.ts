import {Component, Vue} from 'vue-property-decorator';
import {fromEvent, Observable, Observer, Subscriber, OperatorFunction, interval, Subscription, SubscriptionLike, TeardownLogic, of, range, merge, from, asyncScheduler, asapScheduler, queueScheduler} from 'rxjs';
import {map, takeUntil, mergeMap, switchMap, take, first, startWith, filter, withLatestFrom, tap, share, scan, pluck, subscribeOn, observeOn} from 'rxjs/operators';
import {lazyInject} from '@core/ServiceManager';
import DependencyInjectId from '@/const/DependencyInjectId';
import {ThroneService} from '@service/ThroneService';
import BasicView from '@/core/BasicView';
import { GitHubService } from '@/service/github/GitHubService';
import { GitHubModel } from '@/service/github/GitHubModel';
import { GitHubItemModel } from '@/service/github/GitHubItemModel';
import { USER_EVENT, SUPPORT_TOUCH, UserEventType } from '@/const/UserEvent';
import {CarouselLimit} from '@/enum/CarouselLimit';

interface UpdateStore {
    from?: number;
    to?: number;
    index?: number;
    size?: number;
}
@Component
export default class Carousel extends BasicView {

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
        const size$: Observable<any> = fromEvent<any>(window, 'resize').pipe(
            startWith(0),
            map((e: Event) => {
                return carousel.clientWidth;
            })
        );
        const drag$: Observable<any> = start$.pipe(
            switchMap(start => {
                return move$.pipe(
                    map(move => move - start),
                    takeUntil(end$)
                );
            }),
            map(distance => ({distance})),
            share()
        );

        const drop$: Observable<any> = drag$.pipe(
            switchMap(drag => {
                return end$.pipe(
                    map(event => drag),
                    first()
                );
            }),
            withLatestFrom(size$, (drag, size) => {
                return {...drag, size};
            })
        );

        const carousel$: Observable<any> = merge(drag$, drop$).pipe(
            scan((store, {distance, size}) => {
                let updateStore: UpdateStore = {from: (store.index * store.size * -1) + distance};
                if (size === void 0) {
                    updateStore.to = updateStore.from;
                } else {
                    let tobeIndex: number = store.index;
                    if (Math.abs(distance) >= CarouselLimit.Threshold) {
                        tobeIndex = distance < 0 ? Math.min(tobeIndex + 1, this.itemLength - 1) : Math.max(tobeIndex - 1, 0);
                    }
                    updateStore.index = tobeIndex;
                    updateStore.size = size;
                    updateStore.to = - (size * tobeIndex);
                }
                return {...store, ...updateStore};
            }, {
                index: 0,
                from: 0,
                to: 0,
                size: 0
            })
        ).subscribe(n => {
            container.style.transform = `translate3d(${n.to}px, 0, 0)`;
        });

        const ob$: Observable<string> = of('A', 'B', 'C')
        .pipe(
            // subscribeOn(asyncScheduler),
            tap(n => console.log(n, ' = 데이터 처리 1')),
            tap(n => console.log(n, ' = 데이터 처리 2')),
            observeOn(asyncScheduler, 1000),
            tap(n => console.log(n, ' = 데이터 처리 3')),
            tap(n => console.log(n, ' = 데이터 처리 4')),
            subscribeOn(asyncScheduler, 1000)
        );


        // const source$: Observable<number> = new Observable<number>((subscriber) => {
        //     console.log('Begin source');
        //     subscriber.next(1);
        //     subscriber.next(2);
        //     subscriber.next(3);
        //     console.log('End source');
        // })

        // console.log('before subscribe');
        // source$.pipe(
        //     observeOn(asyncScheduler, 1000),
        //     map(n => {
        //         return n * 2;
        //     })
        // ).subscribe(
        //     n => console.log('n = ', n)
        // );
        // console.log('after subscribe');

        const body: HTMLElement = document.getElementsByTagName('body')[0];
        const observer1: MutationObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                console.log('mutations = ', mutation);
                mutation.addedNodes.forEach((node, key, vv) => {
                    console.log(node.nodeType);
                });
            });
        });
        console.log(observer1);
        observer1.observe(body, {childList: true});

        // setTimeout(() => {
        //     const el: HTMLElement = document.createElement('p');
        //     el.innerText = 'THIS iS ADDED P TAG';
        //     body.appendChild(el);
        //     console.log('------------APPENDED----------------------------', el);
        //     // observer1.disconnect();
        // }, 1000);

        interval(1000).pipe(
            take(5),
            tap(() => {
                const el: HTMLElement = document.createElement('p');
                el.innerText = 'THIS iS ADDED P TAG';
                body.appendChild(el);
                console.log('------------APPENDED----------------------------', el);
            })
        ).subscribe(
            () => {},
            () => {},
            () => observer1.disconnect()
        );
    }

}

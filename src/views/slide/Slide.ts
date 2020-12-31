import {Component, Prop, Ref} from 'vue-property-decorator';
import {from, fromEvent, merge, Observable} from 'rxjs';
import {lazyInject} from '@core/ServiceManager';
import BasicView from '@/core/BasicView';
import DependencyInjectId from '@/const/DependencyInjectId';
import { GitHubService } from '@/service/github/GitHubService';
import { GitHubModel } from '@/service/github/GitHubModel';
import { GitHubItemModel} from '@/service/github/GitHubItemModel';
import { UserEventType, USER_EVENT} from '@/const/UserEvent';
import { map, scan, share, startWith, switchMap, take, takeUntil, tap, withLatestFrom } from 'rxjs/operators';
import { CarouselLimit } from '@/enum/CarouselLimit';

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

    protected created() {
        this.subscribe(this.gitHubService.profile$,
            (res: GitHubModel) => {
                this.items = res.items;
                this.pannelLength = res.totalCount;
        });
    }

    protected mounted() {
        this.gitHubService.profile('losbanos');

        type ActiveUserEvent = UserEventType<TouchEvent | MouseEvent>;

        const toProps: (event: ActiveUserEvent) => number = (event: ActiveUserEvent) => {
            return event instanceof TouchEvent ? event.changedTouches[0].pageX : event.pageX;
        };
        const toProps2: (source: Observable<ActiveUserEvent>) => Observable<number> = (source$: Observable<ActiveUserEvent>) => {
            return source$.pipe(
                map((event: ActiveUserEvent ) => event instanceof TouchEvent ? event.changedTouches[0].pageX : event.pageX)
            );
        };
        const start$: Observable<number> = fromEvent<ActiveUserEvent>(this.view, USER_EVENT.START).pipe(toProps2);
        const move$: Observable<number> = fromEvent<ActiveUserEvent>(this.view, USER_EVENT.MOVE).pipe(toProps2);
        const end$: Observable<ActiveUserEvent> = fromEvent<ActiveUserEvent>(this.view, USER_EVENT.END).pipe(take(1));
        const windowWidth$: Observable<number> = fromEvent(window, 'resize').pipe(
            startWith(0),
            map(size => this.view.clientWidth)
        );

        interface DistanceAndSize {
            distance: number;
            size?: number;
        }
        const drag$: Observable<DistanceAndSize> = start$.pipe(
            switchMap(start => move$.pipe(
                map(move => {
                    return {distance: start - move};
                }),
                takeUntil(end$)
                )
            ),
            share()
        );
        const drop$: Observable<DistanceAndSize> = drag$.pipe(
            switchMap(drag => end$.pipe(map(end => drag))),
            withLatestFrom(windowWidth$, (distance, size) => ({ ...distance, size }))
        );

        interface StoreType {
            from: number; to: number; index: number; size: number;
        }
        const carousel$: Observable<StoreType> = merge(drag$, drop$).pipe(
            scan((store: StoreType, {distance, size}) => {
                // let updateStore: StoreType = {};
                const updateStore = {...store, ...{from: (store.index * store.size) + distance}};

                if (size === void 0 ) {
                    updateStore.to =  updateStore.from * -1;
                } else {
                    let toBeIndex: number = store.index;
                    if (Math.abs(distance) >= CarouselLimit.Threshold) {
                        toBeIndex = distance > 0 ? Math.min(toBeIndex + 1, this.pannelLength - 1) : Math.max(toBeIndex - 1, 0);
                    }
                    updateStore.to = toBeIndex * size * -1;
                    updateStore.size = size;
                    updateStore.index = toBeIndex;
                }

                return {...store, ...updateStore};
            }, {
                from: 0, to: 0,
                index: 0, size: 0
            })
        );
        carousel$.subscribe(store => {
            console.log('store = ', store);
            this.container.style.transform = `translate3d(${store.to}px, 0, 0)`;
        });
        // merge(drag$, drop$).subscribe(n => console.log(n));
    }
}

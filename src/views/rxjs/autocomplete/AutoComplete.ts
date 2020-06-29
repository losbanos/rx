import {Component, Vue} from 'vue-property-decorator';
import {fromEvent, Observable, from, of, range, merge, partition, interval, timer, Observer, Subject, Subscription} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {map, mergeAll, mergeMap, debounceTime, filter,
    distinctUntilChanged, tap, switchMap, take, pluck,
    catchError, retry, finalize, concatMap, startWith, skip, scan, multicast, publish, refCount, share} from 'rxjs/operators';
import {IResultItem} from './IResultItem';

@Component
export default class AutoComplete extends Vue {

    private GITHUB_URL: string = 'https://api.github.com/search';
    private results: Array<IResultItem> = [];
    private totalCount: number = 0;
    private isLoading: boolean = false;

    protected mounted() {
        this.$nextTick(() => {
            this.setInputEventHandler();
            // this.testSwitchMap();
            this.testConcatMap();
            // this.coldObservable();
            // this.hotObservable();
            // this.publishable();
        });
    }

    private publishable() {
        const number$: Observable<number> = interval(1000);
        const connectable$: Observable<number> = number$.pipe(share());
        let subscription2: Subscription;
        const subscription1: Subscription = connectable$.subscribe(v => console.log(`observerA: ${v}`));
        // let connectSubj: Subject<any> = connectable$.connect();

        setTimeout(() => {
            subscription2 = connectable$.subscribe(v => console.log(`observerB: ${v}`));
        }, 1000);

        setTimeout(() => {
            console.log('observerA is unsubscribed');
            subscription1.unsubscribe();
        }, 2000);
        setTimeout(() => {
            console.log('observerB is unsubscribed');
            subscription2.unsubscribe();
            console.log('connectableObservable is unsubscribed');
            // connectSubj.unsubscribe();
        }, 3100);
    }
    private setInputEventHandler() {

        const keyup$: Observable<string> = fromEvent(this.$refs.search_inp as HTMLInputElement, 'keyup')
        .pipe(
            debounceTime(1000),
            map((e: Event) => {
                return (e.target as HTMLInputElement).value;
            }),
            distinctUntilChanged(),
            share()
        );

        const [user$, reset$]: any = partition(keyup$, query => query.trim().length > 0);

        user$.pipe(
            tap(() => {
                this.isLoading = true;
            }),
            switchMap((query: string) => {
                return this.getUserRequest(this.GITHUB_URL, query);
            }),
            tap(() => {
                this.isLoading = false;
            }),
            retry(2),
            finalize(() => {
                this.isLoading = false;
            }),
            tap(v => console.log('from user$ = ', v))
        ).subscribe((e: any) => {
            this.results = e.items;
            this.totalCount = e.total_count;
        });

        reset$.pipe(
            tap(() => {
                this.results = [];
                this.totalCount = 0;
            }),
            tap(v => console.log('from reset = ', v))
        ).subscribe();
    }

    private getUserRequest(baseUrl: string, query: string): Observable<any> {
        const url: string = `${baseUrl}/users?q=${query}`;
        return ajax.getJSON(url);
    }

    private async getData(url: string): Promise<any> {
        return fetch(url)
        .then(res => res.json());
    }

    private testSwitchMap() {
        interval(600).pipe(
            take(5),
            switchMap(n => {
                return interval(250).pipe(
                    map(y => ({n, y})),
                    take(3)
                );
            })
        ).subscribe(result => {
            console.log(`next n : ${result.n}, next y: ${result.y}`);
        });
    }

    private testConcatMap() {
        const firstValue: number = -1;
        const requests: Array<Observable<string>> = [
            timer(2000).pipe(
                startWith(firstValue),
                tap(x => x === firstValue && console.log('request-1 is 구독되었음')),
                skip(1),
                map(v => 'request 1')
            ),
            timer(1000).pipe(
                startWith(firstValue),
                tap(x => x === firstValue && console.log('request-2 is 구독되었음')),
                skip(1),
                map(v => 'request 2')
            ),
            timer(1500).pipe(
                startWith(firstValue),
                tap(x => x === firstValue && console.log('request-3 is 구독되었음')),
                skip(1),
                map(v => 'request 3')
            )
        ];

        interval(1000).pipe(
            take(5)
        ).subscribe(x => console.log(`${x + 1} secs`));

        range(0, 3).pipe(
            tap(x => console.log(`range next ${x}`)),
            concatMap(x => {
                console.log(`concatMap project function ${x}`);
                return requests[x];
            }
        ));

        of(1).pipe(
            tap(x => console.log('start')),
            mergeMap(x => {
                return timer(2000).pipe(
                    tap(t => console.log('2000 구독')),
                    map(v => {
                        console.log('timer 2000 observable');
                        return '2000 observalbe';
                    }));
            }),
            mergeMap(r => {
                return timer(1000).pipe(
                    tap(t => console.log('1000 구독')),
                    map(x => {
                        console.log('timer 1000 observable');
                        return `${r} 1000 observable`;
                    }));
                })
        ).subscribe(
            n => console.log('result = ', n)
        );
    }

    private hotObservable(): void {
        const subj: Subject<any> = new Subject<any>();

        const keyup$: Observable<string> = fromEvent(this.$refs.search_inp as HTMLInputElement, 'keyup')
        .pipe(
            debounceTime(1000),
            map((e: Event) => {
                return (e.target as HTMLInputElement).value;
            }),
            distinctUntilChanged(),
            tap(v => console.log('from keyup$ = ', v)),
            publish()
        );
        // const [user$, reset$] = partition(keyup$, (v: string) => v.trim().length > 0);
        const [user$, reset$] = partition(keyup$, (v: string) => v.trim().length > 0);
        user$.pipe(
            tap(v => this.isLoading = true),
            switchMap(query => {
                return this.getUserRequest(this.GITHUB_URL, query);
            }),
            tap(v => this.isLoading = false),
            retry(2),
            finalize(() => {
                this.isLoading = false;
            })
        ).subscribe((e: any) => {
            this.results = e.items;
            this.totalCount = e.total_count;
        });

        reset$.pipe(
            tap(v => {
                this.isLoading = false;
                this.results = [];
                this.totalCount = 0;
            })).subscribe();
        // keyup$.connect();
    }

    private coldObservable() {
        const n: number = 7;
        const source$: Observable<number> = interval(500).pipe(
            take(n),
            scan((acc, v) => {
                let localValue: any = acc;
                if (typeof localValue === 'function') {
                    localValue = localValue();
                }
                const tempA = localValue.a;
                localValue.a = localValue.b;
                localValue.b = tempA + localValue.b;
                return localValue;
            }, () => ({a: 1, b: 0})),
            pluck('a')
        );

        source$.subscribe(result => console.log(`result = ${result}`));
        setTimeout(() => {
            source$.subscribe(result2 => console.log(`result2 = > ${result2}`));
        }, 3100);

    }
}

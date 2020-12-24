import {inject} from 'inversify';
import {Component, Ref} from 'vue-property-decorator';
import {lazyInject} from '@core/ServiceManager';
import BasicView from '@core/BasicView';
import DependencyInjectId from '@/const/DependencyInjectId';
import { GitHubService } from '@/service/github/GitHubService';
import { GitHubModel } from '@/service/github/GitHubModel';
import {GitHubItemModel} from '@service/github/GitHubItemModel'
import {Subject, Observer, interval, Observable, BehaviorSubject, ReplaySubject, AsyncSubject, Subscription, ConnectableObservable} from 'rxjs';
import { map, multicast, pluck, publish, refCount, scan, share, take, tap } from 'rxjs/operators';

interface HotObservableType {
    connect: () => Subscription;
    subscribe: (observer: Observer<any>) => any;
}

@Component
export default class Casting extends BasicView {
    @Ref() private casting: HTMLElement;

    @lazyInject(DependencyInjectId.GitHubService)
    private githubService: GitHubService;

    private githubProfile: GitHubModel;

    private subject: Subject<number> = new Subject<number>();

    protected created() {
        this.subscribe(this.githubService.profile$,
            (profile: GitHubModel) => {
                this.manipulateProfile(profile.items);
                this.subjectHandler();
            }
        );
        // this.handleKindofSubject();
        // this.handleReplaySubject();
        // this.handleAsyncSubject();
        // this.githubService.profile('losbanos');
        // this.hotObservable();
        // this.multicasting();
        // this.publishing();
        // this.refCounting();
        this.sharing();
    }

    private manipulateProfile(profile: Array<GitHubItemModel>) {
        console.log('profile = ', profile);
    }

    private subjectHandler() {
        const intr: Observable<number> = interval(500).pipe(take(5));

        const observer1: Observer<number> = {
            next: x => console.log('observe1 = ', x),
            error: e => console.error(e),
            complete: () => console.log('complete')
        }

        const observer2: Observer<number> = {
            next: x => console.log('observe222 = ', x),
            error: e => console.error(e),
            complete: () => console.log('complete')
        }
        const observer3: Observer<number> = {
            next: x => console.log('observe333 = ', x),
            error: e => console.error(e),
            complete: () => console.log('complete')
        }

        
        // this.subject.error(new Error('Subject Error'));
        
        this.subject.subscribe(observer1);
        intr.subscribe(this.subject);
        setTimeout(() => {
            this.subject.subscribe(observer2)
            this.subject.unsubscribe();
        }, 2000);
        
        setTimeout(() => {
            this.subject.subscribe(observer3);
        }, 3000);
    }

    private handleKindofSubject() {
        const behaviorString: BehaviorSubject<string> = new BehaviorSubject('초기값');
        const behaviorNumber: BehaviorSubject<number> = new BehaviorSubject(0);
        const increment$: Observable<number> = interval(1000).pipe(
            take(5),
            map(x => behaviorNumber.value + 1));

        const observer1: Observer<number> = {
            next: x => console.log('observe1 = ', x),
            error: e => console.error(e),
            complete: () => console.log('complete')
        }

        const observer2: Observer<number> = {
            next: x => console.log('observe222 = ', x),
            error: e => console.error(e),
            complete: () => console.log('complete')
        }
        const observer3: Observer<number> = {
            next: x => console.log('observe333 = ', x),
            error: e => console.error(e),
            complete: () => console.log('complete')
        }

        increment$.subscribe(
            behaviorNumber
        );

        behaviorNumber.subscribe(observer1);
        setTimeout(() => {
            behaviorNumber.subscribe(observer2);
        }, 3200);
        // behaviorNumber.subscribe(observer3);
    }

    private handleReplaySubject() {
        const replay: ReplaySubject<number> = new ReplaySubject();
        const intercrement$: Observable<number> = interval(500).pipe(take(8));
        const observer1: Observer<number> = {
            next: x => console.log('observe1 = ', x),
            error: e => console.error(e),
            complete: () => console.log('complete')
        }

        const observer2: Observer<number> = {
            next: x => console.log('observe222 = ', x),
            error: e => console.error(e),
            complete: () => console.log('complete')
        }
        const observer3: Observer<number> = {
            next: x => console.log('observe333 = ', x),
            error: e => console.error(e),
            complete: () => console.log('complete')
        }

        console.log('Try replaySubject.subscribe(observer1)');
        replay.subscribe(observer1);

        intercrement$.subscribe(replay);

        setTimeout(() => {
            console.log('Try replaySubject.subscribe(observer22)');
            replay.subscribe(observer2);
        }, 2600);
    }

    private handleAsyncSubject() {
        const period: number = 500;
        const lastN: number = 8;
        const asyncSubject: AsyncSubject<any> = new AsyncSubject();

        const pibonacci = (n: number) => interval(period).pipe(
            take(n),
            scan((acc, index) => acc ? {a: acc.b, b: acc.a + acc.b} : {a: 0, b: 1}, null),
            pluck('a'),
            tap(n => console.log(`tap log: emitting ${n}`))
        );

        pibonacci(lastN).subscribe(asyncSubject);
        asyncSubject.subscribe(result => console.log(`1st subscribe: ${result}`));
        
        setTimeout(() => {
            console.log('2nd subscribe');
            asyncSubject.subscribe(result => console.log(`2st subscribe: ${result}`));
        }, period * lastN);
    }

    private hotObservable() {
        const observer1: Observer<number> = {
            next: x => console.log('observe1 = ', x),
            error: e => console.error(e),
            complete: () => console.log('complete')
        }

        const observer2: Observer<number> = {
            next: x => console.log('observe222 = ', x),
            error: e => console.error(e),
            complete: () => console.log('complete')
        }
        const observer3: Observer<number> = {
            next: x => console.log('observe333 = ', x),
            error: e => console.error(e),
            complete: () => console.log('complete')
        }

        const source$: Observable<number> = interval(500).pipe(
            take(5),
            tap(x => console.log(`tap ${x}`))
        );

        const hot$: HotObservableType = this.createHotObservable(source$, new Subject());
        hot$.subscribe(observer1);
        console.log('Observer 1 Subscribe');
        hot$.subscribe(observer2);
        console.log('Observer 2 Subscribe');

        hot$.connect();
        console.log('connect is called');

        setTimeout(() => {
            console.log('1000ms....');
            hot$.subscribe(observer3);
        }, 1000);
    }

    private createHotObservable(source: Observable<number>, subject: Subject<number>): HotObservableType {
        return {
            connect: () => source.subscribe(subject),
            subscribe: subject.subscribe.bind(subject)
        };
    }

    private multicasting() {
        const subject: Subject<number> = new Subject();
        const sourceObservable: any = interval(500).pipe(
            take(5)
        );
        const multi$: any = sourceObservable.pipe(multicast(subject));

        const subscriber1: any = multi$.subscribe(v => console.log(`subscribe 1 = ${v}`));
        
        subject.next(12453);
        // setTimeout(() => {
        //     console.log('connet');
        //     multi$.connect();
        // }, 2000);
        // setTimeout(() => {
        //     const subscriber2: any = multi$.subscribe(v => console.log(`subscribe 2 = ${v}`));
        // }, 3000)
    }

    private publishing() {
        // const source2$: Observable<any> = interval(500).pipe(
        //     take(5),
        //     tap(x => console.log(`tap ${x}`)),
        //     multicast(() => new Subject())
        // );

        const source2$: ConnectableObservable<any> = interval(500).pipe(
            take(5),
            tap(x => console.log(`source ${x} in tap func`)),
            publish((multicast) => {
                console.log('multicast = ', multicast);
                return multicast;
            })
        );

        const a: Subscription = source2$.subscribe(x => console.log(`result a = ${x}`));
        const b: Subscription = source2$.subscribe(x => console.log(`result b = ${x}`));

        source2$.connect();

        setTimeout(() => {
            console.log('time out');
            a.unsubscribe();
            b.unsubscribe();
            source2$.subscribe(x => console.log(`c: ${x}`));
            source2$.connect();
        }, 3000)
    }

    private refCounting() {
        const sources$: Observable<any> = interval(500).pipe(
            take(5),
            tap(x => console.log(`tap ---> ${x}`))
        );

        const a$: Observable<any> = sources$.pipe(
            multicast(() => new Subject()),
            refCount()
        );
        const b$: Observable<any> = sources$.pipe(
            publish(),
            refCount()
        );

        const subscription1 = a$.subscribe(x => console.log(`a : ${x}`));
        const subscription2 = a$.subscribe(x => console.log(`b: ${x}`));

        setTimeout(() => {
            console.log('time out');
            a$.subscribe(x => console.log(`c : ${x}`));
        }, 3000);
    }

    private sharing() {
        const source$: Observable<any> = interval(500).pipe(
            take(5),
            tap(x => console.log(`tap ---> ${x}`))
        );

        const share$: Observable<any> = source$.pipe(share());
        const share2$: Observable<any> = source$.pipe(
            publish(),
            refCount()
        );

        share2$.subscribe(x => console.log(`a = ${x}`));
        share2$.subscribe(x => console.log(`b = ${x}`));

        setTimeout(() => {
            console.log('time out');
            share2$.subscribe(x => console.log(`c = ${x}`));
        }, 3000);
    }
}

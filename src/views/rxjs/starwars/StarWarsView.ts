import {Component, Vue} from 'vue-property-decorator';
import {lazyInject} from '@core/ServiceManager';
import ServiceInjectId from '@/const/ServiceInjectId';
import {StarWarsService} from '@service/StarWarsService';
import {IStarWarsPeople} from '@components/starwars/model/IStarWarsPeople';
import {StarWarsMapper} from '@components/starwars/model/StarWarsMapper';
import {Observable, from, Subscription, Observer} from 'rxjs';
import {pluck, filter} from 'rxjs/operators';

@Component
export default class StarWarsView extends Vue {

    @lazyInject(ServiceInjectId.StarWarsService)
    private starWarsService: StarWarsService;

    private items: Array<any> = [];

    protected created() {
        // tslint:disable-no-empty-block;
    }

    protected mounted() {
        this.starWarsService.load('people', 'json')
            .then(res => {
                const results: Array<IStarWarsPeople> = StarWarsMapper.peopleMapper(res.results);
                // this.setPeopleInfo(results);
                this.setPeopleInfoByRx(results);
            });
    }

    protected setPeopleInfo(people: Array<IStarWarsPeople>) {
        this.items = people
            .filter((user: IStarWarsPeople) => /male|female/.test(user.gender))
            .map(this.caculateBmi);
    }

    protected setPeopleInfoByRx(people: Array<IStarWarsPeople>) {
        const user$: Observable<IStarWarsPeople> = from(people);
        user$.pipe(
          filter(user => {
              return user.gender === 'male';
          })
        ).subscribe(
            n => {
                this.items.push(n);
            }
        );

        const num$: Observable<string> = new Observable<string>(observer => {
            const id = setInterval(() => {
                observer.next(new Date().toString());
            }, 1000);
            return () => {
                console.log('자원 제거');
                clearInterval(id);
            };
        });

        const numSupscription: Subscription = num$.subscribe(n => console.log(n),
                e => console.log(e),
            () => console.log('데이터 전달 완료')
        );
        setTimeout(() => {
            numSupscription.unsubscribe();
        }, 3000);
    }

    protected caculateBmi(user: IStarWarsPeople): IStarWarsPeople {
        let broca: number = 0;
        let bmi: number = 0;

        const height: number = user.height;
        if (user.gender === 'male') {
            broca = Math.round(height - 100 * 0.9);
            bmi = Math.floor(height / 100 * height / 100 * 22);
        } else {
            broca = Math.round(height - 100 * 0.9);
            bmi = Math.floor(height / 100  * height / 100 * 21);
        }
        const obesityUsingBroca: number = (user.mass - broca);
        const obesityUsingBmi: number = Math.round((user.mass - bmi) / bmi * 100);

        return Object.assign({}, user, {broca, bmi, obesityUsingBroca, obesityUsingBmi});
    }
}

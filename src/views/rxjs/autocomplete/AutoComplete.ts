import {Component, Vue} from 'vue-property-decorator';
import {fromEvent, Observable, from, of, range, merge, partition} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {map, mergeAll, mergeMap, debounceTime, filter, distinctUntilChanged, tap, switchMap} from 'rxjs/operators';
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
        });
    }

    private setInputEventHandler() {

        const keyup$: Observable<string> = fromEvent(this.$refs.search_inp as HTMLInputElement, 'keyup')
        .pipe(
            debounceTime(1000),
            map((e: Event) => {
                return (e.target as HTMLInputElement).value;
            }),
            distinctUntilChanged());

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
            })
        ).subscribe((e: any) => {
            this.results = e.items;
            this.totalCount = e.total_count;
        });

        reset$.pipe(
            tap(() => {
                this.results = [];
                this.totalCount = 0;
            })
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
}
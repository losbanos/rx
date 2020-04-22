import {Component, Vue} from 'vue-property-decorator';
import {fromEvent, Observable, from, of} from 'rxjs';
import {ajax} from 'rxjs/ajax';
import {map, mergeAll, mergeMap, debounceTime, filter, distinctUntilChanged} from 'rxjs/operators';

@Component
export default class AutoComplete extends Vue {

    private GITHUB_URL: string = 'https://api.github.com/search';

    protected mounted() {
        this.$nextTick(() => {
            this.setInputEventHandler();
        });
    }

    private setInputEventHandler() {

        const users$: Observable<Event> = fromEvent(this.$refs.search_inp as HTMLInputElement, 'keyup');
        users$.pipe(
            debounceTime(1000),
            map((e: Event) => {
                return (e.target as HTMLInputElement).value;
            }),
            distinctUntilChanged(),
            filter((key: string) => key.trim().length > 0),
            mergeMap((query: string) => {
                return this.getUserRequest(this.GITHUB_URL, query);
            })
        ).subscribe((e: any) => {
            console.log('result = ', e);
        });

        const request$: Observable<any> = this.getUserRequest(this.GITHUB_URL, '');
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

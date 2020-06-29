import {injectable} from 'inversify';
import {ajax} from 'rxjs/ajax';
import {Observable} from 'rxjs';

@injectable()
export class GitHubApi {

    private GITHUB_URL: string = 'https://api.github.com/';
    private context: string = 'search';

    public profile(keyword: string): Observable<any> {
        return ajax.getJSON(`${this.GITHUB_URL}${this.context}/users?q=${keyword}`);
    }
}

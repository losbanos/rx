import DependencyInjectId from '@/const/DependencyInjectId';
import {lazyInject} from '@core/ServiceManager';
import {GitHubApi} from '@apis/GitHubApi';
import { injectable } from 'inversify';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import { GitHubResponse } from './response/GitHubResponse';
import {GitHubServiceHelper} from './GitHubServiceHelper';
import { GitHubModel } from './GitHubModel';

@injectable()
export class GitHubServiceMapper {

    @lazyInject(DependencyInjectId.GitHubServiceMapper)
    protected gitHubServiceMapper: GitHubServiceMapper;

    @lazyInject(DependencyInjectId.GitHubApi)
    private gitHubApi: GitHubApi;

    public profile(request: string): Observable<GitHubModel> {
        return this.gitHubApi.profile(request).pipe(
            map(res => {
                return GitHubServiceHelper.mappingGitHubResponse(res);
            })
        );
    }
}

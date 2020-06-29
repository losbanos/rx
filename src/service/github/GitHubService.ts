import {injectable, inject} from 'inversify';
import axios from 'axios';
import {Observable, Subject} from 'rxjs';
import DependencyInjectId from '@/const/DependencyInjectId';
import {lazyInject} from '@core/ServiceManager';
import { GitHubServiceMapper } from './GitHubServiceMapper';
import { GitHubModel } from './GitHubModel';

@injectable()
export class GitHubService {

    @lazyInject(DependencyInjectId.GitHubServiceMapper)
    private gitHubServiceMapper: GitHubServiceMapper;

    private profileSubj: Subject<any> = new Subject<any>();

    public get profile$(): Observable<any> {
        return this.profileSubj.asObservable();
    }
    public profile(keyword: string): void {
        this.gitHubServiceMapper.profile(keyword).subscribe(
            (res: GitHubModel) => {
                this.profileSubj.next(res);
            }
        );
    }
}

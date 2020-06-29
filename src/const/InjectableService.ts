import {IInjectService} from '@/core/interface/IInjectService';
import DependencyInjectId from './DependencyInjectId';
import {PokeService} from '@/service/PokeService';
import {StarWarsService} from '@/service/StarWarsService';
import { ThroneService } from '@/service/ThroneService';
import { GitHubApi } from '@/apis/GitHubApi';
import { GitHubService } from '@/service/github/GitHubService';
import { GitHubServiceMapper } from '@/service/github/GitHubServiceMapper';

export const services: Array<IInjectService> = [
    {name: DependencyInjectId.PokeService, service: PokeService},
    {name: DependencyInjectId.StarWarsService, service: StarWarsService},
    {name: DependencyInjectId.ThroneService, service: ThroneService},
    {name: DependencyInjectId.GitHubService, service: GitHubService},
    {name: DependencyInjectId.GitHubApi, service: GitHubApi},
    {name: DependencyInjectId.GitHubServiceMapper, service: GitHubServiceMapper}
];

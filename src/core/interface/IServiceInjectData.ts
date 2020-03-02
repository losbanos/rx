import {InjectScopeType} from '@/enum/InjectScopeType';

export interface IServiceInjectData {
     name: string | symbol;
     service: any;
     scope?: InjectScopeType;
}
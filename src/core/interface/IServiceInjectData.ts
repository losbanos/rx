import {InjectScopeType} from '@/enum/InjectScopeType';
import { interfaces } from 'inversify';

export interface IServiceInjectData {
     name: string | symbol;
     service: any;
     scope?: InjectScopeType;
     handler?:  (context: interfaces.Context, injectable: any) => any; 
}
import {InjectScopeType} from '@/enum/InjectScopeType';

export class ServiceIdModel {
    public constructor(
        public name:string | symbol,
        public service: any,
        public scope?: InjectScopeType
    ) {
    }
}
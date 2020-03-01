import {InjectScopeType} from '@/enum/InjectScopeType';

export class ServiceInjectData {
    public constructor(
        public name:string | symbol,
        public service: any,
        public scope?: InjectScopeType
    ) {
    }
}
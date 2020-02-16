import {InjectScopeType} from '@/enum/InjectScopeType';

export class InjectService {
    public constructor(
        public name:string | symbol,
        public service: any,
        public scope?: InjectScopeType
    ) {
    }
}
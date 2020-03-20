import {IInjectService} from '@/core/interface/IInjectService';
import ServiceInjectId from './ServiceInjectId';
import {PokeService} from '@/service/PokeService';

export const services: Array<IInjectService> = [
    {name: ServiceInjectId.PokeService, service: PokeService}
];

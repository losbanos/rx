import {IInjectService} from '@/core/interface/IInjectService';
import ServiceInjectId from './ServiceInjectId';
import {PokeService} from '@/service/PokeService';
import {StarWarsService} from '@/service/StarWarsService';

export const services: Array<IInjectService> = [
    {name: ServiceInjectId.PokeService, service: PokeService},
    {name: ServiceInjectId.StarWarsService, service: StarWarsService}
];

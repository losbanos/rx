import {IInjectService} from '@/core/interface/IInjectService';
import ServiceInjectId from './ServiceInjectId';
import {PokeService} from '@/service/PokeService';
import {StarWarsService} from '@/service/StarWarsService';
import { ThroneService } from '@/service/ThroneService';

export const services: Array<IInjectService> = [
    {name: ServiceInjectId.PokeService, service: PokeService},
    {name: ServiceInjectId.StarWarsService, service: StarWarsService},
    {name: ServiceInjectId.ThroneService, service: ThroneService}
];

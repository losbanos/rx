import {IInjectService} from '@/core/interface/IInjectService';
import ServiceIdentifier from './ServiceIdentifier';
import {PokeService} from '@/service/PokeService';

export const services: Array<IInjectService> = [
    {name: ServiceIdentifier.PokeService, service: PokeService}
];

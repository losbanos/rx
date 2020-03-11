import {IServiceInjectData} from '@/core/interface/IServiceInjectData';
import ServiceIdentifier from './ServiceIdentifier';
import {PokeService} from '@/service/PokeService';

export const services: Array<IServiceInjectData> = [
    {name: ServiceIdentifier.PokeService, service: PokeService}
];

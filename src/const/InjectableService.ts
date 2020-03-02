import { ServiceInjectData } from '@/core/interface/IServiceInjectData';
import ServiceIdentifier from './ServiceIdentifier';
import { PokeService } from '@/service/PokeService';

export const services: Array<ServiceInjectData> = [
    {name: ServiceIdentifier.PokeService, service: PokeService}
]
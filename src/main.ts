import AppInitator from './core/AppInitator';
import AppMain from './core/AppMain';
import {services} from './const/InjectableService';
import {ImageConfig} from '@/config/ImageConfig';

new AppInitator(
    AppMain,
    [
        {key: 'image', config: ImageConfig}
    ])
    .setService([
        ...services
    ]).init();


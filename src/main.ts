import { ApplicationInitator } from './core/AppInitator';
import { AppMain } from './core/AppMain';
import { config } from 'public/config/Config';
import { services } from './const/InjectableService';
import { ImageConfig } from 'src/config/ImageConfig';

new ApplicationInitator(
    AppMain, config: [
        {key: 'image', config: ImageConfig}
    ])
    .setService([
        services
    ]).init();


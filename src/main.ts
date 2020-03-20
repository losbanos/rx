import 'reflect-metadata';
import ApplicationExecutor from './core/ApplicationExecutor';
import ApplicationMain from './core/ApplicationMain';
import {services} from './const/InjectableService';
import {imageConfig} from '@/config/ImageConfig.ts';

new ApplicationExecutor(
    ApplicationMain,
    [
        {key: 'IMAGE', config: imageConfig}
    ])
    .setService([
        ...services
    ]).init();


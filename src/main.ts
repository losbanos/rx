import { ApplicationInitator } from './core/AppInitator';
import { AppMain } from './core/AppMain';

new ApplicationInitator(
    AppMain,
    {},
    []
).init();


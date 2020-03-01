import { ApplicationInitator } from './core/ApplicationInitator';
import { ApplicationMain } from './core/ApplicationMain';

new ApplicationInitator(
    ApplicationMain,
    {}, []
).init();


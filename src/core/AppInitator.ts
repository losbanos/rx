import { IServiceInjectData } from './interface/IServiceInjectData';
import {applicationContainer} from './AppContainer';

import { Config } from 'public/config/Config';

export class ApplicationInitator {

    private AppMain: Class;

    public constructor(AppMain: Class, config: any, service: Array<IServiceInjectData>) {

        this.AppMain = AppMain;
        this.setConfig(config);
        this.setService(service);
    }

    public setConfig(config: Config) {
        applicationContainer.setConfig(config);
    }

    public setService(services: Array<IServiceInjectData>): void {
        applicationContainer.setService(services);
    }

    public init() {
        new this.AppMain().init();
    }
}
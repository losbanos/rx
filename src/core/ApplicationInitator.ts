import { ServiceInjectData } from './model/ServiceInjectData';
import {applicationContainer} from '../core/ApplicationContainer';

import { Config } from 'public/config/Config';

export class ApplicationInitator {

    private MasterClass: Class;
    private config: Config;
    private services: Array<ServiceInjectData>

    public constructor(MasterClass: Class, config: any, service: Array<ServiceInjectData>) {

        this.MasterClass = MasterClass;
        this.setConfig(config);
        this.setService(service);
    }

    public setConfig(config: Config) {
        applicationContainer.setConfig(config);
    }

    public setService(services: Array<ServiceInjectData>): void {
        applicationContainer.setService(services);
    }

    public init() {
        
    }
}
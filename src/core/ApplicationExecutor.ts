import {IInjectService} from './interface/IInjectService';
import {serviceManager} from './ServiceManager';
import {ApplicationConfig} from '@/core/ApplicationConfig';
import {IConfigItem} from '@/core/interface/IConfigItem';
import {fromEvent, zip, from} from 'rxjs';
import { IApplicationMain } from './interface/IApplicationMain';

export default class ApplicationExecutor {

    private MainComponent: Class;

    private config: ApplicationConfig;
    private services: Array<IInjectService>;

    public constructor(MainComponent: Class, config: Array<IConfigItem>) {
        this.MainComponent = MainComponent;
        this.config = new ApplicationConfig(config);
    }


    public setService(services: Array<IInjectService>): ApplicationExecutor {
        this.services = services;
        return this;
    }

    public init() {
        zip(from(this.config.init()), fromEvent(document, 'DOMContentLoaded')).subscribe(
            ([config, result]: [any, Event]) => {
                // console.log('config = ', config);
                // console.log('result = ', result);
                this.execApp();
            },
            (e: any) => {
                console.error(e);
            }
        );
    }

    private execApp() {
        serviceManager.bindService(this.services);
        serviceManager.bindConfig(this.config);
        (new this.MainComponent() as IApplicationMain).load();
    }
}

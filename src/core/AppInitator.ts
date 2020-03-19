import {IInjectService} from './interface/IInjectService';
import {appContainer} from './AppContainer';
import {AppConfig} from '@/core/AppConfig';
import {IConfig} from '@/core/interface/IConfig';
import {fromEvent, zip, of, from} from 'rxjs';
import { IAppMain } from './interface/IAppMain';

export default class AppInitator {

    private MainComponent: Class;

    private config: AppConfig;
    private services: Array<IInjectService>;

    public constructor(MainComponent: Class, config: Array<IConfig>) {
        this.MainComponent = MainComponent;
        this.config = new AppConfig(config);
    }


    public setService(services: Array<IInjectService>): AppInitator {
        this.services = services;
        return this;
    }

    public init() {
        zip(from(this.config.init()), fromEvent(document, 'DOMContentLoaded')).subscribe(
            ([config, result]: [any, Event]) => {
                console.log('config = ', config);
                console.log('result = ', result);
                this.execApp();
            },
            (e) => {
                console.error(e);
            }
        );
    }

    private execApp() {
        appContainer.bindService(this.services);
        appContainer.bindConfig(this.config);
        (new this.MainComponent() as IAppMain).load();
    }
}

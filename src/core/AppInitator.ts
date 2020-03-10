import { IServiceInjectData } from './interface/IServiceInjectData';
import { appContainer } from './AppContainer';
import { IConfig } from 'public/config/model/IConfig';
import { AppConfig } from 'src/core/AppConfig';

export class ApplicationInitator {

    private MainComponent: Class;
    private config: AppConfig;

    public constructor(MainComponent: Class, config: Array<IConfig>) {
        this.MainComponent = MainComponent;
        this.config = new AppConfig(config);
    }

    public bindConfigToAppContainer(config: IConfig) {
        appContainer.bindConfig(config);
    }

    public setService(services: Array<IServiceInjectData>): ApplicationInitator {
        appContainer.bindService(services);
        return this;
    }

    public init() {
        new this.MainComponent().init();
    }
}
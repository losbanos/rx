import {IServiceInjectData} from './interface/IServiceInjectData';
import {appContainer} from './AppContainer';
import {AppConfig} from '@/core/AppConfig';
import {IConfig} from '@/core/interface/IConfig';

export default class AppInitator {

    private MainComponent: Class;

    private config: AppConfig;

    public constructor(MainComponent: Class, config: Array<IConfig>) {
        this.MainComponent = MainComponent;
        this.config = new AppConfig(config);
    }

    public bindConfigToAppContainer(config: IConfig) {
        appContainer.bindConfig(config);
    }

    public setService(services: Array<IServiceInjectData>): AppInitator {
        appContainer.bindService(services);
        return this;
    }

    public init() {
        this.config.init();
        // new this.MainComponent().init();
    }
}

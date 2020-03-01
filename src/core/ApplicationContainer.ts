import {Container, interfaces} from 'inversify';
import getDecoratiors from 'inversify-inject-decorators';
import {ServiceInjectData} from '@/core/model/ServiceInjectData';
import {InjectScopeType} from '@/enum/InjectScopeType';
import ServiceIdentifier from '@/const/ServiceIdentifier';
import { Config } from '../../public/config/Config';

class ApplicationContainer {

    private container: Container;
    private config: Config

    public constructor(
    ) {
        this.container = new Container({defaultScope: 'Singleton'});
    }

    public lazyInject(): any {
        return getDecoratiors(this.container);
    }

    public setConfig(config: Config) {
        this.config = config;
        this.container.bind<Config>(ServiceIdentifier.Configuration).toConstantValue(this.config);
    }

    public setService(services: Array<ServiceInjectData>) {
        for(const injectService of services) {
            this.registeService(injectService);
        }
    }
    
    public registeService<T>(services: ServiceInjectData): void {
        const invokeService: interfaces.BindingWhenOnSyntax<T> = this.bindService(services);
    }

    private bindService<T>(service: ServiceInjectData): interfaces.BindingWhenOnSyntax<T> {
        let bindingWhenOnSyntax: interfaces.BindingWhenOnSyntax<T>;

        switch(service.scope) {
            case InjectScopeType.Transient:
                bindingWhenOnSyntax = this.container.bind<T>(service.name).to(service.service).inTransientScope();
                break;
            case InjectScopeType.Singleton:
                bindingWhenOnSyntax = this.container.bind<T>(service.name).to(service.service).inSingletonScope();
                break;
            case InjectScopeType.Request:
                bindingWhenOnSyntax = this.container.bind<T>(service.name).to(service.service).inRequestScope();
                break;
            default:
                bindingWhenOnSyntax = this.container.bind<T>(service.name).to(service.service).inTransientScope();
                break;
        }
        return bindingWhenOnSyntax;
    }
}

const applicationContainer: ApplicationContainer = new ApplicationContainer();
const {lazyInject, lazyInjectNamed} = applicationContainer.lazyInject();

export {applicationContainer, lazyInject, lazyInjectNamed};

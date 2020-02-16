import {Container, interfaces} from 'inversify';
import getDecoratiors from 'inversify-inject-decorators';
import {InjectService} from '@/core/model/InjectService';
import {InjectScopeType} from '@/enum/InjectScopeType';

class ApplicationContainer {
    private container: Container;

    public constructor() {
        this.container = new Container({defaultScope: 'Singleton'});
    }

    public lazyInject(): any {
        return getDecoratiors(this.container);
    }

    public setConfig(config: any) {
        // this.config = config;
    }

    public setService(services: Array<InjectService>) {
        for(const injectService of services) {
            this.registeService(injectService);
        }
    }
    
    public registeService<T>(service: InjectService): void {
        const invokeService: interfaces.BindingWhenOnSyntax<T> = this.bindService(service);
    }

    private bindService<T>(service: InjectService): interfaces.BindingWhenOnSyntax<T> {
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

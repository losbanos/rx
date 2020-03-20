import {Container, interfaces} from 'inversify';
import getDecoratiors from 'inversify-inject-decorators';
import {IInjectService} from '@/core/interface/IInjectService';
import {InjectScopeType} from '@/enum/InjectScopeType';
import ServiceInjectId from '@/const/ServiceInjectId';
import {IApplicationConfig} from '@/core/interface/IApplicationConfig';

class ServiceManager {

    private container: Container;
    private config: IApplicationConfig;

    public constructor(
    ) {
        this.container = new Container({defaultScope: 'Singleton'});
    }

    public lazyInject(): any {
        return getDecoratiors(this.container);
    }

    public bindConfig(config: IApplicationConfig) {
        this.config = config;
        this.container.bind<IApplicationConfig>(ServiceInjectId.Configuration).toConstantValue(this.config);
    }

    public bindService(services: Array<IInjectService>) {
        for (const injectService of services) {
            this.registeService(injectService);
        }
    }

    public registeService<T>(service: IInjectService): void {
        const invokeService: interfaces.BindingWhenOnSyntax<T> = this.bindServiceToContainer<T>(service);
        this.addActivationHandler<T>(invokeService, service);
    }

    private bindServiceToContainer<T>(service: IInjectService): interfaces.BindingWhenOnSyntax<T> {
        const bindingInWhenOnSyntax: interfaces.BindingInWhenOnSyntax<T> = this.container.bind<T>(service.name).to(service.service);
        let bindingWhenOnSyntax: interfaces.BindingWhenOnSyntax<T>;

        switch (service.scope) {
            case InjectScopeType.Singleton: bindingWhenOnSyntax = bindingInWhenOnSyntax.inSingletonScope(); break;
            case InjectScopeType.Request: bindingWhenOnSyntax = bindingInWhenOnSyntax.inRequestScope(); break;
            default: bindingWhenOnSyntax = bindingInWhenOnSyntax.inTransientScope(); break;
        }
        return bindingWhenOnSyntax;
    }

    private addActivationHandler<T>(invokeService: interfaces.BindingWhenOnSyntax<T>, service: IInjectService): void {
        if (service.handler) {
            invokeService.onActivation(service.handler);
        }
    }
}

const serviceManager: ServiceManager = new ServiceManager();
const {lazyInject, lazyInjectNamed} = serviceManager.lazyInject();

export {serviceManager, lazyInject, lazyInjectNamed};

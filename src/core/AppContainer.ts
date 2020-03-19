import {Container, interfaces} from 'inversify';
import getDecoratiors from 'inversify-inject-decorators';
import {IInjectService} from '@/core/interface/IInjectService';
import {InjectScopeType} from '@/enum/InjectScopeType';
import ServiceIdentifier from '@/const/ServiceIdentifier';
import {IAppConfig} from '@/core/interface/IAppConfig';

class AppContainer {

    private container: Container;
    private config: IAppConfig;

    public constructor(
    ) {
        this.container = new Container({defaultScope: 'Singleton'});
    }

    public lazyInject(): any {
        return getDecoratiors(this.container);
    }

    public bindConfig(config: IAppConfig) {
        this.config = config;
        this.container.bind<IAppConfig>(ServiceIdentifier.Configuration).toConstantValue(this.config);
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

const appContainer: AppContainer = new AppContainer();
const {lazyInject, lazyInjectNamed} = appContainer.lazyInject();

export {appContainer, lazyInject, lazyInjectNamed};

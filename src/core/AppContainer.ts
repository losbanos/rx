import {Container, interfaces} from 'inversify';
import getDecoratiors from 'inversify-inject-decorators';
import {IServiceInjectData} from '@/core/interface/IServiceInjectData';
import {InjectScopeType} from '@/enum/InjectScopeType';
import ServiceIdentifier from '@/const/ServiceIdentifier';
import {IConfig} from '@/core/interface/IConfig';

class AppContainer {

    private container: Container;
    private config: IConfig;

    public constructor(
    ) {
        this.container = new Container({defaultScope: 'Singleton'});
    }

    public lazyInject(): any {
        return getDecoratiors(this.container);
    }

    public bindConfig(config: IConfig) {
        this.config = config;
        this.container.bind<IConfig>(ServiceIdentifier.Configuration).toConstantValue(this.config);
    }

    public bindService(services: Array<IServiceInjectData>) {
        for (const injectService of services) {
            this.registeService(injectService);
        }
    }

    public registeService<T>(service: IServiceInjectData): void {
        const invokeService: interfaces.BindingWhenOnSyntax<T> = this.bindServiceToContainer<T>(service);
        this.addActivationHandler<T>(invokeService, service);
    }

    private bindServiceToContainer<T>(service: IServiceInjectData): interfaces.BindingWhenOnSyntax<T> {
        const bindingInWhenOnSyntax: interfaces.BindingInWhenOnSyntax<T> = this.container.bind<T>(service.name).to(service.service);
        let bindingWhenOnSyntax: interfaces.BindingWhenOnSyntax<T>;

        switch (service.scope) {
            case InjectScopeType.Singleton: bindingWhenOnSyntax = bindingInWhenOnSyntax.inSingletonScope(); break;
            case InjectScopeType.Request: bindingWhenOnSyntax = bindingInWhenOnSyntax.inRequestScope(); break;
            default: bindingWhenOnSyntax = bindingInWhenOnSyntax.inTransientScope(); break;
        }
        return bindingWhenOnSyntax;
    }

    private addActivationHandler<T>(invokeService: interfaces.BindingWhenOnSyntax<T>, service: IServiceInjectData): void {
        if (service.handler) {
            invokeService.onActivation(service.handler);
        }
    }
}

const appContainer: AppContainer = new AppContainer();
const {lazyInject, lazyInjectNamed} = appContainer.lazyInject();

export {appContainer, lazyInject, lazyInjectNamed};

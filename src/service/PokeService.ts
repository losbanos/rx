import {ApplicationConfig} from '@core/ApplicationConfig';
import {inject, injectable} from 'inversify';
import DependencyInjectId from '@/const/DependencyInjectId';
import {lazyInject} from '@core/ServiceManager';

@injectable()
export class PokeService {

    public constructor(
        @lazyInject(DependencyInjectId.Configuration) protected configuration: ApplicationConfig
    ) {
        /* tslint-disable:no-empty-block */
    }

    /**
     * load
     */
    public load() {
        const imageMaxSize: any = this.configuration.getItem('IMAGE.MAX_SIZE');
        console.log('imageMaxSize = ', imageMaxSize);
    }

}

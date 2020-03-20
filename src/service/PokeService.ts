import {ApplicationConfig} from '@core/ApplicationConfig';
import {inject, injectable} from 'inversify';
import ServiceInjectId from '@/const/ServiceInjectId';

@injectable()
export class PokeService {

    public constructor(
        @inject(ServiceInjectId.Configuration) protected configuration: ApplicationConfig
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

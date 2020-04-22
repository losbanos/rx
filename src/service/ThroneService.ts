import { ThroneMapper } from '@/components/throne/ThroneMapper';
import {injectable} from 'inversify';
import {lazyInject} from '@core/ServiceManager';
import {ApplicationConfig} from '@core/ApplicationConfig';
import ServiceInjectId from '@/const/ServiceInjectId';

@injectable()
export class ThroneService {

    @lazyInject(ServiceInjectId.Configuration)
    private configuration: ApplicationConfig;

    public load(endpoint: string): Promise<any> {
        const baseUrl: string = this.configuration.getItem('API.THRONE');
        const url: string = `${baseUrl}/${endpoint}`;

        return fetch(url).then( res => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Api Error');
            }
        }, () => {
            console.log('error');
            throw new Error('api Error');
        });
    }
}

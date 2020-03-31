import {injectable} from 'inversify';
import {lazyInject} from '@core/ServiceManager';
import ServiceInjectId from '@/const/ServiceInjectId';
import {ApplicationConfig} from '@core/ApplicationConfig';

@injectable()
export class StarWarsService {

    @lazyInject(ServiceInjectId.Configuration)
    protected configuration: ApplicationConfig;

    public load(itemName: string, format: string) {
        const baseUrl: string = this.configuration.getItem('API.STARWARS');
        const url: string = `${baseUrl}/${itemName}/?format=${format}`;

        return fetch(url).then( (res: any) => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error('StarWars API Error');
            }
        }).catch((e: any) => {
            console.error(e);
        });
    }
}

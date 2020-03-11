import { IConfig } from '@/core/interface/IConfig';
import { Response } from '@/core/interface/Response';
import axios from 'axios';

const configLoader = () => {
    const configs: Array<any> = [
        new Promise((resolve, reject) => {
            axios.get('public/config/env-type/EnvConfig.json')
            .then((res: Response) => resolve(res.data))
            .catch((e: any) => resolve({}));
        }),
        new Promise((resolve, reject) => {
            axios.get('public/config/platform-type/PlatformConfig.json')
            .then((res: Response) => res.data)
            .catch((e: any) => resolve({}));
        })
    ];

    return Promise.all(configs);
};

export class AppConfig {
    constructor(
        config: Array<IConfig>
    ) {
        // tslint:disable:no-empty-block;
    }

    /**
     * init
     */
    public init() {
        const defaultConfig: Promise<any> = configLoader();
        // console.log(defaultConfig);
    }
    public setConfig(config: Array<IConfig>) {
        // tslint-disable:no-empty-block
    }
}

import { IConfig } from '@/core/interface/IConfig';
import { Response } from '@/core/interface/Response';
import axios from 'axios';
import deepMerge from 'deepmerge';

const configLoader: Promise<Array<any>> = (() => {
    const configs: Array<any> = [
        new Promise((resolve, reject) => {
            axios.get('/config/env-type/EnvConfig.json')
            .then((res: Response) => resolve(res.data))
            .catch((e: any) => reject({}));
        }),
        new Promise((resolve, reject) => {
            axios.get('/config/platform-type/PlatformConfig.json')
            .then((res: Response) => resolve(res.data))
            .catch((e: any) => reject({}));
        })
    ];
    return Promise.all(configs);
})();

export class AppConfig {

    private config: any = {};
    private optionConfigs: Array<IConfig>;

    constructor(optionConfigs: Array<IConfig>) {
        this.optionConfigs = optionConfigs;
    }

    public init() {
        configLoader.then(
            ([envConfig, platformConfig]) => {
                const baseConfig: any = deepMerge.all([process.env, envConfig, platformConfig]);
                for (const item of this.optionConfigs) {
                    baseConfig[item.key] = item.config;
                }
            },
            (e) => {
                console.error('error = ', e);
            }
        );
    }
    public setConfig(config: Array<IConfig>) {
        // tslint-disable:no-empty-block
    }
}

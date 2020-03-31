import { IConfigItem } from '@core/interface/IConfigItem';
import { IApplicationConfig } from '@core/interface/IApplicationConfig';
import { Response } from '@core/interface/Response';
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

export class ApplicationConfig implements IApplicationConfig {

    private config: any = {};
    private optionConfigs: Array<IConfigItem>;

    constructor(optionConfigs: Array<IConfigItem>) {
        this.optionConfigs = optionConfigs;
    }

    public init(): Promise<any> {
        return configLoader.then(
            ([envConfig, platformConfig]) => {
                const baseConfig: any = deepMerge.all([process.env, envConfig, platformConfig]);
                for (const item of this.optionConfigs) {
                    baseConfig[item.key] = item.config;
                }
                return this.config = baseConfig;
            },
            e => {
                console.error('error = ', e);
            }
        );
    }

    public getItem(key: string): any {
        const keys: Array<string> = key.split('.');
        let result: any;
        try {
            result = this.searchConfig(keys, this.config);
        } catch (e) {
            console.error('e = ', e);
        }
        return result;
    }

    private searchConfig(props: Array<any>, config: any): string {
        let v: any = config[props.shift()];
        if (props.length > 0) {
            v = this.searchConfig(props, v);
        }
        return v;
    }
}

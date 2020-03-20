export interface IApplicationConfig {
    init(): Promise<any>;
    getItem(key: string): any;
}

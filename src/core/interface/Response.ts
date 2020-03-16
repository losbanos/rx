export interface Response<T = any> {
    /**
     * response body
     */
    data: T;

    /**
     * response extension body
     */
    extension?: any;

    /**
     * response status code
     */
    status: number;

    /**
     * response status text
     */
    statusText: string;

    /**
     * transport headers
     */
    headers?: any;

    /**
     * request options
     */
    config?: any;

    /**
     * request object
     */
    request?: any;

    /**
     * response value
     */
    value?: any;
}

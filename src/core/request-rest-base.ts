import http, { RefinedResponse, ResponseType } from 'k6/http';
import { Httpx } from 'https://jslib.k6.io/httpx/0.0.4/index.js';
import '../config/setup.ts';
import { recordMetrics } from './metrics-recorder.ts';

const tokenEnv = __ENV.TOKEN;

export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | string;
export type AuthType = 'BEARER' | 'NONE' | string;

export interface ApiClientConfig {
    baseURL?: string | null;
    headers?: Record<string, string>;
    timeout?: number;
    authenticationUser?: string | null;
    authenticationPassword?: string | null;
    authenticationType?: AuthType;
}

function createApiClient(config: ApiClientConfig): Httpx {
    const {
        baseURL,
        headers,
        timeout,
        authenticationType
    } = config;

    const session = new Httpx({
        baseURL: baseURL ?? undefined,
        headers: headers || {},
        timeout: timeout || 20000,
    });

    if (authenticationType) {
        switch (authenticationType) {
            case 'BEARER':
                session.addHeader('Authorization', `Bearer ${tokenEnv}`);
                break;
            case 'NONE':
            default:
                break;
        }
    }
    return session;
}

export default class RequestRestBase {
    public url: string | null;
    public requestService: string | null;
    public method: HttpMethod | null;
    public jsonBody: string | null;
    public file: string | ArrayBuffer | null;
    public fileName: string | null;
    public fileType: string | null;
    public headers: Record<string, string>;
    public cookies: Record<string, string>;
    public queryParameters: Record<string, any>;
    public formParameters: Record<string, any>;
    public authenticationType: AuthType;
    public authenticationUser: string | null;
    public authenticationPassword: string | null;
    public tag: string | null;
    public timeout?: number;

    constructor() {
        this.url = null;
        this.requestService = null;
        this.method = null;
        this.jsonBody = null;
        this.file = null;
        this.fileName = null;
        this.fileType = null;
        this.headers = { 'Content-Type': 'application/json; charset=utf-8' };
        this.cookies = {};
        this.queryParameters = {};
        this.formParameters = {};
        this.authenticationType = 'BEARER';
        this.authenticationUser = null;
        this.authenticationPassword = null;
        this.tag = null;
    }

    setMethod(method: HttpMethod): void {
        this.method = method;
    }

    setFormParameters(parameters: Record<string, any>): void {
        this.formParameters = parameters;
        this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    }

    removeHeader(header: string): void {
        delete this.headers[header];
    }

    removeCookie(cookie: string): void {
        delete this.cookies[cookie];
    }

    removeQueryParameter(parameter: string): void {
        delete this.queryParameters[parameter];
    }

    executeRequest<RT extends ResponseType | undefined = undefined>(): RefinedResponse<RT> {
        const session = createApiClient({
            baseURL: this.url,
            headers: this.headers,
            timeout: this.timeout,
            authenticationUser: this.authenticationUser,
            authenticationPassword: this.authenticationPassword,
            authenticationType: this.authenticationType,
        });

        const response = this._executeRequest<RT>(session);
        recordMetrics(this, response);

        return response;
    }

    protected _executeRequest<RT extends ResponseType | undefined = undefined>(session: Httpx): RefinedResponse<RT> {
        const requestOptions: any = {
            headers: { ...this.headers },
            cookies: this.cookies,
            params: this.queryParameters,
        };

        let body: any;

        if (Object.keys(this.formParameters).length > 0) {
            body = this.formParameters;
            requestOptions.headers['Content-Type'] = 'application/x-www-form-urlencoded';
        } else if (this.jsonBody) {
            body = this.jsonBody;
            requestOptions.headers['Content-Type'] = 'application/json; charset=utf-8';
        } else if (this.file && this.fileName) {
            body = {};
            requestOptions.files = {};
            requestOptions.files[this.fileName] = http.file(this.file, this.fileName, this.fileType ?? undefined);
        }

        let res: RefinedResponse<RT>;

        switch (this.method) {
            case 'GET':
                res = session.get<RT>(this.requestService || '', requestOptions, {
                    tags: { name: this.tag || '' },
                });
                break;
            case 'POST':
                res = session.post<RT>(this.requestService || '', body, {
                    headers: requestOptions.headers,
                    cookies: requestOptions.cookies,
                    params: requestOptions.params,
                    tags: { name: this.tag || '' },
                });
                break;
            case 'PUT':
                res = session.put<RT>(this.requestService || '', body, {
                    headers: requestOptions.headers,
                    cookies: requestOptions.cookies,
                    params: requestOptions.params,
                    tags: { name: this.tag || '' },
                });
                break;
            case 'DELETE':
                res = session.delete<RT>(this.requestService || '', null, {
                    headers: requestOptions.headers,
                    cookies: requestOptions.cookies,
                    params: requestOptions.params,
                    tags: { name: this.tag || '' },
                });
                break;
            default:
                throw new Error(`HTTP method ${this.method} not implemented!`);
        }
        return res;
    }
}

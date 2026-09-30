declare module 'https://jslib.k6.io/httpx/0.0.4/index.js' {
    import { RefinedResponse, ResponseType } from 'k6/http';

    export interface HttpxOptions {
        baseURL?: string;
        headers?: Record<string, string>;
        timeout?: number;
        [key: string]: any;
    }

    export interface RequestOptions {
        headers?: Record<string, string>;
        cookies?: Record<string, string>;
        params?: Record<string, any>;
        tags?: Record<string, string>;
        files?: Record<string, any>;
        [key: string]: any;
    }

    export class Httpx {
        constructor(options?: HttpxOptions);
        addHeader(name: string, value: string): void;
        addHeaders(headers: Record<string, string>): void;
        clearHeader(name: string): void;
        get<RT extends ResponseType | undefined = undefined>(url: string, params?: RequestOptions, tags?: Record<string, any>): RefinedResponse<RT>;
        post<RT extends ResponseType | undefined = undefined>(url: string, body?: any, params?: RequestOptions): RefinedResponse<RT>;
        put<RT extends ResponseType | undefined = undefined>(url: string, body?: any, params?: RequestOptions): RefinedResponse<RT>;
        delete<RT extends ResponseType | undefined = undefined>(url: string, body?: any, params?: RequestOptions): RefinedResponse<RT>;
        patch<RT extends ResponseType | undefined = undefined>(url: string, body?: any, params?: RequestOptions): RefinedResponse<RT>;
        head<RT extends ResponseType | undefined = undefined>(url: string, params?: RequestOptions): RefinedResponse<RT>;
        options<RT extends ResponseType | undefined = undefined>(url: string, params?: RequestOptions): RefinedResponse<RT>;
    }
}

declare module 'https://jslib.k6.io/k6-testing/0.5.0/index.js' {
    export interface Expectation<T = any> {
        toEqual(expected: T): void;
        toBe(expected: T): void;
        toBeTruthy(): void;
        toBeFalsy(): void;
        toBeDefined(): void;
        toBeUndefined(): void;
        toBeNull(): void;
        toContain(expected: any): void;
        toBeGreaterThan(expected: number): void;
        toBeGreaterThanOrEqual(expected: number): void;
        toBeLessThan(expected: number): void;
        toBeLessThanOrEqual(expected: number): void;
        not: Expectation<T>;
    }
    export function expect<T = any>(actual: T): Expectation<T>;
}

declare module 'https://jslib.k6.io/k6-utils/1.2.0/index.js' {
    export function randomItem<T>(arr: T[]): T;
    export function randomIntBetween(min: number, max: number): number;
    export function randomString(length: number, charset?: string): string;
    export function findBetween(content: string, left: string, right: string, repeat?: boolean): string | string[];
}

declare module 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js' {
    export function htmlReport(data: any, options?: Record<string, any>): string;
}

declare module 'https://jslib.k6.io/papaparse/5.1.1/index.js' {
    export interface ParseConfig {
        header?: boolean;
        dynamicTyping?: boolean;
        skipEmptyLines?: boolean | 'greedy';
        delimiter?: string;
        [key: string]: any;
    }

    export interface ParseResult<T = any> {
        data: T[];
        errors: any[];
        meta: any;
    }

    export interface PapaParse {
        parse<T = any>(csvString: string, config?: ParseConfig): ParseResult<T>;
    }

    const papaparse: PapaParse;
    export default papaparse;
}

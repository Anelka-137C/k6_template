import http from 'k6/http';
import { Options } from 'k6/options';

/**
   @param discardResponseBodies - Whether to discard response bodies.
   @param scenarios - The scenarios to run.
   @param executor - The executor to use for the test.
   @param exec - The function to execute for each virtual user.
   @param vus - The number of virtual users to simulate.
   @param iterations - The number of iterations each virtual user will execute.

   When use per-vu-iterations? 
   When you want to control the number of iterations each virtual user will execute, allowing for more granular load testing.
*/
export const options: Options = {
    discardResponseBodies: true,
    scenarios: {
        light_load: {
            executor: 'per-vu-iterations',
            exec: 'request',
            vus: 5,
            iterations: 10,
        },
    },
};

export function request(): void {
    http.get('https://test.k6.io');
}

export default request;

import http from 'k6/http';
import { Options } from 'k6/options';

/**
   @param discardResponseBodies - Whether to discard response bodies.
   @param scenarios - The scenarios to run.
   @param executor - The executor to use for the test.
   @param duration - The duration of the test.

   When use constant-vus-rate? 
   When you want to simulate a specific number of virtual users over time, regardless of the request rates.
   This approach is more useful for scenarios where you want to maintain a steady load on the system, for example.
*/
export const options: Options = {
    discardResponseBodies: true,
    scenarios: {
        light_load: {
            executor: 'constant-vus',
            exec: 'request',
            vus: 5,
            duration: '10s',
        },
    },
};

export function request(): void {
    http.get('https://test.k6.io');
}

export default request;

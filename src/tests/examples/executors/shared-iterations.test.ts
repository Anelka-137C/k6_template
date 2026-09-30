import http from 'k6/http';
import { Options } from 'k6/options';

/**
   @param discardResponseBodies - Whether to discard response bodies.
   @param scenarios - The scenarios to run.
   @param executor - The executor to use for the test.
   @param iterations - The number of iterations to run.
   @param vus - The number of virtual users to simulate.

   When use shared-iterations? 
   When you want to simulate a scenario where multiple virtual users share the same iteration, allowing for more realistic load testing.
*/
export const options: Options = {
    discardResponseBodies: true,
    scenarios: {
        light_load: {
            executor: 'shared-iterations',
            iterations: 100,
            vus: 5,
        },
    },
};

export default function (): void {
    http.get('https://test.k6.io');
}

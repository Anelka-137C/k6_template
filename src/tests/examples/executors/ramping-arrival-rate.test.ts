import http from 'k6/http';
import { Options } from 'k6/options';

/**
   @param discardResponseBodies - Whether to discard response bodies.
   @param scenarios - The scenarios to run.
   @param executor - The executor to use for the test.
   @param startRate - The initial rate of requests per time unit.
   @param timeUnit - The time unit for the rate (e.g., "1s", "1m").
   @param preAllocatedVUs - The number of pre-allocated virtual users.
   @param maxVUs - The maximum number of virtual users.
   @param stages - The stages configuration.

   When use ramping-arrival? 
   When you want to gradually increase the request rate over time, simulating a more realistic load pattern.
*/
export const options: Options = {
    discardResponseBodies: true,
    scenarios: {
        light_load: {
            executor: 'ramping-arrival-rate',
            startRate: 5,
            timeUnit: '1s',
            preAllocatedVUs: 5,
            maxVUs: 10,
            stages: [
                { target: 10, duration: '10s' },
            ],
        },
    },
};

export default function (): void {
    http.get('https://test.k6.io');
}

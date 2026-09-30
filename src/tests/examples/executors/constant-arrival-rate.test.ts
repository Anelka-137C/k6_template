import http from 'k6/http';
import { Options } from 'k6/options';

/**
   @param discardResponseBodies - Whether to discard response bodies.
   @param scenarios - The scenarios to run.
   @param executor - The executor to use for the test.
   @param rate - The rate of requests per time unit.
   @param timeUnit - The time unit for the rate (e.g., "1s", "1m").
   @param duration - The duration of the test.
   @param preAllocatedVUs - The number of pre-allocated virtual users.
   @param maxVUs - The maximum number of virtual users.

   When use constant-arrival? 
   When you want to simulate a specific request rate over time, regardless of the response times of the requests.
   This approach is more useful for a RPS representation more accurate, for example. It's important to know that you dont have to use 'Sleeps',
   because the executors manage the pacing of requests for you through 'rate' and 'timeUnit'.
*/
export const options: Options = {
    discardResponseBodies: true,
    scenarios: {
        light_load: {
            executor: 'constant-arrival-rate',
            rate: 5,
            timeUnit: '1s',
            duration: '10s',
            preAllocatedVUs: 5,
            maxVUs: 10,
        },
    },
};

export default function (): void {
    http.get('https://test.k6.io');
}

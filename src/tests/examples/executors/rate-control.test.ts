import http from 'k6/http';

/**
   @param discardResponseBodies - Whether to discard response bodies.
   @param scenarios - The scenarios to run.
   @param executor - The executor to use for the test.
   @param rate - The rate of requests per time unit.
   @param duration - The duration of the test.

   When use rate-control? 
   When you want to control the rate of requests being sent to the server, allowing for more precise load testing.
*/
export const options = {
    discardResponseBodies: true,
    scenarios: {
        light_load: {
            executor: 'rate-control',
            rate: 5,
            duration: '10s',
        },
    },
};

export default function (): void {
    http.get('https://test.k6.io');
}

import http from 'k6/http';

/**
   @param discardResponseBodies - Whether to discard response bodies.
   @param scenarios - The scenarios to run.
   @param executor - The executor to use for the test.
   @param exec - The function to execute for each virtual user.
   @param duration - The duration of the test.

   When use externally-controlled? 
   When you want to have full control over the pacing and behavior of your virtual users, allowing for dynamic adjustments during the test.
*/
export const options = {
    discardResponseBodies: true,
    scenarios: {
        light_load: {
            executor: 'externally-controlled',
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

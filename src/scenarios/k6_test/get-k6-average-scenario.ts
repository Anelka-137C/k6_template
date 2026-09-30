import type { AverageLoadScenario } from "../../types/scenarios";

const scenario_name = "k6_average_get_test";

const buildGetK6Scenario = (startTime: string, execFunction: () => void): AverageLoadScenario<typeof scenario_name> => {
    return {
        [scenario_name]: {
            executor: 'ramping-vus',
            startTime,
            exec: execFunction.name,
            tags: {
                suite: 'k6-test',
                test_type: 'average_load'
            },
            stages: [
                { duration: '1s', target: 10 },
                { duration: '5s', target: 10 },
                { duration: '1s', target: 0 }
            ]
        },
    };
}


const k6AverageLoadThreshold = {
    [`http_req_duration{scenario:${scenario_name}}`]: ['avg<1000'],
    [`http_req_failed{scenario:${scenario_name}}`]: ['rate>0']
}

export { buildGetK6Scenario, k6AverageLoadThreshold }
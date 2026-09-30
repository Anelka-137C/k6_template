import { buildGetK6Scenario, k6AverageLoadThreshold } from '../scenarios/k6_test/get-k6-average-scenario.ts';
import { buildPutQuickPizzaScenario, quickPizzaPutAverageLoadThreshold } from '../scenarios/k6_test/put-quickpizza-average-scenario.ts';

import GetK6Request from '../requests/k6_test/get-k6-request.ts';
import PutQuickPizzaRequest from '../requests/k6_test/put-quickpizza-request.ts';

/**
 * IMPORTANT!
 * If you want to control the load through the suite.ts, you have to unconsider the options defined in the individual test files.
 */
export const options = {
    scenarios: {
        ...buildGetK6Scenario('0s', runGetK6Test),
        ...buildPutQuickPizzaScenario('7s', runPutQuickPizzaTest)
    },
    thresholds: {
        ...k6AverageLoadThreshold,
        ...quickPizzaPutAverageLoadThreshold
    }
};

export function runGetK6Test() {
    const getK6Request = new GetK6Request();
    getK6Request.executeRequest();
}

export function runPutQuickPizzaTest() {
    const putQuickPizzaRequest = new PutQuickPizzaRequest();
    putQuickPizzaRequest.setJsonBodyFromTemplate("Bert")
    putQuickPizzaRequest.executeRequest();
}

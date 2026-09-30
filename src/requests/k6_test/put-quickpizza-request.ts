import RequestRestBase from "../../core/request-rest-base.ts";

const putQuickPizzaJson = JSON.parse(open('../../json/k6_test/put-quickpizza.json'));

export default class PutQuickPizzaRequest extends RequestRestBase {
    constructor() {
        super();
        this.url = 'https://quickpizza.grafana.com/api/put';
        this.requestService = '';
        this.setMethod('PUT');
        this.tag = 'PutK6Request';
        this.headers = { 'Content-Type': 'application/json' };
    }

    setJsonBodyFromTemplate(name: string) {
        const body = { ...putQuickPizzaJson };
        body.name = name || "default";
        this.jsonBody = JSON.stringify(body);
    }
}









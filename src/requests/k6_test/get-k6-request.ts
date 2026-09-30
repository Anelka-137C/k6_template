import RequestRestBase from "../../core/request-rest-base.ts";

export default class K6Request extends RequestRestBase {
    constructor() {
        super();
        this.url = 'https://test.k6.io';
        this.requestService = '';
        this.setMethod('GET');
        this.tag = 'K6Request';
    }
}

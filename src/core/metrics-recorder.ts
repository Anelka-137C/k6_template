import { RefinedResponse, ResponseType } from 'k6/http';
import {
  errorCounter,
  successCounter,
  throughput,
  latency,
  ttfb,
  connectTime,
  sendTime,
  receiveTime,
  responseBodySize,
  requestBodySize,
} from './metrics.ts';

export interface RequestLike {
  tag?: string | null;
  jsonBody?: string | null;
  [key: string]: any;
}

export function recordMetrics<RT extends ResponseType | undefined = undefined>(
  request: RequestLike,
  response: RefinedResponse<RT>
): void {
  const tagName = request.tag || 'unnamed_request';

  if (response.status !== 200) {
    const errorTags: Record<string, string> = {
      name: tagName,
      error_code: String(response.status),
    };
    if (typeof response.body === 'string') {
      errorTags.response_body = response.body;
    }
    errorCounter.add(true, errorTags);
  } else {
    successCounter.add(true, { name: tagName });
  }

  throughput.add(response.timings.duration);
  latency.add(response.timings.waiting);
  ttfb.add(response.timings.receiving);
  connectTime.add(response.timings.connecting);
  sendTime.add(response.timings.sending);
  receiveTime.add(response.timings.receiving);

  const bodyLength = typeof response.body === 'string'
    ? response.body.length
    : response.body instanceof ArrayBuffer
      ? response.body.byteLength
      : 0;

  responseBodySize.add(bodyLength);
  requestBodySize.add(request.jsonBody ? request.jsonBody.length : 0);
}

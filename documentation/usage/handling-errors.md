---
title: Error handling
sidebar_position: 90
---

import Image from '@site/documentation/components/Image';

## 400 Bad Request

Errors that prevent the chart from rendering will return a non-200 HTTP status code, most commonly `400 Bad Request`. In most cases, the error will be rendered in the requested image format. If an error is rendered in an image, it is also included as a string in the `X-quickchart-error` HTTP header.

<Image
  src="https://quickchart.io/images/docs/chart_invalid_token.png"
  caption="An example error due to invalid chart config - not URL encoded."
/>

### Invalid or unexpected token

Invalid Chart.js configurations may return errors similar to this one. The most common cause of this error is that the caller forgot to URL-encode the chart variable. The next most common cause is invalid JSON/Javascript syntax in the chart configuration.

### Cannot read property &lt;X&gt; of undefined

Check that the property exists and that your configuration or plugin matches the [Chart.js version](/documentation/usage/chartjs-versions/) in your request. Some Chart.js internals are also restricted on the free tier; see [custom plugins](/documentation/reference/chartjs-plugins/#adding-custom-plugins).

### &lt;X&gt; is not a function

Check the function name and the Chart.js version expected by your plugin. If the function is part of a restricted Chart.js object, see [custom plugins](/documentation/reference/chartjs-plugins/#adding-custom-plugins).

## Reading errors in Javascript

Check the response status before treating the body as an image. The `X-quickchart-error` header is available to browser `fetch` and XMLHttpRequest clients:

```js
const response = await fetch('https://quickchart.io/chart', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    version: '4',
    chart: {
      type: 'bar',
      data: { labels: ['A', 'B'], datasets: [{ data: [10, 20] }] },
    },
  }),
});

if (!response.ok) {
  throw new Error(response.headers.get('X-quickchart-error') || `HTTP ${response.status}`);
}

const image = await response.blob();
```

The browser can also read `X-quickchart-verified-key` and `X-Recommend-Ttl-Sec`, when present. These indicate successful authentication and a suggested cache lifetime, respectively.

## 429 Too Many Requests

Free requests are rate limited. This includes chart rendering, validation, QR reading and batch generation, word clouds, tables, GraphViz, Google Image Charts, and watermarking.

If you receive HTTP 429, wait before retrying. Use the `Retry-After` header when present, and increase the delay after repeated failures. For higher limits, [authenticate your requests](/documentation/authentication/) with a paid API key. See [pricing](https://quickchart.io/pricing/) for current limits.

## Structured validation endpoints

If your client needs JSON errors instead of an image-encoded error, validate before rendering:

- `POST /api/validate-chart` accepts the same JSON body as `POST /chart`.
- `POST /api/validate-qr` accepts the same JSON body as `POST /qr`.

Validation responses include `success`, `errors`, `warnings`, and normalized request parameters. Successful responses also include a render check. Validation runs the renderer, so it takes time and is subject to rate limits. Check `warnings` even when validation succeeds; they can flag Chart.js version mismatches or external data that needs a shorter cache lifetime. See the [agent-friendly API docs](/documentation/apis/agent-friendly-api/) for examples.

## Request header or cookie too large

The URL length limitation is imposed by web browsers and hosting providers, so we cannot change it.  Here are two ways you can solve this problem:

1. **Consolidate the request payload**.  

    Charts: Reduce the number of datapoints, or reduce the precision of datapoints.  For example, shorten "2.0003" to just "2".  You can also reduce the amount of text required to define your datapoints by using a `map` function ([example](https://quickchart-urls.ty.workers.dev/ohlc-stock-chart)).

    Word clouds: Use the word list format to combine repeat words with their counts.  You can enable this by setting useWordList=1 in the URL.  Here's an example text payload: "understanding:5,companies:1,freedom:10"

1. **Use the POST API**.  By sending an HTTP POST request instead of a GET, you'll be able to include much more data.  See documentation on [POST endpoint](/documentation/usage/post-endpoint/).

## Certificate errors

If you receive a certificate error, check your system clock and update your operating system or local CA certificate bundle. Older clients may not recognize the certificate chain. If the error persists on an up-to-date client, [contact us](mailto:support@quickchart.io) with the error message and the URL you are requesting.

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

Access to certain Chart.js internals, used especially in plugins, is restricted due to potential for abuse. [Contact us](mailto:support@quickchart.io) to get whitelisted for these features.

### &lt;X&gt; is not a function

Access to certain Chart.js internals, used especially in plugins, is restricted due to potential for abuse. [Contact us](mailto:support@quickchart.io) to get whitelisted for these features.

## Request header or cookie too large

The URL length limitation is imposed by web browsers and hosting providers, so we cannot change it.  Here are two ways you can solve this problem:

1. **Consolidate the request payload**.  

    Charts: Reduce the number of datapoints, or reduce the precision of datapoints.  For example, shorten "2.0003" to just "2".  You can also reduce the amount of text required to define your datapoints by using a `map` function ([example](https://quickchart-urls.ty.workers.dev/ohlc-stock-chart)).

    Word clouds: Use the word list format to combine repeat words with their counts.  You can enable this by setting useWordList=1 in the URL.  Here's an example text payload: "understanding:5,companies:1,freedom:10"

1. **Use the POST API**.  By sending an HTTP POST request instead of a GET, you'll be able to include much more data.  See documentation on [POST endpoint](/documentation/usage/post-endpoint/).

## Certificate errors

If you are receiving a certificate error message while using or accessing QuickChart, or notice of an expired certificate, this likely means that you have an outdated root certificate. To fix, you must update your local CA bundle.

The root cause of this is that a root certificate `IdentTrust DST Root CA X3` expired. Those with outdated systems still have this certificate.

- [Learn more here](https://scotthelme.co.uk/lets-encrypt-old-root-expiration/)
- [Relevant news article](https://techcrunch.com/2021/09/21/lets-encrypt-root-expiry/?guccounter=1)

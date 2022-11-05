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

## Certificate errors

If you are receiving a certificate error message while using or accessing QuickChart, or notice of an expired certificate, this likely means that you have an outdated root certificate. To fix, you must update your local CA bundle.

The root cause of this is that a root certificate `IdentTrust DST Root CA X3` expired. Those with outdated systems still have this certificate.

- [Learn more here](https://scotthelme.co.uk/lets-encrypt-old-root-expiration/)
- [Relevant news article](https://techcrunch.com/2021/09/21/lets-encrypt-root-expiry/?guccounter=1)

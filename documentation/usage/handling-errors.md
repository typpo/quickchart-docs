---
title: Handling errors
sidebar_position: 3
---

import Image from '@site/documentation/components/Image';

Errors that prevent the chart from rendering will return a non-200 HTTP status code, most commonly `400 Bad Request`. In most cases, the error will be rendered in the requested image format. If an error is rendered in an image, it is also included as a string in the `X-quickchart-error` HTTP header.

<Image
  src="https://quickchart.io/images/docs/chart_invalid_token.png"
  caption="An example error due to invalid chart config - not URL encoded."
/>

**Invalid or unexpected token**: Invalid Chart.js configurations may return errors similar to this one. The most common cause of this error is that the caller forgot to URL-encode the chart variable. The next most common cause is invalid JSON/Javascript syntax in the chart configuration.

**Cannot read property &lt;X&gt; of undefined** and **&lt;X&gt; is not a function**: Access to certain Chart.js internals, used especially in plugins, is restricted due to potential for abuse. [Contact us](mailto:support@quickchart.io) to get whitelisted for these features.

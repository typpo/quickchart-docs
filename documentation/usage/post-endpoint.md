---
title: POST endpoint
sidebar_position: 2
---

import Admonition from '@theme/Admonition';

If your chart is large or complicated, you may prefer to send a POST request rather than a GET request. This avoids limitations on URL length and means you don't have to worry about URL encoding. The /chart POST endpoint returns a chart. It takes the standard [request parameters](/documentation/usage/parameters/) as a JSON object:

```json
{
  "version": "2",
  "backgroundColor": "transparent",
  "width": 500,
  "height": 300,
  "devicePixelRatio": 1.0,
  "format": "png",
  "chart": {...}
}
```

<Admonition type="tip">
To include Javascript code in `chart` (e.g. to format labels), you must send `chart` as a string, not as a JSON object.

For examples of this, see documentation on using [JS Functions](/documentation/javascript-functions/).
</Admonition>

<hr/>

Here is the type specification of the POST data object:

```typescript
{
  width?: number;                      // Pixel width (500 by default)
  height?: number;                     // Pixel height (300 by default)
  devicePixelRatio?: number;           // Pixel ratio (2.0 by default)
  format?: string;                     // png, jpg, webp, svg, pdf, or base64
  backgroundColor?: string;            // Canvas background
  version?: string;                    // Chart.js major version: 2, 3, or 4
  key?: string;                        // API key
  chart: string | ChartConfiguration;  // Chart.js configuration
}
```

[ChartConfiguration](https://www.chartjs.org/docs/latest/configuration/) is a Chart.js configuration object in JSON format. Match the configuration to the [version](/documentation/usage/chartjs-versions/) in your request.

Here is a complete request that saves a chart as a PNG:

```bash
curl https://quickchart.io/chart \
  -H 'Content-Type: application/json' \
  -d '{
    "version": "4",
    "format": "png",
    "chart": {
      "type": "bar",
      "data": {
        "labels": ["Hello", "World"],
        "datasets": [{ "label": "Foo", "data": [1, 2] }]
      }
    }
  }' \
  -o chart.png
```

The response contains image bytes. To get a URL instead, use [short URLs](/documentation/usage/short-urls-and-templates/). To check a configuration and receive JSON errors, use [`/api/validate-chart`](/documentation/apis/agent-friendly-api/#validate-a-chart-config).

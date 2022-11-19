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
  version: string;
  backgroundColor: string;
  width: string;
  height: string;
  format: string;
  chart: string | ChartConfiguration;
}
```

[ChartConfiguration](https://www.chartjs.org/docs/latest/configuration/) is a Chart.js v2+ configuration object in JSON format.

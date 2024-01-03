---
title: Short URLs and Templates
sidebar_position: 4
---

# Advanced API

import CodeWithHighlights from '@site/documentation/components/CodeWithHighlights';

### Short URLs

You may want to create a shorter URL for your charts, especially if you are sending them via email or SMS. To generate a short URL for your chart, send a POST request to `https://quickchart.io/chart/create`.

The endpoint takes the following JSON request body, identical to the `/chart` [POST endpoint](/documentation/usage/post-endpoint/):

```typescript
{
  width: string;                        // Pixel width
  height: string;                       // Pixel height
  devicePixelRatio: number;             // Pixel ratio (2.0 by default)
  format: string;                       // png, svg, or webp
  backgroundColor: string;              // Canvas background
  version: string;                      // Chart.js version
  key: string;                          // API key (optional)
  chart: string | ChartConfiguration;   // Chart.js configuration
}
```

Here's an example using `curl`. You can use any library that sends an HTTP POST request:

```bash
curl -X POST \
     -H 'Content-Type: application/json' \
     -d '{"chart": {"type": "bar", "data": {"labels": ["Hello", "World"], "datasets": [{"label": "Foo", "data": [1, 2]}]}}}' \
     https://quickchart.io/chart/create
```

Here's an equivalent request using Python:

```python
import json
import requests

quickchart_url = 'https://quickchart.io/chart/create'
post_data = {'chart': {'type': 'bar', 'data': {'labels': ['Hello', 'World'],
             'datasets': [{'label': 'Foo', 'data': [1, 2]}]}}}

response = requests.post(
    quickchart_url,
    json=post_data,
)

if (response.status_code != 200):
    print('Error:', response.text)
else:
    chart_response = json.loads(response.text)
    print(chart_response)
```

You will get a response that looks like this:

```json
{
  "success": true,
  "url": "https://quickchart.io/chart/render/9a560ba4-ab71-4d1e-89ea-ce4741e9d232"
}
```

Go to the [URL in the response](https://quickchart.io/chart/render/9a560ba4-ab71-4d1e-89ea-ce4741e9d232) to render your chart.

Please note the following limitations:

- It can take a couple seconds for short URLs to become active globally.
- Request inputs are not validated before the URL is created. The chart is only rendered when the URL is visited.
- If your chart includes Javascript, you must supply your chart definition as a string (see [using JS functions](/documentation/javascript-functions/)).
- Saved charts expire after 3 days for free users, 6 months for paid users.

### Templates

If you want to generate many charts, but they only differ slightly, you may prefer to use chart templates. Any chart with a [Short URL](#short-urls) can also be used as a template.

Customize a template by adding URL parameters to the template URL. The following template parameters are supported:

- **`title`** - The title of the chart
- **`labels`** - Comma-separated labels for the label axis of a chart (usually the X axis)
- **`data1, data2, ..., dataN`** - Comma-separated data values for each dataseries
- **`label1, label2, ..., labelN`** - Comma-separated labels for each dataseries
- **`backgroundColor1, ..., backgroundColorN`** - Comma-separated backgrounds for each dataseries
- **`borderColor1, ..., borderColorN`** - Comma-separated border colors for each dataseries

For example, this URL will take template `zf-abc-123` and update its title to "New title":

<CodeWithHighlights code="https://quickchart.io/chart/render/zf-abc-123**?title=New title**" />

We can add a labels URL parameter:

<CodeWithHighlights code="https://quickchart.io/chart/render/zf-abc-123?title=New title**&labels=Q1,Q2,Q3,Q4**" />

Or even override multiple datasets:

<CodeWithHighlights code="https://quickchart.io/chart/render/zf-abc-123**?data1=40,60,80,100&data2=5,6,7,8**" />

In addition to plain numbers, templates also accept (x, y) data values and arbitrary JSON objects.

An example walkthrough with a live template can be viewed [here](/documentation/chart-maker/#use-the-no-code-chart-api).

### IFrames

By default, short URLs/templates render as images and are not interactive. If you'd like to display a chart with interactive tooltips in an iframe, take the unique portion of the shortened URL and append it to the `/chart-maker/view/` endpoint.

For example, given the short URL:

```
https://quickchart.io/chart/render/9a560ba4-ab71-4d1e-89ea-ce4741e9d232
```

Here is the corresponding iframe URL:

```
https://quickchart.io/chart-maker/view/9a560ba4-ab71-4d1e-89ea-ce4741e9d232
```

You can embed it like a regular iframe. Be sure to set a frame width and height that is compatible with your chart. Here's an HTML example:

```
<iframe src="demo_iframe.htm" frameborder="0" height="500" width="300" title="Iframe Example"></iframe>
```

### Expiration

Expiration of short URLs and templates varies based on whether you've created them using the `/chart/create` API endpoint, or via the [Chart Maker](https://quickchart.io/chart-maker/).

|             | Free Tier                       | Professional Plan               |
|-------------|---------------------------------|---------------------------------|
| API         | 3 days                          | 6 months <br/> _Can be extended by contacting support_       |
| Advanced Chart Editor (Sandbox) | 3 days                          | 6 months <br/> _Can be extended by contacting support_       |
| Chart Maker | 60+ days <br/> _Expiration is reset when rendered_ | 6+ months <br/> _Expiration is reset when rendered_ |

An expired short URL will return a 404 Not Found error.

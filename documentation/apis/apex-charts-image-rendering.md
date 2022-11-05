---
slug: /apex-charts-image-rendering/
title: Apex Charts server-side image rendering
sidebar_label: Apex Charts
tags: ['apex charts']
---

import Author from '@site/documentation/components/Author';
import Image from '@site/documentation/components/Image';

This post describes our API for rendering Apex Charts as images. Use this method to render Apex Charts as images on the server-side.

This functionality is useful if you can't create the chart in a browser, for example if you intend to embed these charts in emails or PDF reports.

<Image maxWidth={600} caption="Apex Chart rendered to image using the QuickChart API." src="http://quickchart.io/apex-charts/render?config=%7B%20series%3A%5B%7B%20name%3A%27series1%27%2C%20data%3A%5B31%2C40%2C28%2C51%2C42%2C109%2C100%5D%20%7D%2C%7B%20name%3A%27series2%27%2C%20data%3A%5B11%2C32%2C45%2C32%2C34%2C52%2C41%5D%20%7D%5D%2C%20chart%3A%7B%20height%3A350%2C%20type%3A%27area%27%20%7D%2C%20dataLabels%3A%7B%20enabled%3Afalse%20%7D%2C%20stroke%3A%7B%20curve%3A%27smooth%27%20%7D%2C%20xaxis%3A%7B%20type%3A%27datetime%27%2C%20categories%3A%5B%222018-09-19T00%3A00%3A00.000Z%22%2C%222018-09-19T01%3A30%3A00.000Z%22%2C%222018-09-19T02%3A30%3A00.000Z%22%2C%222018-09-19T03%3A30%3A00.000Z%22%2C%222018-09-19T04%3A30%3A00.000Z%22%2C%222018-09-19T05%3A30%3A00.000Z%22%2C%222018-09-19T06%3A30%3A00.000Z%22%5D%20%7D%2C%20tooltip%3A%7B%20x%3A%7B%20format%3A%27dd%2FMM%2FyyHH%3Amm%27%20%7D%2C%20%7D%2C%20%7D" />

## Usage

Rendering a chart is straightforward:

1. Create a Javascript/JSON Apex Charts configuration object.
1. URL-encode the configuration.
1. Send the configuration to the API endpoint.

API endpoint:

```
https://quickchart.io/apex-charts/render
```

Basic Usage:

```
https://quickchart.io/apex-charts/render?width=500&height=300&config={apex chart config...}
```

## API parameters

The following parameters are accepted by the `render` function:

- **config**: Apex Charts configuration in Javascript or JSON format (required)
- **width**: Image width in pixels. Defaults to 800.
- **height**: Image height in pixels. If not specified, will default to golden ratio (roughly 16:10 aspect ratio)

## Example

Let's take a simple Apex Chart configuration:

```js
{
  chart: {
    type: 'line'
  },
  series: [{
    name: 'sales',
    data: [31,40,35,50,49,60,70,91,125]
  }],
  xaxis: {
    categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999]
  }
}
```

We send it as a `config` query parameter to the API endpoint:

```
https://quickchart.io/apex-charts/render?config={ chart: { type: 'line' }, series: [{ name: 'sales', data: [31,40,35,50,49,60,70,91,125] }], xaxis: { categories: [1991,1992,1993,1994,1995,1996,1997, 1998,1999] } }
```

If your chart contains special characters like `#` or `%`, you will have to [URL encode](https://urlencoder.io) it. Most programming languages have built-in URL encoding capabilities:

```
https://quickchart.io/apex-charts/render?config={%20chart:%20{%20type:%20%27line%27%20},%20series:%20[{%20name:%20%27sales%27,%20data:%20[31,40,35,50,49,60,70,91,125]%20}],%20xaxis:%20{%20categories:%20[1991,1992,1993,1994,1995,1996,1997,%201998,1999]%20}%20}
```

The above URL produces this image when loaded in the browser, email, chat apps, and other formats:

<Image src="http://quickchart.io/apex-charts/render?config={%20chart:%20{%20type:%20%27line%27%20},%20series:%20[{%20name:%20%27sales%27,%20data:%20[31,40,35,50,49,60,70,91,125]%20}],%20xaxis:%20{%20categories:%20[1991,1992,1993,1994,1995,1996,1997,%201998,1999]%20}%20}" />

Here's a [direct link to the image URL](http://quickchart.io/apex-charts/render?config={%20chart:%20{%20type:%20%27line%27%20},%20series:%20[{%20name:%20%27sales%27,%20data:%20[31,40,35,50,49,60,70,91,125]%20}],%20xaxis:%20{%20categories:%20[1991,1992,1993,1994,1995,1996,1997,%201998,1999]%20}%20}).

### POST request

For complex charts or larger charts, you'll want to send a POST request because URLs can get messy. POST the parameters to the endpoint in JSON format.

A request in Python would look like this:

```python
resp = requests.post('https://quickchart.io/apex-charts/render', json={
    'width': 600,
    'height': 300,
    'config': '{...}',
})

with open('chart.png', 'wb') as f:
    f.write(resp.content)
```

## Need help?

Apex Charts is one of several chart formats that we support. Feel free to [reach out](https://community.quickchart.io/) about rendering charts.

<Author />

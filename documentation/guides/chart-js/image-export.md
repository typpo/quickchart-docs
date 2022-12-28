---
slug: /chart-js/image-export/
title: How to download and export Chart.js images
label: ['chart.js']
sidebar_label: Exporting images
---

import Image from '../../components/Image';

Chart.js is one of the most popular Javascript libraries. There are a handful of ways you can turn your Chart.js chart into an image and export it to a file.

## Use toBase64Image() in the browser

If you're using Chart.js in a browser and you want to provide a download to the user, use the built-in `toBase64Image` function. See the [Chart.js v2](https://www.chartjs.org/docs/2.9.4/developers/api.html#tobase64image) or [Chart.js v3+](https://www.chartjs.org/docs/latest/developers/api.html#tobase64image-type-quality) docs.

Here's an example ([also available in jsFiddle](https://jsfiddle.net/typpo/gu1j2ycq/9/)):

```js
// Create the chart
var myChart = new Chart(document.getElementById('chart').getContext('2d'), {
  type: 'horizontalBar',
  data: {
    labels: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
    datasets: [
      {
        label: 'My data',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  },
});

// Get the chart's base64 image string
var image = myChart.toBase64Image();
console.log(image);
```

If the result is blank, this is probably because your chart is rendering asynchronously due to animation or some other reason. You must invoke `toBase64Image()` from the `onAnimationComplete` callback:

```js
var myChart = new Chart(document.getElementById('chart').getContext('2d'), {
  type: 'horizontalBar',
  data: {
    labels: ['One', 'Two', 'Three', 'Four', 'Five', 'Six'],
    datasets: [
      {
        label: 'My data',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255,99,132,1)',
        borderWidth: 1,
      },
    ],
  },
  options: {
    animation: {
      onComplete: function () {
        console.log(myChart.toBase64Image());
      },
    },
  },
});
```

Now that you have the base64 image in a variable, create a download prompt for the Chart.js image in Javascript by creating a virtual anchor tag:

```js
var a = document.createElement('a');
a.href = myChart.toBase64Image();
a.download = 'my_file_name.png';

// Trigger the download
a.click();
```

Or, if you want to add the image somewhere else on the page, set the `src` attribute of an `<img>` tag dynamically:

```js
document.getElementById('some-image-tag').src = myChart.toBase64Image();
```

The above code will download or embed the following Chart.js image:

<Image src="https://i.imgur.com/qi4gMVZ.png" />

## Chart.js in Node

Although Chart.js was built for the frontend, it can be used in Node to generate Chart.js images thanks to several open-source projects. The most popular projects used for this purpose are [ChartJsNodeCanvas](https://github.com/SeanSobey/ChartjsNodeCanvas) and [chartjs-node](https://github.com/vmpowerio/chartjs-node).

These solutions are able to render charts to PNG and other formats. My personal preference is ChartJsNodeCanvas as it is regularly maintained and I have had fewer issues using the library.

The downside to this approach is that it requires system dependencies and can consume significant CPU/memory at scale.

### Using ChartJsNodeCanvas

Converting Chart.js to PNG image with this library is fairly straightforward:

```js
const { CanvasRenderService } = require('chartjs-node-canvas');

const width = 300; //px
const height = 150; //px
const canvasRenderService = new CanvasRenderService(width, height);

(async () => {
  const configuration = {
    // Add your Chart.js config here (see above for example config)
  };

  // Create outputs
  const image = await canvasRenderService.renderToBuffer(configuration);
  const dataUrl = await canvasRenderService.renderToDataURL(configuration);
  const stream = canvasRenderService.renderToStream(configuration);
})();
```

Here's a full example that converts Chart.js to an image file in pure Node:

```js
const fs = require('fs');
const { CanvasRenderService } = require('chartjs-node-canvas');

const width = 400; //px
const height = 400; //px
const canvasRenderService = new CanvasRenderService(width, height);

(async () => {
  const configuration = {
    type: 'bar',
    data: {
      labels: ['Q1', 'Q2', 'Q3', 'Q4'],
      datasets: [
        {
          label: 'Users',
          data: [50, 60, 70, 180],
        },
      ],
    },
  };

  const imageBuffer = await canvasRenderService.renderToBuffer(configuration);

  // Write image to file
  fs.writeFileSync('/tmp/mychart.png', imageBuffer);
})();
```

The example writes the following Chart.js image to disk:

<Image alt="Chart.js image created in node" src="https://i.imgur.com/IPis8uw.png" />

### Using chartjs-to-image

[chartjs-to-image](https://www.npmjs.com/package/chartjs-to-image) is a node library that can export your chart to file or data URL.

It's a little simpler to use than the above renderers. Because it outsources rendering to QuickChart, an open-source web service, it requires almost no other dependencies and uses much less CPU.

Here's a basic usage example:

```js
const ChartJsImage = require('chartjs-to-image');

// Generate the chart
const chart = new ChartJsImage();
chart.setConfig({
  type: 'bar',
  data: { labels: ['Hello world', 'Foo bar'], datasets: [{ label: 'Foo', data: [1, 2] }] },
});

// Save it
chart.toFile('/tmp/mychart.png');
```

With the above code, `chartjs-to-image` produces this image file:

<Image src="https://quickchart.io/chart?c=%7Btype%3A%27bar%27%2Cdata%3A%7Blabels%3A%5B%27Hello+world%27%2C%27Foo+bar%27%5D%2Cdatasets%3A%5B%7Blabel%3A%27Foo%27%2Cdata%3A%5B1%2C2%5D%7D%5D%7D%7D&w=500&h=300&bkg=white&f=png" />

### Using a web service

Web services such as [QuickChart](/) exist to take the burden of rendering out of your app. There are two reasons you might prefer a service like this over node renderer for converting Chart.js to image:

1. It's simpler - no imports, no managing canvases, common plugins are already installed.
2. It scales better - headless Chart.js rendering is CPU intensive. If you're building a real web app, it is usually not efficient to worry about rendering charts in the serving layer.
3. Shareable URLs - no need to host your own images.
4. You are not using Javascript.

You can [use the API directly](/documentation/usage/parameters/) in any programming language. There are also QuickChart client libraries available for Javascript, Python, Ruby, Java, PHP, and C#.

Here is a Javascript example using [quickchart-js](https://github.com/typpo/quickchart-js) (`npm install quickchart-js`):

```js
const QuickChart = require('quickchart-js');

const myChart = new QuickChart();
myChart
  .setConfig({
    type: 'bar',
    data: { labels: ['Hello world', 'Foo bar'], datasets: [{ label: 'Foo', data: [1, 2] }] },
  })
  .setWidth(300)
  .setHeight(150);

// You can send the URL to someone...
const chartImageUrl = myChart.getUrl();

// Or download to disk
myChart.toFile('/tmp/mychart.png');
```

Here is a simple [Python](https://github.com/typpo/quickchart-python) example (`pip install quickchart.io`):

```python
from quickchart import QuickChart

chart = QuickChart()
chart.width = 300
chart.height = 150
chart.config = {
    "type": "bar",
    "data": {
        "labels": ["Hello world", "Test"],
        "datasets": [{
            "label": "Foo",
            "data": [1, 2]
        }]
    }
}

# Get the url...
image_url = chart.get_url()

# Or write to disk...
chart.to_file('/tmp/mychart.png')
```

## Best practices

If you are just working in the browser, use Chart.js's built-in `toBase64Image()` to export your chart to an image data url.

If you are working on the backend, you have more options. You can handle the rendering yourself or you can hand it off to a web service. Both of these options are open-source, and there are pros and cons depending on how much system configuration and compute power you're willing to throw at the problem.

Feel free to [ask the community](https://community.quickchart.io) or [reach out by email](mailto:support@quickchart.io) if you have any questions about what is best for your project.

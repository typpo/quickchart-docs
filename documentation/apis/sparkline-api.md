---
title: Sparkline API - Embed sparklines anywhere
tags: ['sparkline']
---

# Using the QuickChart Sparkline API

import Image from '@site/documentation/components/Image';
import CodeWithHighlights from '@site/documentation/components/CodeWithHighlights';
import SparklineImage from '@site/documentation/images/sparkline_example.png';

QuickChart provides an API that lets you generate sparklines as PNG images. The API is simple and can generate sparklines with a single unauthenticated request.

Generated sparkline images can be embedded in almost any format. They will work on webpages, in platforms like Salesforce and Excel, in emails, PDFs, and more.

<Image noBorder maxWidth={500} src={SparklineImage} caption="An example of QuickChart sparklines embedded in an application."/>

## Getting started

The sparkline API endpoint is available at `https://quickchart.io/chart`. It works by accepting a [Chart.js-style](https://chartjs.org/) configuration object in Javascript or JSON format.

Here's an example configuration:

```js
{
  type: 'sparkline',
  data: {
    datasets: [{
      data: [140, 60, 274, 370, 199]
    }]
  }
}
```

Let's pack this sparkline configuration into a URL:

<CodeWithHighlights code="**https://quickchart.io/chart?c=**{type:'sparkline',data:{datasets:[{data:[140,60,274,370,199]}]}}" />

This URL can be embedded as an image anywhere, for example by using an image tag:

<CodeWithHighlights code={`**<img src="**https://quickchart.io/chart?c={type:'sparkline',data:{datasets:[{data:[140,60,274,370,199]}]}}**" />**`} />

Producing the following image of a sparkline:

<Image noBorder maxWidth={500} src="https://quickchart.io/chart?bkg=white&c=%7B%0A%20%20type%3A%20%27sparkline%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20data%3A%20%5B140%2C%2060%2C%20274%2C%20370%2C%20199%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%0A%7D"/>

## API parameters

Here are the parameters that you can pass to the `/chart` endpoint:

- `chart`: Javascript/JSON definition of the chart. Use a [Chart.js configuration object](https://www.chartjs.org/docs/2.9.4/charts/). Abbreviated as "c"
- `width`=500: Width of the image. Abbreviated as "w"
- `height`=300: Height of the image. Abbreviated as "h"
- `devicePixelRatio`=2.0: Device pixel ratio of the output (defaults to retina=2.0). Width and height are multiplied by this value.
- `backgroundColor`=transparent: Background of the chart canvas. Accepts rgb (`rgb(255,255,120)`), colors (`red`), and url-encoded hex values (`%23ff00ff`). Abbreviated as "bkg"

Note that if your chart configuration contains special characters, you must [URL encode](https://www.urlencoder.io) it. This capability is built into almost every programming language. If not encoded, you may run into problems with special characters (such as # or %) or syntax errors in your program.

## Custom colors

To customize colors, use `backgroundColor` and `borderColor`. Set these attributes to any valid color, hex, or rgb/rgba string:

```js
{
  type: 'sparkline',
  data: {
    datasets: [{
      backgroundColor: 'rgba(255, 0, 0, 0.2)',
      borderColor: 'red',
      data: [140, 60, 274, 370, 199]
    }]
  }
}
```

Pack it into the URL:

```
https://quickchart.io/chart?bkg=white&c={type:'sparkline',data:{datasets:[{backgroundColor:'rgba(255,0,0,0.2)',borderColor:'red',data:[140,60,274,370,199]}]}}
```

The URL displays this image:

<Image noBorder maxWidth={500} src="https://quickchart.io/chart?bkg=white&c=%7B%0A%20%20type%3A%20%27sparkline%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20backgroundColor%3A%20%27rgba(255%2C%200%2C%200%2C%200.2)%27%2C%0A%20%20%20%20%20%20borderColor%3A%20%27red%27%2C%0A%20%20%20%20%20%20data%3A%20%5B140%2C%2060%2C%20274%2C%20370%2C%20199%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%0A%7D"/>

## Custom border/fill

To remove the fill and only have a line, set `fill: false` in your dataset:

```js
{
  type: 'sparkline',
  data: {
    datasets: [{
      fill: false,
      data: [140, 60, 274, 370, 199]
    }]
  }
}
```

In URL form:

```
https://quickchart.io/chart?bkg=white&c={type:'sparkline',data:{datasets:[{fill:false,data:[140,60,274,370,199]}]}}
```

Which produces this image:

<Image noBorder maxWidth={500} src="https://quickchart.io/chart?bkg=white&c=%7B%0A%20%20type%3A%20%27sparkline%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20fill%3A%20false%2C%0A%20%20%20%20%20%20data%3A%20%5B140%2C%2060%2C%20274%2C%20370%2C%20199%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%0A%7D"/>

Or, if you want to have _only_ fill and no border, set `borderColor` to `transparent` or the same as `backgroundColor`.

## Multiple lines

You can display multiple lines by adding to the list of datasets. For example:

```js
{
  type: 'sparkline',
  data: {
    datasets: [{
      data: [140, 60, 274, 370, 199],
      fill: false
    }, {
      data: [40, 165, 74, 70, 99],
      fill: false
    }]
  }
}
```

<Image noBorder maxWidth={500} src="https://quickchart.io/chart?bkg=white&c=%7B%0A%20%20type%3A%20%27sparkline%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20data%3A%20%5B140%2C%2060%2C%20274%2C%20370%2C%20199%5D%2C%0A%20%20%20%20%20%20fill%3A%20false%0A%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20data%3A%20%5B40%2C%20165%2C%2074%2C%2070%2C%2099%5D%2C%0A%20%20%20%20%20%20fill%3A%20false%0A%20%20%20%20%7D%5D%0A%20%20%7D%0A%7D"/>

## Other customizations

All of the [Chart.js line chart customizations](https://www.chartjs.org/docs/2.9.4/charts/line.html) are available for you to use. The Chart.js format offers a great deal of customization.

This example displays the data points and uses a thicker dotted line with smoothed curves:

```js
{
  type: 'sparkline',
  data: {
    datasets: [{
      pointRadius: 3,
      borderWidth: 3,
      borderDash: [10, 2],
      lineTension: 0.3,
      fill: false,
      data: [140, 60, 274, 370, 199]
    }]
  }
}
```

<Image noBorder maxWidth={500} src="https://quickchart.io/chart?bkg=white&c=%7B%0A%20%20type%3A%20%27sparkline%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20pointRadius%3A%203%2C%0A%20%20%20%20%20%20borderWidth%3A%203%2C%0A%20%20%20%20%20%20borderDash%3A%20%5B10%2C%202%5D%2C%0A%20%20%20%20%20%20lineTension%3A%200.3%2C%0A%20%20%20%20%20%20fill%3A%20false%2C%0A%20%20%20%20%20%20data%3A%20%5B140%2C%2060%2C%20274%2C%20370%2C%20199%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%0A%7D"/>

You can also use various plugins and features of QuickChart. For example, to add a gradient fill:

```js
{
  type: 'sparkline',
  data: {
    datasets: [{
      pointRadius: 3,
      borderWidth: 3,
      lineTension: 0.3,
      backgroundColor: getGradientFillHelper('vertical', ['#6287a2', '#e9ecf4']),
      data: [140, 60, 274, 370, 199]
    }]
  }
}
```

<Image noBorder maxWidth={500} src="https://quickchart.io/chart?c=%7B%0A%20%20type%3A%20%27sparkline%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20pointRadius%3A%203%2C%0A%20%20%20%20%20%20borderWidth%3A%203%2C%0A%20%20%20%20%20%20lineTension%3A%200.3%2C%0A%20%20%20%20%20%20backgroundColor%3A%20getGradientFillHelper(%27vertical%27%2C%20%5B%27%236287a2%27%2C%20%27%23e9ecf4%27%5D)%2C%0A%20%20%20%20%20%20data%3A%20%5B140%2C%2060%2C%20274%2C%20370%2C%20199%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%0A%7D"/>

## Full customization

For more flexibility, change the chart type to "line" to access the full set of Chart.js line chart options. For the sparkline look, you can hide axes manually by adding an `options` object to your chart configuration:

```js
{
  type: 'line',
  data: { ... },
  options: {
    scales: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }]
    }
  }
}
```

From there, have a look at the various line chart customizations available in the [gallery](/gallery/) or [documentation](/documentation/).

## SDKs & Client libraries

QuickChart does not require a client library, but if you don't want to build the URL yourself, you can use our open-source Javascript, Python, Ruby, PHP, C#, and Java libraries. [See all libraries here](/documentation/#client-libraries).

## Need help?

Chart.js can be tricky when you're getting the hang of it. Use the [Sandbox Editor](/sandbox/) to test your charts. If you're interested in charts other than sparklines, check out our [gallery](/gallery/) and [main documentation](/documentation/).

Feeling stuck? Feel free to reach out - my contact information is below.

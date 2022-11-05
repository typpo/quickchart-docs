---
slug: /chart-js/width-rotation-circumference-doughnut-chart/
title: Setting width, rotation, and circumference of doughnut chart (Chart.js)
tags: ['chart.js']
sidebar_label: Doughnut chart size & rotation
---

import Image from '../../components/Image';

## Custom size and rotation

To customize the size of a doughnut chart, set `options.cutoutPercentage`. To customize the rotation of the segments, set `options.rotation` (in radians).

Here's an example with custom settings:

```js
{
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: [94, 25, 72, 70, 14],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        label: 'Dataset 1',
      },
    ],
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
  },
  options: {
    cutoutPercentage: 80,
    rotation: -Math.PI / 2,
    circumference: Math.PI,
    legend: {
      display: false,
    },
  },
}
```

It results in the following:

<Image maxWidth={500} src="https://quickchart.io/chart?c=%7B%0A%20%20type%3A%20%27doughnut%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20data%3A%20%5B94%2C%2025%2C%2072%2C%2070%2C%2014%5D%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%27rgb(255%2C%2099%2C%20132)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgb(255%2C%20159%2C%2064)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgb(255%2C%20205%2C%2086)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgb(75%2C%20192%2C%20192)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgb(54%2C%20162%2C%20235)%27%2C%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20label%3A%20%27Dataset%201%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%20%20labels%3A%20%5B%27Red%27%2C%20%27Orange%27%2C%20%27Yellow%27%2C%20%27Green%27%2C%20%27Blue%27%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20cutoutPercentage%3A%2080%2C%0A%20%20%20%20rotation%3A%20-Math.PI%20%2F%202%2C%0A%20%20%20%20legend%3A%20%7B%0A%20%20%20%20%20%20display%3A%20false%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D%0A" />

## Custom circumference

`options.circumference` controls how much of the circle the chart should follow.

Recall the formula to convert degrees to radians: `radians = degrees * pi / 180`.

If we set it to Math.PI (equivalent to 180 degrees), then we get a partial circle (rotation is set to 45 degrees):

```js
{
  type: 'doughnut',
  data: {
    datasets: [
      {
        data: [94, 25, 72, 70, 14],
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
        ],
        label: 'Dataset 1',
      },
    ],
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
  },
  options: {
    cutoutPercentage: 80,
    rotation: -Math.PI / 2,
    circumference: Math.PI,
    legend: {
      display: false,
    },
  },
}
```

<Image maxWidth={500} src="https://quickchart.io/chart?c=%7B%0A%20%20type%3A%20%27doughnut%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20data%3A%20%5B94%2C%2025%2C%2072%2C%2070%2C%2014%5D%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%27rgb(255%2C%2099%2C%20132)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgb(255%2C%20159%2C%2064)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgb(255%2C%20205%2C%2086)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgb(75%2C%20192%2C%20192)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgb(54%2C%20162%2C%20235)%27%2C%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20label%3A%20%27Dataset%201%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%20%20labels%3A%20%5B%27Red%27%2C%20%27Orange%27%2C%20%27Yellow%27%2C%20%27Green%27%2C%20%27Blue%27%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20cutoutPercentage%3A%2080%2C%0A%20%20%20%20rotation%3A%20-Math.PI%20%2F%202%2C%0A%20%20%20%20circumference%3A%20Math.PI%2C%0A%20%20%20%20legend%3A%20%7B%0A%20%20%20%20%20%20display%3A%20false%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D%0A" />

## Full options

Here's the table of customizable doughnut and pie chart options:

|       Name       |  Type  |            Default             |                       Description                        |
| :--------------: | :----: | :----------------------------: | :------------------------------------------------------: |
| cutoutPercentage | number | 50 - for doughnut, 0 - for pie | The percentage of the chart that is empty in the middle. |
|     rotation     | number |        -0.5 \* Math.PI         |           Starting angle to draw slices from.            |
|  circumference   | number |          2 \* Math.PI          |             Sweep to allow slices to cover.              |

You can customize each dataset with the following attributes:

|      Name       |                             Description                             |
| :-------------: | :-----------------------------------------------------------------: |
| backgroundColor |             Color or list of colors for each arc/slice              |
|   borderColor   |             Color or list of colors for each arc/slice              |
|   borderWidth   | Integer or list of integers defining the border size for each slice |
|     weight      |  List of numbers indicating the relative thickness of each dataset  |

Providing values for weight will cause the datasets to be drawn with a size relative to all other weights.

## Labels

To learn how to customize doughnut and pie chart labels, follow [this guide](/documentation/chart-js/custom-pie-doughnut-chart-labels/).

## Other questions

Head back to [docs](/documentation) to learn more or ask questions in the [community](https://community.quickchart.io/).

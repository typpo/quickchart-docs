---
title: Add labels to a polar area chart
tags: ['chart.js']
---

import Image from '../../components/Image';

You can add labels to a Chart.js polar area chart using the [chartjs-plugin-datalabels](https://chartjs-plugin-datalabels.netlify.app/) plugin. This plugin is built-in to QuickChart.

From there, use the [datalabels options](https://chartjs-plugin-datalabels.netlify.app/guide/options.html) to style the labels to your liking. By default these options are configured on a per-chart basis, but note that most options are _scriptable_, meaning you can configure them on a per dataset, per-dataindex, or dynamic basis.

Here's a simple example that uses datalabels to show the name of the dataset (rather than the value):

```js
{
  type: 'polarArea',
  data: {
    datasets: [
      {
        data: [3, 56, 61, 78, 83],
        backgroundColor: [
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 159, 64, 0.5)',
          'rgba(255, 205, 86, 0.5)',
          'rgba(75, 192, 192, 0.5)',
          'rgba(54, 162, 235, 0.5)',
        ],
        label: 'My dataset',
      },
    ],
    labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
  },
  options: {
    legend: {
      display: false,
    },
    plugins: {
      datalabels: {
        align: 'end',
        anchor: 'end',
        font: {
          size: 14,
          weight: 'bold',
        },
        formatter: (value, ctx) => {
          if (value > 10) {
            // Show label for slices that are visible.
            return ctx.chart.data.labels[ctx.dataIndex];
          }
          return null;
        },
      },
    },
  },
}
```

It yields this chart:

<Image maxWidth={500} src="https://quickchart.io/chart?c=%7B%0A%20%20type%3A%20%27polarArea%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20data%3A%20%5B3%2C%2056%2C%2061%2C%2078%2C%2083%5D%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%5B%0A%20%20%20%20%20%20%20%20%20%20%27rgba(255%2C%2099%2C%20132%2C%200.5)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgba(255%2C%20159%2C%2064%2C%200.5)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgba(255%2C%20205%2C%2086%2C%200.5)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgba(75%2C%20192%2C%20192%2C%200.5)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%27rgba(54%2C%20162%2C%20235%2C%200.5)%27%2C%0A%20%20%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%20%20%20%20label%3A%20%27My%20dataset%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%20%20labels%3A%20%5B%27Red%27%2C%20%27Orange%27%2C%20%27Yellow%27%2C%20%27Green%27%2C%20%27Blue%27%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20legend%3A%20%7B%0A%20%20%20%20%20%20display%3A%20false%2C%0A%20%20%20%20%7D%2C%0A%20%20%20%20plugins%3A%20%7B%0A%20%20%20%20%20%20datalabels%3A%20%7B%0A%20%20%20%20%20%20%20%20align%3A%20%27end%27%2C%0A%20%20%20%20%20%20%20%20anchor%3A%20%27end%27%2C%0A%20%20%20%20%20%20%20%20font%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20size%3A%2014%2C%0A%20%20%20%20%20%20%20%20%20%20weight%3A%20%27bold%27%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20formatter%3A%20(value%2C%20ctx)%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20if%20(value%20%3E%2010)%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%2F%2F%20Show%20label%20for%20slices%20that%20are%20visible.%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20ctx.chart.data.labels%5Bctx.dataIndex%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%20%20return%20null%3B%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D%0A" />

You can adjust the placement of the labels with respect to the slices by changing the values of `align` and `anchor`.

If you're interested in customizing the labels, see [how to create custom data labels](https://quickchart.io/documentation/chart-js/custom-pie-doughnut-chart-labels/). The article talks mostly about pie and doughnut charts, but is applicable to polarArea charts as well.

Head back to [docs](/documentation) to learn more or ask questions in the [community](https://community.quickchart.io/).

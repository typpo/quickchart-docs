---
slug: /custom-progress-bar/
title: How to customize the progress bar
tags: ['progress bar']
hide_table_of_contents: true
sidebar_position: 20
sidebar_label: Progress bar customization
---

import ChartExample from '@site/documentation/components/ChartExample';
import Image from '@site/documentation/components/Image';

On QuickChart, a progress bar is a special case of a horizontal bar chart with axes and other labeling removed. All Chart.js bar options can be applied.

The progress bar is defined by two datasets:

1. The first dataset specifies the number shown, or the percentage "filled in". By default, this number is a percentage and the total value is 100 by default.
1. The second dataset represents the whole. You can override the maximum progress bar value by setting a second dataset.

You can also customize the label. For example, to remove percentage on the display, set `options.plugins.datalabels.display` to false. Or, use [datalabel options](/documentation/chart-js/custom-pie-doughnut-chart-labels/) to change other style and display options.

Here's an example that includes both of the above modifications. The progress bar displays a measurement of 15 out of 30:

<ChartExample showEditor width={300} height={100} config={`{
  type: 'progressBar',
  data: {
    datasets: [{
      data: [15]
    }, {
      data: [30]
    }]
  },
  options: {
    plugins: {
      datalabels: {
        display: false,
      }
    }
  }
}`} />

You can do more with bar chart and data label customizations. Let's say you're running a fundraiser and you've raised $20,000 out of $50,000. You can customize the progress bar to display this:

<ChartExample showEditor width={300} height={100} config={`{
  type: 'progressBar',
  data: {
    datasets: [{
      data: [20000],
      backgroundColor: 'green',
    }, {
      data: [50000]
    }]
  },
  options: {
    plugins: {
      datalabels: {
        formatter: (val) => {
          return '$' + val.toLocaleString();
        },
      }
    }
  }
}`} />

## Dynamically positioning the text

You may notice that once a bar gets small, the label may not have room to appear.

We can solve this by dynamically positioning and coloring the progress bar label based on the progress bar value. For example, this configuration will place the label to the right of the progress bar if the value is below 15%:

<ChartExample showEditor width={300} height={100} config={`{
  type: 'progressBar',
  data: {
    datasets: [
      {
        data: [10],
      },
    ],
  },
  options: {
    plugins: {
      datalabels: {
        font: {
          size: 40,
        },
        color: (context) => context.dataset.data[context.dataIndex] > 15 ? '#fff' : '#000',
        anchor: (context) => context.dataset.data[context.dataIndex] > 15 ? 'center' : 'end',
        align: (context) => context.dataset.data[context.dataIndex] > 15 ? 'center' : 'right',
      },
    },
  },
}`} />

It looks like this to begin with:

<Image src="https://quickchart.io/chart?h=100&c=%7B%0A%20%20type%3A%20%27progressBar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20data%3A%20%5B10%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20plugins%3A%20%7B%0A%20%20%20%20%20%20datalabels%3A%20%7B%0A%20%20%20%20%20%20%20%20font%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20size%3A%2040%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20color%3A%20(context)%20%3D%3E%0A%20%20%20%20%20%20%20%20%20%20context.dataset.data%5Bcontext.dataIndex%5D%20%3E%2015%20%3F%20%27%23fff%27%20%3A%20%27%23000%27%2C%0A%20%20%20%20%20%20%20%20anchor%3A%20(context)%20%3D%3E%0A%20%20%20%20%20%20%20%20%20%20context.dataset.data%5Bcontext.dataIndex%5D%20%3E%2015%20%3F%20%27center%27%20%3A%20%27end%27%2C%0A%20%20%20%20%20%20%20%20align%3A%20(context)%20%3D%3E%0A%20%20%20%20%20%20%20%20%20%20context.dataset.data%5Bcontext.dataIndex%5D%20%3E%2015%20%3F%20%27center%27%20%3A%20%27right%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D&devicePixelRatio=1" />

But the label will be automatically positioned and colored inside the progress bar if the value is greater than 15%:

<Image src="https://quickchart.io/chart?h=100&c=%7B%0A%20%20type%3A%20%27progressBar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20data%3A%20%5B40%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20plugins%3A%20%7B%0A%20%20%20%20%20%20datalabels%3A%20%7B%0A%20%20%20%20%20%20%20%20font%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20size%3A%2040%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20color%3A%20(context)%20%3D%3E%0A%20%20%20%20%20%20%20%20%20%20context.dataset.data%5Bcontext.dataIndex%5D%20%3E%2015%20%3F%20%27%23fff%27%20%3A%20%27%23000%27%2C%0A%20%20%20%20%20%20%20%20anchor%3A%20(context)%20%3D%3E%0A%20%20%20%20%20%20%20%20%20%20context.dataset.data%5Bcontext.dataIndex%5D%20%3E%2015%20%3F%20%27center%27%20%3A%20%27end%27%2C%0A%20%20%20%20%20%20%20%20align%3A%20(context)%20%3D%3E%0A%20%20%20%20%20%20%20%20%20%20context.dataset.data%5Bcontext.dataIndex%5D%20%3E%2015%20%3F%20%27center%27%20%3A%20%27right%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D&devicePixelRatio=1" />

## Add a pattern

It's possible to use the `pattern` object to draw a patterned background on the progress bar.  The example below includes a background and also positions the data label so it's _outside_ of the progress bar.

<ChartExample showEditor width={300} height={50} config={`{
  type: 'progressBar',
  data: {
    datasets: [
      {
        data: [88],
        backgroundColor: pattern.draw(
          'line-vertical',
          'rgb(86 97 129)',
          undefined,
          25 /* size */,
        ),
      },
      {
        data: [100],
        backgroundColor: pattern.draw(
          'line-vertical',
          'rgb(237 234 229)',
          undefined,
          25 /* size */,
        ),
        borderColor: 'transparent',
      },
    ],
  },
  options: {
    plugins: {
      datalabels: {
        display: (context) => context.datasetIndex === 1,
        formatter: (_, context) => {
          return context.chart.data.datasets[0].data[0] + '%';
        },
        color: 'black',
        font: {
          size: 24,
          weight: 'bold',
        },
        anchor: 'end',
        align: 'end',
      },
    },
    layout: {
      padding: {
        right: 70,
      },
    },
  },
};
`} />

## Learn more

Remember that progress bars are just special-case bar charts. To further customize, read about [bar charts in Chart.js](https://www.chartjs.org/docs/2.9.4/charts/bar.html).

Need more help? Ask questions in our [community](https://community.quickchart.io/).

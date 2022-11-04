---
slug: /guides/custom-progress-bar/
title: How to customize the progress bar
tags: ['progress bar']
hide_table_of_contents: true
---

import Image from '../components/Image';

On QuickChart, a progress bar is a special case of a horizontal bar chart with axes and other labeling removed. All Chart.js bar options can be applied.

The first dataset specifies the number shown. By default, this number is a percentage and the total value is 100 by default. Because a progress bar is just a modified horizontal bar chart, the second dataset represents the whole. You can override the maximum progress bar value by setting a second dataset.

You can also customize the label. For example, to remove percentage on the display, set `options.plugins.datalabels.display` to false. Or, use [datalabel options](/documentation/chart-js/custom-pie-doughnut-chart-labels/) to change other style and display options.

[Here's an example](https://quickchart.io/sandbox/#%7B%0A%20%20type%3A%20'progressBar'%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20data%3A%20%5B15%5D%0A%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20data%3A%20%5B30%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20plugins%3A%20%7B%0A%20%20%20%20%20%20datalabels%3A%20%7B%0A%20%20%20%20%20%20%20%20display%3A%20false%2C%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D) that includes both of the above modifications. The progress bar displays a measurement of 15 out of 30.

```js
{
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
}
```

You can do more with bar chart and data label customizations. Let's say you're running a fundraiser and you've raised $20,000 out of $50,000. You can customize the progress bar to display this:

```js
{
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
}
```

Which results in this image:

<Image src="https://quickchart.io/chart?h=100&c=%7B%0A%20%20type%3A%20%27progressBar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20data%3A%20%5B20000%5D%2C%0A%20%20%20%20%20%20backgroundColor%3A%20%27green%27%2C%0A%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20data%3A%20%5B50000%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20plugins%3A%20%7B%0A%20%20%20%20%20%20datalabels%3A%20%7B%0A%20%20%20%20%20%20%20%20formatter%3A%20(val)%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20return%20%27%24%27%20%2B%20val.toLocaleString()%3B%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D&devicePixelRatio=1" />

If you'd like to play around with this example, [edit this progress bar chart in the sandbox](<https://quickchart.io/sandbox/#%7B%0A%20%20type%3A%20'progressBar'%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20data%3A%20%5B20000%5D%2C%0A%20%20%20%20%20%20backgroundColor%3A%20'green'%2C%0A%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20data%3A%20%5B50000%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20plugins%3A%20%7B%0A%20%20%20%20%20%20datalabels%3A%20%7B%0A%20%20%20%20%20%20%20%20formatter%3A%20(val)%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20return%20'%24'%20%2B%20val.toLocaleString()%3B%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D>)

## Dynamically positioning the text

You may notice that once a bar gets small, the label may not have room to appear.

We can solve this by dynamically positioning and coloring the progress bar label based on the progress bar value. For example, this configuration will place the label to the right of the progress bar if the value is below 15%:

```javascript
{
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
}
```

<Image src="https://quickchart.io/chart?h=100&c=%7B%0A%20%20type%3A%20%27progressBar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20data%3A%20%5B10%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20plugins%3A%20%7B%0A%20%20%20%20%20%20datalabels%3A%20%7B%0A%20%20%20%20%20%20%20%20font%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20size%3A%2040%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20color%3A%20(context)%20%3D%3E%0A%20%20%20%20%20%20%20%20%20%20context.dataset.data%5Bcontext.dataIndex%5D%20%3E%2015%20%3F%20%27%23fff%27%20%3A%20%27%23000%27%2C%0A%20%20%20%20%20%20%20%20anchor%3A%20(context)%20%3D%3E%0A%20%20%20%20%20%20%20%20%20%20context.dataset.data%5Bcontext.dataIndex%5D%20%3E%2015%20%3F%20%27center%27%20%3A%20%27end%27%2C%0A%20%20%20%20%20%20%20%20align%3A%20(context)%20%3D%3E%0A%20%20%20%20%20%20%20%20%20%20context.dataset.data%5Bcontext.dataIndex%5D%20%3E%2015%20%3F%20%27center%27%20%3A%20%27right%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D&devicePixelRatio=1" />

Whereas the label will be automatically positioned and colored inside the progress bar if the value is greater than 15%:

<Image src="https://quickchart.io/chart?h=100&c=%7B%0A%20%20type%3A%20%27progressBar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20data%3A%20%5B40%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20plugins%3A%20%7B%0A%20%20%20%20%20%20datalabels%3A%20%7B%0A%20%20%20%20%20%20%20%20font%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20size%3A%2040%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20color%3A%20(context)%20%3D%3E%0A%20%20%20%20%20%20%20%20%20%20context.dataset.data%5Bcontext.dataIndex%5D%20%3E%2015%20%3F%20%27%23fff%27%20%3A%20%27%23000%27%2C%0A%20%20%20%20%20%20%20%20anchor%3A%20(context)%20%3D%3E%0A%20%20%20%20%20%20%20%20%20%20context.dataset.data%5Bcontext.dataIndex%5D%20%3E%2015%20%3F%20%27center%27%20%3A%20%27end%27%2C%0A%20%20%20%20%20%20%20%20align%3A%20(context)%20%3D%3E%0A%20%20%20%20%20%20%20%20%20%20context.dataset.data%5Bcontext.dataIndex%5D%20%3E%2015%20%3F%20%27center%27%20%3A%20%27right%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D&devicePixelRatio=1" />

[Edit this chart in the sandbox](<https://quickchart.io/sandbox/#%7B%22chart%22%3A%22%7B%5Cn%20%20type%3A%20'progressBar'%2C%5Cn%20%20data%3A%20%7B%5Cn%20%20%20%20datasets%3A%20%5B%5Cn%20%20%20%20%20%20%7B%5Cn%20%20%20%20%20%20%20%20data%3A%20%5B10%5D%2C%5Cn%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%5D%2C%5Cn%20%20%7D%2C%5Cn%20%20options%3A%20%7B%5Cn%20%20%20%20plugins%3A%20%7B%5Cn%20%20%20%20%20%20datalabels%3A%20%7B%5Cn%20%20%20%20%20%20%20%20font%3A%20%7B%5Cn%20%20%20%20%20%20%20%20%20%20size%3A%2040%2C%5Cn%20%20%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%20%20%20%20color%3A%20(context)%20%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20context.dataset.data%5Bcontext.dataIndex%5D%20%3E%2015%20%3F%20'%23fff'%20%3A%20'%23000'%2C%5Cn%20%20%20%20%20%20%20%20anchor%3A%20(context)%20%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20context.dataset.data%5Bcontext.dataIndex%5D%20%3E%2015%20%3F%20'center'%20%3A%20'end'%2C%5Cn%20%20%20%20%20%20%20%20align%3A%20(context)%20%3D%3E%5Cn%20%20%20%20%20%20%20%20%20%20context.dataset.data%5Bcontext.dataIndex%5D%20%3E%2015%20%3F%20'center'%20%3A%20'right'%2C%5Cn%20%20%20%20%20%20%7D%2C%5Cn%20%20%20%20%7D%2C%5Cn%20%20%7D%2C%5Cn%7D%22%2C%22width%22%3A500%2C%22height%22%3A100%2C%22version%22%3A%222%22%2C%22backgroundColor%22%3A%22%23fff%22%7D>)

## Learn more

Remember that progress bars are just special-case bar charts. To further customize, learn more about [bar charts in Chart.js](https://www.chartjs.org/docs/2.9.4/charts/bar.html).

Need more help? Ask questions in our [community](https://community.quickchart.io/).

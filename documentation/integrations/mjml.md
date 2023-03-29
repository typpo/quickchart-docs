---
title: How to embed charts with MJML
sidebar_label: MJML
sidebar_position: 41
tags: ['integrations', 'mjml']
---

import Author from '@site/documentation/components/Author';
import Image from '@site/documentation/components/Image';
import ChartInEmailImage from '@site/documentation/guides/images/email/chart_in_email.png';

This tutorial describes how to use [mjml-chartjs](https://github.com/typpo/mjml-chartjs), an open-source custom component for [MJML](https://mjml.io/) that allows you to create responsive charts in your HTML emails.

<Image noLazyLoad noBorder src={ChartInEmailImage} maxWidth={800} caption="This post describes how to send charts in email using MJML." />

## Prerequisites

Before starting this tutorial, please ensure that you have the following software installed on your computer:

1. Node.js (version 10 or higher)
2. NPM (version 6 or higher)

## Getting Started

1. First, let's create a new folder for our project and navigate to it in the terminal:

```sh
mkdir mjml-chartjs-tutorial
cd mjml-chartjs-tutorial
```

2. Next, initialize a new NPM project and install the required dependencies:

```sh
npm init -y
npm install mjml mjml-chart mjml-chartjs
```

3. Create a new file called `email.mjml`:

```sh
touch email.mjml
```

4. Open `email.mjml` in your favorite code editor and add the following basic MJML structure:

```html
<mjml>
  <mj-head>
    <mj-title>MJML-ChartJS Tutorial</mj-title>
  </mj-head>
  <mj-body>
    <!-- layout code will go here -->
  </mj-body>
</mjml>
```

## Creating a Chart with MJML-ChartJS

Now that we've set up our project, let's create a simple bar chart using mjml-chartjs.

1. First, add the following code inside the `<mj-body>` tag:

```html
<mj-section>
  <mj-column>
    <mj-text font-size="20px" font-weight="bold">Sales Report</mj-text>
    <!-- chart goes here -->
  </mj-column>
</mj-section>
```

This code creates a new section with a column containing a title and an empty bar chart.

2. Now we need to configure the chart data and options. Create an `<mj-chartjs>` tag that contains your [Chart.js configuration](https://www.chartjs.org/docs/2.9.4/getting-started/).

```html
<mj-chartjs
  chart="{
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Users',
      data: [50, 60, 70, 180],
      backgroundColor: 'rgb(75, 192, 192)',
    }]
  }
}
"
/>
```

3. Finally, let's compile the MJML file into HTML. Create a new file called `build.js`:

```sh
touch build.js
```

4. Open `build.js` in your code editor and add the following code:

```js
const fs = require('fs');
const mjml = require('mjml');
const { registerComponent } = require('mjml-core');
const MjChartJs = require('mjml-chartjs');

registerComponent(MjChartJs);

const inputMJML = fs.readFileSync('./email.mjml', 'utf8');
const outputHTML = mjml(inputMJML, { minify: true }).html;

fs.writeFileSync('./email.html', outputHTML);
```

5. Run the build script to generate the HTML file:

```sh
node build.js
```

6. Open `email.html` in your browser to see the rendered chart.

## Chart parameters

The `mj-chartjs` component supports all the regular attributes of the `mj-image` tag, such as `alt`, `href`, `width`, and `height` (see [mj-image docs](https://documentation.mjml.io/#mj-image)). You can use these attributes to control size and positioning.

The component also supports the following chart-specific attributes:

| Name             | Description                                               | Required? | Default       |
| ---------------- | --------------------------------------------------------- | --------- | ------------- |
| chart            | The Chart.js configuration to be rendered                 | Yes       |               |
| width            | The pixel width of the generated chart image              |           | 500px         |
| height           | The pixel height of the generated chart image             |           | 300px         |
| background-color | The background color of the generated chart image         |           | #fff          |
| chartjs-version  | The version of Chart.js renderer to use                   |           | 3             |
| host             | The host of the chart rendering server                    |           | quickchart.io |
| scheme           | The scheme of the chart rendering server                  |           | https         |
| ignore-url-limit | If set, ignore the 16kb URL length guideline              |           | false         |
| api-key          | QuickChart.io API key (optional, for signing requests)    |           |               |
| api-account      | QuickChart.io account ID (optional, for signing requests) |           |               |

## Conclusion

That's it! You've successfully created a responsive chart using mjml-chartjs. You can now customize the chart by modifying the data and options attributes, or by exploring other chart types supported by Chart.js.

Please feel free to reach out with any new ideas or questions! Also, if you need help, check out our [community](https://community.quickchart.io/) where we discuss QuickChart integrations, chart configurations, and more.

<Author />

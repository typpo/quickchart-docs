---
title: Creating Charts in Visualforce PDFs using Apex
tags: ['salesforce']
---

import Image from '@site/documentation/components/Image';

This post describes how to use Apex components to display chart images in SalesForce. These chart images can be embedded in SalesForce or exported to other formats such as PDF.

Visualforce [supports](https://developer.salesforce.com/docs/atlas.en-us.pages.meta/pages/pages_charting.htm) some charting, but these charts depend on client-side rendering using Javascript. If you're building PDFs or other reports in Visualforce, you'll have to use a **static** method for rendering chart images.

This means that you'll have to define the chart and its data in a controller and then render it as an Apex image on a page.

## Code example

To get started, we'll define the controller on our Visualforce page:

```
<apex:page controller="ChartController" renderAs="pdf">
    <apex:image url="{!dynamicUrl}"/>
</apex:page>
```

Then, we'll create a custom controller in Apex:

```java
public class ChartController {
    public String dynamicUrl {get;set;}
    public ChartController() {
      // Insert your chart config here. You can replace the data with dynamic values.
      String config = "{"
        + "    type: 'bar',"
        + "    data: {"
        + "        labels: ['Q1', 'Q2', 'Q3', 'Q4'],"
        + "        datasets: [{"
        + "            label: 'Users',"
        + "            data: [50, 60, 70, 180]"
        + "        }]"
        + "    }"
        + "}";

      // Construct the URL
      String encodedConfig = EncodingUtil.urlEncode(config);
      dynamicUrl = "https://quickchart.io/chart?c=" + encodedConfig;
    }
}
```

The dynamic URL in the example above will display the following chart:

<Image maxWidth={600} caption="Chart image rendered in Salesforce via Apex component" src="https://quickchart.io/chart?c=%7B%0A%20%20type%3A%20%27bar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Q1%27%2C%20%27Q2%27%2C%20%27Q3%27%2C%20%27Q4%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20label%3A%20%27Users%27%2C%0A%20%20%20%20%20%20data%3A%20%5B50%2C%2060%2C%2070%2C%20180%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%0A%7D%0A" />

## Customization

Note that you can further customize your chart by setting other [API parameters](/documentation/#parameters).

The chart itself is very customizable - you can render any [Chart.js configuration](https://www.chartjs.org/docs/2.9.4/getting-started/). Have a look at our [chart gallery](/gallery/) to get ideas, or get started with the [developer documentation](/documentation/).

## Embedding elsewhere

The QuickChart API returns PNG images by default. The `<apex:image>` tag will allow you to embed the image in your VisualForce page. You can then render the Visualforce page as a PDF file ([see example](https://developer.salesforce.com/docs/atlas.en-us.pages.meta/pages/pages_output_pdf_renderas.htm)).

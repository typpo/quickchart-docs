---
slug: /salesforce-visualforce-apex-charts/
title: Creating Charts in Visualforce PDFs using Apex
sidebar_label: Salesforce
sidebar_position: 30
tags: ['salesforce', 'visualforce']
---

import Author from '@site/documentation/components/Author';
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

### Dyanmic data

Chances are you'll want to use a variable to fill the chart data.  The `config` variable is just a string, so you can concatenate values from a variable as you would any other string.

For example, below we run a query and create a list of integers representing the data we wish to graph.  Then, we use `String.join()` to convert the list into a comma-separated string:

```java
public class ChartController {
    public String dynamicUrl {get;set;}

    public ChartController() {
        // Query the Account data
        List<Account> accounts = [SELECT Name, Spend__c FROM Account LIMIT 4];

        // Create lists to store the account names and spend data
        List<String> accountNames = new List<String>();
        List<String> accountSpends = new List<String>();
        for (Account acc : accounts) {
            accountNames.add(acc.Name);
            accountSpends.add(String.valueOf(acc.Spend__c));
        }

        // Set up chart config and replace the data with dynamic values.
        String config = "{"
            + "    type: 'bar',"
            + "    data: {"
            + "        labels: [" + String.join(accountNames, "','") + "],"
            + "        datasets: [{"
            + "            label: 'Spend',"
            + "            data: [" + String.join(accountSpends, ',') + "]"
            + "        }]"
            + "    },"
            + "    options: {"
            + "        scales: {"
            + "            yAxes: [{"
            + "                ticks: {"
            + "                    beginAtZero: true"
            + "                }"
            + "            }]"
            + "        }"
            + "    }"
            + "}";

        // Construct the URL
        String encodedConfig = EncodingUtil.urlEncode(config);
        dynamicUrl = "https://quickchart.io/chart?c=" + encodedConfig;
    }
}
```

This example creates a chart with Account Names on the X-axis and Account Spend on the Y-axis.

<Image maxWidth={600} caption="Chart image rendered using Apex with dynamic queried data" src="https://quickchart.io/chart?c=%7B%0A%20%20type%3A%20%27bar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Account%201%27%2C%20%27Account%202%27%2C%20%27Account%203%27%2C%20%27Account%204%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20%27Spend%27%2C%0A%20%20%20%20%20%20%20%20data%3A%20%5B1200%2C%20800%2C%201500%2C%20900%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20scales%3A%20%7B%0A%20%20%20%20%20%20yAxes%3A%20%5B%0A%20%20%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20ticks%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20beginAtZero%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%5D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D" />

## Customization

Note that you can further customize your chart by setting other [API parameters](/documentation/usage/parameters/).

The chart itself is very customizable - you can render any [Chart.js configuration](https://www.chartjs.org/docs/2.9.4/getting-started/). Have a look at our [chart gallery](https://quickchart.io/gallery/) to get ideas, or get started with the [developer documentation](/documentation/).

## Embedding elsewhere

The QuickChart API returns PNG images by default. The `<apex:image>` tag will allow you to embed the image in your VisualForce page. You can then render the Visualforce page as a PDF file ([see example](https://developer.salesforce.com/docs/atlas.en-us.pages.meta/pages/pages_output_pdf_renderas.htm)).

<Author />

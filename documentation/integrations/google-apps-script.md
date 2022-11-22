---
title: Generating Charts in Google Apps Script
sidebar_label: Google Apps Script
sidebar_position: 25
tags: ['integrations', 'google apps script']
---

import Image from '@site/documentation/components/Image';
import EditorImage from '@site/documentation/integrations/images/google-apps-script/editor.png';
import UsageImage from '@site/documentation/integrations/images/google-apps-script/sheets-custom-function.png';

QuickChart is a web service that allows you to generate chart images and embed them nearly anywhere.  You can use QuickChart from Google Apps Script in order to insert chart images in docs, spreadsheets, presentations, and more.

Before you get started with Google Apps Script, you may also be interested in how to integrate directly with [Google Sheets](/documentation/integrations/google-sheets/).  You may not need Apps Script or a custom function to accomplish your goals.

## Creating a custom function

Here's an example of a Google Sheets custom function that returns a chart URL:

```js
function GetChartUrl(values) {
  var width = 500;
  var height = 300;
  var backgroundColor = 'white';
  var config = `{
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Data',
      data: [${values.join(',')}]
    }]
  }
}
`;
  return `https://quickchart.io/chart?c=${encodeURIComponent(config)}&w=${width}&h=${height}&bkg=${backgroundColor}&devicePixelRatio=1`
}
```

After editing the script, remember to save it:

<Image alt="QuickChart function in Google Apps Script" caption="Edit the script, then press the 'Save' icon" src={EditorImage} />

Now that your custom function is setup, use the formula in Google Sheets:

```
=GetChartUrl(A2:A6)
```

Use the `IMAGE()` function render the URL as an image:

```
=IMAGE(GetChartUrl(A2:A5))
```

Here's what it looks like:

<Image caption="Use the GetChartUrl custom function to load an image on your spreadsheet" src={UsageImage} />

See this example sheet which generates a chart URL: https://docs.google.com/spreadsheets/d/1cOjoT4viETplmdTvNOeDKVjwIqZpIr2afMCiK7vgQLY/edit#gid=0

## Customize the chart

QuickChart is based on Chart.js, the most popular open-source chart library.  You can customize chart type, size, colors, labels, and more.

[Learn more](/documentation/) about the QuickChart API or [view chart examples](https://quickchart.io/gallery/).

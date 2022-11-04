---
title: Automate chart creation with Chart Maker (no code)
sidebar_label: Chart Maker
tags: ['chart maker']
sidebar_position: 4
---

import CodeWithHighlights from '@site/documentation/components/CodeWithHighlights';
import Image from '@site/documentation/components/Image';
import LabelsAndDataImage from '@site/documentation/images/chart-maker/labels_and_data.jpeg';
import MenusImage from '@site/documentation/images/chart-maker/menus.gif';
import TemplateImage from '@site/documentation/images/chart-maker/chart_template.png';

QuickChart is a no-code solution to automatic chart generation. Create a chart template using the **[chart maker](https://quickchart.io/chart-maker/)** interface. Then use the template endpoint to customize and generate charts automatically.

In this guide, you will learn how to:

1. Create and customize a chart template without any code.
1. Save the chart as a URL (API endpoint) that you can use in emails, Excel, Salesforce, and any other formats.
1. Set the chart's data by providing special parameters in the URL.

<div style={{padding:'75% 0 0 0',position:'relative'}}><iframe src="https://player.vimeo.com/video/578724989?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}} title="QuickChart - Chart Maker + spreadsheet demo"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>

## Create a chart template

To create charts online, first go to the [chart maker](https://quickchart.io/chart-maker/). Use the interface to build a chart template. This chart will be the basis of the charts you generate automatically in the future.

### Add data

To get started, add some dummy or example data. The chart preview will update so you can get an idea of how your visualization will work.

Enter data as comma-separated values (e.g. `10,20,30,40`). Each data value maps to a label (e.g. `Jan, Feb, Mar, Apr`). Edit "Labels" at the top of the Data settings to change this mapping.

<Image caption="Edit labels and data on the left-hand side of the chart maker" src={LabelsAndDataImage} />

#### Using coordinates

> For more advanced use cases, you may provide your data as (x, y) coordinates.
>
> An example of category-based coordinates: `(Jan, 10), (Feb, 20), (Mar, 30), (Apr, 40)`. These coordinates will give you more power over how your line or scatter plot is displayed.
>
> **Numeric coordinates** are also accepted: `(1, 50), (10, 40), (12, 20), (8, 10)`. This format is most commonly used for scatter plots, and requires you to change your Axes to `linear` or `logarithmic` under settings. In this case, you should clear the "Labels" setting at the top of the Data settings - labels will be automatically generated.
>
> **Time series** use coordinates too. For example: `(2020-01-01, 50), (2020-03-15, 12), (2020-06-05, 40)`. To display time series, change the X-axis to `time` type and clear the "Labels" setting in Data settings, as labels will be generated automatically.

### Customize look & feel

Now that your data is set, time to make the chart look however you want.

Close the data menu to customize your chart's axes, ticks, legend, and its overall layout.

<Image maxWidth={500} caption="Customize the chart by expanding different sections" src={MenusImage} />

Looking for inspiration? Head over to the [chart gallery](https://quickchart.io/gallery/) - most examples are editable in the chart maker.

## Save the template

Click **Save as API Template** in the top right.

You'll be presented with an **API endpoint**. This is the base URL of your chart. If you go to it, you will see a chart image. The URL can be further customized to override properties of your chart.

<Image maxWidth={700} caption="Saving as an API template gives you an endpoint you can use to generate unlimited charts." src={TemplateImage}/>

## Use the no-code chart API

Currently, three aspects of your chart can be overriden with custom values:

1. Chart title
1. Dataset labels
1. Data

These customizations are passed as URL parameters. For example, to override chart title, take the base URL and add the following:

<CodeWithHighlights wrap code="https://quickchart.io/chart/render/zf-abc-123**?title=New title**" />

You can join URL parameters together using the **&** symbol. For example:

<CodeWithHighlights wrap code="https://quickchart.io/chart/render/zf-abc-123**?title=New title&labels=Q1,Q2,Q3,Q4**" />

To override data, use **data1**, **data2**, **data3**, ..., for each dataset on the chart.

For example, to override the first (primary) dataset:

<CodeWithHighlights wrap code="https://quickchart.io/chart/render/zf-abc-123**?data1=40,60,80,100**" />

To override multiple datasets and the chart title:

<CodeWithHighlights wrap code="https://quickchart.io/chart/render/zf-abc-123**?data1=40,60,80,100&data2=5,6,7,8&title=Updated chart**" />

### Real example

We have the following chart endpoint:

<CodeWithHighlights wrap code="https://quickchart.io/chart/render/9a560ba4-ab71-4d1e-89ea-ce4741e9d232" />

It looks like this:

<Image maxWidth={500} src="https://quickchart.io/chart/render/9a560ba4-ab71-4d1e-89ea-ce4741e9d232" />

Let's override this chart's title:

<CodeWithHighlights wrap code="https://quickchart.io/chart/render/9a560ba4-ab71-4d1e-89ea-ce4741e9d232**?title=Updated chart**" />

<Image maxWidth={500} src="https://quickchart.io/chart/render/9a560ba4-ab71-4d1e-89ea-ce4741e9d232?title=Updated%20chart" />

And now let's add some more data and labels to the chart. This will override the data but keep the same style of chart that I created in the chart maker:

<CodeWithHighlights wrap code="https://quickchart.io/chart/render/9a560ba4-ab71-4d1e-89ea-ce4741e9d232?title=Updated chart**&data1=50,60,80&labels=Jan,Feb,Mar**" />

<Image maxWidth={500} src="https://quickchart.io/chart/render/9a560ba4-ab71-4d1e-89ea-ce4741e9d232?title=Updated%20chart&data1=50,60,80&labels=Jan,Feb,Mar" />

## Advanced API features

If you are willing to dive into the JSON/Javascript configuration, get even more control over the apperance and behavior of your chart. See [main API documentation](/documentation/) for details.

## Need help?

The first step is to [ask in our community](https://community.quickchart.io/), which we monitor every day. Feel free to contact me or [contact support](mailto:support@quickchart.io) if you get stuck or have questions. We'll get back to you quickly!

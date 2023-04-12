---
title: Text to Chart
---

import Admonition from '@theme/Admonition';
import Image from '../components/Image';
import CodeWithHighlights from '../components/CodeWithHighlights';

# Text to Chart API

"Text to Chart" is an experimental feature that lets you create charts using natural language.

To generate a chart, use the `https://quickchart.io/natural` endpoint:

<CodeWithHighlights code="https://quickchart.io/natural/**red bar chart, revenue, Jan-Dec**" />

Go to <a href="https://quickchart.io/natural/red_bar_chart,_revenue,_Jan-Dec">https://quickchart.io/natural/red_bar_chart,_revenue,_Jan-Dec</a> and you will see a chart:

<Image noBorder maxWidth={500} src="https://quickchart.io/natural/red bar chart, revenue, Jan-Dec" alt="A red bar chart, Jan-Dec" />

Add it to a webpage or email:

```html
<img src="https://quickchart.io/natural/red bar chart, revenue, Jan-Dec" />
```

Or embed it as an iframe:
```html
<iframe src="https://quickchart.io/natural/iframe/red bar chart, revenue, Jan-Dec" />
```

## Adding your own data

You may include data in your natural language description:

<CodeWithHighlights wrap code="https://quickchart.io/natural/**red bar chart, revenue, Jan-Dec, data 30,35,38,22,48,42,63,60,71,72,64,80**" />

<Image noBorder maxWidth={500} src="https://quickchart.io/natural/red bar chart, revenue, Jan-Dec, data 30,35,38,22,48,42,63,60,71,72,64,80" alt="A red bar chart, Jan-Dec, with some data" />

But unless you're creating a one-off chart, this is not an efficient approach and can lead to visual inconsistencies between multiple charts.  You can solve this by re-using the chart.

### How to re-use charts

The first time you create a chart from text, we automatically save it for future use.  This saved chart is called a "template".
- Using a template is _much faster_ than updating the chart description.
- Using a template ensures a consistent chart appearance, even when your data changes.

To use a template:
1. Create a natural language chart with the desired look & feel.
1. Instead of putting data directly in the description, use query parameters (such as `data1`) to dynamically set chart data.

For example:

<CodeWithHighlights wrap code="https://quickchart.io/natural/red bar chart, revenue, Jan-Dec**?data1=30,35,38,22,48,42,63,70,70,72,64,80&title=Financials&label1=Revenue (millions)**" />

<Image noBorder maxWidth={500} src="https://quickchart.io/natural/red bar chart, revenue, Jan-Dec?data1=30,35,38,22,48,42,63,70,70,72,64,80&title=Financials&label1=Revenue (millions)" alt="A red bar chart showing Revenue Jan-Dec" />

You'll notice this chart loads in _milliseconds_, not seconds, so you can generate thousands of these if you want.  Also, it's guaranteed to be the same color, have the same fonts, labeling, etc. because GPT won't be rolling the dice each time.

Template parameters are added to the base template URL.  Here are examples of supported template parameters:
- `title` - The title of the chart
- `labels` - Comma-separated labels for the label axis of a chart (usually the X axis)
- `data1, data2, ..., dataN` - Comma-separated data values for each dataseries
- `label1, label2, ..., labelN` - Comma-separated labels for each dataseries

<Admonition type="info">Template are pretty flexible. Learn more about supported template parameters [here](/documentation/usage/short-urls-and-templates/#templates).</Admonition>

## Customizing the chart

The best way to get the chart looking the way you want is by describing what you want in natural language.  Here are some examples of attributes you can set:
- Color
- Font size and style
- Axis label, title, and legend appearance
- Tick formatting
- Type of chart
- Axis tick range

QuickChart is built on [Chart.js](https://www.chartjs.org/), but supports many [built-in plugins](/documentation/reference/chartjs-plugins/) such as annotations, data labels, radial gauges, sankey, financial charts, etc.

The chart accepts query parameters that control other aspects of its appearance:
- **`width`**: width of the chart image, in pixels
- **`height`**: height of the chart image, in pixels
- **`backgroundColor`**: background color of the chart (hex, rgb, color name)

For example:

<CodeWithHighlights wrap code="https://quickchart.io/natural/red bar chart, Jan-Dec**?width=800&height=200&backgroundColor=black**" />

<Image noBorder src="https://quickchart.io/natural/red bar chart, Jan-Dec?width=800&height=200&backgroundColor=black" alt="A red bar chart, Jan-Dec" />

## Embedding charts as iframes

If you prefer interactive charts, use `https://quickchart.io/natural/iframe/` as a base URL.  Then you can embed the chart as an iframe like this:

<CodeWithHighlights wrap code={`<iframe src="https://quickchart.io/natural/**iframe/green bar chart: 22, 40, 32, 42**" width="500" height="250" />`} />

<div style={{display: 'flex', justifyContent: 'center'}}>
<iframe src="https://quickchart.io/natural/iframe/green bar chart: 22, 40, 32, 42" width="500" height="250"></iframe>
</div>

## Examples

Here are some examples of natural language charts:

<CodeWithHighlights wrap code="https://quickchart.io/natural/**Bar chart with data labels showing population of UN security council countries, with line graph for trend line. Shorten Y axis labels using 'M' for million. Title 'UN Security Council', hide legend**" />

<Image noBorder maxWidth={500} src="https://quickchart.io/natural/Bar chart showing population of UN security council countries, with line graph on Y2 for GDP growth. Abbreviate Y axis labels and add axis titles. Chart title 'UN Security Council population', hide legend" alt="Mixed graph showing UN security council countries" />

<hr/>

<CodeWithHighlights wrap code="https://quickchart.io/natural/**doughnut chart showing 10 luck, 20 skill, 15 power of will, 5 pleasure, 50 pain**" />

<Image noBorder maxWidth={500} src="https://quickchart.io/natural/doughnut chart showing 10 luck, 20 skill, 15 power of will, 5 pleasure, 50 pain" alt="" />

<hr/>

<CodeWithHighlights wrap code="https://quickchart.io/natural/**Radar chart showing job applicant aptitudes ranging from 0-100, no legend**" />

<Image noBorder maxWidth={500} src="https://quickchart.io/natural/Radar chart showing job applicant aptitudes ranging from 0-100, no legend" alt="" />

<hr/>

<CodeWithHighlights wrap code="https://quickchart.io/natural/**horizontal bar chart with data labels, 10 bars.  gradient from green to red top down**" />

<Image noBorder maxWidth={500} src="https://quickchart.io/natural/horizontal bar chart with data labels, 10 bars.  gradient from green to red top down" alt="" />

<hr/>

Remember, once you generate a chart that _looks_ like other charts you want to generate in the future, you can override the data on it by adding `?data1=10,20,30,60...` to the URL.

## Tips & Gotchas

#### We're in beta

The Natural Language Charts feature launched on April 11, 2023 and is still in active development.

#### URL-encode your URLs
In general, URLs should be URL encoded.  For example, `%` and `#` are special characters and need to be converted to their URL-encoded equivalents.  You can use a URL encoder [like this one](https://www.urlencoder.io/).

For ease of use and also to make some URL parsers happy, underscores `_` are substituted with spaces.  If preferred, you may specify a chart like this: `https://quickchart.io/natural/red_bar_chart`

#### Check your charts
GPT sometimes generates charts that we can't render.  If this is the case, you'll receive and error and your chart won't show.  You'll have to tweak your chart description.

Note that chart templates are cached for a limited period of time. Be sure to make your description as precise as possible, as the chart may be regenerated.

#### More control over chart appearance
If you prefer finer-grained control over the appearance of your chart, you have options:
- Create a chart configuration in the [Chart Editor](https://quickchart.io/sandbox).  You can still use the "Edit with GPT" feature to get help creating your chart and save it as a template.
- Create a no-code chart in the [Chart Builder](https://quickchart.io/chart-maker/).  You can point-and-click to edit your chart's appearance and save it as a template.

#### Initial renders are slow, so prefer templates
GPT takes time to render charts.  That's why we recommend generating a solid example chart first, and using it as a template (as described in [Adding Your Own Data](#adding-your-own-data)).

## What to expect next
Better support for Gannt charts, Financial charts, custom backgrounds, gradients, and making it possible to set background color in the chart description.

Ideas?  Post a suggestion in our [community](https://community.quickchart.io/) or message [support@quickchart.io](mailto:support@quickchart.io).

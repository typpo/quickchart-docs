---
title: Parameters (Google Image Charts)
sidebar_label: Parameters
sidebar_position: 1
displayed_sidebar: googleImageChartsSidebar
---

import CodeWithHighlights from '@site/documentation/components/CodeWithHighlights';
import ChartExample from '@site/documentation/components/ChartExample';
import GoogleImageChartsTutorialCallout from '@site/documentation/components/GoogleImageChartsTutorialCallout';
import Image from '@site/documentation/components/Image';

## Chart type (cht) \{#cht-param}

<GoogleImageChartsTutorialCallout>`cht=<chart_type>`</GoogleImageChartsTutorialCallout>

This is a required parameter that specifies the type of chart that is rendered. Accepted values include:

- Bar charts
  - **bhg**: Horizontal bar chart with grouped bars
  - **bvg**: Vertical bar chart with grouped bars
  - **bhs**: Horizontal bar chart with stacked bars
  - **bvs**: Vertical bar chart with stacked bars
  - **bvo**: Vertical bar chart with stacked bars in front of one another (automatically downgraded to "bvs")
- Line charts
  - **lc**: Line chart
  - **ls**: Sparkline (line chart without axes)
- Pie charts
  - **p**: Pie chart
  - **pc**: Concentric pie chart
  - **p3**: 3D pie chart (automatically downgraded to "p")
- Graph visualizations
  - **gv**: GraphViz chart

## Chart data (chd) \{#chd-param}

<GoogleImageChartsTutorialCallout>`chd=<format>:data1,data2,data3...`</GoogleImageChartsTutorialCallout>

This is a required parameter that sets data for your chart.

QuickChart supports [all the data formats](https://developers.google.com/chart/image/docs/data_formats) offered by Google Image Charts, including basic text format, text format with custom scaling, simple encoding format, and extended encoding format.

If you're looking for something easier than Google's cryptic encoding formats, we support an additional "automatic" format `a`, which accepts a comma-delimited list of values without requiring any special encoding. For example:

<Image caption="cht=a:30,50,-1000,1234" src="https://quickchart.io/chart?cht=bvg&chd=a:30,50,-1000,1234&chs=100x100" />

## Chart size (chs) \{#chs-param}

<GoogleImageChartsTutorialCallout>`chs=<width>x<height>`</GoogleImageChartsTutorialCallout>

Width and height in pixels.

## Chart legend text and style (chdl, chdlp, chdls) \{#chdl-param}

<GoogleImageChartsTutorialCallout>
Legend labels: **`chd=<series_label_1>|<series_label_2>|<series_label_3>|...`**

Legend position: **`chlp=<position>`**

Legend style: **`chdls=<font_color>,<font_size>`**
</GoogleImageChartsTutorialCallout>

Legend labels are strings delimited by "|".

The "position" value should be one of: `b`, `t`, `r`, `l`, corresponding to bottom, top, left, right.

The "style" tuple takes a hexidecimal font color (e.g. `00aaff`) followed by font size in pixels (e.g. `14`).

<Image caption="chdl=NASDAQ|FTSE100|DOW" src="https://quickchart.io/chart?&cht=ls&chd=t:0,30,60,70,90,95,100|20,30,40,50,60,70,80|10,30,40,45,52&chco=ff0000,00ff00,0000ff&chs=250x150&chdl=NASDAQ|FTSE100|DOW" />

## Chart fill (chf) \{#chf-param}

<GoogleImageChartsTutorialCallout>`chf=<fill_type>,s,<color>`</GoogleImageChartsTutorialCallout>

`fill_type` is either the string `bg` (for background fill) or `a` (for transparent fill). In most cases, you should choose `bg`.

`color` is the hex color of the chart background, e.g. `00aaff`. Transparency is supported, e.g. `00aaffbb`.

For backwards compatibility purposes, if fill type `a` is selected, QuickChart will expect an 8-digit hex code but apply only the last two alpha digits to change chart transparency.

If you are looking to color bar charts, we recommend that you use the [chco param](#chco-param) instead.

<Image caption="chf=bg,s,e0e0e0" src="https://quickchart.io/chart?cht=lc&chd=s:Uf9a,a3fG&chs=300x200&chl=1%7C2%7C3%7C4&chf=bg,s,e0e0e0&chco=000000,0000FF&chma=30,30,30,30&chdl=Temp%7CSale"/>

## Series color (chco) \{#chco-param}

<GoogleImageChartsTutorialCallout>`chco= <series_1_element_1>|...|<series_1_element_n>,<series_2>,...,<series_m>`</GoogleImageChartsTutorialCallout>

Each entry in this string is an RRGGBB format hexadecimal number. Colors that apply to a whole series are delimited by a comma, colors that apply to individual elements within a series are delimited by a bar.

For example `00aaff,ff0000,00ff00` is a valid input. Transparency is supported, e.g. `00aaffbb`.

<Image caption="chco=FF0000,00FF00,0000FF" src="https://quickchart.io/chart?cht=lc&chco=FF0000,00FF00,0000FF&chs=200x125&chd=s:FOETHECat,lkjtf3asv,KATYPSNXJ&chxt=x,y&chxl=0:|Oct|Nov|Dec|1:||20K||60K||100K"/>

<Image caption="chco=FFC6A5|FFFF42|DEF3BD|00A5C6|DEBDDE" src="https://quickchart.io/chart?cht=bvs&chs=200x125&chd=t:10,50,60,80,40&chco=FFC6A5|FFFF42|DEF3BD|00A5C6|DEBDDE&chbh=20&chds=0,160"/>

<Image caption="chco=000000,FF0000|00FF00|0000FF" src="https://quickchart.io/chart?cht=bhs&chco=000000,FF0000|00FF00|0000FF&chs=200x125&chd=s:FOE,elo&chxt=x,y&chxl=1:|Dec|Nov|Oct|0:|20K|60K|100K"/>

## Chart grid lines (chg) \{#chg-param}

<GoogleImageChartsTutorialCallout>`chg=<x_axis_enabled>,<y_axis_enabled>`</GoogleImageChartsTutorialCallout>

If set to any non-zero number, the axis will display grid lines. Currently not all Google Image Charts gridline options are implemented.

<Image caption="chg=10,10" src="https://quickchart.io/chart?cht=lc&chd=s:cEAELFJHHHKUju9uuXUc&chco=76A4FB&chls=2.0,0.0,0.0&chxt=x,y&chxl=0:%7C0%7C1%7C2%7C3%7C4%7C5%7C1:%7C0%7C50%7C100&chs=200x125&chg=20,50" />

## Data labels (chl) \{#chl-param}

<GoogleImageChartsTutorialCallout>`chl=<label_value_1>|<label_value_2>|<label_value_3>|...`</GoogleImageChartsTutorialCallout>

Labels are applied consecutively to the data points in `chd`. If you have multiple series, labels are applied to all points in all sequences in the order specified in `chd`. Empty labels are allowed.

<Image caption="chl=Jan|Feb|Mar|Apr" src="https://quickchart.io/chart?cht=p&chd=s:Uf9a&chs=200x200&chl=Jan|Feb|Mar|Apr"/>

## Text and data value markers (chm) \{#chm-param}

<GoogleImageChartsTutorialCallout>`chm= <marker_type>,<color>,<series_index>,<opt_which_points>,<size>,<opt_z_order>,<opt_placement> |...| <marker_type>,<color>,<series_index>,<opt_which_points>,<size>,<opt_z_order>,<opt_placement>`</GoogleImageChartsTutorialCallout>

Currently QuickChart only uses the `series_index` parameter, which determines whether data labels are shown for a given data series provided in the `chd` parameter.

Future support for data label colors, size, etc is planned. For more detail, see the [full Google Image Charts documentation](https://developers.google.com/chart/image/docs/chart_params#gcharts_data_point_labels).

<Image caption="chm=N,000000,1|N,000000,1|...|" src="https://quickchart.io/chart?cht=bvs&chs=100x150&chd=t:5,5,5|10,10,10|15,15,15&chds=0,120&chco=4d89f9,c6d9fd,00B88A&chbh=20&chds=0,40&chm=N,000000,0,0,10|N,000000,0,1,10|N,000000,0,2,10|N,000000,1,0,10|N,000000,1,1,10|N,000000,1,2,10|N,000000,2,0,10|N,000000,2,1,10|N,000000,2,2,10&chxs=0,000000,0,0,_&chxt=y&chma=20,20,20,20"/>

## Visible axes (chxt) \{#chxt-param}

<GoogleImageChartsTutorialCallout>`chxt= <axis_1> ,..., <axis_n>`</GoogleImageChartsTutorialCallout>

Specific which axis to display. This is used to specify how other axis parameters are applied. Accepted values are: `x`, `y`, `x,y`, or `y,x`.

Currently we do not support Google Image Charts-style multiple axes (e.g. 2+ X-axes or 2+ Y-axes). To render a graph with multiple axis, use the [main API](/documentation/).

## Chart title and style (chtt, chts) \{#chtt-param}

<GoogleImageChartsTutorialCallout>
Chart title: **`chtt=<chart_title>`**

Chart style: **`chts=<font_color>,<font_size>`**
</GoogleImageChartsTutorialCallout>

Chart title is a string that is displayed atop the chart. You can insert newlines by using the "|" character.

Chart style is determined by font color, a hex code (e.g. `00aaff`) and font size in pixels (e.g. `14`).

<Image caption="chtt=Site+visitors+by+month" src="https://quickchart.io/chart?cht=bvs&chd=s:YUVmw1&chco=FF0000&chs=180x150&chtt=Site+visitors+by+month&chbh=22,4"/>

## Axis ranges (chxr) \{#chxr-param}

<GoogleImageChartsTutorialCallout>`chxr= <axis_index>, <start_val>, <end_val>, <opt_step> | ...`</GoogleImageChartsTutorialCallout>

Specify the range of values that appear on each axis independently using the chxr parameter. Note that unlike the Google Image Charts API, scaling the axes also scales the presentation of the chart.

You must make an axis visible using the chxt parameter if you want to specify its range. To specify custom axis values, use the chxl parameter.

Separate multiple axis label ranges using the pipe character ( | ).

[Full axis range documentation](https://developers.google.com/chart/image/docs/chart_params#axis_range)

## Axis labels (chxl) \{#chxl-param}

<GoogleImageChartsTutorialCallout>`chxl= <axis_index>:|<label_1>|...|<label_n> |...| <axis_index>:|<label_1>|...|<label_n>`</GoogleImageChartsTutorialCallout>

Specify custom string axis labels on any axis using the chxl parameter. If you display an axis (using the chxt parameter) and do not specify custom labels, numeric labels will be applied.

`axis_index`: Which axis to apply labels to. This is an index into the `chxt` parameter array. For example, if you have `chxt=x,y` then index 0 would be the x-axis, 1 would be the y-axis.

`<label_1>| ... |<label_n>`: One or more labels to place along this axis. These can be string or number values. Separate labels with a pipe character.

[Full axis labels documentation](https://developers.google.com/chart/image/docs/chart_params#axis_labels)

<Image caption="chxl=|2001|2002|2003" src="https://quickchart.io/chart?chxt=x,y&cht=bvs&chd=s:cEj9U&chco=76A4FB&chls=2.0&chs=300x200&chxl=0:|2001|2002|2003&chxp=0,0"/>

## Axis label styles (chxs) \{chxs-param}

<GoogleImageChartsTutorialCallout>`chxs= <axis_index><opt_format_string>,<opt_label_color>,<opt_font_size>,<opt_alignment>,<opt_axis_or_tick>,<opt_tick_color>,<opt_axis_color> |...| <repeated>`</GoogleImageChartsTutorialCallout>

You can specify the font size, color, alignment, and label format for axis labels. All labels on an axis share the same format.

`axis_index`: Which axis to apply labels to. This is an index into the `chxt` parameter array. For example, if you have `chxt=x,y` then index 0 would be the x-axis, 1 would be the y-axis.

`opt_format_string`: An optional format string that, if used, follows immediately after the axis index number without an intervening comma. It starts with a letter "N" followed by a command-separated list of values, all options.

The formatting string syntax is as follows:

```
N<preceding_text>*<number_type><decimal_places>zs<x or y>*<following_text>
```

The meaning of each element:

- `<preceding_text>` - Literal text to precede each value.
- `*...*` - An optional block wrapped in literal asterisks, in which you can specify formatting details for numbers. The following values are supported, and are all optional:
  - `*<number_type>*` - The number format, for numeric values. Choose one of the following:
    - `f` - [*Default*] Floating point format. Consider specifying precision as well with the `<decimal_places>` value.
    - `p` - Percentage format. A % sign is appended automatically. **Note:** When using this format, data values from 0.0 --- 1.0 map to 0 --- 100% (for example, 0.43 will be shown as 43%).
    - `e` - Scientific notation format.
    - `c<*CUR*>` - Format the number in the currency specified, with the appropriate currency marker. Replace `<*CUR*>` with a three-letter currency code. Example: `cEUR` for Euros. You can find a list of codes on the [ISO web site](http://www.iso.org/iso/home/store/catalogue_tc/catalogue_detail.htm?csnumber=46121), although not all symbols are supported.
  - *`<decimal_places>`* - An integer specifying how many decimal places to show. The value is rounded (not truncated) to this length. *Default is 2.*
  - `s` - Display group separators. *Default is no*.
- `<*following_text*>` - Literal text to follow each value.

[Full axis label styles documentation](https://developers.google.com/chart/image/docs/chart_params#axis-label-styles-chxs)

<Image caption="chxs=0N*cUSD*Mil,000000" src="https://quickchart.io/chart?cht=bvg&chs=300x200&chd=t:5,5,5|10,10,10|15,15,15&chco=4d89f9,c6d9fd,00B88A&chds=0,20&chbh=a&chxs=0N*cUSD*Mil,000000&chxt=y"/>

## Chart.js converter

Existing Google Image Charts users may be interested in converting their charts to [Chart.js](https://www.chartjs.org/). The format is flexible, open-source, and therefore much more future-proof than a proprietary chart format. Also, you can use Chart.js in the browser to enable interactivity.

Obtain an equivalent Chart.js JSON config by appending **`format=chartjs-config`** to your Google Image Charts request. The response will look something like this:

[/chart?cht=pc&chd=s:Helo,Wrld&chs=200x100&format=chartjs-config](https://quickchart.io/chart?cht=pc&chd=s:Helo,Wrld&chs=200x100&format=chartjs-config)

```js
{
  data: {
    labels: [ 0, 1, 2, 3 ],
    datasets: [
      {
        data: [ 22, 43, 37, 29 ],
        fill: false,
        backgroundColor: undefined,
        borderColor: undefined,
        borderWidth: 2,
        pointRadius: 0
      },
      {
        data: [ 7, 30, 37, 40 ],
        fill: false,
        backgroundColor: undefined,
        borderColor: undefined,
        borderWidth: 2,
        pointRadius: 0
      }
    ]
  },
  options: {
    plugins: {
      datalabels: {
        display: false
      }
    },
    legend: {
      display: false
    },
    layout: {
      padding: { left: 0, right: 0, top: 10, bottom: 0 }
    }
  },
  type: 'pie'
}
```

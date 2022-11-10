---
slug: /migrating-from-google-image-charts/
title: How to replace Google Image Charts with Open Source
sidebar_label: Overview
sidebar_position: 0
displayed_sidebar: googleImageChartsSidebar
---

import Admonition from '@theme/Admonition';
import CodeWithHighlights from '@site/documentation/components/CodeWithHighlights';
import ChartExample from '@site/documentation/components/ChartExample';
import GoogleImageChartsTutorialCallout from '@site/documentation/components/GoogleImageChartsTutorialCallout';
import Image from '@site/documentation/components/Image';

## Get Started

This guide describes how to replace Google Image Charts with a free, open-source replacement. QuickChart is mostly compatible with Google Image Charts and serves as a drop-in replacement.

Here are a few things you should know before getting started:

- QuickChart is an open-source service that renders static chart images compatible with Google Image Charts. You can [host your own server](https://github.com/typpo/quickchart) from source code or a Docker container, or you can use the reliable [QuickChart.io](https://quickchart.io/) web service and not worry about hosting.
- This page is for people looking to replace existing Google Image Charts implementations. To start from scratch with QuickChart, go to the [main documentation](/documentation/).
- If you're starting fresh, use the open-source [Chart.js format](/documentation/) instead of Google Image Charts format. It's more flexible, has a strong community, and will never be deprecated.

## Migrating from Google Image Charts

Replace `chart.googleapis.com` with `quickchart.io` in the URL.

For example, the URL:

<CodeWithHighlights code="https://**chart.googleapis.com**/chart?cht=bvg&chs=300x200&chd=t:5,5,5|10,10,10|15,15,15&chco=4d89f9,c6d9fd,00B88A&chds=0,20&chbh=a&chxs=0,000000,0,0,_&chxt=y&chm=N,000000,0,,10|N,000000,1,,10|N,000000,2,,10" />

<Image noLazyLoad caption="Google Image Charts" src="https://chart.googleapis.com/chart?cht=bvg&chs=300x200&chd=t:5,5,5|10,10,10|15,15,15&chco=4d89f9,c6d9fd,00B88A&chds=0,20&chbh=a&chxs=0,000000,0,0,_&chxt=y&chm=N,000000,0,,10|N,000000,1,,10|N,000000,2,,10" />

Should be changed to:

<CodeWithHighlights code="https://**quickchart.io**/chart?cht=bvg&chs=300x200&chd=t:5,5,5|10,10,10|15,15,15&chco=4d89f9,c6d9fd,00B88A&chds=0,20&chbh=a&chxs=0,000000,0,0,_&chxt=y&chm=N,000000,0,,10|N,000000,1,,10|N,000000,2,,10" />

<Image noLazyLoad caption="QuickChart equivalent" src="https://quickchart.io/chart?cht=bvg&chs=300x200&chd=t:5,5,5|10,10,10|15,15,15&chco=4d89f9,c6d9fd,00B88A&chds=0,20&chbh=a&chxs=0,000000,0,0,_&chxt=y&chm=N,000000,0,,10|N,000000,1,,10|N,000000,2,,10" />

## Supported Parameters

The most common Google Image Charts parameters are supported. The implementation of each parameter matches the [Google Image Charts](https://developers.google.com/chart/image/docs/chart_params) implementation as closely as possible.

|                                          Parameter                                           |   Description and Syntax    |         Chart Types         |
| :------------------------------------------------------------------------------------------: | :-------------------------: | :-------------------------: |
|         [cht](/documentation/integrations/google-image-charts/parameters/#cht-param)         |         Chart type          | **Required** for all charts |
|         [chd](/documentation/integrations/google-image-charts/parameters/#chd-param)         |      Chart data string      | **Required** for all charts |
|         [chs](/documentation/integrations/google-image-charts/parameters/#chs-param)         |         Chart size          |         All charts          |
| [chdl, chdlp, chdls](/documentation/integrations/google-image-charts/parameters/#chdl-param) | Chart legend text and style |         All charts          |
|         [chf](/documentation/integrations/google-image-charts/parameters/#chf-param)         |         Chart fill          |         All charts          |
|        [chco](/documentation/integrations/google-image-charts/parameters/#chco-param)        |        Series color         |         All charts          |
|         [chg](/documentation/integrations/google-image-charts/parameters/#chg-param)         |      Chart grid lines       |          Bar, Line          |
|         [chl](/documentation/integrations/google-image-charts/parameters/#chl-param)         |         Data labels         |       Bar, Line, Pie        |
|         [chm](/documentation/integrations/google-image-charts/parameters/#chm-param)         | Text and Data Value Markers |          Bar, Line          |
|        [chxt](/documentation/integrations/google-image-charts/parameters/#chxt-param)        |        Visible axes         |          Bar, Line          |
|     [chtt, chts](/documentation/integrations/google-image-charts/parameters/#chtt-param)     |    Chart title and style    |         All charts          |
|        [chxr](/documentation/integrations/google-image-charts/parameters/#chxr-param)        |         Axis ranges         |          Bar, Line          |
|        [chxl](/documentation/integrations/google-image-charts/parameters/#chxl-param)        |         Axis labels         |          Bar, Line          |
|        [chxs](/documentation/integrations/google-image-charts/parameters/#chxs-param)        |      Axis label styles      |          Bar, Line          |

<Admonition type="tip">
Missing a parameter, or need more customization options? Don't get locked into a proprietary format. See the [main documentation](/documentation/) to use the more powerful open-source Chart.js format.
</Admonition>

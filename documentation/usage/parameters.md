---
title: API parameters
sidebar_position: 1
---

import Admonition from '@theme/Admonition';
import CodeWithHighlights from '@site/documentation/components/CodeWithHighlights';
import Image from '@site/documentation/components/Image';

The chart endpoint `https://quickchart.io/chart` accepts query parameters listed below.

Combine these parameters in your query string. For example:

<CodeWithHighlights
  wrap
  code="https://quickchart.io/chart?**width**=500&**height**=300&**chart**={...}"
/>

If you prefer not to construct the URL yourself, [client libraries](/documentation/usage/client-libraries/) are available in many programming languages.

## Supported parameters

### chart

- Type: Javascript or JSON object
- Required: yes
- Parameter name: `chart` or `c`

Chart.js configuration object to render. This is the definition of the chart in Javascript or JSON format.

If you are sending a `GET` request, we recommend that you [URL-encode](https://www.urlencoder.io/) your chart configuration. If not
encoded, you will run into problems with special characters or syntax errors in your program. You
may also use base64 encoding (see [encoding](#encoding)).

### width

- Type: integer
- Default: 500
- Parameter name: `width` or `w`

Width of the image in pixels.

### height

- Type: integer
- Default: 300
- Parameter name: `height` or `h`

Height of the image in pixels.

### devicePixelRatio

- Type: integer
- Accepted values: `1` or `2`
- Default: `2`

Device pixel ratio of the output. Image width and height are multiplied by this value. Defaults to `2.0` to ensure best image support on Retina devices.

<Admonition type="info">
  This setting defaults to 2, meaning all images will be 2x width and height! To get an image that
  is exactly width\*height, set `devicePixelRatio` to 1.
</Admonition>

### backgroundColor

- Type: string
- Accepted values: rgb, hex, hsl, color names
- Default: `transparent`
- Parameter name: `backgroundColor` or `bkg`

Background of the chart canvas. Accepts rgb format (rgb(255,255,120)), colors (red), and URL-encoded hex values (%23ff00ff).

### version

- Type: string
- Accepted values: `2`, `3`, or any valid Chart.js version string
- Default: `2.9.4`
- Parameter name: `version` or `v`

Chart.js version. Setting version to `3` enables latest stable [Chart.js v3](https://www.chartjs.org/docs/latest/configuration/) support. Defaults to latest version of [Chart.js v2](https://www.chartjs.org/docs/2.9.4/charts/line.html).

### format

- Type: string
- Accepted values: `png`, `webp`, `svg`, `pdf`
- Default: `png`
- Parameter name: `format` or `f`

Format of your output.

### encoding

- Type: string
- Accepted values: `url` or `base64`
- Default: `url`

Encoding of your `chart` parameter.

## Postman examples

We've put together a public Postman collection for the QuickChart API. View it here:

<a style={{ verticalAlign: '-webkit-baseline-middle', marginLeft: '0.25em' }}
href="https://www.postman.com/speeding-flare-926667/workspace/7385c90d-e985-49fe-8257-90bab6c7823e/request/11849833-67d60b0c-988e-4b1d-baa7-7a95da2aa479"> <img loading="lazy" src="https://run.pstmn.io/button.svg" /> </a>

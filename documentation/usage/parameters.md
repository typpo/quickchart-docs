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

Width of the image in pixels, before applying `devicePixelRatio`. The maximum is 3000.

### height

- Type: integer
- Default: 300
- Parameter name: `height` or `h`

Height of the image in pixels, before applying `devicePixelRatio`. The maximum is 3000.

### devicePixelRatio

- Type: number
- Accepted values: greater than `0`, up to `2`
- Default: `2`

Device pixel ratio of the output. Image width and height are multiplied by this value. Defaults to `2.0` to ensure best image support on Retina devices. Fractional values such as `1.5` are supported. Values above `2` are capped at `2`.

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
- Accepted values: `2`, `3`, or `4`
- Default: `2`
- Parameter name: `version` or `v`

Chart.js major version. Set `version=4` to use [Chart.js v4](https://www.chartjs.org/docs/latest/configuration/). The default is Chart.js v2.9.4. A full version string such as `4.0.1` selects the major version; it does not pin a particular minor or patch release.

See [Chart.js versions](/documentation/usage/chartjs-versions/) for examples and differences between versions.

### format

- Type: string
- Accepted values: `png`, `webp`, `jpg`, `jpeg`, `svg`, `pdf`, `base64`
- Default: `png`
- Parameter name: `format` or `f`

Format of your output. `jpg` and `jpeg` are equivalent. `base64` returns a base64-encoded PNG as plain text, without a `data:image/png;base64,` prefix.

Set `format` explicitly if your application needs a particular file type. When it is omitted, requests that accept WebP may receive WebP instead of PNG.

### encoding

- Type: string
- Accepted values: `url` or `base64`
- Default: `url`

Encoding of your `chart` parameter. This controls the input, while `format=base64` controls the output. For a JSON POST body, send `chart` as an object or an unencoded Javascript string.

### key

- Type: string
- Required: no

Your QuickChart API key. See [authentication](/documentation/authentication/) for API keys and signed URLs.

## Request limits

For free requests, chart configurations sent as strings are limited to 200,000 characters. The `data.labels` array is limited to 250 entries for free requests and 1,500 for authenticated requests. [Contact us](mailto:support@quickchart.io) if you need higher limits.

For long configurations, use a [POST request](/documentation/usage/post-endpoint/) to avoid URL length limits.

## Postman examples

We've put together a public Postman collection for the QuickChart API. View it here:

<a style={{ verticalAlign: '-webkit-baseline-middle', marginLeft: '0.25em' }}
href="https://www.postman.com/speeding-flare-926667/workspace/7385c90d-e985-49fe-8257-90bab6c7823e/request/11849833-67d60b0c-988e-4b1d-baa7-7a95da2aa479"> <img loading="lazy" src="https://run.pstmn.io/button.svg" /> </a>

---
slug: /watermark-api/
title: Watermark API
sidebar_label: Watermarks
tags: ['watermark']
---

# Using the QuickChart Watermark API

import Author from '@site/documentation/components/Author';
import Image from '@site/documentation/components/Image';
import CodeWithHighlights from '@site/documentation/components/CodeWithHighlights';

QuickChart provides an API that lets you overlay one image on top of another, creating a watermark or logo on top of an original image.

The API is flexible and allows you to customize the size, position, opacity, and margin of the watermark.

## Getting started

The watermark API endpoint is available at `https://quickchart.io/watermark`. It works by taking URLs for two images. There are a number of optional parameters that you can use to customize the images are overlayed.

Here's a simple example that uses `mainImageUrl`, `markImageUrl`, and `markRatio` parameters:

<CodeWithHighlights>
`https://quickchart.io/watermark`
&nbsp;  ?**mainImageUrl**=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F6%2F6e%2FGolde33443.jpg
&nbsp;  &**markImageUrl**=https%3A%2F%2F1000logos.net%2Fwp-content%2Fuploads%2F2016%2F10%2FBatman-logo.png
&nbsp;  &**markRatio**=0.25
</CodeWithHighlights>

The above URL instructs the API to overlay `markImageUrl` on top of `mainImageUrl`. `markRatio` ensures that the logo/watermark is resized to fit nicely in the image (taking up 25% of the width).

If you put the URL in an image tag, you'll see the following:

<Image caption="We've added a batman logo to this puppy's portrait" src="https://quickchart.io/watermark?mainImageUrl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F6%2F6e%2FGolde33443.jpg&markImageUrl=https%3A%2F%2F1000logos.net%2Fwp-content%2Fuploads%2F2016%2F10%2FBatman-logo.png&markRatio=0.25&imageWidth=300"/>

## API options

| Parameter    | Description                                                                                                                          | Default                    |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------------ | -------------------------- |
| mainImageUrl | URL of original image. **Required**                                                                                                  |                            |
| markImageUrl | URL of image to overlay atop main image. **Required**                                                                                |                            |
| opacity      | Alpha of mark. 0.0-1.0                                                                                                               | 1.0                        |
| imageWidth   | Width of final image, in pixels                                                                                                      | Original image width       |
| imageHeight  | Height of final image, in pixels                                                                                                     | Original image height      |
| markWidth    | Width of mark, in pixels                                                                                                             | Original mark width        |
| markHeight   | Height of mark, in pixels                                                                                                            | Original mark height       |
| markRatio    | Resize the mark to be some ratio of the original image. 0.0-1.0                                                                      |                            |
| position     | Preset positions. One of:<br/>`topMiddle, bottomMiddle, topLeft, middleLeft, bottomLeft, topRight, middleRight, bottomRight, center` | bottomRight                |
| positionX    | X position of mark, in pixels                                                                                                        |                            |
| positionY    | Y position of mark, in pixels                                                                                                        |                            |
| margin       | Margin in pixels around the mark when it is auto-positioned.<br/>Applicable when `positionX` and `positionY` are not used            | 5% of original image width |

## POST endpoint

The above parameters can be used in a POST request. Here is an example JSON body:

```json
{
  "mainImageUrl": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg",
  "markImageUrl": "https://1000logos.net/wp-content/uploads/2016/10/Batman-logo.png",
  "markRatio": 0.25
}
```

You can pack it into a POST request like so:

```bash
curl -X POST -H "Content-Type: application/json" -d '{
  "mainImageUrl": "https://upload.wikimedia.org/wikipedia/commons/6/6e/Golde33443.jpg",
  "markImageUrl": "https://1000logos.net/wp-content/uploads/2016/10/Batman-logo.png",
  "markRatio": 0.25
}' https://quickchart.io/watermark
```

The response will be a watermarked image.

## More examples

Let's take the above image and do some common customizations.

First, let's suppose move the logo to the bottom left by adding `&position=bottomLeft` to the URL:

<Image src="https://quickchart.io/watermark?mainImageUrl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F6%2F6e%2FGolde33443.jpg&markImageUrl=https%3A%2F%2F1000logos.net%2Fwp-content%2Fuploads%2F2016%2F10%2FBatman-logo.png&markRatio=0.25&position=bottomLeft&imageWidth=300"/>

Let's turn it into a watermark by fading the logo, setting `opacity=0.2`. And make it larger by setting `markRatio=0.5`.

<Image src="https://quickchart.io/watermark?mainImageUrl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F6%2F6e%2FGolde33443.jpg&markImageUrl=https%3A%2F%2F1000logos.net%2Fwp-content%2Fuploads%2F2016%2F10%2FBatman-logo.png&markRatio=0.5&position=bottomLeft&opacity=0.2&imageWidth=300"/>

## Watermarking a chart

The URLs can also be used with the [chart API](/documentation/) in order to put a logo on a chart. The chart API allows you to create charts by constructing a URL. Take a simple chart image:

<Image maxWidth={500} src="https://quickchart.io/chart?c=%7B%0A%20%20type%3A%20%27bar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Q1%27%2C%20%27Q2%27%2C%20%27Q3%27%2C%20%27Q4%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20label%3A%20%27Users%27%2C%0A%20%20%20%20%20%20data%3A%20%5B50%2C%2060%2C%2070%2C%20180%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%0A%7D"/>

Construct a watermark API request that contains the chart image URL and the logo image URL (make sure you URL-encode both URLs):

<CodeWithHighlights>
`https://quickchart.io/watermark`
&nbsp;  ?<strong>mainImageUrl</strong>=<em>&lt;QuickChart Chart Image URL&gt;</em>
&nbsp;  &<strong>markImageUrl</strong>=<em>&lt;Logo Image URL&gt;</em>
&nbsp;  &<strong>markRatio</strong>=0.5
&nbsp;  &<strong>position</strong>=center
</CodeWithHighlights>

This produces a composite image:

<Image maxWidth={500} src="https://quickchart.io/watermark?mainImageUrl=https%3A%2F%2Fquickchart.io%2Fchart%3Fc%3D%257B%250A%2520%2520type%253A%2520%2527bar%2527%252C%250A%2520%2520data%253A%2520%257B%250A%2520%2520%2520%2520labels%253A%2520%255B%2527Q1%2527%252C%2520%2527Q2%2527%252C%2520%2527Q3%2527%252C%2520%2527Q4%2527%255D%252C%250A%2520%2520%2520%2520datasets%253A%2520%255B%257B%250A%2520%2520%2520%2520%2520%2520label%253A%2520%2527Users%2527%252C%250A%2520%2520%2520%2520%2520%2520data%253A%2520%255B50%252C%252060%252C%252070%252C%2520180%255D%250A%2520%2520%2520%2520%257D%255D%250A%2520%2520%257D%250A%257D&markImageUrl=https%3A%2F%2F1000logos.net%2Fwp-content%2Fuploads%2F2016%2F10%2FBatman-logo.png&markRatio=0.5&position=center&opacity=0.2&margin=0&imageWidth=500"/>

:::info
Image size is limited to 1 MB for Community (free) requests, 10 MB for [paid requests](https://quickchart.io/pricing/).
:::

## Conclusion

This API makes it easy to superimpose an image atop another in order to add a logo to an image or create a watermark. It works with any images and offers flexible options to customize your mark's appearance and position.

Stuck? Have questions? Feature request? Please [reach out](https://community.quickchart.io/)!

<Author />

---
title: Caching images
sidebar_position: 5
---

QuickChart caches successful GET requests so that repeated requests for the same image load quickly. Chart, QR, barcode, word cloud, GraphViz, table, watermark, and Google Image Charts URLs may be cached for up to a week.

## Updating an image

Changing the URL creates a separate cache entry. For example, changing the `chart` or `text` parameter generates a different image. For [chart templates](/documentation/usage/short-urls-and-templates/), changing `data1`, `labels`, or other template parameters also changes the URL.

If the request stays the same but a linked image has changed, use a new URL for that image or add a query parameter such as `cacheVersion=2` to the QuickChart URL. Avoid adding a random value to every request unless you need a fresh render every time.

POST render requests are not cached in the same way as GET image URLs. You can save the returned image in your own application when you need to reuse it.

## Charts with external data

Charts that load data from Google Sheets or Airtable may need to update more often. QuickChart returns `X-Recommend-Ttl-Sec: 30` for these charts. If you cache the images yourself, use that shorter lifetime.

Email clients and other services may keep their own copies of an image. Updating the data does not guarantee that an image already displayed in an email will refresh.

## Cache lifetime and saved chart expiration

The image cache and a saved chart's expiration are separate. Caching an image does not keep its saved configuration alive. See [short URL expiration](/documentation/usage/short-urls-and-templates/#expiration) for how long a saved chart remains available.

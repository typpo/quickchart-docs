---
slug: /google-review-qr-codes/
title: How to Create Google Review QR Codes
sidebar_label: Google Review QR Codes
tags: ['qr codes']
---

import Author from '@site/documentation/components/Author';
import CodeWithHighlights from '@site/documentation/components/CodeWithHighlights';
import Admonition from '@theme/Admonition';

# Creating Google Review QR Codes

Generate QR codes that customers can scan to leave a Google review for your business. When scanned, these QR codes take customers directly to your Google review page, making it easier to collect valuable feedback.

## Step-by-step guide

### 1. Get your Place ID

First, you'll need your Google Place ID:

1. Visit the [Google Place ID Finder](https://developers.google.com/maps/documentation/javascript/examples/places-placeid-finder)
2. Enter your business name in the search box
3. Click on your business in the results
4. Copy the Place ID that appears in the info window

<Admonition type="tip">
  The Place ID is a unique identifier that Google uses to identify your business location. It looks something like "ChIJN1t_tDeuEmsRUsoyG83frY4".
</Admonition>

### 2. Create your review URL

Once you have your Place ID, create your review URL using this format:

<CodeWithHighlights wrap code="https://search.google.com/local/writereview?**placeid=YOUR_PLACE_ID**" />

Replace `YOUR_PLACE_ID` with the Place ID you copied in step 1.

### 3. Generate the QR code

Use the QuickChart API to generate your QR code. Here's an example:

<CodeWithHighlights wrap code="https://quickchart.io/qr?**text=**https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID" />

If you enter this URL into your browser, you'll see a QR code like this:

<img loading="lazy" src="https://quickchart.io/qr?text=https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID" />

<Admonition type="tip">
  Use our [interactive QR code builder](https://quickchart.io/qr-code-api/) to customize your QR code's appearance and preview it before downloading.
</Admonition>

### Customization options

You can customize your Google Review QR code using any of the [standard QR code parameters](/documentation/qr-codes/#qr-code-parameters). For example:

- Add your business logo in the center using `centerImageUrl`
- Customize colors using `dark` and `light` parameters
- Add a caption like "Scan to Review Us!" using the `caption` parameter

Here's an example with custom styling:

<CodeWithHighlights wrap code="https://quickchart.io/qr?**text=**https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID&**dark=**4285f4&**caption=**Scan to Review Us!&**captionFontSize=**15" />

<img loading="lazy" src="https://quickchart.io/qr?text=https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID&dark=4285f4&caption=Scan to Review Us!&captionFontSize=15" />

## Best practices

1. **Test your QR code** - Always scan your QR code with different devices to ensure it works correctly.
2. **Add context** - Include a call-to-action or instructions near the QR code to encourage customers to scan it.
3. **Strategic placement** - Place QR codes in visible locations where customers are likely to see them:
   - Reception areas
   - Point of sale
   - Business cards
   - Email signatures
   - Receipts
   - Thank you cards

## Need help?

For questions about generating Google Review QR codes, visit our [community forum](https://community.quickchart.io/).

To learn more about QR code customization options, check out the [QR code API documentation](/documentation/qr-codes/).

<Author />

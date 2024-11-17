---
slug: /sms-qr-codes/
title: How to Create SMS QR Codes
sidebar_label: SMS QR Codes
tags: ['qr codes']
---

import Author from '@site/documentation/components/Author';
import CodeWithHighlights from '@site/documentation/components/CodeWithHighlights';
import Admonition from '@theme/Admonition';

# Creating SMS QR Codes

Generate QR codes that, when scanned, open the user's SMS app with a pre-filled message. This is useful for businesses that want to make it easier to send SMS.

## SMS QR Code Format

There are two main formats for SMS QR codes, depending on your needs and the target devices:

### Modern iOS/Android Format

For the most reliable compatibility with modern devices, use the `smsto` format:

<CodeWithHighlights wrap code="smsto:**phone_number**:**message**" />

For example:

<CodeWithHighlights wrap code="https://quickchart.io/qr?**text=**smsto:+15555555555:Hello%20there!" />

<img loading="lazy" src="https://quickchart.io/qr?text=smsto:+15555555555:Hello%20there!" />

There is variation bewteen mobile devices, so always test your QR codes on different devices to ensure compatibility.

You can also use our [QR code builder](https://quickchart.io/qr-code-api/) to generate SMS QR codes instead of editing the URL directly.

## Creating SMS QR Codes in Spreadsheets

You can generate SMS QR codes in bulk using spreadsheets. Here's an example formula that creates a QR code URL:

```
="https://quickchart.io/qr?text=" & ENCODEURL("smsto:" & A2 & ":" & B2)
```

Where:

- Column A contains phone numbers
- Column B contains the message text

For more details on using spreadsheets, see our guide on [generating QR codes in Excel and Google Sheets](/documentation/generate-qr-codes-excel-google-sheets/).

## Customization Options

You can customize your SMS QR codes using any of the [standard QR code parameters](/documentation/qr-codes/#qr-code-parameters). Here's an example with custom styling:

<CodeWithHighlights wrap code="https://quickchart.io/qr?**text=**smsto:+15555555555:Hello&**dark=**4285f4&**caption=**Scan to Text Us&**captionFontSize=**15" />

<img loading="lazy" src="https://quickchart.io/qr?text=smsto:+15555555555:Hello&dark=4285f4&caption=Scan to Text Us&captionFontSize=15" />

## Tips

1. **Include the country code** - Always include the country code in the phone number for international compatibility (e.g., +1 for US numbers). Phone numbers should be in international format without spaces or special characters (except for the + prefix). For example: +15555555555
2. **URL encode special characters** - Make sure to [URL encode](https://www.urlencoder.io) any special characters in your message
3. **Keep messages concise** - Shorter messages are more reliable and create simpler QR codes
4. **Test thoroughly** - Test your QR codes on both iOS and Android devices

## Need help?

For questions about generating SMS QR codes, visit our [community forum](https://community.quickchart.io/).

To learn more about QR code customization options, check out the [QR code API documentation](/documentation/qr-codes/).

<Author />

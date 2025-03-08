---
title: How to Create WiFi QR Codes
sidebar_label: WiFi QR Codes
tags: ['qr codes']
---

import Author from '@site/documentation/components/Author';
import CodeWithHighlights from '@site/documentation/components/CodeWithHighlights';
import Admonition from '@theme/Admonition';

# Creating WiFi QR Codes

Generate QR codes that, when scanned, automatically connect users to your WiFi network without having to manually enter the network name and password. This is useful for businesses, events, and homes to provide easy WiFi access to guests.

## WiFi QR Code Format

WiFi QR codes follow a specific format that includes the network type, name (SSID), and password:

<CodeWithHighlights wrap code="WIFI:T:**network_type**;S:**network_name**;P:**password**;H:**hidden**;;" />

Where:

- **T**: Network type (WPA, WEP, or nopass for open networks. WPA is most common.)
- **S**: Network name (SSID)
- **P**: Password
- **H**: Whether the network is hidden (true or false)

For example:

<CodeWithHighlights wrap code="https://quickchart.io/qr?**text=**WIFI:T:WPA;S:MyHomeNetwork;P:MySecurePassword123;H:false;;" />

<img loading="lazy" src="https://quickchart.io/qr?text=WIFI:T:WPA;S:MyHomeNetwork;P:MySecurePassword123;H:false;;" />

You can also use our [QR code builder](https://quickchart.io/qr-code-api/) to generate WiFi QR codes instead of editing the URL directly.

## Creating WiFi QR Codes in Spreadsheets

You can generate WiFi QR codes in bulk using spreadsheets. Here's an example formula that creates a QR code URL:

```
="https://quickchart.io/qr?text=" & ENCODEURL("WIFI:T:" & A2 & ";S:" & B2 & ";P:" & C2 & ";H:" & D2 & ";;")
```

Where:

- Column A contains the network type (WPA, WEP, or nopass)
- Column B contains the network name (SSID)
- Column C contains the password
- Column D contains whether the network is hidden (true or false)

For more details on using spreadsheets, see our guide on [generating QR codes in Excel and Google Sheets](/documentation/generate-qr-codes-excel-google-sheets/).

## Customization Options

You can customize your WiFi QR codes using any of the [standard QR code parameters](/documentation/qr-codes/#qr-code-parameters). Here's an example with custom styling:

<CodeWithHighlights wrap code="https://quickchart.io/qr?**text=**WIFI:T:WPA;S:GuestNetwork;P:Welcome2023;H:false;;&**dark=**4285f4&**caption=**Scan to Connect&**captionFontSize=**15" />

<img loading="lazy" src="https://quickchart.io/qr?text=WIFI:T:WPA;S:GuestNetwork;P:Welcome2023;H:false;;&dark=4285f4&caption=Scan to Connect&captionFontSize=15" />

## Security Considerations

<Admonition type="caution">
  WiFi QR codes contain your network password in plain text. Be careful where and how you share these QR codes, as anyone who scans them will have access to your network.
</Admonition>

## Tips

1. **Escape special characters** - If your network name or password contains special characters like semicolons, colons, commas, or backslashes, they must be escaped with a backslash (e.g., `My\;Network`)
2. **URL encode the text** - Make sure to [URL encode](https://www.urlencoder.io) the entire WiFi string when using it in the QR code URL

## Examples for Different Network Types

### WPA/WPA2 Network (Most Common)

<CodeWithHighlights wrap code="https://quickchart.io/qr?**text=**WIFI:T:WPA;S:MyWPANetwork;P:SecurePassword123;H:false;;" />

### WEP Network (Legacy)

<CodeWithHighlights wrap code="https://quickchart.io/qr?**text=**WIFI:T:WEP;S:MyWEPNetwork;P:OlderPassword123;H:false;;" />

### Open Network (No Password)

<CodeWithHighlights wrap code="https://quickchart.io/qr?**text=**WIFI:T:nopass;S:PublicWiFi;H:false;;" />

## Need help?

For questions about generating WiFi QR codes, visit our [community forum](https://community.quickchart.io/).

To learn more about QR code customization options, check out the [QR code API documentation](/documentation/qr-codes/).

<Author />

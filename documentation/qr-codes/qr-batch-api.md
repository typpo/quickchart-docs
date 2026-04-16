---
sidebar_label: QR Code Batch API
tags: ['qr codes', 'bulk qr', 'batch qr']
---

# QR Code Batch API

import CodeWithHighlights from '@site/documentation/components/CodeWithHighlights';
import Admonition from '@theme/Admonition';

The QR code batch API lets you render many QR codes in a single request and receive a ZIP archive of the generated images. This is useful when you need to produce QR codes in bulk without fanning out into hundreds of individual HTTP calls.

## API Endpoint

<CodeWithHighlights wrap code="POST **https://quickchart.io/qr/batch**" />

The endpoint accepts `application/json` and returns `application/zip`.

## Request Body

The request body must be either a JSON array of QR configs, or an object with a `qrCodes` array:

```json
[
  { "text": "https://example.com/1" },
  { "text": "https://example.com/2" }
]
```

Or equivalently:

```json
{
  "qrCodes": [
    { "text": "https://example.com/1" },
    { "text": "https://example.com/2" }
  ],
  "zipFilename": "my-codes.zip"
}
```

Each entry in the array uses the same options as the [single QR endpoint](/documentation/qr-codes/#qr-code-parameters). In addition, the following batch-specific fields are supported:

|    Field     |                               Description                                | Required? |   Default    |
| :----------: | :----------------------------------------------------------------------: | :-------: | :----------: |
|   `text`     |               Content of the QR code (URL or any string)                |    Yes    |              |
|  `filename`  |  File name for this entry inside the ZIP (extension added automatically) |           | `qr-N.<ext>` |
|   `format`   |                      Image format: `png`, `svg`, or `jpg`               |           |    `png`     |
|    `size`    |                   Width and height of the image in pixels               |           |    `150`     |
|   `margin`   |                        Whitespace around the QR image                   |           |     `4`      |
|    `dark`    |                 Hex color for "dark" QR cells (e.g. `000`)              |           |   `000000`   |
|   `light`    |                Hex color for "light" QR cells (e.g. `fff`)              |           |   `ffffff`   |
|  `ecLevel`   |                     Error correction level (`L`, `M`, `Q`, `H`)         |           |     `M`      |

Any other option supported by the single QR endpoint — including `centerImageUrl`, `centerImageSizeRatio`, `centerImageWidth`, `centerImageHeight`, `caption`, `captionFontFamily`, `captionFontSize`, and `captionFontColor` — may also be set per entry.

The top-level request body additionally accepts:

|      Field     |                   Description                   |   Default       |
| :------------: | :---------------------------------------------: | :-------------: |
| `zipFilename`  |  File name of the returned ZIP archive          | `qr-codes.zip`  |

<Admonition type="note">
  `format=base64` is not supported for batch generation. Use `png`, `svg`, or `jpg`.
</Admonition>

## Response

On success, the endpoint returns an HTTP 200 with `Content-Type: application/zip`. The ZIP contains one file per QR config, named according to each entry's `filename` (or `qr-1.png`, `qr-2.png`, … if no filename is provided). Duplicate file names are automatically disambiguated with a numeric suffix.

## Example

```bash
curl -X POST https://quickchart.io/qr/batch \
  -H "Content-Type: application/json" \
  -o qr-codes.zip \
  -d '[
    { "text": "https://example.com/1", "filename": "first-code", "size": 300 },
    { "text": "https://example.com/2", "filename": "second-code", "dark": "f00", "light": "0ff" },
    { "text": "wifi-password", "format": "svg", "ecLevel": "H" }
  ]'
```

The resulting `qr-codes.zip` will contain `first-code.png`, `second-code.png`, and `qr-3.svg`.

## Limits

- A single batch request is limited to **1000 QR codes**.
- A single batch request is limited to **450,000,000 total output pixels** (equivalent to 50 full-size 3000×3000 QR codes). The sum of `size * size` across all entries must stay under this cap.
- The maximum `size` of any single QR code is 3000 pixels.
- The request timeout for batch requests is 5 minutes.

## Error Responses

Errors are returned as HTTP 400 (or 403 for invalid signatures) with a JSON body:

```json
{
  "success": false,
  "error": "qrCodes[0]: Error: You are missing variable `text`"
}
```

Errors reference the zero-based index of the first problematic entry, so you can identify which config caused the failure.

## Authentication

Authenticated requests use the same mechanisms as the single QR endpoint. API keys, signatures, and `accountId` may be provided either at the request level (via header/query) or per-entry. Each rendered QR code counts as one render against your account's usage.

## Web-based Bulk Generator

If you don't need a programmatic workflow, you can also use the web-based [bulk QR code generator](https://quickchart.io/bulk-qr-code-generator/).

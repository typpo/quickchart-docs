---
sidebar_label: QR Code Reader
tags: ['qr codes', 'qr scanner', 'qr reader']
---

# QR Code Reader API

import Author from '@site/documentation/components/Author';
import CodeWithHighlights from '@site/documentation/components/CodeWithHighlights';
import Admonition from '@theme/Admonition';

QuickChart provides a QR code scanner/reader API that can extract text and data from QR code images. Simply send an image URL or base64-encoded image data to the API endpoint and receive the decoded QR code contents.

## API Endpoint

The QR code reader is available at:

<CodeWithHighlights wrap code="https://quickchart.io/qr-read" />

The endpoint supports both GET and POST requests.

## Using GET Request

To scan a QR code from an image URL using GET:

<CodeWithHighlights wrap code="https://quickchart.io/qr-read?**url=**https://upload.wikimedia.org/wikipedia/commons/0/0b/QR_code_Wikimedia_Commons_%28URL%29.png" />

The `url` parameter should be [URL-encoded](https://en.wikipedia.org/wiki/Percent-encoding).

Example response:

```json
{
  "result": "http://commons.wikimedia.org/wiki/Main_Page"
}
```

## Using POST Request

The POST endpoint accepts either an image URL or base64-encoded image data. Send a JSON body with `Content-Type: application/json`. If both `url` and `image` are provided, `url` takes precedence.

### POST with URL

```json
{
  "url": "https://upload.wikimedia.org/wikipedia/commons/0/0b/QR_code_Wikimedia_Commons_%28URL%29.png"
}
```

### POST with Base64 Image

Send the raw base64 string, without a `data:image/png;base64,` prefix. For example, this Python code creates a QR image and reads it back:

```python
import base64
import requests

image = requests.get('https://quickchart.io/qr', params={
    'text': 'Hello World!',
    'size': 300,
    'format': 'png',
})
image.raise_for_status()

response = requests.post('https://quickchart.io/qr-read', json={
    'image': base64.b64encode(image.content).decode('ascii'),
})
response.raise_for_status()
print(response.json())
```

Example response:

```json
{
  "result": "Hello World!"
}
```

## Error Responses

Missing input returns HTTP 400. Fetch and decoding failures return HTTP 500, with an `error` string explaining what went wrong:

| Error | Meaning |
| --- | --- |
| `Could not fetch the image at that URL: ...` | The URL could not be fetched. Check that it returns an image and is publicly accessible. |
| `Could not decode that image. Supported formats are PNG, JPEG, BMP, TIFF, and GIF.` | The downloaded or base64-decoded data is not a supported image. |
| `No QR code was found in that image.` | The image was loaded, but the reader could not find a readable QR code. |

These failures use HTTP 500 for compatibility with existing clients. Check the message before retrying; sending the same unreadable image again will not help. Requests may also receive [HTTP 429](/documentation/usage/handling-errors/#429-too-many-requests) when rate limited.

Example error response:

```json
{
  "error": "Please provide either a URL or base64 encoded image"
}
```

## Limitations

- Maximum image download size: 10 MB
- Image URL fetch timeout: 10 seconds
- Supported image formats: PNG, JPEG, BMP, TIFF, GIF
- URL must be publicly accessible

<Admonition type="tip">
  For best results, ensure your QR code image is clear and well-lit. The API works best with high-contrast images where the QR code is clearly visible.
</Admonition>

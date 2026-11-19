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

If your client previously handled HTTP 500 for image fetch or decoding failures, update it to handle HTTP 422 for those cases. GET and POST use the same status codes.

| HTTP status | What happened | What to do |
| --- | --- | --- |
| 400 Bad Request | An input is missing or malformed, such as an invalid URL or base64 string. | For GET, supply a public HTTP or HTTPS image URL. For POST, supply a URL or raw base64 image data without a data URI prefix. |
| 422 Unprocessable Content | QuickChart could not fetch the image, decode its bytes, or find a readable QR code. | Check that the URL serves an image. If the image host was temporarily unavailable, retry once it recovers. For decoding errors, supply a supported image with a legible QR code. |
| 429 Too Many Requests | The request exceeded a rate limit. | Wait before retrying. See [rate limits](/documentation/usage/handling-errors/#429-too-many-requests). |
| 500 Internal Server Error | QuickChart encountered an unexpected server error. | Retry later. |

For example, a blank PNG returns HTTP 422 with this JSON body.

```json
{
  "error": "No QR code was found in that image."
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

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

The POST endpoint accepts either an image URL or base64-encoded image data.

### POST with URL

```json
{
  "url": "https://upload.wikimedia.org/wikipedia/commons/0/0b/QR_code_Wikimedia_Commons_%28URL%29.png"
}
```

### POST with Base64 Image

```json
{
  "image": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
}
```

Example response:

```json
{
  "result": "Hello World!"
}
```

## Error Responses

The API returns appropriate HTTP status codes and error messages:

- 400 Bad Request: Missing or invalid parameters
- 405 Method Not Allowed: Unsupported HTTP method
- 500 Internal Server Error: Failed to process the QR code

Example error response:

```json
{
  "error": "Please provide either a URL or base64 encoded image"
}
```

## Limitations

- Maximum image size: 10MB
- Request timeout: 10 seconds
- Supported image formats: PNG, JPEG, GIF
- URL must be publicly accessible

<Admonition type="tip">
  For best results, ensure your QR code image is clear and well-lit. The API works best with high-contrast images where the QR code is clearly visible.
</Admonition>

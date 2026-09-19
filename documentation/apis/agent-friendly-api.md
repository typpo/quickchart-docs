---
title: Agent-friendly API
sidebar_position: 1
---

# Agent-friendly API

QuickChart exposes machine-readable API metadata and validation endpoints for agents, automations, and other clients that need structured responses.

## Discovery files

- OpenAPI: [`https://quickchart.io/openapi.json`](https://quickchart.io/openapi.json)
- LLM summary: [`https://quickchart.io/llms.txt`](https://quickchart.io/llms.txt)
- Detailed agent notes: [`https://quickchart.io/llms-full.txt`](https://quickchart.io/llms-full.txt)

Use the OpenAPI file for parameters, response content types, limits, and auth details. A [YAML copy](https://quickchart.io/openapi.yaml) is also available.

The reference covers charts, QR generation and reading, barcodes, word clouds, GraphViz, table images, watermarking, and Google Image Charts compatibility. The [`/qr-url` and `/qr-urls` endpoints](/documentation/qr-codes/#building-qr-image-urls) return URLs when you do not need image bytes immediately.

## Validate a chart config

Use `POST /api/validate-chart` to check a chart request before rendering or retrying. The payload is the same shape as `POST /chart`, but the response is JSON.

```bash
curl -X POST https://quickchart.io/api/validate-chart \
  -H 'Content-Type: application/json' \
  -d '{
    "version": "4",
    "width": 700,
    "height": 360,
    "format": "png",
    "chart": {
      "type": "bar",
      "data": {
        "labels": ["Jan", "Feb", "Mar"],
        "datasets": [{ "label": "Revenue", "data": [120, 150, 180] }]
      }
    }
  }'
```

Validation renders the configuration and discards the image. It is subject to the same request limits as rendering. A successful response includes normalized request parameters and a render check (the byte count below is illustrative):

```json
{
  "success": true,
  "errors": [],
  "warnings": [],
  "normalized": {
    "width": 700,
    "height": 360,
    "devicePixelRatio": 2,
    "backgroundColor": "transparent",
    "version": "4",
    "format": "png",
    "encoding": "url",
    "chartType": "bar",
    "chartIsString": false,
    "authenticated": false
  },
  "renderCheck": {
    "contentType": "image/png",
    "bytes": 12345
  }
}
```

Invalid configurations return HTTP 400 with one or more error strings. Invalid signatures return HTTP 403, and rate-limited requests return HTTP 429. For example:

```json
{
  "success": false,
  "errors": ["Chart error: Invalid input"],
  "warnings": [],
  "normalized": {
    "width": 500,
    "height": 300,
    "format": "png"
  }
}
```

Check `warnings` even when `success` is `true`. For example, the validator warns when it detects v3 or v4 options in a request using the default Chart.js v2. It also warns when a chart uses external data that should only be cached briefly.

Validation does not return or save an image. Send the same body to `/chart` to get the output. For JPEG, WebP, and PDF, check the actual render response too: chart validation checks the underlying chart render, but does not perform the final file conversion.

## Validate a QR code config

Use `POST /api/validate-qr` to check a QR request before rendering. The payload is the same shape as `POST /qr`.

```bash
curl -X POST https://quickchart.io/api/validate-qr \
  -H 'Content-Type: application/json' \
  -d '{
    "text": "https://example.com",
    "format": "png",
    "size": 300,
    "margin": 4
  }'
```

On success, render the same body with `POST /qr`. QR validation rejects unsupported formats, even though the rendering endpoint falls back to PNG for unrecognized format names.

## Generate a chart config from text

Use `POST /natural/config` when you want a natural-language chart draft but need editable JSON instead of only an image.

```bash
curl -X POST https://quickchart.io/natural/config \
  -H 'Content-Type: application/json' \
  -d '{
    "description": "bar chart showing revenue Jan-Mar with values 120, 150, 180",
    "width": 700,
    "height": 360,
    "backgroundColor": "white"
  }'
```

The response includes:

- `chart`: generated Chart.js config as a string
- `chartUrl`: saved chart image URL
- `chartMakerUrl`: editor URL
- `warnings`: notes to show before production use

Validate generated configs with `/api/validate-chart` before embedding them in production workflows.


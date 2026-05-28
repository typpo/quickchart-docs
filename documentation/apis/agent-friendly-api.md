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

Use the OpenAPI file for parameters, response content types, limits, and auth details.

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

A successful response includes normalized request parameters and a render check:

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

If validation fails, the response is still JSON and includes one or more error strings:

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

On success, render the same body with `POST /qr`.

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


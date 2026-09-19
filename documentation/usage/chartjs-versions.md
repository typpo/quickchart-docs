---
title: Chart.js versions
sidebar_position: 3
---

QuickChart supports Chart.js v2, v3, and v4. The default is v2.9.4, so existing charts continue to use the same configuration format.

To use Chart.js v4, add `version=4` to your URL or `"version": "4"` to your POST body. The version belongs next to `chart`, not inside it:

```bash
curl https://quickchart.io/chart \
  -H 'Content-Type: application/json' \
  -d '{
    "version": "4",
    "format": "png",
    "chart": {
      "type": "bar",
      "data": {
        "labels": ["Q1", "Q2", "Q3", "Q4"],
        "datasets": [{ "label": "Users", "data": [50, 60, 70, 180] }]
      },
      "options": {
        "scales": { "y": { "beginAtZero": true } },
        "plugins": { "title": { "display": true, "text": "New users" } }
      }
    }
  }' \
  -o chart.png
```

Use `version=3` for Chart.js v3. Only the major version is selected: sending `version=4.0.1` has the same effect as `version=4`.

## Moving from v2 to v3 or v4

Changing the version does not convert your configuration. Some common fields inside `options` have moved:

| Chart.js v2 | Chart.js v3 and v4 |
| --- | --- |
| `scales.yAxes[0]` | `scales.y` |
| `scales.xAxes[0]` | `scales.x` |
| `scales.yAxes[0].ticks.beginAtZero` | `scales.y.beginAtZero` |
| `scales.yAxes[0].ticks.min` and `max` | `scales.y.min` and `max` |
| `legend` | `plugins.legend` |
| `title` | `plugins.title` |
| `tooltips` | `plugins.tooltip` |

For horizontal bar charts, replace `type: 'horizontalBar'` with `type: 'bar'` and set `options.indexAxis` to `'y'`. In line chart datasets, `lineTension` is now `tension`.

See the Chart.js [v3 migration guide](https://www.chartjs.org/docs/latest/migration/v3-migration.html) and [v4 migration guide](https://www.chartjs.org/docs/latest/migration/v4-migration.html) for the full list of changes.

## Plugins and chart types

Plugin availability depends on the Chart.js version. Financial, sankey, and funnel charts require v3 or v4. Some plugins, including `doughnutlabel` and `piechart-outlabels`, are available only with v2. See the [plugin list](/documentation/reference/chartjs-plugins/) before changing versions.

## Options being ignored?

If a title, legend, or axis setting has no effect, check that your configuration matches the version in your request. A v4 configuration sent without `version=4` will be rendered with v2, which may ignore those settings.

[`/api/validate-chart`](/documentation/apis/agent-friendly-api/#validate-a-chart-config) reports a warning when it recognizes v3 or v4 options in a v2 request. Check the `warnings` array even when `success` is `true`.

---
title: Table Image API
sidebar_label: Table Images
tags: ['tables', 'html']
---

# Using the QuickChart Table Image API

import CodeWithHighlights from '@site/documentation/components/CodeWithHighlights';
import Image from '@site/documentation/components/Image';

QuickChart provides an API that lets you render a table as a PNG. This format allows the table to be portable, making it easy to embed tables in Slack bots, no-code applications, and more.

## Getting started

The table API endpoint is available at `https://api.quickchart.io/v1/table`. It works by taking a `data` parameter that defines the columns and rows of the table. Here's an example `data` parameter:

```json
{
  "title": "My table",
  "columns": [
    {
      "title": "Column 1",
      "dataIndex": "col1"
    },
    {
      "title": "Column 2",
      "dataIndex": "col2"
    }
  ],
  "dataSource": [
    {
      "col1": "Foo",
      "col2": 12
    },
    {
      "col1": "Foo",
      "col2": 12
    }
  ]
}
```

Pack it into the URL, like so:

<CodeWithHighlights wrap code={`**https://api.quickchart.io/v1/table?data**={"title":"My table","columns":[{"title":"Column 1","dataIndex":"col1"},{"title":"Column 2","dataIndex":"col2"}],"dataSource":[{"col1":"Foo","col2":12},{"col1":"Foo","col2":12}]}`}/>

This creates the following image:

<Image src="https://api.quickchart.io/v1/table?data={%22title%22:%22My%20table%22,%22columns%22:[{%22title%22:%22Column%201%22,%22dataIndex%22:%22col1%22},{%22title%22:%22Column%202%22,%22dataIndex%22:%22col2%22}],%22dataSource%22:[{%22col1%22:%22Foo%22,%22col2%22:12},{%22col1%22:%22Foo%22,%22col2%22:12}]}"/>

Not bad for a basic table. Here's a more advanced configuration. We're setting the width and alignment of columns. Also, notice that using `-` in `dataSource` will create a line.

```json
{
  "title": "Marketing Summary",
  "columns": [
    {
      "width": 200,
      "title": "Campaign",
      "dataIndex": "campaign"
    },
    {
      "width": 100,
      "title": "Install",
      "dataIndex": "install",
      "align": "right"
    },
    {
      "width": 100,
      "title": "Cost",
      "dataIndex": "cost",
      "align": "right"
    }
  ],
  "dataSource": [
    "-",
    {
      "campaign": "Google CPC",
      "install": "12",
      "cost": "$ 400"
    },
    {
      "campaign": "Facebook CPC",
      "install": "3",
      "cost": "$ 60"
    },
    {
      "campaign": "Youtube Video",
      "install": "131",
      "cost": "$ 1,230"
    },
    "-",
    {
      "campaign": "Total",
      "install": "146",
      "cost": "$ 1,690"
    }
  ]
}
```

Once again, pack the above configuration into the URL:

<CodeWithHighlights wrap code={`**https://api.quickchart.io/v1/table?data**={"title":"Marketing Summary","columns":[{"width":200,"title":"Campaign","dataIndex":"campaign"},{"width":100,"title":"Install","dataIndex":"install","align":"right"},{"width":100,"title":"Cost","dataIndex":"cost","align":"right"}],"dataSource":["-",{"campaign":"Google CPC","install":"12","cost":"$ 400"},{"campaign":"Facebook CPC","install":"3","cost":"$ 60"},{"campaign":"Youtube Video","install":"131","cost":"$ 1,230"},"-",{"campaign":"Total","install":"146","cost":"$ 1,690"}]}`} />

This is the generated PNG image:

<Image src="https://api.quickchart.io/v1/table?data={%22title%22:%22Marketing%20Summary%22,%22columns%22:[{%22width%22:200,%22title%22:%22Campaign%22,%22dataIndex%22:%22campaign%22},{%22width%22:100,%22title%22:%22Install%22,%22dataIndex%22:%22install%22,%22align%22:%22right%22},{%22width%22:100,%22title%22:%22Cost%22,%22dataIndex%22:%22cost%22,%22align%22:%22right%22}],%22dataSource%22:[%22-%22,{%22campaign%22:%22Google%20CPC%22,%22install%22:%2212%22,%22cost%22:%22$%20400%22},{%22campaign%22:%22Facebook%20CPC%22,%22install%22:%223%22,%22cost%22:%22$%2060%22},{%22campaign%22:%22Youtube%20Video%22,%22install%22:%22131%22,%22cost%22:%22$%201,230%22},%22-%22,{%22campaign%22:%22Total%22,%22install%22:%22146%22,%22cost%22:%22$%201,690%22}]}"/>

## Customizing your table

The underlying renderer is the open-source [table-renderer](https://www.npmjs.com/package/table-renderer) project. We accept an `options` parameter with the following attributes:

| Parameter         | Type   | Description                                        | Default value |
| ----------------- | ------ | -------------------------------------------------- | ------------- |
| cellWidth         | number | Default width for a table cell                     | 100           |
| cellHeight        | number | Default height for a table cell                    | 40            |
| offsetLeft        | number | Default text offset from left border of table cell | 8             |
| offsetRight       | number | Default text offset from top border of table cell  | 26            |
| spacing           | number | Spacing between tables                             | 20            |
| titleSpacing      | number | Spacing between title and table                    | 10            |
| fontFamily        | string | Font to use                                        | sans-serif    |
| paddingVertical   | number | Vertical padding of image                          | 0             |
| paddingHorizontal | number | Horizontal padding of image                        | 0             |
| backgroundColor   | string | Background color                                   | #ffffff       |

Here's an example in which we use the `options` parameter to change the padding, background, and font of the table:

<CodeWithHighlights wrap code={`https://api.quickchart.io/v1/table?data={"title":"Marketing Summary","columns":[{"width":200,"title":"Campaign","dataIndex":"campaign"},{"width":100,"title":"Install","dataIndex":"install","align":"right"},{"width":100,"title":"Cost","dataIndex":"cost","align":"right"}],"dataSource":["-",{"campaign":"Google CPC","install":"12","cost":"$ 400"},{"campaign":"Facebook CPC","install":"3","cost":"$ 60"},{"campaign":"Youtube Video","install":"131","cost":"$ 1,230"},"-",{"campaign":"Total","install":"146","cost":"$ 1,690"}]}**&options={"paddingVertical":20,"paddingHorizontal":20,"backgroundColor":"%23eee","fontFamily":"mono"}**`} />

Note that we have [URL-encoded](https://urlencoder.io) special characters. It is best practice to URL encode the entirety of each query parameter. Nearly every programming language has built-in URL encoding capability.

This gives us the following image:

<Image src="https://api.quickchart.io/v1/table?data={%22title%22:%22Marketing%20Summary%22,%22columns%22:[{%22width%22:200,%22title%22:%22Campaign%22,%22dataIndex%22:%22campaign%22},{%22width%22:100,%22title%22:%22Install%22,%22dataIndex%22:%22install%22,%22align%22:%22right%22},{%22width%22:100,%22title%22:%22Cost%22,%22dataIndex%22:%22cost%22,%22align%22:%22right%22}],%22dataSource%22:[%22-%22,{%22campaign%22:%22Google%20CPC%22,%22install%22:%2212%22,%22cost%22:%22$%20400%22},{%22campaign%22:%22Facebook%20CPC%22,%22install%22:%223%22,%22cost%22:%22$%2060%22},{%22campaign%22:%22Youtube%20Video%22,%22install%22:%22131%22,%22cost%22:%22$%201,230%22},%22-%22,{%22campaign%22:%22Total%22,%22install%22:%22146%22,%22cost%22:%22$%201,690%22}]}&options={%22paddingVertical%22:20,%22paddingHorizontal%22:20,%22backgroundColor%22:%22%23eee%22,%22fontFamily%22:%22mono%22}"/>

## Using a POST request

All the examples so far are `GET` requests, but you can `POST` the `https://api.quickchart.io/v1/table` endpoint too. Here's an example payload with content-type `application/json`:

```json
{
  "data": {
    "title": "Marketing Summary",
    "columns": [
      {
        "width": 200,
        "title": "Campaign",
        "dataIndex": "campaign"
      },
      {
        "width": 100,
        "title": "Install",
        "dataIndex": "install",
        "align": "right"
      },
      {
        "width": 100,
        "title": "Cost",
        "dataIndex": "cost",
        "align": "right"
      }
    ],
    "dataSource": [
      "-",
      {
        "campaign": "Google CPC",
        "install": "12",
        "cost": "$ 400"
      },
      {
        "campaign": "Facebook CPC",
        "install": "3",
        "cost": "$ 60"
      },
      {
        "campaign": "Youtube Video",
        "install": "131",
        "cost": "$ 1,230"
      },
      "-",
      {
        "campaign": "Total",
        "install": "146",
        "cost": "$ 1,690"
      }
    ]
  },
  "options": {
    "paddingVertical": 20,
    "paddingHorizontal": 20,
    "backgroundColor": "#eee",
    "fontFamily": "mono"
  }
}
```

You can `curl` this directly:

```bash
curl -X POST -H 'content-type: application/json' -d @table.json -o table.png https://api.quickchart.io/v1/table
```

## Conclusion

This API makes it straightforward to include basic tables as static images. You can use the `options` to customize the look & feel of your table. Check out the [table-renderer](https://github.com/idw111/table-renderer/) open-source project for further details on building tables.

Stuck? Have questions? Feature request? Please [reach out](https://community.quickchart.io/)!

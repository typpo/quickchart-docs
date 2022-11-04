---
slug: /documentation/python-chart-example/
title: Python chart example (QuickChart)
tags: ['python']
---

# How to create a chart image with Python

import Image from '../components/Image';

QuickChart is an open-source web service that generates chart images. You can use it to generate charts in your Python application and export them as PNG.

This is especially useful if you already have a [Chart.js](https://www.chartjs.org/docs/2.9.4/) configuration object on the frontend, but you want to generate it on the backend (e.g. for an email).

To get started, first make sure that you understand [how to create a chart](/documentation/). QuickChart accepts Chart.js objects and renders them as PNG, and you can test your charts in the online [chart editor](https://quickchart.io/sandbox/).

<Image maxWidth={300} caption="A simple PNG chart image generated in Python" src="https://quickchart.io/chart?w=300&h=200&c=%7B%0A%20%20type%3A%20%27line%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27January%27%2C%20%27February%27%2C%20%27March%27%2C%20%27April%27%2C%20%27May%27%2C%20%27June%27%2C%20%27July%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20%27My%20First%20dataset%27%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%27rgb(255%2C%2099%2C%20132)%27%2C%0A%20%20%20%20%20%20%20%20borderColor%3A%20%27rgb(255%2C%2099%2C%20132)%27%2C%0A%20%20%20%20%20%20%20%20data%3A%20%5B93%2C%20-29%2C%20-17%2C%20-8%2C%2073%2C%2098%2C%2040%5D%2C%0A%20%20%20%20%20%20%20%20fill%3A%20false%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20%27My%20Second%20dataset%27%2C%0A%20%20%20%20%20%20%20%20fill%3A%20false%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%27rgb(54%2C%20162%2C%20235)%27%2C%0A%20%20%20%20%20%20%20%20borderColor%3A%20%27rgb(54%2C%20162%2C%20235)%27%2C%0A%20%20%20%20%20%20%20%20data%3A%20%5B20%2C%2085%2C%20-79%2C%2093%2C%2027%2C%20-81%2C%20-22%5D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20legend%3A%20%7Bdisplay%3A%20false%7D%0A%20%20%7D%2C%0A%7D%0A" />

## Using quickchart-python

[quickchart-python](https://github.com/typpo/quickchart-python) supports both Python 2 and 3. Install the library using pip:

```
pip install quickchart.io
```

The library provides a `QuickChart` class. Import and instantiate it. Then set properties on it and specify a Chart.js config:

```python
from quickchart import QuickChart

qc = QuickChart()
qc.width = 500
qc.height = 300
qc.device_pixel_ratio = 2.0
qc.config = {
    "type": "bar",
    "data": {
        "labels": ["Hello world", "Test"],
        "datasets": [{
            "label": "Foo",
            "data": [1, 2]
        }]
    }
}

# Print a chart URL
print(qc.get_url())

# Print a short chart URL
print(qc.get_short_url())
```

This URL will display your chart when loaded:

```
https://quickchart.io/chart?bkg=white&c=%7B%0A%20%20%20%20%22type%22%3A%20%22bar%22%2C%0A%20%20%20%20%22data%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22labels%22%3A%20%5B%22Hello%20world%22%2C%20%22Test%22%5D%2C%0A%20%20%20%20%20%20%20%20%22datasets%22%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22label%22%3A%20%22Foo%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22data%22%3A%20%5B1%2C%202%5D%0A%20%20%20%20%20%20%20%20%7D%5D%0A%20%20%20%20%7D%0A%7D
```

URLs can sometimes get very long, so QuickChart also includes a "short URL" option. This option produces a fixed-length URL using a URL shortener.

Here's an example shortened URL:

```
https://quickchart.io/chart/render/f-a1d3e804-dfea-442c-88b0-9801b9808401
```

Why would anyone prefer a long URL over a short URL? Short URLs eventually expire because they depend on a URL shortener, so if you need your chart to be around _forever_ (or you don't want to depend on a URL shortener) you should use its full URL.

Both URLs will render an image of a chart:

<Image src="https://quickchart.io/chart?bkg=white&c=%7B%0A%20%20%20%20%22type%22%3A%20%22bar%22%2C%0A%20%20%20%20%22data%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22labels%22%3A%20%5B%22Hello%20world%22%2C%20%22Test%22%5D%2C%0A%20%20%20%20%20%20%20%20%22datasets%22%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22label%22%3A%20%22Foo%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22data%22%3A%20%5B1%2C%202%5D%0A%20%20%20%20%20%20%20%20%7D%5D%0A%20%20%20%20%7D%0A%7D" />

You can also write the chart image to a file, or get the image bytes and manipulate them in your Python program:

```python
# Write a file
qc.to_file('/tmp/mychart.png')

# Get image data
img = qc.to_bytes()
```

QuickChart is completely open source. Learn more at the [quickchart-python](https://github.com/typpo/quickchart-python) Github project.

## Using requests

You don't need to use the `quickchart.io` dependency if you don't want to. Because the chart URL encodes a chart in its entirety, all you need to do is join the parameters into a URL.

This will print a URL that loads a chart as specified (see [the documentation](/documentation/) for all options):

```python
import json
from urllib.parse import urlencode  # python 3
# from urllib import urlencode      # python 2

config = {
    "type": "bar",
    "data": {
        "labels": ["Hello world", "Test"],
        "datasets": [{
            "label": "Foo",
            "data": [1, 2]
        }]
    }
}

params = {
    'chart': json.dumps(config)
    'width': 500,
    'height': 300,
    'backgroundColor': 'white',
}
print('https://quickchart.io/chart?%s' % urlencode(params))
```

To generate a short URL, send an HTTP POST request to `https://quickchart.io/chart/create`:

```python
import requests

postdata = {
  'chart': json.dumps(config),
  'width': 500,
  'height': 300,
  'backgroundColor': 'transparent',
}

resp = requests.post('https://quickchart.io/chart/create', json=postdata)
parsed = json.loads(resp.text)
print(parsed['url'])
```

This short URL generates the same image as all the other URLs we've generated in this tutorial:

<Image src="https://quickchart.io/chart?bkg=white&c=%7B%0A%20%20%20%20%22type%22%3A%20%22bar%22%2C%0A%20%20%20%20%22data%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22labels%22%3A%20%5B%22Hello%20world%22%2C%20%22Test%22%5D%2C%0A%20%20%20%20%20%20%20%20%22datasets%22%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22label%22%3A%20%22Foo%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22data%22%3A%20%5B1%2C%202%5D%0A%20%20%20%20%20%20%20%20%7D%5D%0A%20%20%20%20%7D%0A%7D" />

---
slug: /chart-js/patterned-backgrounds/
title: Add a patterned background (Chart.js)
tags: ['chart.js', 'backgrounds and coloring']
sidebar_label: Patterned backgrounds
---

import Image from '../../components/Image';

Patterned backgrounds in Chart.js can be achieved using the [patternomaly](https://github.com/ashiguruma/patternomaly) library. QuickChart includes built-in support for patterned chart backgrounds.

The patternomaly library generates patterned canvases, and these patterns can be supplied directly as backgrounds.

In QuickChart, `pattern` is a built-in global that lets you generate patterns. Here's a quick example:

```js
{
  type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May'],
        datasets: [{
          label: 'Dogs',
          data: [10, 50, 80, 30, 10],
          backgroundColor: pattern.draw('zigzag-horizontal', 'navy'),
        }, {
          label: 'Cats',
          data: [100, 20, 10, 90, 80],
          backgroundColor: pattern.draw('diagonal-right-left', 'darkgreen'),
        }]
    }
}
```

Which produces this patterned bar chart:

<Image maxWidth={500} src="https://quickchart.io/chart?c=%7B%0A%20%20type%3A%20%27bar%27%2C%0A%20%20%20%20data%3A%20%7B%0A%20%20%20%20%20%20labels%3A%20%5B%27January%27%2C%20%27February%27%2C%20%27March%27%2C%20%27April%27%2C%20%27May%27%5D%2C%0A%20%20%20%20%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20%27Dogs%27%2C%0A%20%20%20%20%20%20%20%20%20%20data%3A%20%5B10%2C%2050%2C%2080%2C%2030%2C%2010%5D%2C%0A%20%20%20%20%20%20%20%20%20%20backgroundColor%3A%20pattern.draw(%27zigzag-horizontal%27%2C%20%27navy%27)%2C%0A%20%20%20%20%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20%20%20label%3A%20%27Cats%27%2C%0A%20%20%20%20%20%20%20%20%20%20data%3A%20%5B100%2C%2020%2C%2010%2C%2090%2C%2080%5D%2C%0A%20%20%20%20%20%20%20%20%20%20backgroundColor%3A%20pattern.draw(%27diagonal-right-left%27%2C%20%27darkgreen%27)%2C%0A%20%20%20%20%20%20%20%20%7D%5D%0A%20%20%20%20%7D%0A%7D" />

Patterned backgrounds can be used in any chart type. Here's a more elaborate example with a customized polar chart:

```js
{
    "type": "polarArea",
    "data": {
        "datasets": [{
            "borderColor": 'rgb(0,0,0,1)',
            "data": [3, 5, 5, 0, 0, 6, 0, 4, 0, 0, 0, 0],
            "backgroundColor": [pattern.draw('diagonal-right-left', 'rgb(20,38,123)'), pattern.draw('dot', 'rgb(0,152,161)'), pattern.draw('zigzag', 'rgb(150,192,58)'), pattern.draw('diagonal-right-left', 'rgb(20,38,123)'), pattern.draw('dot', 'rgb(0,152,161)'), pattern.draw('zigzag', 'rgb(150,192,58)'), pattern.draw('diagonal-right-left', 'rgb(20,38,123)'), pattern.draw('dot', 'rgb(0,152,161)'), pattern.draw('zigzag', 'rgb(150,192,58)'), pattern.draw('diagonal-right-left', 'rgb(20,38,123)'), pattern.draw('dot', 'rgb(0,152,161)'), pattern.draw('zigzag', 'rgb(150,192,58)')]
        }]
    },
    "options": {
        "borderWidth": 2,
        "borderColor": "rgba(0, 0, 0, 0.8)",
        "startAngle": 0,
        "scale": {
            "ticks": {
                "backdropColor": "rgba(255, 255, 255, 1)",
                "min": 0,
                "max": 6,
                "stepSize": 1,
                "fontColor": "rgb(254,72,0)",
                "fontSize": 16,
                "z": 2,
                "padding": 10
            },
            "gridLines": {
                "display": true,
                "drawTicks": true,
                "drawOnChartArea": true,
                "drawBorder": true,
                "borderDash": [4, 5],
                "lineWidth": 2,
                "color": "rgba(0, 0, 0, 0.5)",
                "z": 1
            },
            "angleLines": {
                "display": true,
                "color": "rgba(0, 0, 0, 0.8)",
                "lineWidth": 2
            },
            "pointLabels": {
                "fontSize": 20
            }
        },
        "legend": {
            "display": false,
            "position": "bottom"
        }
    }
}
```

Which produces the following:

<Image maxWidth={500} src="https://quickchart.io/chart?c=%7B%0A%20%20%20%20%22type%22%3A%20%22polarArea%22%2C%0A%20%20%20%20%22data%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22datasets%22%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22borderColor%22%3A%20%27rgb(0%2C0%2C0%2C1)%27%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22data%22%3A%20%5B3%2C%205%2C%205%2C%200%2C%200%2C%206%2C%200%2C%204%2C%200%2C%200%2C%200%2C%200%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22backgroundColor%22%3A%20%5Bpattern.draw(%27diagonal-right-left%27%2C%20%27rgb(20%2C38%2C123)%27)%2C%20pattern.draw(%27dot%27%2C%20%27rgb(0%2C152%2C161)%27)%2C%20pattern.draw(%27zigzag%27%2C%20%27rgb(150%2C192%2C58)%27)%2C%20pattern.draw(%27diagonal-right-left%27%2C%20%27rgb(20%2C38%2C123)%27)%2C%20pattern.draw(%27dot%27%2C%20%27rgb(0%2C152%2C161)%27)%2C%20pattern.draw(%27zigzag%27%2C%20%27rgb(150%2C192%2C58)%27)%2C%20pattern.draw(%27diagonal-right-left%27%2C%20%27rgb(20%2C38%2C123)%27)%2C%20pattern.draw(%27dot%27%2C%20%27rgb(0%2C152%2C161)%27)%2C%20pattern.draw(%27zigzag%27%2C%20%27rgb(150%2C192%2C58)%27)%2C%20pattern.draw(%27diagonal-right-left%27%2C%20%27rgb(20%2C38%2C123)%27)%2C%20pattern.draw(%27dot%27%2C%20%27rgb(0%2C152%2C161)%27)%2C%20pattern.draw(%27zigzag%27%2C%20%27rgb(150%2C192%2C58)%27)%5D%0A%20%20%20%20%20%20%20%20%7D%5D%0A%20%20%20%20%7D%2C%0A%20%20%20%20%22options%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%22borderWidth%22%3A%202%2C%0A%20%20%20%20%20%20%20%20%22borderColor%22%3A%20%22rgba(0%2C%200%2C%200%2C%200.8)%22%2C%0A%20%20%20%20%20%20%20%20%22startAngle%22%3A%200%2C%0A%20%20%20%20%20%20%20%20%22scale%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22ticks%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22backdropColor%22%3A%20%22rgba(255%2C%20255%2C%20255%2C%201)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22min%22%3A%200%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22max%22%3A%206%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22stepSize%22%3A%201%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22fontColor%22%3A%20%22rgb(254%2C72%2C0)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22fontSize%22%3A%2016%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22z%22%3A%202%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22padding%22%3A%2010%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22gridLines%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22display%22%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22drawTicks%22%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22drawOnChartArea%22%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22drawBorder%22%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22borderDash%22%3A%20%5B4%2C%205%5D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22lineWidth%22%3A%202%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22color%22%3A%20%22rgba(0%2C%200%2C%200%2C%200.5)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22z%22%3A%201%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22angleLines%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22display%22%3A%20true%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22color%22%3A%20%22rgba(0%2C%200%2C%200%2C%200.8)%22%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22lineWidth%22%3A%202%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22pointLabels%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%20%22fontSize%22%3A%2020%0A%20%20%20%20%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%22legend%22%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20%22display%22%3A%20false%2C%0A%20%20%20%20%20%20%20%20%20%20%20%20%22position%22%3A%20%22bottom%22%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D" />

Head back to the [docs](/documentation) to learn more or ask questions in the [community](https://community.quickchart.io/).

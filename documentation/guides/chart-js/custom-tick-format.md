---
slug: /chart-js/custom-tick-format/
title: How to format tick marks in Chart.js
tags: ['chart.js']
sidebar_label: Formatting tick marks
---

import Image from '../../components/Image';

In Chart.js, "ticks" are the incremental markings that label values along the axis of the chart.

It is possible to write a custom function that determines how tick marks are displayed on the chart. This function can determine the tick label based on the value, the index of the tick (i.e. its position on the axis), and the value of other ticks.

## Use the ticks callback

To format Chart.js tick marks, use the **`ticks.callback`** property of your scale object. `callback` is a function that takes up to three arguments:

- `value`: the value of the tick
- `index`: the tick index in the ticks array
- `ticks`: the array of tick objects: `{value: number, label?: string | string[], major?: boolean}`

The value returned by `callback` will be displayed on the chart.

### Example: Add a currency prefix

Here's a simple example. In Chart.js v3, we set the `options.scales.y.ticks.callback` property to add a dollar sign before every value:

```javascript
{
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue',
        data: [50000, 60000, 70000, 1800000],
        backgroundColor: '#3300cc',
      },
    ],
  },
  options: {
    scales: {
      y: {
        ticks: {
          callback: (val) => {
            return '$' + val;
          },
        },
      },
    },
  },
}
```

Chart.js v2 is very similar, except that `scales.yAxes` is an array:

```javascript
{
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue',
        data: [50000, 60000, 70000, 1800000],
        backgroundColor: '#3300cc',
      },
    ],
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          callback: (val) => {
            return '$' + val;
          },
        },
      }],
    },
  },
}
```

Here's what the resulting chart looks like:

<Image maxWidth={500} src="https://quickchart.io/chart?c=%7B%0A%20%20type%3A%20%27bar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Q1%27%2C%20%27Q2%27%2C%20%27Q3%27%2C%20%27Q4%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20%27Revenue%27%2C%0A%20%20%20%20%20%20%20%20data%3A%20%5B50000%2C%2060000%2C%2070000%2C%201800000%5D%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%27%233300cc%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20scales%3A%20%7B%0A%20%20%20%20%20%20y%3A%20%7B%0A%20%20%20%20%20%20%20%20ticks%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20callback%3A%20(val)%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20%27%24%27%20%2B%20val%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D" />

See the [Chart.js documentation](https://www.chartjs.org/docs/latest/axes/labelling.html#creating-custom-tick-formats) for more information.

### Example: Hide tick marks

If the value returned by `callback` is null or undefined, the tick will be hidden. Here's an example that only shows every other tick mark:

```javascript
{
  // in Chart.js v3
  // ...
  options: {
    scales: {
      y: {
        ticks: {
          callback: (val, index) => {
            return index % 2 === 0 ? val : undefined;
          },
        },
      },
    },
  },
}

{
  // in Chart.js v2
  // ...
  options: {
    scales: {
      yAxes: [{
        ticks: {
          callback: (val, index) => {
            return index % 2 === 0 ? val : undefined;
          },
        },
      }],
    },
  },
}
```

Here's what the chart looks like. You'll notice it has fewer tick marks on the y axis:

<Image maxWidth={500} src="https://quickchart.io/chart?v=3&c=%7B%0A%20%20type%3A%20%27bar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Q1%27%2C%20%27Q2%27%2C%20%27Q3%27%2C%20%27Q4%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20%27Revenue%27%2C%0A%20%20%20%20%20%20%20%20data%3A%20%5B50000%2C%2060000%2C%2070000%2C%201800000%5D%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%27%233300cc%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20scales%3A%20%7B%0A%20%20%20%20%20%20y%3A%20%7B%0A%20%20%20%20%20%20%20%20ticks%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20callback%3A%20(val%2C%20index)%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20index%20%25%202%20%3D%3D%3D%200%20%3F%20val%20%3A%20undefined%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D" />

## Customize tick labels with your own logic

As noted above, use the `ticks.callback` function to perform custom logic that returns a formatted string. You can perform any logic you like in this function.

For example, let's say we have a chart where we want to abbreviate numbers, for example 100,000 -> 100K and 1,800,000 -> 1.8M. Here's an example where we use an algorithm to determine how the value is displayed on the axis using Chart.js v3:

```javascript
{
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [
      {
        label: 'Revenue',
        data: [50000, 60000, 70000, 1800000],
        backgroundColor: '#3300cc',
      },
    ],
  },
  options: {
    scales: {
      y: {
        ticks: {
          callback: (val) => {
            if (!val) return 0;
            const units = ['', 'K', 'M', 'B'];
            const k = 1000;
            const magnitude = Math.floor(Math.log(val) / Math.log(k));
            return (
              '$' + ' ' + val / Math.pow(k, magnitude) + ' ' + units[magnitude]
            );
          },
        },
      },
    },
  },
}
```

As you can see, the chart is customized according to the Javascript logic:

<Image maxWidth={500} src="https://quickchart.io/chart?v=3&c=%7B%0A%20%20type%3A%20%27bar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Q1%27%2C%20%27Q2%27%2C%20%27Q3%27%2C%20%27Q4%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20%27Revenue%27%2C%0A%20%20%20%20%20%20%20%20data%3A%20%5B50000%2C%2060000%2C%2070000%2C%201800000%5D%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%27%233300cc%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20scales%3A%20%7B%0A%20%20%20%20%20%20y%3A%20%7B%0A%20%20%20%20%20%20%20%20ticks%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20callback%3A%20(val)%20%3D%3E%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20if%20(!val)%20return%200%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20units%20%3D%20%5B%27%27%2C%20%27K%27%2C%20%27M%27%2C%20%27B%27%5D%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20k%20%3D%201000%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20const%20magnitude%20%3D%20Math.floor(Math.log(val)%20%2F%20Math.log(k))%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20return%20(%0A%20%20%20%20%20%20%20%20%20%20%20%20%20%20%27%24%27%20%2B%20%27%20%27%20%2B%20val%20%2F%20Math.pow(k%2C%20magnitude)%20%2B%20%27%20%27%20%2B%20units%5Bmagnitude%5D%0A%20%20%20%20%20%20%20%20%20%20%20%20)%3B%0A%20%20%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D" />

In Chart.js v2, the approach is exactly the same except you use `scales.yAxes` instead:

```javascript
{
  // ...
  options: {
    scales: {
      yAxes: [{
        ticks: {
          callback: (val) => {
            if (!val) return 0;
            const units = ['', 'K', 'M', 'B'];
            const k = 1000;
            const magnitude = Math.floor(Math.log(val) / Math.log(k));
            return (
              '$' + ' ' + val / Math.pow(k, magnitude) + ' ' + units[magnitude]
            );
          },
        },
      }],
    },
  },
}
```

If you're using QuickChart, you may want to review [Using Javascript functions](/documentation/javascript-functions/) for instructions on how to include Javascript in chart configs.

## Simpler approach: Use the tickFormat plugin

Writing and including Javascript in a chart config can be a hassle. QuickChart offers some built-in convenience functions to format tick marks using the `tickFormat` plugin.

Let's continue with the above example: we want to abbreviate numbers in our chart labels, for example 100,000 -> 100K and 1,800,000 -> 1.8M. Here's how we'd use the tickFormat plugin:

```
options: {
  plugins: {
    tickFormat: {
      notation: 'compact'
    }
  }
}
```

<Image maxWidth={500} src="https://quickchart.io/chart?c=%7B%0A%20%20type%3A%20%27bar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Q1%27%2C%20%27Q2%27%2C%20%27Q3%27%2C%20%27Q4%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20%27Revenue%27%2C%0A%20%20%20%20%20%20%20%20data%3A%20%5B50000%2C%2060000%2C%2070000%2C%201800000%5D%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%27%233300cc%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20plugins%3A%20%7B%0A%20%20%20%20%20%20tickFormat%3A%20%7B%0A%20%20%20%20%20%20%20%20notation%3A%20%27compact%27%2C%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%2C%0A%7D" />

tickFormat also takes in a `prefix` or `suffix`:

```javascript
  options: {
    plugins: {
      tickFormat: {
        prefix: '$',
        notation: 'compact',
      },
    },
  },
```

<Image maxWidth={500} src="https://quickchart.io/chart?c=%7B%0A%20%20type%3A%20%27bar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Q1%27%2C%20%27Q2%27%2C%20%27Q3%27%2C%20%27Q4%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20%27Revenue%27%2C%0A%20%20%20%20%20%20%20%20data%3A%20%5B50000%2C%2060000%2C%2070000%2C%201800000%5D%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%27%233300cc%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20plugins%3A%20%7B%0A%20%20%20%20%20%20tickFormat%3A%20%7B%0A%20%20%20%20%20%20%20%20prefix%3A%20%27%24%27%2C%0A%20%20%20%20%20%20%20%20notation%3A%20%27compact%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D" />

If you'd like, you can specify a locale, which determines how numbers are formatted. For example, the DE locale uses `.` instead of `,` as a thousands separator:

```javascript
  options: {
    plugins: {
      tickFormat: {
        prefix: '€',
        locale: 'de-DE',
      },
    },
  },
```

<Image maxWidth={500} src="https://quickchart.io/chart?c=%7B%0A%20%20type%3A%20%27bar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Q1%27%2C%20%27Q2%27%2C%20%27Q3%27%2C%20%27Q4%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%0A%20%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20label%3A%20%27Revenue%27%2C%0A%20%20%20%20%20%20%20%20data%3A%20%5B50000%2C%2060000%2C%2070000%2C%201800000%5D%2C%0A%20%20%20%20%20%20%20%20backgroundColor%3A%20%27%233300cc%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%5D%2C%0A%20%20%7D%2C%0A%20%20options%3A%20%7B%0A%20%20%20%20plugins%3A%20%7B%0A%20%20%20%20%20%20tickFormat%3A%20%7B%0A%20%20%20%20%20%20%20%20prefix%3A%20%27%E2%82%AC%27%2C%0A%20%20%20%20%20%20%20%20locale%3A%20%27de-DE%27%2C%0A%20%20%20%20%20%20%7D%2C%0A%20%20%20%20%7D%2C%0A%20%20%7D%2C%0A%7D" />

### Reference table

The tickFormat plugin takes all the options of [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat).

This means you can also do things like specify currencies, percents, or the number of significant digits.

#### tickFormat attributes

|    Attribute Name     |                                                                                                  Description                                                                                                  |
| :-------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|        locale         |                                                              An Intl.Locale string such as en-US (default), fr-FR, de-DE, en-GB. Full list here                                                               |
|        prefix         |                                                                                        String to prepend to tick label                                                                                        |
|        suffix         |                                                                                        String to append to tick label                                                                                         |
|         style         |        The formatting style to use. Default is `decimal`. Use `decimal` for plain number formatting, `currency` for currency formatting, `percent` for percent formatting, `unit` for unit formatting         |
|       currency        |                   The currency to use in currency formatting. Possible values are the ISO 4217 currency codes, such as USD for the US dollar or EUR for the euro. Requires style=`currency`                   |
|         unit          |                                        The unit to use in unit formatting, such as kilometers, megabyte, percent, etc. Must be a supported unit. Requires style=`unit`                                        |
| minimumFractionDigits |                                                        The minimum number of fraction digits to use. Useful to determine the number of decimals shown.                                                        |
|      useGrouping      |                                               true to display grouping separators in numbers, such as the thousands separator. false to disable. Defaults true.                                               |
|     More options      | Number formatting is highly configurable. View Intl.NumberFormat documentation for the full list of options, including ability to control significant digits, scientific and engineering notation, and so on. |

## Conclusion

Chart.js offers a flexible means for tick formatting. Use `ticks.callback` to introduce custom logic, or use QuickChart's `tickFormat` plugin to handle most common number formatting needs.

Need more help with customizing your tick marks? Please [reach out](https://community.quickchart.io/) in our community.

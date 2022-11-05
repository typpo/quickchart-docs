---
slug: /send-email-charts-with-mailgun/
title: How to embed charts in email with Mailgun
tags: ['mailgun', 'javascript', 'python']
sidebar_position: 3
sidebar_label: Email charts with Mailgun
---

# Dynamic charts & graphs in email with Mailgun

import Author from '@site/documentation/components/Author';
import Admonition from '@theme/Admonition';
import Image from '../components/Image';
import ChartInEmailImage from './images/email/chart_in_email.png';

Email is a ubiquitous format, but it comes with limitations. **In order to embed a chart or graph directly in email, you must render it as an image.**

Rendering dynamic charts can be an arduous process that requires a server render farm, headless browsers, and other configuration. The [QuickChart](https://quickchart.io/) service allows you to do this rendering easily in your existing programming environment.

<Image noBorder src={ChartInEmailImage} maxWidth={800} caption="This post outlines how to send charts that show up in emails, pictured above." />

## Building the chart

If you're already showing these charts on a web frontend, your work here might already be done because QuickChart is built on top of the frontend [Chart.js](https://www.chartjs.org) library. You can use your existing Chart.js config, but for the purposes of this example we'll construct a new Chart.js config.

For example, imagine we have the following data:

| Label  | Retweets | Likes |
| ------ | -------- | ----- |
| Week 1 | 12       | 80    |
| Week 2 | 5        | 42    |
| Week 3 | 40       | 215   |
| Week 4 | 5        | 30    |

First create a JSON object to define your chart using the Chart.js format:

```json
{
  "type": "bar",
  "data": {
    "labels": ["Week 1", "Week 2", "Week 3", "Week 4"],
    "datasets": [
      {
        "label": "Retweets",
        "data": [12, 5, 40, 5]
      },
      {
        "label": "Likes",
        "data": [80, 42, 215, 30]
      }
    ]
  }
}
```

Now send that JSON to the QuickChart endpoint at **https://quickchart.io/chart**:

```
https://quickchart.io/chart?c={"type":"bar","data":{"labels":["Week 1","Week 2","Week 3","Week 4"],"datasets":[{"label":"Retweets","data":[12,5,40,5]},{"label":"Likes","data":[80,42,215,30]}]}}
```

When you render the above URL in an image tag, you'll see the image below:

```html
<img src="https://quickchart.io/chart?c=..." />
```

<Image noBorder maxWidth={500} src="https://quickchart.io/chart?bkg=white&c=%7B%0A%20%20type%3A%20%27bar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Week%201%27%2C%20%27Week%202%27%2C%20%27Week%203%27%2C%20%27Week%204%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20label%3A%20%27Retweets%27%2C%0A%20%20%20%20%20%20data%3A%20%5B12%2C%205%2C%2040%2C%205%5D%0A%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20label%3A%20%27Likes%27%2C%0A%20%20%20%20%20%20data%3A%20%5B80%2C%2042%2C%20215%2C%2030%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%0A%7D" />

This image can be directly embedded in an email using a standard `<img>` tag.

<Admonition type="tip">
It's usually best to **URL encode** your JSON parameter.  Nearly every programming language has a built-in function to do this.  URL encoding your JSON will avoid problems with more complex chart specifications.
</Admonition>

If you're looking for shorter URLs, check out the [URL shortener](/documentation/usage/short-urls-and-templates/) documentation.

## Sending the chart with Mailgun

Because the chart is just a normal image, you don't have to do anything out of the ordinary here. Construct your Mailgun email like you normally would and include the image tag as part of your HTML email.

Here's an example using the mailgun node.js library:

```js
const mailgunGenerator = require('mailgun-js');
const mailgun = mailgunGenerator({
  apiKey: 'abc123',
  domain: 'xyz.com',
});

const chartConfig = encodeURIComponent(
  JSON.stringify({
    type: 'bar',
    data: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Retweets',
          data: [12, 5, 40, 5],
        },
        {
          label: 'Likes',
          data: [80, 42, 215, 30],
        },
      ],
    },
  }),
);

const message = `Hello, please see the chart below:
<br><br>
<img src="https://quickchart.io/chart?c=${chartConfig}" />
`;

const data = {
  from: 'myemail@xyz.com',
  to: 'toemail@xyz.com',
  subject: 'Updated Chart Report',
  html: message,
};

mailgun.messages().send(data, (err, body) => {
  console.log(body);
});
```

Here's an equivalent example that sends charts via Mailgun in Python 3, using the [requests](https://requests.readthedocs.io/en/master/) library.

```python
import json
from urllib.parse import quote

import requests

API_KEY = "abc123"
DOMAIN = "xyz.com"

chart_config = quote(json.dumps({
  "type": "bar",
  "data": {
    "labels": ["Week 1", "Week 2", "Week 3", "Week 4"],
    "datasets": [{
      "label": "Retweets",
      "data": [12, 5, 40, 5]
    }, {
      "label": "Likes",
      "data": [80, 42, 215, 30]
    }]
  }
}))

message = f"""Hello, please see the chart below:
<br><br>
<img src="https://quickchart.io/chart?c={chart_config}" />
"""

request_url = f"https://api.mailgun.net/v2/{DOMAIN}/messages"
request = requests.post(request_url, auth=("api", API_KEY), data={
    "from": "myemail@xyz.com",
    "to": "toemail@xyz.com",
    "subject": "Updated Chart Report",
    "html": message,
})

print(f"Status: {request.status_code}")
print(f"Body:   {request.text}")
```

## Further reading

The look and feel of the chart is completely customizable using the [Chart.js documentation](https://www.chartjs.org/docs/2.9.4/). You should also see the [QuickChart documentation](https://quickchart.io/documentation/) for more information on shortcuts and plugins.

The [Mailgun API documentation](https://documentation.mailgun.com/en/latest/user_manual.html#sending-via-api) will be useful for more advanced email sending and mailing list use cases. However, the general process outlined in this post for generating static charts and embedding them in your emails will remain the same.

QuickChart is open source for individuals and organizations that wish to self-host. Or, you can [sign up](https://quickchart.io/pricing/) for QuickChart in order to generate charts on our infrastructure. Feel free to [reach out](https://community.quickchart.io/) with any questions!

<Author />

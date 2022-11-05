---
slug: /send-charts-with-slack-bot/
title: Send charts with a Slack bot
tags: ['slack', 'javascript']
sidebar_position: 10
sidebar_label: Send charts on Slack
---

# How to send dynamic charts with a Slack bot

import Author from '@site/documentation/components/Author';
import Image from '../components/Image';

Slack bots are limited by the Slack API to specific formats: text, images, and special controls. Critically, they cannot send Javascript or other dynamic formats. **In order to send a chart or graph to your Slack channel, you must first render it as an image.**

<Image noBorder src="https://i.imgur.com/ab9fOuA.png" />

In this tutorial we'll use the free and open-source [QuickChart API](https://quickchart.io) to generate chart images. To send these charts to Slack, you must:

1. Construct the chart image
2. Include it in your Slack bot's message

This tutorial is written assuming you are using Javascript, but the approach is general enough to work for any language.

## Creating a chart image

If you're already showing these charts on a web frontend, your work here might already be done because QuickChart is built on top of [Chart.js](https://www.chartjs.org). You can just use your existing Chart.js config. Otherwise, we have to construct a Chart.js config object.

For example, imagine we have the following data:

| Retweets | Likes |
| -------- | ----- |
| 12       | 80    |
| 5        | 42    |
| 40       | 215   |
| 5        | 30    |

First create an object using the Chart.js format:

```js
const chart = {
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
};
```

This object says that we have two data series, Retweets and Likes, and they each have values. The labels for the X axis are Weeks 1-4.

Next, we turn the JSON chart specification into a string:

```js
const encodedChart = encodeURIComponent(JSON.stringify(chart));
```

And put it into our URL:

```js
const chartUrl = `https://quickchart.io/chart?c=${encodedChart}`;
```

This gives a URL that encodes the `chart` object. Let's render that URL in an image tag:

```html
<img src="https://quickchart.io/chart?c=..." />
```

We get the image below:

<Image noBorder maxWidth={500} src="https://quickchart.io/chart?bkg=white&c=%7B%0A%20%20type%3A%20%27bar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Week%201%27%2C%20%27Week%202%27%2C%20%27Week%203%27%2C%20%27Week%204%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20label%3A%20%27Retweets%27%2C%0A%20%20%20%20%20%20data%3A%20%5B12%2C%205%2C%2040%2C%205%5D%0A%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20label%3A%20%27Likes%27%2C%0A%20%20%20%20%20%20data%3A%20%5B80%2C%2042%2C%20215%2C%2030%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%0A%7D" />

To learn more about static chart rendering:

- Customize your chart using the [Chart.js library](https://www.chartjs.org/docs/2.9.4/charts/bar.html)
- Adjust chart rendering using the [QuickChart documentation](https://quickchart.io/documentation)
- Use the [live chart editor](https://quickchart.io/sandbox/) to get your chart looking exactly the way you want.

## Sending the chart image to Slack

Now that we've generated a chart image, let's send it to Slack.

You have a couple options here:

- [Upload](https://api.slack.com/methods/files.upload) the file to Slack
- Include the URL in a normal message and have Slack show or "unfurl" it
- Use the [Image Block](https://api.slack.com/reference/block-kit/blocks#image)

We'll go with the third choice because it is the most practical. We construct a block like so, using the image URL from above.

```json
[
  {
    "type": "image",
    "title": {
      "type": "plain_text",
      "text": "Latest data"
    },
    "block_id": "quickchart-image",
    "image_url": "https://quickchart.io/chart?bkg=white&c=%7B%0A%20%20type%3A%20%27bar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Week%201%27%2C%20%27Week%202%27%2C%20%27Week%203%27%2C%20%27Week%204%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20label%3A%20%27Retweets%27%2C%0A%20%20%20%20%20%20data%3A%20%5B12%2C%205%2C%2040%2C%205%5D%0A%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20label%3A%20%27Likes%27%2C%0A%20%20%20%20%20%20data%3A%20%5B80%2C%2042%2C%20215%2C%2030%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%0A%7D",
    "alt_text": "Chart showing latest data"
  }
]
```

You can try this directly in Slack's [Block Kit Builder](https://api.slack.com/tools/block-kit-builder?mode=message&blocks=%5B%7B%22type%22%3A%22image%22%2C%22title%22%3A%7B%22type%22%3A%22plain_text%22%2C%22text%22%3A%22Latest%20data%22%7D%2C%22block_id%22%3A%22quickchart-image%22%2C%22image_url%22%3A%22https%3A%2F%2Fquickchart.io%2Fchart%3Fbkg%3Dwhite%26c%3D%257B%250A%2520%2520type%253A%2520%2527bar%2527%252C%250A%2520%2520data%253A%2520%257B%250A%2520%2520%2520%2520labels%253A%2520%255B%2527Week%25201%2527%252C%2520%2527Week%25202%2527%252C%2520%2527Week%25203%2527%252C%2520%2527Week%25204%2527%255D%252C%250A%2520%2520%2520%2520datasets%253A%2520%255B%257B%250A%2520%2520%2520%2520%2520%2520label%253A%2520%2527Retweets%2527%252C%250A%2520%2520%2520%2520%2520%2520data%253A%2520%255B12%252C%25205%252C%252040%252C%25205%255D%250A%2520%2520%2520%2520%257D%252C%2520%257B%250A%2520%2520%2520%2520%2520%2520label%253A%2520%2527Likes%2527%252C%250A%2520%2520%2520%2520%2520%2520data%253A%2520%255B80%252C%252042%252C%2520215%252C%252030%255D%250A%2520%2520%2520%2520%257D%255D%250A%2520%2520%257D%250A%257D%22%2C%22alt_text%22%3A%22Chart%20showing%20latest%20data%22%7D%5D). Have a look at the Slack documentation and play around with the different settings:

<Image noBorder src="https://i.imgur.com/NK6s8Lnl.png" />

In order to send the image blocks from your bot, use Slack's [chat.postMessage](https://api.slack.com/methods/chat.postMessage) API endpoint.

Starting with the basics, let's use this boilerplate for our communication with the Slack API. If you're using a helper library you probably already have a way to send messages, but here is the boilerplate I always use:

```js
const request = require('request');

// Put your bot token here.
const SLACK_BOT_USER_TOKEN = 'xyz123';

function sendMessage(data) {
  request(
    {
      url: 'https://slack.com/api/chat.postMessage',
      method: 'POST',
      json: data,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        Authorization: `Bearer ${SLACK_BOT_USER_TOKEN}`,
      },
    },
    function (error, response, body) {
      if (error || response.statusCode !== 200) {
        console.error('Error sending slack response:', error);
      } else if (!response.body.ok) {
        console.error('Slack responded with error:', response.body);
      } else {
        // All good!
      }
    },
  );
}
```

Now, we'll put it all together and send the message with chart image URL:

```js
sendMessage({
  text: 'Chart data update',
  blocks: [
    {
      type: 'image',
      title: {
        type: 'plain_text',
        text: 'Latest data',
      },
      block_id: 'quickchart-image',
      image_url:
        'https://quickchart.io/chart?bkg=white&c=%7B%0A%20%20type%3A%20%27bar%27%2C%0A%20%20data%3A%20%7B%0A%20%20%20%20labels%3A%20%5B%27Week%201%27%2C%20%27Week%202%27%2C%20%27Week%203%27%2C%20%27Week%204%27%5D%2C%0A%20%20%20%20datasets%3A%20%5B%7B%0A%20%20%20%20%20%20label%3A%20%27Retweets%27%2C%0A%20%20%20%20%20%20data%3A%20%5B12%2C%205%2C%2040%2C%205%5D%0A%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20label%3A%20%27Likes%27%2C%0A%20%20%20%20%20%20data%3A%20%5B80%2C%2042%2C%20215%2C%2030%5D%0A%20%20%20%20%7D%5D%0A%20%20%7D%0A%7D',
      alt_text: 'Chart showing latest data',
    },
  ],
});
```

That's it! Our message is sent and the graph appears in Slack.

<Image noBorder src="https://i.imgur.com/ab9fOuA.png" />

Need more help? Ask questions in our [community](https://community.quickchart.io/).

<Author />

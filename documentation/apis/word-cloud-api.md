---
title: Word Cloud API
tags: ['word cloud']
---

# Using the QuickChart Word Cloud API

import Admonition from '@theme/Admonition';
import Image from '@site/documentation/components/Image';
import CodeWithHighlights from '@site/documentation/components/CodeWithHighlights';
import ChurchillImage from '@site/documentation/images/wordcloud/wordcloud-churchill.png';
import NewsImage from '@site/documentation/images/wordcloud/wordcloud-googlenews.png';

QuickChart provides an API that generates **word clouds** or **tag clouds**, visualizations that give prominence to words that appear frequently in a given text.

## Getting started

The word cloud API endpoint is available at `https://quickchart.io/wordcloud`. Here's a simple example that is embedded on this page straight from the API:

<Image caption="To be or not to be, that is the question" src="https://quickchart.io/wordcloud?text=To be or not to be, that is the question&width=300&height=300"/>

The only required parameter of the word cloud API is `text`. Set it in your URL:

<CodeWithHighlights code="**https://quickchart.io/wordcloud?text=**To be or not to be, that is the question"/>

## API options

There are many ways to customize your word cloud. Here are all the options offered by the API:

| Parameter           | Description                                                                                                         | Default      |
| ------------------- | ------------------------------------------------------------------------------------------------------------------- | ------------ |
| **text**            | Text of the word cloud                                                                                              | _(required)_ |
| **format**          | Image output format - svg or png                                                                                    | svg          |
| **width**           | Image width                                                                                                         | 600          |
| **height**          | Image height                                                                                                        | 600          |
| **backgroundColor** | Background color of image <br/>(rgb, hsl, hex, or name value)                                                       | transparent  |
| **fontFamily**      | Font family to use                                                                                                  | serif        |
| **loadGoogleFonts** | [Google Fonts](https://fonts.google.com/) to load                                                                   |              |
| **fontScale**       | Size of the largest font (roughly)                                                                                  | 25           |
| **scale**           | Frequency scaling method - linear, sqrt, or log                                                                     | linear       |
| **padding**         | Padding between words, in pixels                                                                                    | 1            |
| **rotation**        | Maximum angle of rotation for words                                                                                 | 20           |
| **maxNumWords**     | Maximum number of words to show. <br/>Note that fewer may be shown depending on size.                               | 200          |
| **minWordLength**   | Minimum character length of each word to include.                                                                   | 1            |
| **case**            | Force words to this case - upper, lower, or none                                                                    | lower        |
| **colors**          | List of colors for words in JSON format, assigned randomly.<br/>e.g. ["red", "#00ff00", "rgba(0, 0, 255, 1.0)"]     | random       |
| **removeStopwords** | If true, remove common words from the cloud                                                                         | false        |
| **language**        | Two-letter language code of stopwords to remove                                                                     | en           |
| **useWordList**     | If true, treat `text` as a comma-separated list of words or phrases instead of trying to split the text on our side | false        |

## Examples

### Lincoln's speech

Let's do a word cloud of Lincoln's famous Gettysburg address:

<Image src="https://quickchart.io/wordcloud?text=Four score and seven years ago our fathers brought forth on this continent, a new nation, conceived in Liberty, and dedicated to the proposition that all men are created equal.Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battle-field of that war. We have come to dedicate a portion of that field, as a final resting place for those who here gave their lives that that nation might live. It is altogether fitting and proper that we should do this.But, in a larger sense, we can not dedicate—we can not consecrate—we can not hallow—this ground. The brave men, living and dead, who struggled here, have consecrated it, far above our poor power to add or detract. The world will little note, nor long remember what we say here, but it can never forget what they did here. It is for us the living, rather, to be dedicated here to the unfinished work which they who fought here have thus far so nobly advanced. It is rather for us to be here dedicated to the great task remaining before us—that from these honored dead we take increased devotion to that cause for which they gave the last full measure of devotion—that we here highly resolve that these dead shall not have died in vain—that this nation, under God, shall have a new birth of freedom—and that government of the people, by the people, for the people, shall not perish from the earth.&removeStopwords=1" />

It looks pretty great by default! All I did was put Lincoln's speech in the URL, `https://quickchart.io/wordcloud?text=Four score and seven years ago...`

### Churchill's speech

Now, let's say we want to do a tag cloud of Churchill's famous "we shall fight on the beaches" Dunkirk speech. This is a [long speech](https://winstonchurchill.org/resources/speeches/1940-the-finest-hour/we-shall-fight-on-the-beaches/) that is too big to fit in a URL, so we will instead use a POST request to send the data.

Because I'm doing this on the command line, I'll first create a file `churchill.json` with the following JSON contents:

```json
{
  "format": "png",
  "width": 1000,
  "height": 1000,
  "fontFamily": "sans-serif",
  "fontScale": 15,
  "scale": "linear",
  "text": "<churchill's full speech...>"
}
```

Then POST it to the API endpoint using `curl`:

```bash
curl -X POST -H 'Content-Type: application/json' https://quickchart.io/wordcloud -d @churchill.json -o churchill.png
```

This downloads `churchill.png`, which looks like this:

<Image src={ChurchillImage} />

Even though I used the command line and curl, you can easily do this in any programming language. Just send an HTTP POST request in your language of choice.

### A website

You can create a word cloud with any sort of content, including from a webpage. Here's a quick tutorial from the command line.

Let's make a word cloud of today's Wall Street Journal, because I want to see what my boss is reading.

We'll use the [article-parser](https://github.com/ndaidong/article-parser) project to download and extract the text from the page and do the rest in Python, in order to make request building easier.

First, fetch the article content. This is simple enough as the article parser API does the amgic for us:

```python
import requests

resp = requests.get('https://us-central1-technews-251304.cloudfunctions.net/article-parser?url=https://www.wsj.com')

article = resp.json()['data']['content']
```

Now, create a POST request to the word cloud API with the article content and write it to a file:

```python
resp = requests.post('https://quickchart.io/wordcloud', json={
    'format': 'png',
    'width': 1000,
    'height': 1000,
    'fontScale': 15,
    'scale': 'linear',
    'removeStopwords': True,
    'minWordLength': 4,
    'text': article,
})

with open('newscloud.png', 'wb') as f:
    f.write(resp.content)
```

Here is the output:

<Image src={NewsImage} />

You can see some artifacts of the Google News webpage (like `&amp` and `"http`), but overall not bad for a very quick hack.

## Using custom fonts

<Admonition type="caution">
⚠️ This section applies to SVG format images only!
</Admonition>

A few basic font families such as `sans`, `sans-serif`, and `monospace` are available by default.

If you wish to use more exotic fonts, use the `loadGoogleFonts` parameter to instruct the renderer to make [Google Fonts](https://fonts.google.com) available in your word cloud.

For example, the following payload will use the Roboto font:

```json
{
  "loadGoogleFonts": "Roboto",
  "fontFamily": "Roboto",

  "format": "png",
  "width": 1000,
  "height": 1000,
  "fontScale": 15,
  "scale": "linear",
  "text": "..."
}
```

You may also specify font weights, such as `Roboto:300`.

## Conclusion

QuickChart's word cloud API is one of the most flexible web services out there that can allow you to create word clouds programmatically without any dependencies. What will you build? Feel free to reach out to [reach out](mailto:ian@quickchart.io) with questions, feature requests, or to share interesting word clouds!

---
title: How to create charts with Zapier
sidebar_label: Zapier
sidebar_position: 40
tags: ['integrations', 'zapier']
---

import Admonition from '@theme/Admonition';
import Author from '@site/documentation/components/Author';
import CodeWithHighlights from '@site/documentation//components/CodeWithHighlights';
import Image from '@site/documentation/components/Image';
import TypeformSigninImage from '@site/documentation/integrations/images/zapier/zapier_typeform_signin.png';
import TypeformSurveyImage from '@site/documentation/integrations/images/zapier/zapier_typeform_find_survey.png';
import ActionSearchImage from '@site/documentation/integrations/images/zapier/zapier_quickchart_action_search.png';
import ZapierConfigurationImage from '@site/documentation/integrations/images/zapier/zapier_quickchart_configuration.png';
import ZapierTestImage from '@site/documentation/integrations/images/zapier/zapier_quickchart_test.png';
import ZapierEventsImage from '@site/documentation/integrations/images/zapier/zapier_quickchart_event_types.png';
import EmailImage from '@site/documentation/integrations/images/zapier/zapier_quickchart_email.png';
import EmailTestImage from '@site/documentation/integrations/images/zapier/zapier_quickchart_email_test.png';
import ZapierChartActions from '@site/documentation/integrations/images/zapier/zapier_chart_actions.png';

It's a common pattern to want to create a chart based on some data you're manipulating in Zapier. Usually after creating the chart, you'll do something like embed it in a document, upload it to a drive, or send it in an email.

This tutorial describes how to **create a chart based on data in Zapier**, and how to **embed the chart in an email**.

<Image noBorder alt="Charts on Zapier" src={ZapierChartActions} href="https://zapier.com/apps/quickchart/integrations" />

In this example, we'll use the [QuickChart Zapier integration](https://zapier.com/apps/quickchart/integrations) to generate customized charts. As an example data source, we'll use a Typeform survey, but you can use any data source you want in Zapier! Other examples of data sources our users connect include Google Sheets, Airtable, and CRMs like Salesforce.

Zapier has built-in email capabilities that we'll use to embed the chart and send the email whenever new data comes in.

<div style={{padding:'75% 0 0 0', position:'relative'}}><iframe src="https://player.vimeo.com/video/711075637?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameBorder="0" allow="autoplay; fullscreen; picture-in-picture" allowFullScreen style={{position:'absolute',top:0,left:0,width:'100%',height:'100%'}} title="Zapier + Typeform + Quickchart guide"></iframe></div><script src="https://player.vimeo.com/api/player.js"></script>

## Configure the trigger

In this example, we're using Zapier's Typeform integration as a trigger, but you can use any trigger you want. Alternatives include Google Forms, Google Sheets, Airtable, and SurveyMonkey.

After adding the trigger, you'll be prompted to choose the event and an account. Then, search for the form by name. Modifications to this form will trigger the zap.

<Image maxWidth={600} caption="Sign into your Typeform account in Zapier." src={TypeformSigninImage} />

Next, find the survey in your Typeform account. You can search by survey name.

<Image maxWidth={600} caption="Select the survey that you want to generate charts for." src={TypeformSurveyImage} />

Once this is done, press "Continue". You may then test the trigger.

## Create the Chart action in Zapier

Now you're ready to actually create the chart. We'll do this using the QuickChart action, which generates a chart iimage URL that in Zapier.

Start by searching for "QuickChart" in the actions search.

<Image maxWidth={600} caption="Search and add the QuickChart Zapier action." src={ActionSearchImage} />

You'll be prompted for login, but it's not required. If you're asked for an API key or email address, enter your email or leave it blank.

## Set up the chart configuration

Now for the most important part: we're going to set up the chart configuration. This Zapier action uses [Chart.js](https://www.chartjs.org/docs/2.9.4/), a free and open-source chart specification.

In this example, we're going to create a [radar chart](/documentation/chart-types/#radar-chart). However, other common use cases include bar charts, radial gauges, and polar area charts. There are a [wide variety](https://quickchart.io/gallery/) of charts that you can use. See the documentation to learn how to build a chart!

Once you've got your chart configuration, paste it into the action setup on Zapier and substitute the data variables:

<Image maxWidth={600} caption="Chart configuration in Zapier action setup." src={ZapierConfigurationImage} />

Proceed by clicking "Continue" and then running a test.

<Image maxWidth={600} caption="Testing the Zapier chart generation." src={ZapierTestImage} />

The results should look similar to above. The action outputs a URL. Going to this URL will load a chart image.

### Alternative: Choose a built-in configuration

If you just want a simple chart, there are some built-in chart types that you can use to avoid having to create a JSON configuration. However, if you want the full range of chart customization, you'll have to construct a configuration yourself as described above (it's not so bad!).

<Image maxWidth={600} caption="Some of the built-in chart types." src={ZapierEventsImage} />

### Alternative: Use the chart maker

A second way to avoid editing configurations by hand is to use the [chart maker](/documentation/chart-maker/), a no-code tool to construct charts.

After obtaining a template URL from the chart maker, you can [construct a URL](/documentation/chart-maker/#use-the-no-code-chart-api) that alters the chart to your liking without having to use the QuickChart action on Zapier.

## Adding the chart to email

Now that we've generated a chart, it's time to actually do something with it! In this example, we're going to send an email.

Zapier has a built-in "Send Outbound Email" action. Let's search for this action and select it.

In the action setup form, there are two ways to include a chart in the email:

1. To include it as an email attachment, enter the `Chart URL` in the Attachment field.

2. To embed it in the body of the email, use this HTML:

```html
<div>
  <img width="500" src="Chart URL">
</div>
```

In this screenshot, the Send Outbound Email action is configured to both attach the chart as well as embed it directly in the email:

<Image maxWidth={600} caption="Emailing a chart via Zapier." src={EmailImage} />

Click "Continue" and "Test & Review", and soon you'll have an email in your inbox!

<Image maxWidth={600} caption="Chart received in my email!" src={EmailTestImage} />

## Conclusion

In this article, we learned how to create a chart from data in Zapier. Although we sent this chart in an email, the same technique could just as easily be applied to:

- Adding a chart to a Google Drive or Google Doc
- Sending the chart as a Slack message
- Tweeting the chart

Because the chart is simply a URL, _any_ action that accepts a URL can work with this approach.

Please feel free to reach out with any new ideas or questions! Also, if you need help, check out our [community](https://community.quickchart.io/) where we discuss QuickChart integrations, chart configurations, and more.

## Zapier Quick Access

<script type="module" src="https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.esm.js"></script>
<link rel="stylesheet" href="https://cdn.zapier.com/packages/partner-sdk/v0/zapier-elements/zapier-elements.css"/>

<zapier-full-experience
  client-id="b0RLKtpWUpw7lh5LBj3MbIdsAVAfGt1HK96ai1x9"
  theme="auto"
  intro-copy-display="hide"
  app-search-bar-display="show"
  app-categories="forms,databases,sales-crm"
/>

<Author />

---
slug: /qr-codes/analytics/
title: QR Code analytics
sidebar_label: Analytics
tags: ['qr codes']
---

import Image from '@site/documentation/components/Image';
import CodeWithHighlights from '@site/documentation/components/CodeWithHighlights';
import GoogleAnalyticsExample from '@site/documentation/images/qr-codes/google-analytics-utm.jpeg';

## How to measure QR code usage

QuickChart's QR code capabilities integrate with third-party analytics like Google Analytics and Mixpanel. This enables you to track QR code scans and measure campaign performance.

To track QR scans, use **UTM parameters**, a common tracking standard supported by third-party analytics tools. UTM parameters are tags that you can add to a URL to track the source, medium, campaign, and other information about traffic coming to your site.

By adding UTM parameters to your QR code URLs, you can track the success of your QR code campaigns in your existing analytics workflow.

This page describes how to set up your analytics tool to analyze QR code traffic:

1. Add UTM parameters to your QR code URLs.
2. Use your preferred third-party analytics tool to measure UTM performance.

## Step 1: Add UTM parameters to QR Code URLs

There are 3 UTM parameters you can use:

- `utm_source`: Identifies the source of traffic to a website or app, such as a search engine or social media network. In this case, it could be something like `QR_Code1`.
- `utm_campaign`: Identifies the specific campaign or promotion that the traffic is associated with. In this case, it could be something like `Winter_Sale`.
- `utm_medium`: Identifies the type of traffic, such as email, CPC, or referral. In this case, could be `digital`, `print`, or you can just omit it.

You can omit parameters that you don't need, but it makes sense to at least set `utm_source`.

Here's an example of a QR code URL with UTM parameters:

<CodeWithHighlights wrap code="https://quickchart.io/qr?text=https://example.com**&utm_source=**QR_Code1**&utm_campaign=**Winter_Sale**&utm_medium=**print" />

In the example above, "QR_Code1" is the source of the traffic, "print" is the medium, and "Winter_Sale" is the campaign. Customize these parameters to fit your specific tracking needs.

## Step 2: View analytics

UTM query parameters are a common marketing tool and are supported by all analytics programs. If your analytics platform is not listed below, refer to your analytics documentation or [contact us](/contact/).

### Google Analytics

To find your UTM-tagged data in Google Analytics, go to **Acquisition > Campaigns > All Campaigns**.

Learn more about how to set up and view custom UTM campaign data in Google Analytics [here](https://support.google.com/analytics/answer/1033863?hl=en#zippy=%2Cin-this-article).

<Image noBorder src={GoogleAnalyticsExample} alt="Using Google Analytics to view UTM campaign results" />

### Mixpanel

Use Mixpanel's insight view to break down traffic by the desired UTM parameter. Mixpanel has written an article on this topic [here](https://help.mixpanel.com/hc/en-us/articles/115004561786-Track-UTM-Tags).

### Adobe Analytics

Learn more about how to configure Adobe Analytics for UTM parameters [here](https://medium.com/@factivateapp/the-complete-guide-to-using-utm-parameters-in-adobe-analytics-dfce81b91938).

## Why use third-party analytics?

Tracking QR code scans with a third-party analytics tool using UTM parameters is beneficial for these reasons:

- **More comprehensive and customizable**: These tools have advanced tracking capabilities that can provide detailed information about user behavior on your site, including follow-up pageviews, time on site, and conversion rates.
- **Easier integration with other data sources**: Connect your QR scan data with other data sources, such as website or app data, to gain a more holistic view of user behavior.

## Conclusion

Adding UTM parameters to your QR code URLs is an easy way to learn how your QR code users are behaving once they scan.

QuickChart's QR code capability makes it easy to generate customized QR codes with UTM parameters, enabling businesses to measure the effectiveness of their marketing efforts using their existing analytics suite.

Need help? Don't hesitate to [contact us](/contact/).

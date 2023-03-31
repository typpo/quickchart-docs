---
slug: /generate-qr-codes-excel-google-sheets/
title: How to generate QR codes with Excel or Google Sheets
sidebar_label: Excel & Google Sheets
tags: ['excel', 'google sheets', 'qr codes']
---

import Author from '@site/documentation/components/Author';
import Image from '@site/documentation/components/Image';
import QrDataExampleUrl from '@site/documentation/images/qr-codes/qr-data-example.png';
import QrDataWithFormulaUrl from '@site/documentation/images/qr-codes/qr-data-with-formula.png';
import QrDataFullUrl from '@site/documentation/images/qr-codes/qr-data-full.png';
import QrTemplateUrl from '@site/documentation/images/qr-codes/qr-template.png';

QR codes can be generated in spreadsheets with a special `IMAGE()` formula.

Start by putting your data in the first column of the spreadsheet. We’ll call this column **QR data**. It can contain a URL to your website, or any other text.

You can include variables such as **utm_source** and **utm_campaign** - the QR reader on modern phones can handle pretty much anything:

<Image noBorder src={QrDataExampleUrl} alt="Example QR code data" />

Next, enter the following formula for the first row in column B, which we’ll label **Image**:

```jsx
=IMAGE("https://quickchart.io/qr?text=" & ENCODEURL(A2))
```

Excel/Google Sheets will render the QR code based on the data provided in cell A2:

<Image noBorder src={QrDataWithFormulaUrl} alt="Spreadsheet QR code with formula" />

To generate a QR code for every row in the spreadsheet, copy the formula to each row:

<Image noBorder src={QrDataFullUrl} alt="QR codes in spreadsheet" />

That’s it! You should be able to scan one of these QR codes with your phone.

## QR sheet templates

To make things easier, we’ve created template spreadsheets. These spreadsheets automatically generate QR codes for URLs and other data you put in Column A.

**To use in Excel**, download the [Excel template](@site/static/resources/QR_Code_Spreadsheet_Template.xlsm). This sheet includes `IMAGE` and `ENCODEURL` macros that are required for QR code generation.

Be sure to enable macros when you open the spreadsheet. If you receive an error that Microsoft has blocked macros in this file, follow [these instructions from Microsoft](https://support.microsoft.com/en-us/office/enable-or-disable-macros-in-microsoft-365-files-12b036fd-d140-4e74-b45e-16fed1a7e5c6) to enable macros.

**To use in Google Sheets**, open this [Google Sheets QR code template](https://docs.google.com/spreadsheets/d/11owVTeI5ks3NH3ekFDmpygm1tsvqPGECQSh7k1qK3DY/edit?usp=sharing). Go to `File > Make a copy` in order copy it to your own Google Drive and start generating QR codes.

<Image noBorder src={QrTemplateUrl} alt="Generate QR codes with a spreadsheet" />

## Customize the QR code

The QR codes we’ve seen so far are very basic. Did you know you can customize your QR code’s size, color, and margins? To customize the appearance of your QR code, start with the [QR code builder](https://quickchart.io/qr-code-api/) and create a custom QR code.

You’ll notice that the generated QR code has **size, margin, dark,** and **light** parameters in the URL. Add these parameters to the QR code formula in the spreadsheet in order to customize your QR codes.

Further customization is described by the QR code [documentation](/documentation/qr-codes/).

## Stuck? Here’s how to get help

Get unstuck by asking your questions in the [QuickChart community](https://community.quickchart.io/). We monitor community posts every day and will answer all questions related to QR code generation in spreadsheets.

<Author />

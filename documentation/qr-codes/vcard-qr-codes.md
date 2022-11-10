---
slug: /vcard-qr-codes/
title: How to create QR codes for vCards
sidebar_label: Generating vCards
tags: ['qr codes']
---

import Author from '@site/documentation/components/Author';
import Image from '@site/documentation/components/Image';
import CodeWithHighlights from '@site/documentation/components/CodeWithHighlights';
import ScanImage from '@site/documentation/images/qr-codes/vcard-scan.png';
import SheetImage from '@site/documentation/images/qr-codes/vcard-spreadsheet.png';

A vCard (or Virtual Contact File) is a specially formatted text that is used to transfer contacts between phones. Because it's just text, it's possible to create a QR code that can be scanned as a contact.

Nearly all phones can export contacts as vCards, which makes them a useful format for sending contact information. QR codes are a universal format that allow users to easily import this information on their phone.

<Image noBorder maxWidth={500} src={ScanImage} alt="Phone screenshot scanning a vCard QR code" />

In the example above, we used a spreadsheet generate vCards that can be imported as QR codes:

## How it works

Under the hood, vCards are just text. Here's an example vCard:

```
BEGIN:VCARD
VERSION:3.0
N:Lastname;Firstname
FN:Firstname Lastname
ORG:CompanyName
TITLE:JobTitle
ADR:;;123 Sesame St;SomeCity;CA;12345;USA
TEL;WORK;VOICE:1234567890
TEL;CELL:Mobile
TEL;FAX:
EMAIL;WORK;INTERNET:foo@email.com
URL:http://website.com
END:VCARD
```

If you encode the above into QR code text, you can use the [QR code API](https://quickchart.io/qr-code-api/) to get the following:

<Image noBorder src="https://quickchart.io/qr?text=BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3ALastname%3BFirstname%0AFN%3AFirstname%20Lastname%0AORG%3ACompanyName%0ATITLE%3AJobTitle%0AADR%3A%3B%3B123%20Sesame%20St%3BSomeCity%3BCA%3B12345%3BUSA%0ATEL%3BWORK%3BVOICE%3A1234567890%0ATEL%3BCELL%3AMobile%0ATEL%3BFAX%3A%0AEMAIL%3BWORK%3BINTERNET%3Afoo%40email.com%0AURL%3Ahttp%3A%2F%2Fwebsite.com%0AEND%3AVCARD" caption="This QR code contains a vCard" />

This can be done by taking the base URL, `https://quickchart.io/qr?text=`, and then adding a URL-encoded vCard:

<CodeWithHighlights code="**https://quickchart.io/qr?text=**BEGIN%3AVCARD%0AVERSION%3A3.0%0AN%3ALastname%3BFirstname%0AFN%3AFirstname%20Lastname%0AORG%3ACompanyName%0ATITLE%3AJobTitle%0AADR%3A%3B%3B123%20Sesame%20St%3BSomeCity%3BCA%3B12345%3BUSA%0ATEL%3BWORK%3BVOICE%3A1234567890%0ATEL%3BCELL%3AMobile%0ATEL%3BFAX%3A%0AEMAIL%3BWORK%3BINTERNET%3Afoo%40email.com%0AURL%3Ahttp%3A%2F%2Fwebsite.com%0AEND%3AVCARD" />

To learn more about the API, check out the [documentation](/documentation/qr-codes/).

For more information on customizing the vCard, the [vCard Wikipedia article](https://en.wikipedia.org/wiki/VCard#Properties) contains a useful reference table that summarizes potential vCard properties for your use.

## Automatically generating the vCard and QR code

We can go one step further. Here's an [example spreadsheet](https://docs.google.com/spreadsheets/d/1-THXs_VCw0SAar3GsNtZlm0p8HGpupZvV_jwjRhxGSQ/edit#gid=0) that shows how you can generate scannable vCard QR codes based on your data.

First, we use a formula to fill in the **vCard** column based on the First name, Last name, Company, Cell, and Email columns:

```
="BEGIN:VCARD
VERSION:3.0
FN:" & A2 & " " & B2 &"
ORG:" & C2 & "
TEL:" & D2 & "
EMAIL:" & E2 &"
END:VCARD"""
```

Then, we use the `ENCODEURL` function to encode the vCard value to get a working URL:

```
="https://quickchart.io/qr?text=" & ENCODEURL(F2)
```

The resulting URL is valid and can be downloaded or embedded anywhere.

Finally, use the `IMAGE` function to render the QR code:

```
=IMAGE(G2)
```

<Image src={SheetImage} alt="Spreadsheet with vCard QR codes" />

That's all there is to it! To further customize your QR code, refer to the [documentation](/documentation/qr-codes/).

For questions, head to the [community forum](https://community.quickchart.io/).

<Author />

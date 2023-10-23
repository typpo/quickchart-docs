---
slug: /authentication/
title: Authenticating API requests
tags: ['account']
sidebar_position: 18
---

# How to use the authenticated QuickChart API

import CodeWithHighlights from '../components/CodeWithHighlights';

You will receive an **API key** and **account ID** upon signup. The easiest way to authenticate your requests is to attach your API key as a GET or POST parameter.

Your key should only be used on the server-side, or by completely trusted clients. Do not put your API key in a place where it is publicly visible, as this will allow anyone to use your account. See [signing requests](#signing-requests) for a way to secure your credentials with untrusted clients.

Before authenticating your requests, make sure you've read the [documentation](/documentation/) and understand how to construct a render request.

## Basic authentication

To bypass rate limiting and access other paid account features, include your key in a chart URL like so:

<CodeWithHighlights wrap code="https://quickchart.io/chart?**key=YOUR_API_KEY**&c=%7Btype%3A%27bar%27%2Cdata%3A%7Blabels%3A%5B%27January%27%2C%27February%27%2C%27March%27%2C%27April%27%2C%20%27May%27%5D%2C%20datasets%3A%5B%7Blabel%3A%27Dogs%27%2Cdata%3A%5B50%2C60%2C70%2C180%2C190%5D%7D%2C%7Blabel%3A%27Cats%27%2Cdata%3A%5B100%2C200%2C300%2C400%2C500%5D%7D%5D%7D%7D" />

You may include your key in a QR code request like so:

<CodeWithHighlights wrap code="https://quickchart.io/qr?**key=YOUR_API_KEY**&text=Hello%20world" />

Note that the above chart definition and QR string are URL-encoded, as recommended in the [main documentation](/documentation/usage/parameters/).

### POST requests

If you are constructing a chart with a POST request, you may include your key as a parameter within the POST body:

```js
// POST to https://quickchart.io/chart
{
  "key": "YOUR_API_KEY",
  "backgroundColor": "transparent",
  "width": 500,
  "height": 300,
  "format": "png",
  "chart": {...}
}
```

## Chart Maker

If you are using the [Chart Maker](https://quickchart.io/chart-maker/), enter your API key under the `Accounts` section on the left sidebar.

## Generate a short URL

Creating a short URL is an easy way to generate charts for your users without exposing your API key. Include your key in a request to the `/chart/create` endpoint. For example:

```bash
curl -X POST \
 -H 'Content-Type: application/json' \
 -d '{"key": "YOUR_API_KEY", "chart": {"type": "bar", "data": {"labels": ["Hello", "World"], "datasets": [{"label": "Foo", "data": [1, 2]}]}}}' \
 https://quickchart.io/chart/create
```

You will receive a JSON response that looks like this:

```json
{
  "success": true,
  "url": "https://quickchart.io/chart/render/9a560ba4-ab71-4d1e-89ea-ce4741e9d232"
}
```

The `url` in the response will render the chart and is safe to share with untrusted users. Note that short URLs expire after 6 months and are available for charts only, not QR codes.

See complete [short URL documentation](/documentation/usage/short-urls-and-templates/) for details.

## Signing requests

This approach allows you to authenticate requests to QuickChart's HTTP GET endpoint.

Signed URLs look like this:

```
https://quickchart.io/chart?c={...}&sig=88cd2108b5347d973cf39cdf9053d7dd42704876d8c9a9bd8e2d168259d3ddf7&accountId=12345
```

To render an image for an untrusted client, use your **account ID** and sign the request with your API key. You will add `sig` (signature) and `accountId` parameters to your request.

Your code should follow this logic:

1. Create an [HMAC signature](https://en.wikipedia.org/wiki/HMAC) using your API key as the secret key. Include the raw **`chart`** parameter as the content of this HMAC signature (if you are generating a QR code, use the **`text`** parameter).
2. Add the signature as a **`sig`** param to your request and add your account ID as an **`accountId`** param.
3. URL-encode your **`chart`** or **`text`** parameter.

This logic can be completed in pretty much any programming language.

### Javascript

Here's a Javascript example:

```js
// Set up the signing function
const crypto = require('crypto');

function sign(apiKey, val) {
  return crypto.createHmac('sha256', apiKey).update(val).digest('hex');
}

// Add QuickChart credentials
const ACCOUNT_ID = '12345';
const API_KEY = 'abc123';

// Generate a URL for QR code
const qrText = 'Hello world';
const qrSignedParam = sign(API_KEY, qrText);

const qrPublicUrl = `https://quickchart.io/qr?text=${encodeURIComponent(
  qrText,
)}&sig=${qrSignedParam}&accountId=${ACCOUNT_ID}`;

console.log('Link to QR code:', qrPublicUrl);
```

We can generate a signed chart request like so:

```js
// Generate a URL for chart
const chartObj = JSON.stringify({...});
const chartSignedParam = sign(API_KEY, chartObj);

const chartPublicUrl = `https://quickchart.io/chart?c=${encodeURIComponent(chartObj)}&sig=${chartSignedParam}&accountId=${ACCOUNT_ID}`;

console.log('Link to chart:', chartPublicUrl);
```

Note that chart objects must be converted to string format. `JSON.stringify` is suitable for this purpose if your chart doesn't contain Javascript. If your chart contains custom Javascript, see [how to use Javascript functions](/documentation/javascript-functions/).

### Python

Here's an equivalent example in Python:

```python
import hmac, hashlib, codecs
from urllib.parse import quote

# Set up signing function
def sign(api_key, val):
    return codecs.getencoder("hex")(
        hmac.new(api_key.encode("utf-8"), val.encode("utf-8"), hashlib.sha256).digest()
    )[0].decode("utf-8")

# Set up credentials
ACCOUNT_ID = "12345"
API_KEY = "abc123"

# Generate a URL
qr_text = "Hello world"
sig = sign(API_KEY, qr_text)

url = f"https://quickchart.io/qr?text={quote(qr_text)}&sig={sig}&accountId={ACCOUNT_ID}"

print("Link to QR code:", url)
```

To create a chart request, change the URL to the chart endpoint:

```python
chart_config = '{...}'
sig = sign(API_KEY, chart_config)

url = f"https://quickchart.io/chart?c={quote(chart_config)}&sig={sig}&accountId={ACCOUNT_ID}"

print("Link to chart:", url)
```

See more [Python examples](/documentation/send-charts-in-email/#email-charts-with-python).

### PHP

Signing a request in PHP with HMAC:

```php
// Set up signing function
function sign($apiKey, $val) {
  return hash_hmac('sha256', $val, $apiKey);
}

// Set up credentials
define('ACCOUNT_ID', '12345');
define('API_KEY', 'abc123');

// Generate a URL
$qrText = 'Hello world';

$sig = sign(API_KEY, $qrText);
$url = 'https://quickchart.io/qr?text=' . urlencode($qrText) . '&sig=' . $sig . '&accountId=' . ACCOUNT_ID;

echo 'Link to QR code: ' . $url;
```

Here's an example of a request to the `/chart` endpoint:

```php
$chartConfig = '{...}';

$sig = sign(API_KEY, $chartConfig);
$url = 'https://quickchart.io/chart?c=' . urlencode($chartConfig) . '&sig=' . $sig . '&accountId=' . ACCOUNT_ID;

echo 'Link to chart: ' . $url;
```

See more [PHP examples](/documentation/send-charts-in-email/#email-charts-with-php).

### Java

Signing a chart request in Java with HMAC:

```java
import java.net.URLEncoder;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.security.SignatureException;
import java.util.Formatter;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

class QuickchartAuth {
    private static final String HMAC_ALGORITHM = "HmacSHA256";

    private static String toHexString(byte[] bytes) {
        Formatter formatter = new Formatter();
        for (byte b: bytes) {
            formatter.format("%02x", b);
        }
        return formatter.toString();
    }

    public static String sign(String key, String val)
    throws SignatureException, NoSuchAlgorithmException, InvalidKeyException {
        SecretKeySpec signingKey = new SecretKeySpec(key.getBytes(), HMAC_ALGORITHM);
        Mac mac = Mac.getInstance(HMAC_ALGORITHM);
        mac.init(signingKey);
        return toHexString(mac.doFinal(val.getBytes()));
    }
}

public class Main {
    public static void main(String[] args) throws Exception {
        // Set up credentials
        String ACCOUNT_ID = "12345";
        String API_KEY = "abc123";

        // Generate a URL for QR code
        String qrText = "Hello world";
        String sig = QuickchartAuth.sign(API_KEY, qrText);

        String url = String.format("https://quickchart.io/qr?text=%s&sig=%s&accountId=%s", URLEncoder.encode(qrText), sig, ACCOUNT_ID);

        System.out.println(url);

        // Or generate a URL for chart
        String chartConfig = "{...}";
        String chartSig = QuickchartAuth.sign(API_KEY, chartConfig);

        String chartUrl = String.format("https://quickchart.io/chart?c=%s&sig=%s&accountId=%s", URLEncoder.encode(chartConfig), chartSig, ACCOUNT_ID);

        System.out.println(chartUrl);
    }
}
```

See more [Java examples](/documentation/send-charts-in-email/#email-charts-with-java).

### C#

Signing a chart request in C# (.NET 6.0):

```csharp
using System;

using System.Security.Cryptography;
using System.Text;
using System.Web;

class Program {
  public static string ComputeSignature(string apiKey, string content) {
    using(var hmacsha256 = new HMACSHA256(ASCIIEncoding.UTF8.GetBytes(apiKey))) {
      var bytes = Encoding.UTF8.GetBytes(content);
      var hashedBytes = hmacsha256.ComputeHash(bytes);
      return Convert.ToHexString(hashedBytes).ToLower();

      // For .NET 4.x and earlier, replace above return statement with:
      // return BitConverter.ToString(hashedBytes).ToLower().Replace("-", "");
    }
  }

  public static void Main(string[] args) {
    var API_KEY = "q-xyz";
    var ACCOUNT_ID = "123456";

    var config = @"{
  type: 'bar',
  data: {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Users',
      data: [50, 60, 70, 180]
    }]
  }
}";

    var signature = ComputeSignature(API_KEY, config);
    var encodedConfig = HttpUtility.UrlEncode(config);
    var signedChartUrl = $"https://quickchart.io/chart?c={encodedConfig}&sig={signature}&accountId={ACCOUNT_ID}";

    Console.WriteLine(signedChartUrl);
  }
}
```

See more [C# examples](/documentation/send-charts-in-email/#email-charts-with-c%23).

### Google Sheets

To sign a request in Google Sheets, you must create an Apps Script.

1. Open your Google Sheets spreadsheet.

2. Click on `Extensions` in the menu, then `Apps Script`.

3. Delete any code in the script editor and replace it with the following:

```javascript
function signRequest(content) {
  var apiKey = 'YOUR_API_KEY';
  var accountId = 'YOUR_ACCOUNT_ID';

  var signature = Utilities.computeHmacSha256Signature(content, apiKey);
  var signatureInHex = signature.map(function(byte) {
    return ('0' + (byte & 0xFF).toString(16)).slice(-2);
  }).join('');

  var url = 'https://quickchart.io/qr?text=' + encodeURIComponent(content) + '&sig=' + signatureInHex + '&accountId=' + accountId;

  return url;
}
```

Replace `'YOUR_API_KEY'` and `'YOUR_ACCOUNT_ID'` with your actual QuickChart API key and account ID.

4. Click on `File` > `Save`. Name your project something like "QuickChart QR Code Generator".

5. Close the Apps Script Editor.

6. Now, you can use the `signRequest` function in your spreadsheet like any other function. For example, if you have a QR code text in cell A1, you can generate a signed QR code URL in cell B1 with `=signRequest(A1)`.


### Excel

To generate a signed QR code URL directly from your spreadsheet using a formula, you can create a VBA function `GenerateQRCodeURL`:

1. Open Excel and press `Alt + F11` to open the VBA editor.

2. In the VBA editor, go to `Insert` > `Module`. This will open a blank page where you can write your code.

3. Copy and paste the following code into the module:

```vba
Function HMACSHA256(ByVal strKey As String, ByVal strData As String) As String
    Dim objHash As Object
    Dim strHexHash As String
    Dim strBuffer As String
    Dim i As Long
    Dim key() As Byte
    Dim data() As Byte

    Set objHash = CreateObject("System.Security.Cryptography.HMACSHA256")
    key = strKey
    data = strData

    objHash.key = key
    strBuffer = objHash.ComputeHash_2((data))
    strHexHash = ""

    For i = 1 To LenB(strBuffer)
        strHexHash = strHexHash & Right$("0" & Hex(AscB(MidB(strBuffer, i, 1))), 2)
    Next

    HMACSHA256 = strHexHash
End Function
```

4. In the same module, add the following code:

```vba
Function GenerateQRCodeURL(qrText As Range) As String
    Dim apiKey As String
    Dim accountId As String
    Dim sig As String
    Dim url As String

    apiKey = "YOUR_API_KEY"
    accountId = "YOUR_ACCOUNT_ID"
    sig = HMACSHA256(apiKey, qrText.Value)

    url = "https://quickchart.io/qr?text=" & WorksheetFunction.EncodeURL(qrText.Value) & "&sig=" & sig & "&accountId=" & accountId

    GenerateQRCodeURL = url
End Function
```

5. Replace `'YOUR_API_KEY'` and `'YOUR_ACCOUNT_ID'` with your actual QuickChart API key and account ID.

6. Close the VBA editor.

7. Now, you can use the `GenerateQRCodeURL` function in your spreadsheet like any other function.

  For example, if you have a QR code text in cell A1, you can generate a signed QR code URL in cell B1 with `=GenerateQRCodeURL(A1)`.


### Other languages

Signing requests can be done in any language as HMAC is a common method for signing requests. Just look up how to create an HMAC signature in your language of choice.

Feel free to [reach out](mailto:support@quickchart.io) if you have any questions!

## Verifying implementation

Chart requests can return charts whether or not the key is valid. Charts without a valid key have standard rate limiting and other characteristics of the "Community" plan, for backwards compatibility reasons with certain clients.

To confirm that your implementation is successful and API key is recognized, load a chart image URL and verify that the `X-quickchart-verified-key` header is present.

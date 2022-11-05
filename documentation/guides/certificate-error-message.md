---
title: How to handle certificate error message/expired certificate
tags: ['troubleshooting']
sidebar_position: 30
sidebar_label: Certificate errors
---

If you are receiving a certificate error message while using or accessing QuickChart, or notice of an expired certificate, this likely means that you have an outdated root certificate. To fix, you must update your local CA bundle.

The root cause of this is that a root certificate `IdentTrust DST Root CA X3` expired. Those with outdated systems still have this certificate.

- [Learn more here](https://scotthelme.co.uk/lets-encrypt-old-root-expiration/)
- [Relevant news article](https://techcrunch.com/2021/09/21/lets-encrypt-root-expiry/?guccounter=1)

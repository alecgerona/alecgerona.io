---
title: How to handle the LetsEncrypt expiry (and others like it) 
date: 2021-10-02
description: "This will just keep happening so better pay attention."
featuredImage: https.jpg
---

## What happened (and what will)
As of 30 September 2021, LetsEncrypt's DST Root CA X3 has expired. And unlike a lot of major shit that broke
the internet, this was not something due to what LetsEncrypt did or failed to do. Read more about this 
[here](https://letsencrypt.org/docs/dst-root-ca-x3-expiration-september-e021/).

Basically, certificates _will_ expire.

## What to do
Well, for starters, if you have been keeping on top of your updates, you should have no issues whatsoever. However,
for legacy devices/servers that are not, well, that's what this post is about. There's already a lot of related write-up
regarding the whys and hows so I'd focus on the actual things that I've had to do to get past this issue.

### Ubuntu 14.04 LTS
Let's start with the oldest. It's as straightforward as deleting the expired certificate from the store.
```shell
sudo rm /usr/share/ca-certificates/mozilla/DST_Root_CA_X3.crt
sudo update-ca-certificates
```

### Ubuntu 16.04 LTS
A bit newer but still outdated, this is more simple as it has the packages it needs to update your
store for you.

```shell
sudo apt install libgnutls-openssl27 libgnutls30
```

And there you go. For other devices such as Windows 10 and smartphone OSs, [this](https://docs.certifytheweb.com/docs/kb/kb-202109-letsencrypt/)
should help.

I'll update this post as I encounter related issues that can or can't be fixed by the above methods.

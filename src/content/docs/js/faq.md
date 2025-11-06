---
title: Web - FAQ
description: Find answers to common questions and troubleshoot potential issues with ConnectyCube Web SDK.
head:
  - tag: title
    content: Web FAQ | ConnectyCube
sidebar: 
    label: FAQ
    order: 18
---

## Push notifications
<br>
<details>
<summary>Can I implement push notifications for Web app?</summary>

ConnectyCube provides Push Notification for Web: 
<https://connectycube.com/2025/03/27/introducing-web-push-notifications-stay-updated-anytime/?cat=all>

Detailed guide to follow: <https://developers.connectycube.com/js/push-notifications/>

</details>

## Troubleshooting
<br>
<details>
<summary>Increase the token expiry time</summary>

Expiration time for session token is 2 hours after last request to API. If you attempt to perform a query using an expired token, you will receive the error message: 'Required session does not exist.' In this case you need to recreate a session token. [There is a special callback function](<https://developers.connectycube.com/js/authentication-and-users?id=session-expiration#session-expiration>) to handle this case.

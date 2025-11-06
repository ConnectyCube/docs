---
title: Server - FAQ
description: Find answers to common questions and troubleshoot potential issues with Server API.
head:
  - tag: title
    content: Server API FAQ | ConnectyCube
sidebar: 
    label: FAQ
    order: 13
---

## General questions
<br>
<details>
<summary>Can the chat history be stored in the customer's database as well (like in MongoDB)? Currently, the chat data is being saved in the ConnectyCube database. Is there any webhook or method available that would allow us to achieve this?</summary>

There are multiple options to do so:
1. using administration API you can periodically sync chats & messages to your DB
    <https://developers.connectycube.com/admin_api/chat/#dialogs-list>
    <https://developers.connectycube.com/admin_api/chat/#messages-list>
2. on client side, when send a message via ConnectyCube, you also can do API call to your DB to store the messages there as well
3. If you just want to ‘own’ all your data, there is ConnectyCube Enterprise plan where we install whole ConnectyCube infra into your AWS account (or any other cloud/on-prem)

</details>

<details>
<summary>Different requirements for 'login' parameter value in ConnectyCube API and in the app</summary>

The validation rules for the login field are 3-70 characters, this is the minimum possible limit to make sure login can be secured.

If in the app the requirements for login parameter are less than 3 symbols - as a workaround to meet the requirements, you can fill the login with bulls before the ID to be the valid length:

ID 1 -> 001

ID 2 -> 002
….

You can use any other constant prefix before the ID to ensure the validation rules are met.

</details>




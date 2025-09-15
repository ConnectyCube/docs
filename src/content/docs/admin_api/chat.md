---
title: Chat
description: Enabling admins to monitor and extract the total number of dialogs, messages and more. Gain valuable insights for effective management and optimization.
head:
  - tag: title
    content: Chat API for administration | Connectycube
sidebar: 
    label: Chat
    order: 3
---

## Dialog Update

###### Endpoint
```
PUT https://api.connectycube.com/admin/chat/{dialog_id}
```
###### Parameters

| Parameter           | Data type          | Description                                                             | Value example
|---------------------|--------------------|-------------------------------------------------------------------------|----------------
| user_id          | integer | User Id for parameter `is_muted` | 32242

Other parameters same as for [Update Dialog API](/server/chat#update-a-dialog)

###### Request example

```bash
curl -X PUT \
-H "CB-Administration-API-Key: <API_KEY>" \
-d '{"user_id": 32242, "is_muted": true}' \
https://api.connectycube.com/admin/chat/620e2b1463ee2a1977b4ee65
```

###### Response

```json
{
  "_id": "620e2b1463ee2a1977b4ee65",
  "user_id": 32241,
  "created_at": "2022-02-17T11:01:40Z",
  "updated_at": "2022-02-17T11:01:49Z",
  "type": 3,
  "occupants_ids":[32241, 32242],
  "last_message": null,
  "last_message_date_sent": null,
  "last_message_id": null,
  "last_message_user_id": null,
  "last_message_status": null,
  "name": null,
  "description": null,
  "photo": null,
  "occupants_count": null,
  "xmpp_room_jid": null,
  "is_e2ee": null,
  "admins_ids":[],
  "is_muted": null,
  "unread_messages_count": null,
  "pinned_messages_ids": null,
  "deleted_ids":[],
  "silent_ids":[32242]
}
```

## Dialogs List

###### Endpoint
```
GET https://api.connectycube.com/admin/chat/list
```
###### Parameters

| Parameter           | Data type          | Description                                                             | Value example
|---------------------|--------------------|-------------------------------------------------------------------------|----------------
| updated_at          | integer (timestamp)| Filter dialogs by updated_at field (operators `gt`, `lt`, `gte`, `lte`) | updated_at[gt]=1687886581
| created_at          | integer (timestamp)| Filter dialogs by updated_at field (operators `gt`, `lt`, `gte`, `lte`)  | created_at[lte]=1687886581
| _id                 | string (ObjectId)  | Filter dialogs by _id field (operators `gt`, `lt`, `gte`, `lte`)         | _id[gte]=620e2b1463ee2a1977b4ee65
| limit               | integer            | Dialogs in one response (default 100, max 100)                          | limit=50
| sort_asc/sort_desc  | string             | Set sort direction asc/desc (supported fields `created_at`, `updated_at`, `_id`)                                      | sort_desc=updated_at

Other parameters same as for [Retrieve Dialog API](/server/chat#retrieve-chat-dialogs)

###### Request example

```bash
curl -X GET \
-H "CB-Administration-API-Key: <API_KEY>" \
-d 'updated_at[lt]=1687886581' \
https://api.connectycube.com/admin/chat/list
```

###### Response

```json
{
  "total_entries": 1788,
  "skip": 0,
  "limit": 100,
  "items": [
    {
      "_id": "620e2b1463ee2a1977b4ee65",
      "user_id": 32241,
      "created_at": "2022-02-17T11:01:40Z",
      "updated_at": "2022-02-17T11:01:49Z",
      "type": 3,
      "occupants_ids":[32241, 32242],
      "last_message": "Warning! People are coming",
      "last_message_date_sent": 1645095709,
      "last_message_id": "620e2b14e45f5b089d000008",
      "last_message_user_id": 32241,
      "last_message_status": "sent",
      "name": null,
      "description": null,
      "photo": null,
      "occupants_count": null,
      "xmpp_room_jid": null,
      "is_e2ee": null,
      "admins_ids":[],
      "is_muted": null,
      "unread_messages_count": null,
      "pinned_messages_ids": null,
      "deleted_ids":[],
      "silent_ids":[]
    }
    ...
  ]
}
```

Response is similar to [Retrieve dialog API](/server/chat#response), but with additional fields

| Parameter   | Data type                           | Description                                                                          | Value example
|-------------|-------------------------------------|--------------------------------------------------------------------------------------|----------------
| silent_ids  | array of int (field may be missing) | Array of users ids who muted chat   | `[32241, 32245]`
| deleted_ids | array of int (field may be missing) | Array of users ids who deleted chat | `[32245]`

###### NodeJS example

To get list of all dialogs, use pagination by `_id` field:

```js
import fetch from 'node-fetch'

const url = 'https://api.connectycube.com/admin/chat/list'
const headers = { 'CB-Administration-API-Key': 'XXXXXXXXXXXXXXXXX' }
const limit = 100

let allDialogs = []

const firstResponse = await fetch(`${url}?limit=${limit}`, { headers }).then(response => response.json())
const { total_entries, items } = firstResponse

console.log(total_entries) // 1167

allDialogs = allDialogs.concat(items)

const totalBatchesCount = Math.ceil(total_entries / limit)

for (let i = 1; i < totalBatchesCount; ++i) {
  const lastRetrievedDialog = allDialogs.at(-1)
  const lastId = lastRetrievedDialog['_id']

  const firstResponse = await fetch(`${url}?limit=${limit}&_id[lt]=${lastId}`, { headers }).then(response => response.json())
  const { items } = firstResponse

  allDialogs = allDialogs.concat(items)
}

console.log(allDialogs.length) // 1167
```

## Messages List

###### Endpoint
```
GET https://api.connectycube.com/admin/chat/messages/list
```
###### Parameters

| Parameter           | Data type          | Description                                                             | Value example
|---------------------|--------------------|-------------------------------------------------------------------------|----------------
| updated_at          | integer (timestamp)| Filter messages by updated_at field (operators `gt`, `lt`, `gte`, `lte`) | updated_at[gt]=1687886581
| created_at          | integer (timestamp)| Filter messages by updated_at field (operators `gt`, `lt`, `gte`, `lte`)  | created_at[lte]=1687886581
| _id                 | string (ObjectId)  | Filter messages by _id field (operators `gt`, `lt`, `gte`, `lte`)         | _id[gte]=63834bbecf1efb102da40f2c
| limit               | integer            | Messages in one response (default 100, max 100)                          | limit=50
| chat_dialog_id      | string (ObjectId)  | Filter messages by chat_dialog_id field                                 | chat_dialog_id=61721539107bd9002fdb84ed
| sort_asc/sort_desc  | string             | Set sort direction asc/desc (supported fields `created_at`, `updated_at`, `_id`)                                      | sort_desc=updated_at


###### Request example

```bash
curl -X GET \
-H "CB-Administration-API-Key: <API_KEY>" \
-d '_id[lte]=63834bbecf1efb102da40f2c' \
https://api.connectycube.com/admin/chat/messages/list
```

###### Response

```json
{
  "total_entries": 663,
  "skip": 0,
  "limit": 100,
  "items": [
    {
      "_id": "63834bbecf1efb102da40f2c",
      "chat_dialog_id": "61721539107bd9002fdb84ed",
      "message": "Warning! People are coming! Right Now. By Http",
      "date_sent": 1669548990,
      "sender_id": 4980089,
      "recipient_id": 4997495,
      "created_at": "2022-11-27T11:36:31Z",
      "updated_at": "2022-11-27T11:36:31Z",
      "read_ids": [4980089],
      "delivered_ids": [4980089],
      "userExtraData": null,
      "mission": "take over the planet",
      "name": "intel",
      "attachments": [
          {
                "type": "image",
                "id": "3004"
          },
      ],
      "reactions": null,
      "views_count": 0,
      "edited_at": null,
      "read": 0
    }
    ...
  ]
}
```

Response is similar to [Retrieve messages API](/server/chat#response-13), but with additional fields

| Parameter   | Data type                           | Description                                                                          | Value example
|-------------|-------------------------------------|--------------------------------------------------------------------------------------|----------------
| deleted_for_ids | array of int (field may be missing) | Array of users ids who deleted message | `[32245]`

###### NodeJS example

To get list of all messages, use pagination by `_id` field:

```js
import fetch from 'node-fetch'

const url = 'https://api.connectycube.com/admin/chat/messages/list'
const headers = { 'CB-Administration-API-Key': 'XXXXXXXXXXXXXXXXX' }
const limit = 100

let allMessages = []

const firstResponse = await fetch(`${url}?limit=${limit}`, { headers }).then(response => response.json())
const { total_entries, items } = firstResponse

console.log(total_entries) // 663

allMessages = allMessages.concat(items)

const totalBatchesCount = Math.ceil(total_entries / limit)

for (let i = 1; i < totalBatchesCount; ++i) {
  const lastRetrievedMessage = allMessages.at(-1)
  const lastId = lastRetrievedMessage['_id']

  const firstResponse = await fetch(`${url}?limit=${limit}&_id[lt]=${lastId}`, { headers }).then(response => response.json())
  const { items } = firstResponse

  allMessages = allMessages.concat(items)
}

console.log(allMessages.length) // 663
```
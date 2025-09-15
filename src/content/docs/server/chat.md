---
title: Chat API
description: Integrate powerful chat functionality into your app effortlessly with our versatile Chat APIs. Enhance user communication and engagement.
head:
  - tag: title
    content: Chat API | Connectycube
sidebar: 
    label: Chat
    order: 4
---

ConnectyCube Chat API consists of 2 parts: REST API and Real-Time (XMPP) API. This document describes the REST API part. To get an info about Real-Time (XMPP) API - please refer to [Real-Time (XMPP) API documentation page](/server/realtime_api).

## Features

Robust, quick, ‘keep-alive’ connection. Unlimited concurrent connections thanks to ConnectyCube auto-scalable AWS powered cloud chat servers infrastructure.

- **1:1 chat** (private user to user chat)
- **Group chat** (unlimited chat rooms)
- **Incoming chat alerts** (push notifications) for offline users
- **File attachments** - cloud hosted, so both users don’t have to be online to receive messages. Allow users to send photos, videos and other files.
- **Voice chat / call** – enable 1:1 voice calls in the application
- **Video chat / call** – enable video chats in the application
- **NAT traversal** – our TURN server and optimization system take care of NAT traversal and traffic compression making sure your chat, voice and video traffic reaches all users across the networks with different configurations

## Chat dialog model

Chat Dialog model describes a conversation between users.

**Chat model structure:**

| Field name             | Description                                                                                                                                                  |
| ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| \_id                   | ID of dialog. Generated automatically by server after dialog is created                                                                                      |
| user_id                | ID of dialog's owner                                                                                                                                         |
| created_at             | Unix timestamp. Date & time when record was created. System creates this parameter automatically                                                             |
| description            | Dialog description                                                                                                                                           |
| updated_at             | Unix timestamp. Date & time when record was updated. System creates this parameter automatically                                                             |
| type                   | Type of the dialog: type 1 - broadcast, type 2 - group chat, type 3 - private chat, type 4 - public chat                                                     |
| name                   | Name of a group chat                                                                                                                                         |
| photo                  | Image of the chat. Can contain a link to a file in Connectycube storage, Custom Objects module or just a web link                                            |
| xmpp_room_jid          | Jaber identifier of XMPP room for group chat to connect. Not applicable for private chat (type 3). Generated automatically by server after dialog is created |
| occupants_ids          | List of users in the chat. Applicable for private and group chats only                                                                                       |
| occupants_count        | Number of users in the public chat                                                                                                                           |
| admins_ids             | List of users who have admin rights                                                                                                                          |
| last_message           | Last message sent in the chat dialog                                                                                                                         |
| last_message_id        | ID of the last message in the chat dialog                                                                                                                    |
| last_message_user_id   | ID of user who sent the last message in the chat dialog                                                                                                      |
| last_message_date_sent | Date & time when the last message in the chat dialog was sent                                                                                                |
| last_message_status     | Last sent message state. Will be 'null' if last message is sent by other user (not you). Will be one of the 'sent', 'delivered', 'read' if last message is sent by you                                                                                                   |
| unread_messages_count  | Number of unread messages in the dialog for current user                                                                                                     |
| pinned_messages_ids    | IDs of messages pinned in the chat dialog                                                                                                                    |
| extensions             | Object of allows fields |
| permissions            | Object with permissions props (`allow_preview`) |

## Message model

Chat Message model describes a chat message in a chat dialog.

**Message model structure:**

| Field name        | Description                                                                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| \_id              | Message ID. Generated automatically by server after message is created                                                                                                   |
| created_at        | Unix timestamp. Created by system automatically                                                                                                                          |
| updated_at        | Unix timestamp. Created by system automatically and is updated when the message is updated or read                                                                       |
| chat_dialog_id    | ID of the dialog the current chat message is related to. Generated automatically by server after message is created                                                      |
| message           | Message body                                                                                                                                                             |
| date_sent         | Date when massage has been sent                                                                                                                                          |
| sender_id         | ID of a user who sent a message                                                                                                                                          |
| recipient_id      | ID of user who received a message                                                                                                                                        |
| read_ids          | List of IDs of users who read the messages                                                                                                                               |
| delivered_ids     | List of users IDs a message was delivered to                                                                                                                             |
| views_count       | Number of views of the messages. Available for broadcast (type 1) and public chats (type 1)                                                                              |
| attachments       | List of attachments. Each attachment object contains 3 keys: type (audio / video / image), id (link to file in Connectycube storage), url (link to file in the Internet) |
| Custom parameters | Chat message can contain any other user custom parameters (additional metadata)                                                                                          |
| reactions | Reactions object with total and own reactions                                                                                          |

## Roles and privileges

There are different roles of users in a chat dialog:

**Regular user** - user who can send and receive messages.

**Admin** - advanced user with moderation privileges.

**Super admin** - chat owner (creator) with all possible privileges.

| Roles        | Private chat                                                                                                                   | Group chat                                                                                                                                                                                | Public chat                                                                                                                                                         | Broadcast                                                                                                                           |
| ------------ | ------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| Regular user | <li>send/receive messages</li><li>delete own message (one side/both sides)</li><li>delete chat dialog for themselves</ul></li> | <li>send/receive messages</li><li>delete own message (one side/both sides)</li><li>delete chat dialog for themselves</li><li> add more users</li><li>change name, photo, description</li> | <li>send/receive messages</li><li>delete own message (one side/both sides)</li><li>delete chat dialog for themselves (or unsubscribe)</li>                          | <li>receive messages</li><li> delete chat dialog for themselves</li>                                                                |
| Admin        | -                                                                                                                              | <li>delete any messages for everyone</li><li>pin messages</li><li>add/remove users</li><li>regular user privileges</li>                                                                   | <li>change name, description, photo</li><li>delete any messages for everyone</li><li>pin messages</li><li> block/unblock users</li><li>regular user privileges</li> | <li>change name, description, photo</li><li>delete any messages for everyone</li><li>pin messages</li><li> block/unblock users</li> |
| Super admin  | -                                                                                                                              | <li>add/remove admins</li><li>delete dialog for everyone</li><li>regular admin privileges</li>                                                                                            | <li>add/remove admins</li><li>delete dialog for everyone</li><li>regular admin privileges</li>                                                                      | <li>add/remove admins</li><li>delete dialog for everyone</li>                                                                       |

## Retrieve chat dialogs

Retrieve all the dialogs associated with the current user. Server returns all dialogs where the current user's ID is in the list of 'occupants_ids' field (type 2, type 3) OR in the list of 'occupants_count' (type 4). Server identifies user ID with a session token. If there is a **broadcast chat** in the app, this chat will be retrieved for all users.

###### Endpoint

```bash
GET https://api.connectycube.com/chat/Dialog
```

###### Parameters

| Operator                        | Applied fields                                                   | Description                                                                                                                                                                                                                                                                                                                                                                                                                                            | Value example       |
| ------------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------- |
| {field_name}                    | \_id, type, name, last_message_date_sent, created_at, updated_at, extensions[friend_id] | Retrieve dialogs with the exact data specified in the request                                                                                                                                                                                                                                                                                                                                                                                          | type=2              |
| {field_name}[{search_operator}] | \_id, type, name, last_message_date_sent, created_at, updated_at, extensions[friend_id] | Retrieve dialogs with the exact data specified in the request with applying additional filters. Available filters: **lt** (Less Than operator), **lte** (Less Than or Equal to operator), **gt** (Greater Than operator), **gte** (Greater Than or Equal to operator), **ne** (Not Equal to operator), **in** (Contained IN array operator), **nin** (Not contained IN array), **all** (ALL contained IN array), **ctn** (Contains substring operator) | type[in]=2,3        |
| limit                           | standalone operator                                              | Setting of limit for a number of search results to display. Default - 100                                                                                                                                                                                                                                                                                                                                                                              | limit=70            |
| skip                            | standalone operator                                              | Skip the defined number of records in the search results. By default all records are shown                                                                                                                                                                                                                                                                                                                                                             | skip=20             |
| count                           | standalone operator                                              | Count search results. Response will contain only count of records found.                                                                                                                                                                                                                                                                                                                                                                               | count=1             |
| sort_desc/sort_asc              | last_message_date_sent                                           | Sorting of query result set in ascending / descending order                                                                                                                                                                                                                                                                                                                                                                                            | sort_desc=date_sent |

###### Request Example

```bash
curl -X GET \
-H "CB-Token: <TOKEN>" \
https://api.connectycube.com/chat/Dialog
```

###### Response

```json
{
    "total_entries": 4,
    "skip": 0,
    "limit": 100,
    "items": [
        {
            "_id": "5c094c0ce588ce6856f87422",
            "admins_ids": [29085],
            "created_at": "2018-12-06T16:19:24Z",
            "description": "Cute chat",
            "last_message": "nope?",
            "last_message_date_sent": 1544452627,
            "last_message_id": "5c0e7a13e588ce6b6f3ebf80",
            "last_message_user_id": 29086,
            "last_message_status": "sent",
            "name": "hello kitty",
            "occupants_ids": [
                29085,
                29086,
                29087
            ],
            "photo": null,
            "pinned_messages_ids": ["5c0e7a13e588ce6b6f3ebf80"],
            "type": 2,
            "updated_at": "2018-12-10T14:37:07Z",
            "user_id": 29085,
            "unread_messages_count": 1,
            "xmpp_room_jid": "105_5c094c0ce588ce6856f87422@muc.chatstage.connectycube.com",
            "extensions": null,
            "permissions": null
        },
        ...
    ]
}
```

## Create a dialog

There are four types of dialogs available to be created:

- type=1 - **broadcast** - type of chat where a message is sent to all users within application at once. All the users from the application are able to join this group.

  Max users count - all chat users

  Roles: 1 Super Admin (chat creator) and up to 5 admins

- type=2 - **group chat** - type of chat where one user creates chat with other users. More users can be added later. All messages in chat have read / delivered status

  Max users count - according to [Plans](https://connectycube.com/pricing/)

  Roles: 1 Super Admin (chat creator) and up to 5 admins

- type=3 - **private chat** between 2 users. If user sends a chat message to some user and private dialog isn't created - it will be created automatically with the first chat message. All messages in chat have read / delivered status

  Max users count - 2

  Roles: two regular users

- type=4 - **public chat** - type of chat where any user can subscribe via public link.

  Max users count - according to [Plans](https://connectycube.com/pricing/)

  Roles: 1 Super Admin (chat creator) and up to 5 admins

###### Endpoint

```
POST https://api.connectycube.com/chat/Dialog
```

###### Parameters

| Parameter     | Required                                                              | Description                                                                                                                     |
| ------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| type          | Yes                                                                   | Type of new dialog. Possible values: **1** - broadcast, **2** - group chat, **3** - private 1-to-1 chat, **4** - public chat    |
| occupants_ids | Yes, for group (type 2) and private (type 3) chats                    | List of users who are participants of the chat. The current user id will be added automatically. Example: `occupants_ids=45,78` |
| admins_ids    | No                                                                    | Chat admins. Example: `admins_ids=65,89`                                                                                        |
| name          | Yes, for broadcast (type 1), public (type 4) and group (type 2) chats | Name of a dialog. Ignored for private chats (type 3)                                                                            |
| photo         | No                                                                    | Dialog image. Ignored for private chats (type 3)                                                                                |
| description   | No                                                                    | Dialog description                                                                                                              |
| extensions    | No                                                                    | Object of allows fields |
| permissions   | No                                                                    | Object with permissions props  |

### Dialog permissions 

Dialog could have different permissions to managa data access. This is managed via `permissions` field.

At the moment, only one permission available - `allow_preview` - which allows to retrieve dialog's messages for user who is not a member of dialog. This is useful when implement feature like Channels where a user can open chat and preview messages w/o joining it.

### Dialog metadata 

A dialog can have up to 3 custom sub-fields to store additional information that can be linked to chat. 

These parameters also can be used as a filter for retrieving dialogs.

To start using extensions, allowed fields should be added first. Go to [Admin panel](https://admin.connectycube.com) > Chat > Custom Fields and provide allowed custom fields.

![Dialog Extensions fields configuration example](../../../assets/rest_api/dialog_custom_params.png)

When create a dialog, the `extensions` field object must contain allowed fields only. Others fields will be ignored. The values will be casted to string.

When remove custom field in Admin panel, this field will be removed in all dialogs respectively.

###### Create dialogs with extensions request example

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d '{"type":2, "name":"Night party", "occupants_ids": [29085,29087], "extensions": { "location": "Sun bar", "unknown_field": "will be ignored" }, "permissions": { "allow_preview": true }}' \
https://api.connectycube.com/chat/Dialog
```

###### Response

```json
{
  "_id": "5c091060e588ce59fdf873dd",
  "admins_ids": [],
  "created_at": "2018-12-06T12:04:48Z",
  "description": null,
  "last_message": null,
  "last_message_date_sent": null,
  "last_message_id": null,
  "last_message_user_id": null,
  "last_message_status": null,
  "name": "Night party",
  "occupants_ids": [29085, 29087],
  "photo": null,
  "pinned_messages_ids": [],
  "type": 2,
  "updated_at": "2018-12-06T12:04:48Z",
  "user_id": 29085,
  "unread_messages_count": 0,
  "xmpp_room_jid": "105_5c091060e588ce59fdf873dd@muc.chatstage.connectycube.com",
  "extensions": {
    "location": "Sun bar",
  },
  "permissions": {
    "allow_preview": true
  }
}
```

###### Update dialogs with extensions request example

```bash
curl -X PUT \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d '{ "extensions": { "location": "Sun bar", "unknown_field": "will be ignored" }}' \
https://api.connectycube.com/chat/Dialog/5c091060e588ce59fdf873dd
```

###### Response

```json
{
  "_id": "5c091060e588ce59fdf873dd",
  "admins_ids": [],
  "created_at": "2018-12-06T12:04:48Z",
  "description": null,
  "last_message": null,
  "last_message_date_sent": null,
  "last_message_id": null,
  "last_message_user_id": null,
  "last_message_status": null,
  "name": "Night party",
  "occupants_ids": [29085, 29087],
  "photo": null,
  "pinned_messages_ids": [],
  "type": 2,
  "updated_at": "2018-12-06T12:04:48Z",
  "user_id": 29085,
  "unread_messages_count": 0,
  "xmpp_room_jid": "105_5c091060e588ce59fdf873dd@muc.chatstage.connectycube.com",
  "extensions": {
    "location": "Sun bar",
  },
  "permissions": {
    "allow_preview": true
  }
}
```

To reset extensions params in dialogs just set `extensions` to `null`

###### Search dialogs by extensions request example

```bash
curl -X GET \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d 'extensions[location]=Sunbar' \
https://api.connectycube.com/chat/Dialog
```

###### Response

```json
{
    "total_entries": 1,
    "skip": 0,
    "limit": 100,
    "items": [
      {
        "_id": "5c091060e588ce59fdf873dd",
        "admins_ids": [],
        "created_at": "2018-12-06T12:04:48Z",
        "description": null,
        "last_message": null,
        "last_message_date_sent": null,
        "last_message_id": null,
        "last_message_user_id": null,
        "last_message_status": null,
        "name": "Night party",
        "occupants_ids": [29085, 29087],
        "photo": null,
        "pinned_messages_ids": [],
        "type": 2,
        "updated_at": "2018-12-06T12:04:48Z",
        "user_id": 29085,
        "unread_messages_count": 0,
        "xmpp_room_jid": "105_5c091060e588ce59fdf873dd@muc.chatstage.connectycube.com",
        "extensions": {
          "location": "Sun bar",
        }
      }
    ]
}
```

## Update a dialog

Based on the roles and privileges, users with different roles can update different data.

###### Endpoint

```
PUT https://api.connectycube.com/chat/Dialog/{dialog_id}
```

###### Parameters

| Parameter           | Description                                         | Value example                                                                                                                                                                                 |
| ------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| occupants_ids       | Add / delete occupants in the dialog                | <li>{"push_all": {"occupants_ids": ["id_1","id_2"]}}</li> <li>"pull_all": {"occupants_ids": ["id_1","id_2"]}</li>                                                                             |
| pinned_messages_ids | Make messages pinned / unpinned in the chat history | <li>{"push_all": {"pinned_messages_ids": ["pinned_message_id_1", "pinned_message_id_2"]}}</li> <li>{"pull_all": {"pinned_messages_ids": ["pinned_message_id_1", "pinned_message_id_2"]}}</li> |
| admins_ids          | Add / delete admins in the dialog                   | <li>{"push_all": {"admins_ids": [admin_id_1]}}</li> <li>{"pull_all": {"admins_ids": [admin_id_1]}}</li>                                                                                       |
| name                | Name of the dialog                                  | {"name": "dialog_name"}                                                                                                                                                                       |
| photo               | Photo of the dialog                                 | {"photo": "image.jpg"}                                                                                                                                                                        |
| description         | Description of the dialog                           | {"description": "Chat for Java developers"}                                                                                                                                                   |
| extensions          | Object with allowed fields                          | {"extensions": {"status": "CatSitter"}}
| permissions         | Permissions object                                  | {"permissions": {"allow_preview": false}}

###### Request example

```bash
curl -X PUT \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d '{"name":"Crossfit2","push_all":{"occupants_ids":[29088],"pinned_messages_ids":["5c123fdce588ce064043f53a"]},"photo":"gym2.jpeg", "permissions": { "allow_preview": false }}' \
https://api.connectycube.com/chat/Dialog/5c123f75e588ce063e43f541
```

###### Response

```json
{
  "_id": "5c123f75e588ce063e43f541",
  "admins_ids": [],
  "created_at": "2018-12-13T11:16:05Z",
  "description": "strong man",
  "last_message": "cool",
  "last_message_date_sent": 1544699868,
  "last_message_id": "5c123fdce588ce064043f53a",
  "last_message_user_id": 29085,
  "last_message_status": "read",
  "name": "Crossfit2",
  "occupants_ids": [29085, 29086, 29087, 29088],
  "photo": "gym2.jpeg",
  "pinned_messages_ids": ["5c123fdce588ce064043f53a"],
  "type": 2,
  "updated_at": "2018-12-13T11:21:21Z",
  "user_id": 29085,
  "unread_messages_count": 0,
  "xmpp_room_jid": "105_5c123f75e588ce063e43f541@muc.chatstage.connectycube.com",
  "extensions": null,
  "permissions": {
    "allow_preview": false
  }
}
```

## Delete dialog

Each user from 'occupant_ids' can remove the dialog. Dialog will be removed for the current user only and will continue to be available for other users in the group.

To remove a dialog completely, set `force=1` parameter in the DELETE request. Only **owner** (in private dialog `type=3` **owner** or **admin**) can do this.

### Delete single dialog

###### Endpoint

```
DELETE https://api.connectycube.com/chat/Dialog/{dialog_id}
```

###### Request example

```bash
curl -X DELETE \
-H "CB-Token: <TOKEN>" \
https://api.connectycube.com/chat/Dialog/5c091060e588ce59fdf873dc
```

###### Response

```json
200 OK
```

### Delete several dialogs

###### Endpoint

```
DELETE https://api.connectycube.com/chat/Dialog/{dialog1_id},{dialog2_id}
```

###### Request example

```bash
curl -X DELETE \
-H "CB-Token: <TOKEN>" \
https://api.connectycube.com/chat/Dialog/23thnu15e4b077ddd43e7db7,499abe15e4b077ddd43e7b5h
```

###### Response

```json
{
  "SuccessfullyDeleted": {
    "ids": ["23thnu15e4b077ddd43e7db7"]
  },
  "NotFound": {
    "ids": ["499abe15e4b077ddd43e7b5h"]
  },
  "WrongPermissions": {
    "ids": ["5e394e7bca8bf410bc8017b0"]
  }
}
```

## Clear dialog history

This request will clear all messages in the dialog for current user, but not for other users.

To clear all messages for each user form dialog completely, set `force=1` parameter in the DELETE request. Only **owner** (in private dialog `type=3` **owner** or **admin**) can do this.

###### Endpoint

```
DELETE https://api.connectycube.com/chat/Dialog/clearHistory/{dialog_id}
```

###### Request example

```bash
curl -X DELETE \
-H "CB-Token: <TOKEN>" \
https://api.connectycube.com/chat/Dialog/clearHistory/5c091060e588ce59fdf873dc
```

###### Response

```json
200 OK
```

## Subscribe to public dialog

Add user to the list of occupants. Applicable for public dialogs (type=4) only.

###### Endpoint

```
POST https://api.connectycube.com/chat/Dialog/{dialog_id}/subscribe
```

###### Request example

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
https://api.connectycube.com/chat/Dialog/5c091822e588ce6856f873de/subscribe
```

###### Response

```json
{
  "_id": "5c091822e588ce6856f873de",
  "admins_ids": [],
  "created_at": "2018-12-06T12:37:54Z",
  "description": "good news",
  "last_message": null,
  "last_message_date_sent": null,
  "last_message_id": null,
  "last_message_user_id": null,
  "last_message_status": "read",
  "name": "Public chat",
  "occupants_count": 2,
  "occupants_ids": [],
  "photo": null,
  "pinned_messages_ids": [],
  "type": 4,
  "updated_at": "2018-12-06T12:40:03Z",
  "user_id": 28926,
  "unread_messages_count": null,
  "xmpp_room_jid": "105_5c091822e588ce6856f873de@muc.chatstage.connectycube.com",
  "extensions": null,
  "permissions": null
}
```

## Unsubsribe from public dialog

Remove user from the list of occupants. Applicable for public dialogs (type=4) only.

###### Endpoint

```
DELETE https://api.connectycube.com/chat/dialog/{dialog_id}/subscribe
```

###### Request example

```bash
curl -X DELETE \
-H "CB-Token: <TOKEN>" \
https://api.connectycube.com/chat/dialog/5c091822e588ce6856f873de/subscribe
```

###### Response

```json
200 OK
```

<!--## Block user
Block user in public chat and in the broadcast by his identifier. Only admins or super admin of chat can block users.
As a result, user will be unsubscribed from a chat

###### Endpoint
```
POST https://api.connectycube.com/chat/dialog/{dialog_id}/block
```
###### Parameters
| Parameter | Description |
|---------- |--------------
|user_id | Identifier of user to block

###### Request example
```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d '{"user_id":"543"}' \
https://api.connectycube.com/chat/dialog/5c091822e588ce6856f873de/block
```

###### Response
```json
200 OK (empty body)
```

## Unblock user
Unblock user in public chat and in the broadcast by his identifier. Only admins or super admin of chat can unblock users.
As a result, user will be unsubscribed from a chat

###### Endpoint
```
DELETE https://api.connectycube.com/chat/dialog/{dialog_id}/block
```

###### Parameters
| Parameter | Description |
|---------- |--------------
|user_id | Identifier of user to block

###### Request example
```bash
curl -X DELETE \
-H "CB-Token: <TOKEN>" \
-d '{"user_id": "543"}' \
https://api.connectycube.com/chat/dialog/5c094c0ce588ce6856f87422/block
```

###### Response

```json
200 OK (empty body)
```

## Retrieve a list of blocked users
Information available to be retrieved public group and broadcast by admins and super admins


###### Endpoint

GET https://api.connectycube.com/chat/dialog/{dialog_id}/block


###### Request example


###### Response

<сделать риквест и добавить сюда респонс-->

## Add / Remove admins

Options to add or remove admins from the dialog can be done by Super admin (dialog's creator) only. Options are supported in group chat, public or broadcast.

Up to 5 admins can be added to chat.

###### Endpoint

```
PUT https://api.connectycube.com/chat/Dialog/{dialog_id}/admins
```

###### Parameters

| Parameter              | Description                                                                          | Value example                             |
| ---------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------- |
| push_all[admins_ids][] | Add admin(s) to the chat. Several admin IDs can be specified separated by comma      | {"push_all": {"admins_ids":[admin_id_1]}} |
| pull_all[admins_ids][] | Remove admin(s) from the chat. Several admin IDs can be specified separated by comma | {"pull_all":{"admins_ids": [admin_id_1]}} |

###### Request example

```bash
curl -X PUT \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d '{"push_all": {"admins_ids": [29087]}}' \
https://api.connectycube.com/chat/Dialog/5c093376e588ce6856f873fe/admins
```

###### Response

```json
{
  "_id": "5c093376e588ce6856f873fe",
  "admins_ids": [29087],
  "created_at": "2018-12-06T14:34:30Z",
  "description": "admins only",
  "last_message": null,
  "last_message_date_sent": null,
  "last_message_id": null,
  "last_message_user_id": null,
  "last_message_status": "delivered",
  "name": "Friday party",
  "occupants_ids": [29085, 29086, 29087],
  "photo": null,
  "pinned_messages_ids": [],
  "type": 2,
  "updated_at": "2018-12-06T14:42:25Z",
  "user_id": 29085,
  "unread_messages_count": null,
  "xmpp_room_jid": "105_5c093376e588ce6856f873fe@muc.chatstage.connectycube.com",
  "extensions": null,
  "permissions": null
}
```

## Update notifications settings

User can turn on/off push notifications for offline messages in a dialog. By default push notification are turned ON, so offline user receives push notifications for new messages in a chat if notifications setting wasn't changed.

###### Endpoint

```
PUT https://api.connectycube.com/chat/Dialog/{dialog_id}/notifications
```

###### Parameters

| Parameter | Value  | Description                   |
| --------- | ------ | ----------------------------- |
| enabled   | 0 or 1 | Enable/ Disable notifications |

###### Request example

```bash
curl -X PUT \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d '{"enabled":"0"}'
https://api.connectycube.com/chat/Dialog/5c093376e588ce6856f873fe/notifications
```

###### Response

```json
{
  "notifications": {
    "enabled": 0
  }
}
```

## Get notifications settings

Check a status of notifications setting - either it is ON or OFF for a particular chat.

Available responses: 1 - enabled, 0 - disabled.

###### Endpoint

```
GET https://api.connectycube.com/chat/Dialog/{dialog_id}/notifications
```

###### Request example

```bash
curl -X GET \
-H "CB-Token: <TOKEN>" \
https://api.connectycube.com/chat/Dialog/5c093376e588ce6856f873fe/notifications
```

###### Response

```json
{
  "notifications": {
    "enabled": 0
  }
}
```

## Retrieve public dialog occupants

A public chat dialog can have many occupants. There is a separated API to retrieve a list of public dialog occupants.

###### Endpoint

```
GET https://api.connectycube.com/chat/Dialog/{dialog_id}/occupants
```

###### Parameters

| Operator        | Description                                                                                                                                                                                                                        | Value example |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| limit                           |  Setting of limit for a number of search results to display. Default - 100                                                                                                                                                                                                                                                                                                                                                                              | limit=70            |
| skip                            |  Skip the defined number of records in the search results. By default all records are shown                                                                                                                                                                                                                                                                                                                                                             | skip=20             |

###### Request example

```bash
curl -X GET \
-H "CB-Token: <TOKEN>" \
https://api.connectycube.com/chat/Dialog/5c093376e588ce6856f873fe/occupants
```

###### Response

```json
{
  "items": [
    {
      "id": 51941,
      "full_name": "Dacia Kail",
      "email": "dacia_k@domain.com",
      "login": "Dacia",
      "phone": "+6110797757",
      "website": null,
      "created_at": "2018-12-06T09:16:26Z",
      "updated_at": "2018-12-06T09:16:26Z",
      "last_request_at": null,
      "external_user_id": 52691165,
      "facebook_id": "91234409",
      "twitter_id": "83510562734",
      "blob_id": null,
      "custom_data": null,
      "avatar": null,
      "user_tags": null
    },
    {
      "id": 51946,
      "full_name": "Gabrielle Corcoran",
      "email": "gabrielle.corcoran@domain.com",
      "login": "gabby",
      "phone": "+6192622155",
      "website": "http://gabby.com",
      "created_at": "2018-12-06T09:29:57Z",
      "updated_at": "2018-12-06T09:29:57Z",
      "last_request_at": null,
      "external_user_id": null,
      "facebook_id": "95610574",
      "twitter_id": null,
      "blob_id": null,
      "custom_data": "Responsible for signing documents",
      "avatar": null,
      "user_tags": "vip,accountant"
    }
    ...
  ]
}
```


###### Response

```json
{
  "notifications": {
    "enabled": 1
  }
}
```

## Retrieve messages

Retrieve all chat messages within a particular dialog.
For **broadcast chat** (type=1) all users within the app can see messages from the dialog. To retrieve chat messages from **group chat** (type=2) and **privat chat** (type=3) user's IDs should be in `occupants_ids` field, whereas for **public chat** (type=4) user's IDs should belong to `occupants_count` field. Server will return dialog's chat messages sorted ascending by `date_sent` field (default sort is applied and can be changed if required).

**Note:** All retrieved chat messages will be marked as read after the request.

###### Endpoint

```
GET https://api.connectycube.com/chat/Message
```

###### Parameters

| Operator                        | Applied fields                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                             | Value example      |
| ------------------------------- | ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ |
| {field_name}                    | \_id, message, date_sent, sender_id, recipient_id, attachments.type, updated_at | Retrieve messages with the exact data specified in the request                                                                                                                                                                                                                                                                                                                                                                                          | recipient_id=546   |
| {field_name}[{search_operator}] | \_id, message, date_sent, sender_id, recipient_id, attachments.type, updated_at | Retrieve messages with the exact data specified in the request with applying additional filters. Available filters: **lt** (Less Than operator), **lte** (Less Than or Equal to operator), **gt** (Greater Than operator), **gte** (Greater Than or Equal to operator), **ne** (Not Equal to operator), **in** (Contained IN array operator), **nin** (Not contained IN array), **all** (ALL contained IN array), **ctn** (Contains substring operator) | sender_id[lt]=132  |
| limit                           | standalone operator                                                             | Set limit for a number of search results. Default - 100                                                                                                                                                                                                                                                                                                                                                                                                 | limit=50           |
| skip                            | standalone operator                                                             | Skip the defined number of records in the search results. By default all records are shown                                                                                                                                                                                                                                                                                                                                                              | skip=30            |
| sort_desc/sort_asc              | date_sent                                                                       | Sorting of query result set in ascending / descending order                                                                                                                                                                                                                                                                                                                                                                                             | sort_asc=date_sent |
| mark_as_read                    | standalone operator                                                                      | Do not mark the received messages as read. To do not mark retrieved messages as **read**, `mark_as_read` parameter should be set to 0                                                                                                                                                                                                                                                                                                                     | mark_as_read=0     |
| preview | standalone operator | You can retrieve last `20` message if you not chat member (`occupants_ids`), only for dialogs with `permissions` prop `allow_preview` = `true`, parameters `skip`, `limit`, `sort_desc`, `sort_asc` will be ignored | preview=1 |

###### Request example

```bash
curl -X GET \
-H "CB-Token: <TOKEN>" \
-d 'chat_dialog_id=5c093376e588ce6856f873fe' \
https://api.connectycube.com/chat/Message
```

###### Response

```json
{
  "skip": 0,
  "limit": 1000,
  "items": [
    {
      "_id": "5c094682e588ce59fff87424",
      "attachments": [],
      "chat_dialog_id": "5c093376e588ce6856f873fe",
      "created_at": "2018-12-06T15:55:46Z",
      "date_sent": 1544111746,
      "delivered_ids": [29085, 29086],
      "message": "What's the price of it?",
      "read_ids": [29085, 29086],
      "recipient_id": 0,
      "sender_id": 29085,
      "updated_at": "2018-12-06T16:05:21Z",
      "reactions": null,
      "views_count": 0,
      "read": 0
    },
    {
      "_id": "5c094687e588ce59fff87425",
      "attachments": [],
      "chat_dialog_id": "5c093376e588ce6856f873fe",
      "created_at": "2018-12-06T15:55:51Z",
      "date_sent": 1544111751,
      "delivered_ids": [29085, 29086],
      "message": "Hello Daniel, how things are going on?",
      "read_ids": [29085, 29086],
      "recipient_id": 0,
      "sender_id": 29085,
      "updated_at": "2018-12-06T16:05:21Z",
      "reactions": { "own": ["👍", "👌"], "total": { "👍": 2, "👌": 1, "🚧": 5 } },
      "views_count": 0,
      "read": 0
    }
  ]
}
```

## Retrieve unread messages count

Retrieve the number of unread chat messages. The output is split across dialogs plus a total number value.

###### Endpoint

```
GET https://api.connectycube.com/chat/Message/unread
```

###### Parameters

| Operator        | Description                                                                                                                                                                                                                        | Value example             |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| chat_dialog_ids | List of dialogs to retrieve the number of unread messages. Applied only for **group chat** (type=2) and **privat chat** (type=3). You can skip the parameter - in this case only total number of unread messages will be returned. | chat_dialog_ids=id_1,id_2 |

###### Request example

```bash
curl -X GET \
-H "CB-Token: <TOKEN>" \
-d 'chat_dialog_ids=5c093376e588ce6856f873fe,76ok0l3e989c12a0e45432a7' \
https://api.connectycube.com/chat/Message/unread
```

###### Response

```json
{
  "total": 5,
  "53aadc78535c127f15009b6c": 3,
  "76ok0l3e989c12a0e45432a7": 2
}
```

## Create a message

Create a chat message to add it to the chat history. Created message won't be delivered to the recipient(s) by Real-Time (XMPP) transport and will be just added to the chat history.

To initiate a real sending to the chat - pass `send_to_chat=1` parameter.

###### Endpoint

```
POST https://api.connectycube.com/chat/Message
```

###### Parameters

| Parameter                   | Required                                          | Description                                                                                                                                                         | Value example                                                                                     |
| --------------------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| chat_dialog_id              | yes, if the `recipient_id` key is not specified   | ID of a dialog where a new message will be added                                                                                                                    | {"chat_dialog_id": "5bec0186e588ce7ff1c0ad0a"}                                                    |
| message                     | no                                                | text of the message (CGI-escaped)                                                                                                                                   | {"message": "Hi! How are you doing?"}                                                             |
| recipient_id                | yes, if the 'chat_dialog_id' key is not specified | ID of a recipient. Useful for private chats only (type 3)                                                                                                           | {"recipient_id": "4377"}                                                                          |
| attachments[n][type/id/url] | no                                                | List of attachments. Each attachment object contains 3 keys: type (audio/video/image/...), id (link to file ID in Connectycube), url (link to file in the Internet) | {"attachments": {"0": {"type": "image", "id": "654645"}, "1": {"type": "video", "id": "654646"}}} |
| Custom parameters           | no                                                | Key-value parameters. Chat message can contain any other custom parameters                                                                                          | {"country": "USA"}                                                                                |
| send_to_chat                | no                                                | Send message to chat. Should be set to 1 if message should be sent                                                                                                  | {"send_to_chat": "1"}                                                                             |
| markable                    | no                                                | Mark message to be processed as read / delivered statuses on a client side                                                                                          | {"markable": "1"}                                                                                 |

###### Request example

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d '{"chat_dialog_id": "5c094c0ce588ce6856f87422", "message": "where are you?", "recipient_id": 29086, "attachments": {"3":  {"type": "image", "id": "3004"}, "7": {"type": "image", "id": "24504"}}}' \
https://api.connectycube.com/chat/Message
```

###### Response

```json
{
  "_id": "5c094e30e588ce59fff87431",
  "attachments": [
    {
      "type": "image",
      "id": "3004"
    },
    {
      "type": "image",
      "id": "24504"
    }
  ],
  "chat_dialog_id": "5c094c0ce588ce6856f87422",
  "created_at": "2018-12-06T16:28:32Z",
  "date_sent": 1544113712,
  "delivered_ids": [29086],
  "message": "where are you?",
  "read_ids": [29086],
  "recipient_id": 29086,
  "sender_id": 29086,
  "updated_at": "2018-12-06T16:28:32Z",
  "views_count": 0,
  "read": 0
}
```

## Update message

Update of sent chat message. Message body and message status can be updated.

It's possible to mark all messages as read / delivered - just don't pass a message id.

###### Endpoint

```
PUT https://api.connectycube.com/chat/Message/{message1_id},{message2_id}
```

###### Parameters

| Field          | Description                          | Example                                        |
| -------------- | ------------------------------------ | ---------------------------------------------- |
| chat_dialog_id | Dialog’s id which message is updated | {"chat_dialog_id": "5b7411335bd08d0e5761bc96"} |
| read           | Mark message as read                 | {"read":"1"}                                   |
| delivered      | Mark message as delivered            | {"delivered": "1}                              |
| message        | Updated message body                 | {"message": "Morning"}                         |

###### Request example

```bash
curl -X PUT \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d '{"read": "1", "chat_dialog_id": "5c094c0ce588ce6856f87422"}'\
https://api.connectycube.com/chat/Message/5c094e30e588ce59fff87431
```

###### Response

```json
200 OK
```

## Delete message

Remove of a chat message for the current user in a specified chat dialog.

There are some rules for removing messages depending the type of the dialog:

- For **broadcast chat** (type=1) only Super admin and admins are able to remove messages from the dialog. General users are readers only.

- For **group chat** (type=2) any user in the dialog’s `occupant_ids` is able to remove a message from the dialog. The message will only be removed for the current user - the message will still be viewable in the chat history for all other users in the dialog. To remove a message completely, `force=1` parameter should be set. Super admin and admins can remove all messages from the dialog, whereas general users are able to remove only own message for all users with `force=1` parameter, but other users messages can remove only for themselves.

- For **private chat** (type=3) users are able remove their own messages from the history. Users can remove messages both, without affecting the history of other user, and, as well as completely remove a message. To remove message for both sides `force=1` parameter should be set for own messages.

- For **public chat** (type=4) any user in the dialog’s `occupants_count` is able to remove a message from the dialog. The message will only be removed for the current user - the message will still be viewable in the chat history for all other users in the dialog. To remove a message completely, `force=1` parameter should be set. Super admin and admins can remove all messages from the dialog, whereas general users are able to remove only own message for all users with `force=1` parameter, but other users messages can remove only for themselves.

Deleting a message with the `force=1` parameter is followed by sending a XMPP packet to the chat room with the request to immediately remove the message from other occupants history.

###### Endpoint

```
DELETE https://api.connectycube.com/chat/Message/{message1_id},{message2_id}
```

###### Request example

```bash
curl -X DELETE \
-H "CB-Token: <TOKEN>" \
https://api.connectycube.com/chat/Message/5c094687e588ce59fff87425,5c094682e588ce59fff87424
```

###### Response

```json
{
  "SuccessfullyDeleted": {
    "ids": ["5c094687e588ce59fff87425"]
  },
  "NotFound": {
    "ids": ["5c094682e588ce59fff87424"]
  },
  "WrongPermissions": {
    "ids": ["5c094682e588ce59fff87423"]
  }
}
```

## Send system message

Create a system message to send a signal. System message will be delivered to the recipient(s) by Real-Time (XMPP) transport.

###### Endpoint

```
POST https://api.connectycube.com/chat/Message/system
```

###### Parameters

| Field        | Required | Description       | Value example
|------------- |--------- |------------------ |-------------------------
| recipientId  | Yes      | recipient user id | {"recipientId": 29086}
| [key string] | No       | any key value pain (string : string/object) | {"userExt": { "name": "Smith" }, "nickname": "Awesome_smith"}

###### Request example

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d '{"recipientId": 29086, "needToUpdatePhotosStories": "1", "friendId": "90675", "userExt": { "name": "Smith" }, "nickname": "Awesome_smith"}' \
https://api.connectycube.com/chat/Message/system
```

###### Response

```json
{
  "messageId": "641307a86e010326b51594dc",
  "recipientId": 29086,
  "extensionParams": {
    "needToUpdatePhotosStories": "1",
    "friendId": "90675",
    "userExt": { "name": "Smith" },
    "nickname": "Awesome_smith"
  }
}
```

## Message reactions

User can add or remove reactions (string) and receive chat server message
Message response reaction format


| Field name | Description |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| own | array of user reactions (session user)                                                                                                  |
| total        |object where key is reaction type and value is count of reactions (including own)                                                                                                                          

```json
{
  ...
  "reactions": {
    "own": ["👌", "😐"],
    "total": {
      "👌": 5,
      "😐": 1
    }
  }
  ...
}
```

### Add/Remove reactions

User can has only one reaction type

###### Endpoint

```
PUT https://api.connectycube.com/chat/Message/{message_id}/reactions
```

###### Request example

```bash
curl -X PUT \
-H "CB-Token: <TOKEN>" \
-d '{"add": "👍", "remove": "👎"}'\
https://api.connectycube.com/chat/Message/5c094687e588ce59fff87425/reactions
```

###### Response

```json
200 OK
```

xmpp message will be sent to chat participants

```xml
<message type="..." xmlns="jabber:client" to="..." id="..." from="...">
  <extraParams xmlns="jabber:client">
    <dialog_id>6304b6a59cf9db00200c1cf7</dialog_id>
  </extraParams>
  <reactions user_id="89209" message_id="5c094687e588ce59fff87425">
    <reaction add="true" type="👍"/>
    <reaction remove="true" type="👎"/>
  </reactions>
</message>
```

### List reactions

User get message reactions object where key is reactions type and value is array of user_ids

###### Endpoint

```
GET https://api.connectycube.com/chat/Message/{message_id}/reactions
```

###### Request example

```bash
curl -X GET \
-H "CB-Token: <TOKEN>" \
https://api.connectycube.com/chat/Message/5c094687e588ce59fff87425/reactions
```

###### Response

```json
{
  "👍": [67456, 5687],
  "👎": [67456, 5687, 9736],
  "🚀": [9736]
}
```

## Global search

It helps to find some messages and chat dialogs.

###### Endpoint

```
GET https://api.connectycube.com/chat/search
```

###### Parameters

| Field           | Required                    | Description                                                                                                                                            | Value example                            |
| --------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------------- |
| search_text     | Yes                         | String. Should be longer than 4 symbols. Searches for the sub-string against chat message's 'message' field and dialog's 'name' field. Case sensitive. | search_text="lorem"                      |
| chat_dialog_ids | No                          | List of dialog ids separated by comas. Max cam include 10 items.                                                                                       | chat_dialog_ids=5c49cb855368b57a05dc5872 |
| start_date      | No                          | Closest date to Time.now. Uses `lte` comparison.                                                                                                       | start_date=2016-03-23T17:00:42Z          |
| end_date        | Yes, if `start_date` passed | Shouldn't differ by more than 3 months from the `start_date`. Uses `gte` comparison.                                                                   | start_date=2016-01-23T17:00:42Z          |
| limit           | No                          | Maximum number of items returned from the server in the search results. Max value - 100                                                                | limit=3                                  |

###### Request example

```bash
curl -X GET \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
'https://api.connectycube.com/chat/search?search_text=lorem&limit=3'
```

###### Response

```json
{
  "results": {
    "dialogs": [
      {
        "_id": "5c4867115368b52b3f5c6b16",
        "admins_ids": [],
        "created_at": "2019-01-23T13:07:29Z",
        "description": null,
        "last_message": null,
        "last_message_date_sent": null,
        "last_message_id": null,
        "last_message_user_id": null,
        "name": "lorem ipsum dolor",
        "occupants_ids": [23, 2172],
        "photo": null,
        "pinned_messages_ids": [],
        "type": 3,
        "updated_at": "2019-01-23T13:07:29Z",
        "user_id": 2172,
        "unread_messages_count": null,
        "xmpp_room_jid": null
      }
    ],
    "messages": [
      {
        "_id": "5c49ccef5368b57a05dc5877",
        "attachments": [],
        "chat_dialog_id": "5c49cb855368b57a05dc5872",
        "created_at": "2019-01-24T14:34:23Z",
        "date_sent": 1548340463,
        "delivered_ids": [2172],
        "message": "Ipsa lorem tempore vitae earum sequi aut velit qui.",
        "read_ids": [2172],
        "recipient_id": 0,
        "sender_id": 2172,
        "updated_at": "2019-01-24T14:34:23Z",
        "views_count": 0,
        "read": 0
      },
      {
        "_id": "5c49cd815368b57a05dc5882",
        "attachments": [],
        "chat_dialog_id": "5c49cb855368b57a05dc5872",
        "created_at": "2019-01-24T14:36:49Z",
        "date_sent": 1548340609,
        "delivered_ids": [2172],
        "message": "Incidunt maxime sapiente cum est dolor fugit lorem.",
        "read_ids": [2172],
        "recipient_id": 0,
        "sender_id": 2172,
        "updated_at": "2019-01-24T14:36:49Z",
        "views_count": 0,
        "read": 0
      }
    ],
    "users": []
  }
}
```

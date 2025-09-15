---
title: Whiteboard API
description: Enable dynamic collaboration in chat with ConnectyCube Whiteboard API.  Ideal for remote meetings, teaching environments, sales demos, real-time workflows.
head:
  - tag: title
    content: Whiteboard API | ConnectyCube
sidebar: 
    label: Whiteboard
    order: 12
---

**Whiteboard API** allows to create whiteboard functionality and associate it with a chat dialog.

Chat dialog's users can collaborate and draw simultaneously on a whiteboard.

Separated whiteboard server endpoint is used:  https://whiteboard.connectycube.com

## Whiteboard model

| Parameter | Description |
|---------- | --------------
| _id | Whiteboard identifier
| name | Whiteboard name
| chat_dialog_id | A chat dialog identifier to which a whiteboard is conected to.
| user_id | Whiteboard creator user id
| created_at | Whiteboard created date.
| updated_at | Whiteboard updated date.

## Create whiteboard

###### Endpoint
```
POST https://api.connectycube.com/whiteboards
```
###### Parameters
| Parameter | Required | Description | Value example
|---------- |--------- |------------ |--------------
| name | Yes | Whiteboard name | "My whiteboard"
| chat_dialog_id | Yes | A chat dialog identifier to which a whiteboard is conected to. Creating whiteboard only available for Group/Private/Meeting chat dialogs. Max 3 whiteboards per chat | "602f9ea20740a24ec238d9da"

Once whiteboard is created - a user can display it in app in WebView using the following url:
```
  https://whiteboard.connectycube.com?whiteboardid={_id}&username={any_desired_username}&title={name}
```

###### Request example

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d '{"name": "My whiteboard", "chat_dialog_id": "602f9ea20740a24ec238d9da"}' \
https://api.connectycube.com/whiteboards
```
###### Response
```json
{
  "_id": "602faca5bb3c7a638f8c0805",
  "name": "My whiteboard",
  "chat_dialog_id": "602f9ea20740a24ec238d9da",
  "user_id": 8117,
  "created_at": "2021-02-19T12:18:45.867Z",
  "updated_at": "2021-02-19T12:18:45.867Z"
}
```

## Retrieve whiteboards

###### Endpoint
```
GET https://api.connectycube.com/whiteboards
```
###### Parameters
| Parameter | Required | Description |
|---------- |--------- |--------------
| chat_dialog_id | Yes | Retrieve whiteboards related to particular chat dialog.

###### Request example

```bash
curl -X GET \
-H "CB-Token: <TOKEN>" \
https://api.connectycube.com/whiteboards?chat_dialog_id=602f9ea20740a24ec238d9da
```
###### Response
```json
[
    {
        "_id": "602faca5bb3c7a638f8c0805",
        "name": "My whiteboard",
        "chat_dialog_id": "602f9ea20740a24ec238d9da",
        "user_id": 8117,
        "created_at": "2021-02-19T12:18:45.867Z",
        "updated_at": "2021-02-19T12:18:45.867Z"
    }
]
```

## Update whiteboards

A request to update whiteboard's parameters.
Only creator can update a whiteboard.

###### Endpoint
```
PUT https://api.connectycube.com/whiteboards/{whiteboard_id}
```
###### Parameters
| Parameter | Required | Description | Data type | Value example
|---------- |--------- |------------ |---------- |--------------
| name | Yes | Whiteboard name | string | "New whiteboard name"

###### Request example

```bash
curl -X PUT \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d '{"name": "New whiteboard name"}' \
https://api.connectycube.com/whiteboards/602faca5bb3c7a638f8c0805
```
###### Response
```json
{
  "_id": "602faca5bb3c7a638f8c0805",
  "name": "New whiteboard name",
  "chat_dialog_id": "602f9ea20740a24ec238d9da",
  "user_id": 8117,
  "created_at": "2021-02-19T12:18:45.867Z",
  "updated_at": "2021-02-19T12:34:45.765Z"
}
```

## Delete whiteboard

Delete a whiteboard by ID.
Only creator can delete a whiteboard.

###### Endpoint
```
DELETE https://api.connectycube.com/whiteboards/{whiteboard_id}
```
###### Request example

```bash
curl -X DELETE \
-H "CB-Token:  <TOKEN>" \
https://api.connectycube.com/whiteboards/602faca5bb3c7a638f8c0805
```
###### Response
```
200 OK
```

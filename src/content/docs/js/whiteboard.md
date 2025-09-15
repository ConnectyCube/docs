---
title: Whiteboard
description: Enable dynamic collaboration in chat with ConnectyCube Whiteboard API. Ideal for remote meetings, teaching environments, sales demos, real-time workflows.
head:
  - tag: title
    content: JavaScript Whiteboard API | ConnectyCube
sidebar: 
    label: Whiteboard
    order: 8
---

ConnectyCube **Whiteboard API** allows to create whiteboard functionality and associate it with a chat dialog. Chat dialog’s users can collaborate and draw simultaneously on a whiteboard.

You can do freehand drawing with a number of tools, add shapes, lines, text and erase. To share boards, you just get an easy link which you can email. Your whiteboard stays safe in the cloud until you’re ready to return to it.

   ![Whiteboard demo](../../../assets/whiteboard_1024x504.png)

The most popular use cases for using the whiteboard:

- Remote meetings
- Remote teaching
- Sales presentations
- Workflows
- Real-time collaboration

https://whiteboard.connectycube.com

## Get started with SDK

Follow the [Getting Started guide](/js/) on how to connect ConnectyCube SDK and start building your first app.

## Preparations

In order to start using whiteboard, an additional config has to be provided:

```javascript
const CONFIG = {
  ...
  whiteboard: {
    server: 'https://whiteboard.connectycube.com'
  }
}

ConnectyCube.init(CREDS, CONFIG);
```

Then, ConnectyCube whiteboard is associated with a chat dialog.
In order to create a whiteboard, you need to have a chat dialog. Refer to [chat dialog creation API](/js/messaging#create-new-dialog).

## Create whiteboard

When create a whiteboard you need to pass a name (any) and a chat dialog id to which whiteboard will be connected.

```javascript
const params = {
  name: 'New Whiteboard',
  chat_dialog_id: "5356c64ab35c12bd3b108a41"
};

ConnectyCube.whiteboard.create(params)
  .then(whiteboard => {
    const wid = whiteboard._id;
  })
  .catch(error => { });
```

Once whiteboard is created - a user can display it in app in a WebView using the following url: `https://whiteboard.connectycube.com?whiteboardid=<_id>&username=<any_desired_username>&title=<name>`

For `username` - any value can be provided. This is to display a text hint near the drawing arrow.

## Retrieve whiteboards

Use the following code snippet to retrieve a list of whiteboards associated with a chat dialog:

```javascript
const params = {chat_dialog_id: "5456c64ab35c17bd3b108a76"};

ConnectyCube.whiteboard.get(params)
  .then(whiteboard => { })
  .catch(error => { });
```

## Update whiteboard

A whiteboard can be updated, e.g. its name:

```javascript
const whiteboardId = "5456c64ab35c17bd3b108a76";

const params = {
  name: 'New Whiteboard',
};

ConnectyCube.whiteboard.update(whiteboardId, params)
  .then(whiteboard => { })
  .catch(error => { });
```

## Delete whiteboard

```javascript
const whiteboardId = "5456c64ab35c17bd3b108a76";

ConnectyCube.whiteboard.delete(whiteboardId)
  .then(whiteboard => { })
  .catch(error => { });
```

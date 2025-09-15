---
title: Chat
description: Integrate powerful chat functionality into your Flutter app effortlessly with our versatile Chat APIs. Enhance user communication and engagement.
head:
  - tag: title
    content: Flutter Chat APIs | ConnectyCube
sidebar: 
    label: Chat
    order: 4
---

ConnectyCube Chat API is built on top of Real-time(XMPP) protocol.
In order to use it you need to setup real-time connection with ConnectyCube Chat server and use it to exchange data.

By default Real-time Chat works over secure TLS connection.

## Connect to chat

```dart
CubeUser user = CubeUser(id: 4448514, password: "awesomepwd");

CubeChatConnection.instance.login(user)
      .then((loggedUser) {})
      .catchError((error) {});
```

Use `connectionStateStream` to listen different connection states:
```dart
CubeChatConnection.instance.connectionStateStream.listen((state) {
    log("New chat connection state is $state", TAG);

    switch (state){
        case CubeChatConnectionState.Idle:
          // instance of connection was created
          break;
        case CubeChatConnectionState.Authenticated:
          // user successfully authorised on ConnectyCube server
          break;
        case CubeChatConnectionState.AuthenticationFailure:
          // error(s) was occurred during authorisation on ConnectyCube server
          break;
        case CubeChatConnectionState.Reconnecting:
          // started reconnection to the chat
          break;
        case CubeChatConnectionState.Resumed:
          // chat connection was resumed
          break;
        case CubeChatConnectionState.Ready:
          // chat connection fully ready for realtime communications
          break;
        case CubeChatConnectionState.ForceClosed:
          // chat connection was interrupted
          break;
        case CubeChatConnectionState.Closed:
          // chat connection was closed
          break;
    }
});
```

### Connect to chat using custom authentication providers

In some cases we don't have a user's password, for example when login via:

- Facebook
- Twitter
- Firebase phone authorization
- Custom identity authentication
- etc.

In such cases ConnectyCube API provides possibility to use ConnectyCube session token as a password for chat connection:

```dart
// get current ConnectyCube session token and set as user's password
String token = CubeSessionManager.instance.activeSession?.token;

CubeUser user = CubeUser(id: 4448514, password: token);
```

## Disconnect

```dart
CubeChatConnection.instance.logout();
```

To **fully destroy** chat connection use `cubeChatConnection.destroy`:
```dart
CubeChatConnection.instance.destroy();
```

## Reconnection

The SDK will try to reconnect to the chat after lost connection.

To configure internal reconnection manager use next code snippet:
```dart
CubeChatConnectionSettings chatConnectionSettings = CubeChatConnectionSettings.instance;
chatConnectionSettings.totalReconnections = 5;     // set 0 to disable internal reconnection manager or value more than 0 to set quantity of times to try to reconnect, default 5 times
chatConnectionSettings.reconnectionTimeout = 5000; // timeout in milliseconds between reconnection attempts, default 5000 milliseconds
```

Additional to the internal reconnection manager or instead of it you can use your own reconnection manager.
For it you can use for example [connectivity](https://pub.dev/packages/connectivity) library from [pub.dev](https://pub.dev/) repo.

You can use code snippet below to listen internet connection state and start relogin to the chat when internet connection will be established:

```dart
connectivityStateSubscription = Connectivity().onConnectivityChanged.listen((connectivityType) {
    if (connectivityType != ConnectivityResult.none) {
        bool isChatDisconnected = CubeChatConnection.instance.chatConnectionState == CubeChatConnectionState.Closed;

        if (isChatDisconnected && CubeChatConnection.instance.currentUser != null) {
          CubeChatConnection.instance.relogin();
        }
    }
});
```

Additionaly you can try reconnect to the chat immediately after lost chat connection, for it use:

```dart
cubeChatConnectionStateSubscription = CubeChatConnection.instance.connectionStateStream.listen((state) {
    if (state == CubeChatConnectionState.Closed) {
        Connectivity().checkConnectivity().then((connectivityType) {
            if (connectivityType != ConnectivityResult.none) {
                if (CubeChatConnection.instance.currentUser != null) {
                    CubeChatConnection.instance.relogin();
                }
            }
        });
    }
});
```

## Dialogs

All chats between users are organized in dialogs.
The are 4 types of dialogs:

- 1-1 chat - a dialog between 2 users.
- group chat - a dialog between specified list of users.
- public group chat - an open dialog. Any user from your app can chat there.
- broadcast - chat where a message is sent to all users within application at once.
All the users from the application are able to join this group. Broadcast dialogs can be created only via Admin panel.

You need to create a new dialog and then use it to chat with other users. You also can obtain a list of your existing dialogs.

## Create new dialog

### Create 1-1 chat

You need to pass `type = CubeDialogType.PRIVATE` and an id of an opponent you want to create a chat with:

```dart
CubeDialog newDialog = CubeDialog(
    CubeDialogType.PRIVATE,
    occupantsIds: [56]);

createDialog(newDialog)
    .then((createdDialog) {})
    .catchError((error) {});
```

### Create group chat

You need to pass `type = CubeDialogType.GROUP` and ids of opponents you want to create a chat with:

```dart
CubeDialog newDialog = CubeDialog(
    CubeDialogType.GROUP,
    name: "Hawaii relax team",
    description: "Some description",
    occupantsIds: [56, 98, 34],
    photo: "https://some.url/to/avatar.jpeg");

  createDialog(newDialog)
      .then((createdDialog) {})
      .catchError((error) {});
```

### Create public group chat

It's possible to create a public group chat, so any user from you application can join it. There is no a list with occupants,  
this chat is just open for everybody.

You need to pass `type = CubeDialogType.PUBLIC` and ids of opponents you want to create a chat with:

```dart
CubeDialog newDialog = CubeDialog(
    CubeDialogType.PUBLIC,
    name: "Blockchain trends",
    description: "Public dialog Description",
    photo: "https://some.url/to/avatar.jpeg");

createDialog(newDialog)
    .then((createdDialog) {})
    .catchError((error) {});
```

### Chat metadata

A dialog can have up to 3 custom sub-fields to store additional information that can be linked to chat. 

To start using extensions, allowed fields should be added first. Go to [Admin panel](https://admin.connectycube.com) > Chat > Custom Fields and provide allowed custom fields.

![Dialog Extensions fields configuration example](../../../assets/rest_api/dialog_custom_params.png)

When create a dialog, the `extensions` field object must contain allowed fields only. Others fields will be ignored. The values will be casted to string.

```dart
CubeDialog newDialog = CubeDialog(CubeDialogType.GROUP);
newDialog.name = 'Friday party';
newDialog.occupantsIds = [29085, 29086, 29087];
newDialog.description = 'lets dance the night away';
newDialog.extensions = {'location': 'Sun bar'};

await createDialog(newDialog)
    .then((createdDialog) {})
    .catchError((onError) {});
```

When remove custom field in Admin panel, this field will be removed in all dialogs respectively.

These parameters also can be used as a filter for retrieving dialogs.

### Chat permissions

Chat could have different permissions to managa data access. This is managed via `permissions` field.

At the moment, only one permission available - `allow_preview` - which allows to retrieve dialog's messages for user who is not a member of dialog. This is useful when implement feature like Channels where a user can open chat and preview messages w/o joining it.

> **Note**
>
> To preview messages w/o joining to dialog pass `preview` operator in request to get messages.

## List dialogs

It's common to request all your dialogs on every app login:

```dart
Map<String, dynamic> additionalParams = {
    'updated_at[gt]': 1583402980
};

getDialogs(additionalParams)
    .then((pagedResult) {})
    .catchError((error) {});
```

If you want to retrieve only dialogs updated after some specific date time, you can use `updated_at[gt]` filter.  
This is useful if you cache dialogs somehow and do not want to obtain the whole list of your dialogs on every app start.

## Update dialog

User can update group chat name, photo or add/remove occupants:

```dart
String dialogId = "5356c64ab35c12bd3b108a41";

CubeDialogCustomData customData = CubeDialogCustomData("CustomDataClassName");
customData.fields['integer_field_name'] = 12345;
customData.fields['string_field_name'] = "test string";

UpdateDialogParams updateDialogParams = UpdateDialogParams();

updateDialogParams.customData = customData;
updateDialogParams.newName = "New name";
updateDialogParams.newDescription = "New decription";
updateDialogParams.newPhoto = "";

updateDialogParams.addOccupantIds = {563547, 563549, 563550};
updateDialogParams.deleteOccupantIds = {88708};
  
updateDialogParams.addAdminIds = {563550};
updateDialogParams.deleteAdminIds = {88709};
  
updateDialogParams.addPinnedMsgIds = {"88709sdfkahfkahfk"};
updateDialogParams.deletePinnedMsgIds = {"87987sdjkgskldglsksdfkahfkahfk"};

updateDialog(dialogId, updateDialogParams.getUpdateDialogParams())
  .then((updatedDialog) {})
  .catchError((error) {});
```

> **Note**
>
> Only group chat owner or admins can remove other users from group chat.

## Remove dialog

The following snippet is used to delete a dialog:

```dart
String dialogId = "5e343635ca8bf479f70453f2";
bool force = false; // true - to delete everywhere, false - to delete for himself

deleteDialog(dialogId, force)
    .then((voidResult) {})
    .catchError((error) {});
```

This request will remove this dialog for current user, but other users still will be able to chat there.
Only group chat owner can remove the group dialog for all users.

You can also delete multiple dialogs in a single request.

```dart
Set<String> ids = {"5e3434e0ca8bf479f70452f1", "5e3302f0ca8bf42b6c"};
bool force = false; // true - to delete everywhere, false - to delete for himself
  
deleteDialogs(ids, force)
    .then((deleteItemsResult) {})
    .catchError((error) {});
```

## Subscribe to public dialog

In order to be able to chat in public dialog, you need to subscribe to it:

```dart
String dialogId = "5356c64ab35c12bd3b108a41";
  
subscribeToPublicDialog(dialogId)
    .then((cubeDialog) {})
    .catchError((error) {});
```

## Unsubscribe from public dialog

```dart
String dialogId = "5356c64ab35c12bd3b108a41";

unSubscribeFromPublicDialog(dialogId)
    .then((voidResult) {})
    .catchError((error) {});
```

## Retrieve public dialog occupants

A public chat dialog can have many occupants. There is a separated API to retrieve a list of public dialog occupants:

```dart
String dialogId = "5356c64ab35c12bd3b108a41";

getDialogOccupants(dialogId)
    .then((pagedResult) {})
    .catchError((error) {});
```

## Add / Remove admins

Options to add or remove admins from the dialog can be done by Super admin (dialog's creator) only.  
Options are supported in group chat, public or broadcast.

Up to 5 admins can be added to chat.

```dart
String dialogId = "5356c64ab35c12bd3b108a41";

addRemoveAdmins(dialogId, toAddIds: {45, 59}, toRemoveIds: {88708, 88709})
    .then((cubeDialog) {})
    .catchError((error) {});
```

## Update notifications settings

A user can turn on/off push notifications for offline messages in a dialog.  
By default push notification are turned ON, so offline user receives push notifications for new messages in a chat.

```dart
String dialogId = "5356c64ab35c12bd3b108a41";
bool enable = true; // true - to enable, false - to disable
  
updateDialogNotificationsSettings(dialogId, enable)
    .then((isEnabled) {})
    .catchError((error) {});
```

## Get notifications settings

Check a status of notifications setting - either it is ON or OFF for a particular chat.

Available responses: true - enabled, false - disabled.

```dart
String dialogId = "5356c64ab35c12bd3b108a41";

getDialogNotificationsSettings(dialogId)
    .then((isEnabled) {})
    .catchError((error) {});
```

## Chat history

Every chat dialog stores its chat history which you can retrieve:

```dart
String dialogId = "5356c64ab35c12bd3b108a41";

GetMessagesParameters params = GetMessagesParameters();
params.limit = 100;
params.filters = [RequestFilter("", "date_sent", QueryRule.GT, 1583402980)];
params.markAsRead = true;
params.sorter = RequestSorter(OrderType.DESC, "", "date_sent");

getMessages(dialogId, params.getRequestParameters())
    .then((pagedResult) {})
    .catchError((error) {});
```

If you want to retrieve chat messages that were sent after or before specific date time only, you can use `"date_sent", QueryRule.GT` or `"date_sent", QueryRule.LT` filter.  
This is useful if you implement pagination for loading messages in your app.

## Send/Receive chat messages

```dart
// some dialog, which must contains opponent's id in 'occupantsIds' for CubeDialogType.PRIVATE and
// 'dialogId' for other types of dialogs

CubeDialog cubeDialog; // some dialog, which must contains opponent's id in 'occupantsIds'
CubeMessage message = CubeMessage();
message.body = "How are you today?";
message.dateSent = DateTime.now().millisecondsSinceEpoch;
message.markable = true;
message.saveToHistory = true;
      
cubeDialog.sendMessage(message)
    .then((cubeMessage) {})
    .catchError((error) {});

// to listen messages
ChatMessagesManager chatMessagesManager = CubeChatConnection.instance.chatMessagesManager;
chatMessagesManager.chatMessagesStream.listen((newMessage) {
    // new message received
}).onError((error) {
    // error received
});
```

## Message metadata

A chat message can have custom sub-fields to store additional information that can be linked to the particular chat message.

When create a message, the custom data can be attached via `properties` field:

```dart
CubeMessage message = CubeMessage();
message.properties["field_one"] = "value_one";
message.properties["field_two"] = "value_two";
```

## 'Sent' status

(coming soon)

## 'Delivered' status

The following callback is used to track the 'delivered' status:

```dart
MessagesStatusesManager messagesStatusesManager = CubeChatConnection.instance.messagesStatusesManager;
messagesStatusesManager.deliveredStream.listen((messageStatuses){
    print("Message RECEIVED ${messageStatuses.userId}, ${messageStatuses.messageId}, ${messageStatuses.dialogId}");
});
```

The SDK sends the 'delivered' status automatically when the message is received by the recipient.
This is controlled by `markable = true` parameter when you send a message. If `markable` is `false` or omitted,  
then you can send the delivered status manually:

```dart
CubeDialog cubeDialog; // some dialog
CubeMessage originalMessage; // message to be marked as delivered
  
cubeDialog.deliverMessage(originalMessage)
    .then((voidResult) {})
    .catchError((error) {});
```

## 'Read' status

Send the 'read' status:

```dart
CubeDialog cubeDialog; // some dialog
CubeMessage originalMessage; // message to be marked as read
  
cubeDialog.readMessage(originalMessage)
    .then((voidResult) {})
    .catchError((error) {});

// listen read status
MessagesStatusesManager messagesStatusesManager = CubeChatConnection.instance.messagesStatusesManager;
messagesStatusesManager.readStream.listen((messageStatuses){
    print("Message READ ${messageStatuses.userId}, ${messageStatuses.messageId}, ${messageStatuses.dialogId}");
});
```

## 'Is typing' status

The following 'typing' notifications are supported:

- typing: The user is composing a message. The user is actively interacting with a message input interface specific
to this chat session (e.g., by typing in the input area of a chat screen)

- stopped: The user had been composing but now has stopped. The user has been composing but has not interacted with
the message input interface for a short period of time (e.g., 30 seconds)

Send the 'is typing' status:

```dart
CubeDialog cubeDialog; // some dialog
      
cubeDialog.sendIsTypingStatus();
cubeDialog.sendStopTypingStatus();
      
TypingStatusesManager typingStatusesManager = CubeChatConnection.instance.typingStatusesManager;
typingStatusesManager.isTypingStream.listen((typingStatus){
    // for CubeDialogType.PRIVATE typingStatus.dialogId will be null
    log("IS_TYPING received: ${typingStatus.userId}, ${typingStatus.dialogId}");
});

typingStatusesManager.stopTypingStream.listen((typingStatus){
    // for CubeDialogType.PRIVATE typingStatus.dialogId will be null
    log("STOP_TYPING received: ${typingStatus.userId}, ${typingStatus.dialogId}");
});
```

## Attachments

Chat attachments are supported with the cloud storage API. In order to send a chat attachment you need  
to upload the file to ConnectyCube cloud storage and obtain a link to the file (file UID).  
Then you need to include this UID into chat message and send it.

```dart
CubeDialog cubeDialog;  // some dialog
File file;              // some file on device storage

uploadFile(file)
    .then((cubeFile) {
        CubeMessage message = CubeMessage();
        message.body = "Attachment";
        message.saveToHistory = true;
        message.markable = true;

        CubeAttachment attachment = CubeAttachment();
        attachment.uid = cubeFile.uid;
        attachment.type = CubeAttachmentType.IMAGE_TYPE;
        
        message.attachments = [attachment];
        
        return cubeDialog.sendMessage(message);
    }).catchError((error) {});
```

The same flow is supported on the receiver's side. When you receive a message, you need to get the file UID  
and then download the file from the cloud storage.

```dart
ChatMessagesManager chatMessagesManager = CubeChatConnection.instance.chatMessagesManager;
chatMessagesManager.chatMessagesStream.listen((incomingMessage) {
  String attachmentUid = incomingMessage.attachments?.first?.uid;
  if (attachmentUid != null) {
    String attachmentUrl = getPrivateUrlForUid(attachmentUid);
  }
});
```

## Update chat message

**Via HTTP API**

Update message/messages on a backend for dialog ID:

```dart
String messageId = "5e3938d3ca8bf410bc80008d";  // id of message to be updated
String dialogId = "5356c64ab35c12bd3b108a41";   // id of dialog, from which is message

UpdateMessageParameters updateMessageParameters = UpdateMessageParameters();
updateMessageParameters.newBody = "Updated body";
//updateMessageParameters.delivered = true; // mark message as delivered
updateMessageParameters.read = true;      // mark message as read

updateMessage(messageId, dialogId, updateMessageParameters.getRequestParameters())
    .then((voidResult) {})
    .catchError((error) {});

//update multiple messages
String dialogId = "5356c64ab35c12bd3b108a41";   // id of dialog, from which are messages
Set<String> messagesIds = {"5e3938d3ca8bf410bc80008d", "5e3938d3ca8bf410bc800bc80"}; //messages ids to be marked

UpdateMessageParameters updateMessageParameters = UpdateMessageParameters();
//updateMessageParameters.delivered = true; // mark message as delivered
updateMessageParameters.read = true;      // mark message as read

updateMessages(dialogId, parameters.getRequestParameters(), messagesIds)
    .then((voidResult) {})
    .catchError((error) {});
```

**Via Chat connection**

Use the following code snippet to edit a message (correct message body).

```dart
CubeDialog cubeDialog; // the dialog where you want to update a message
CubeMessage originalMessage; // the original message with updated body
bool isLast = true; // set `true` if original message is last in chat history, or `false` if not
cubeDialog.editMessage(originalMessage, isLast).then((value) {
  // the message successfully updated
}).catchError((onError) {
  // got error during update the message
});
```

Other user(s) will receive the 'edit' message info to the listener:

```dart
CubeChatConnection.instance.messagesStatusesManager!.editedStream.listen((editStatus) {
  // the message was edited, update your UI
});
```

## Mark as read all chat messages

The following snippet is used to mark all messages as read on a backend for dialog ID:

```dart
String dialogId = "5356c64ab35c12bd3b108a41";   // id of dialog, from which is message

UpdateMessageParameters updateMessageParameters = UpdateMessageParameters();
//updateMessageParameters.delivered = true; // mark message as delivered
updateMessageParameters.read = true;      // mark messages as read

updateMessages(dialogId, updateMessageParameters.getRequestParameters())
    .then((voidResult) {})
    .catchError((error) {});
```

## Message reactions

### Add/Remove reactions

User can add/remove message reactions and listen message reaction events

Add

```dart
var messageId = '58e6a9c8a1834a3ea6001f15';
var reaction = '🔥';
  
addMessageReaction(messageId, reaction)
  .then((_) {})
  .catchError((onError) {});
```

Remove

```dart
var messageId = '58e6a9c8a1834a3ea6001f15';
var reaction = '👎';
  
removeMessageReaction(messageId, reaction)
  .then((_) {})
  .catchError((onError) {});
```

Add/Remove

```dart
var messageId = '58e6a9c8a1834a3ea6001f15';
var reactionToAdd = '👎';
var reactionToRemove = '🚀';
 
updateMessageReactions(
      messageId,
      addReaction: reactionToAdd,
      removeReaction: reactionToRemove)
  .then((_) {})
  .catchError((onError) {});
```

### Listen reactions

```dart
CubeChatConnection.instance.messagesReactionsManager?.reactionsStream.listen((reaction) {
    // var dialogId = reaction.dialogId;
    // var messageId = reaction.messageId;
    // var addReaction = reaction.addReaction;
    // var removeReaction = reaction.removeReaction;
});
```

### List message reactions

User can list message reactions

```dart
var messageId = '58e6a9c8a1834a3ea6001f15';
                            
getMessageReactions(messageId).then((reactions) {
    // the result contains the map where key is the reaction and value is the list of users' ids who reacted with this reaction
    }).catchError((onError) {});
```
Response example from `getMessageReactions(messageId)` - [see](/server/chat#response-22)


## Delete chat messages

**Via HTTP API**

The following snippet is used to remove chat message/messages:

```dart
List<String> ids = ["5e394e7bca8bf410bc8017b0", "5e394e7bca8bf466137fa1eb"];
bool force = false; // true - to delete everywhere, false - to delete for himself

deleteMessages(ids, force)
    .then((deleteItemsResult) {})
    .catchError((error) {});
```

This request will remove the messages from current user history only, without affecting the history of other users.

**Via Chat connection**

Use the following code snippet to delete a message.

```dart
CubeDialog cubeDialog; // the dialog where you want to delete a message
CubeMessage originalMessage; // the original message you want to delete
cubeDialog.deleteMessage(originalMessage).then((value) {
  // the message successfully deleted
}).catchError((onError) {
  // got error during delete the message
});
```

Other user(s) will receive the 'delete' message info to the listener:

```dart
CubeChatConnection.instance.messagesStatusesManager!.deletedStream.listen((status) {
  // the message was deleted, update your UI
});
```

## Unread messages count

You can request total unread messages count and unread count for particular dialog:

```dart
List<String> dialogsIds = ["5e3938d3ca8bf410bc80008c"]; // skip this parameter to get data about all dialogs
getUnreadMessagesCount(dialogsIds)
    .then((unreadCount) {}) // map contains 'total' field and matches dialogId:unreadCount 
    .catchError((error) {});
```

## Global search

The following API is used to search for messages and chat dialogs:

```dart
GlobalSearchParams additionalParams = GlobalSearchParams();
additionalParams.limit = 3;
additionalParams.endDate = DateTime(2020, 1, 1);
additionalParams.startDate = DateTime.now();
additionalParams.dialogIds = ["5e3438c7ca8bf479f704560c"];

searchText("Search query", additionalParams.getSearchParams())
    .then((globalSearchResult) {})
    .catchError((error) {});
```

Please refer to [Global search parameters](/server/chat#global-search) for more info on how to form search params.

## Chat alerts

When you send a chat message and the recipient/recipients is offline, then automatic push notification will be fired.

In order to receive push notifications you need to subscribe for it. Please refer to [Push Notifications](/flutter/push-notifications) guide.

To configure push template which users receive - go to [Dashboard Console, Chat Alerts page](https://admin.connectycube.com/)

Also, here is a way to avoid automatically sending push notifications to offline recipient/recipients. For it add the `silent` parameter with value `1` to the `properties` field of the instance of a `CubeMessage`.

```dart
var message; // some instance of `CubeMessage`
message.properties['silent'] = '1';  
```

After sending such a message, the server won't create the push notification for offline recipient/recipients.


## Mark a client as Active/Inactive

When you send a chat message and the recipient/recipients is offline, then automatic push notification will be fired.

Sometimes a client app can be in a background mode, but still online. In this case it's useful to let server know that a user wants to receive push notifications while still is connected to chat.

For this particular case we have 2 handy methods: `markInactive` and `markActive`:

```dart
CubeChatConnection.instance.markActive();
```

```dart
CubeChatConnection.instance.markInactive();
```

The common use case for these APIs is to call `markInactive` when an app goes to background mode and to call `markActive` when an app goes to foreground mode.

## Get last activity

There is a way to get an info when a user was active last time, in seconds.

This is a modern approach for messengers apps, e.g. to display this info on a Contacts screen or on a User Profile screen.

```dart
int userId = 123234;

CubeChatConnection.instance.getLasUserActivity(userId)
    .then((seconds) {
        // 'userId' was 'seconds' ago
    }).catchError((error){
        // 'userId' never logged to the chat
    });
```

## Last activity subscription

Listen to user last activity status via subscription.

Use the code below to subscribe for the last activity events. You can leave the `callback` at `null` if you don't want to listen to evens for the specific user.

```dart
CubeChatConnection.instance.lastActivityManager?.subscribeToUserLastActivityStatus(userId, callback: (seconds){

});
```

Use the code below to unsubscribe from the last activity events.

```dart
CubeChatConnection.instance.lastActivityManager?.unsubscribeFromUserLastActivityStatus(userId);
```

Use the listener below if you want to listen to events from all users you subscribed to:

```dart
CubeChatConnection.instance.lastActivityManager?.lastActivityStream.listen((lastActivityEvent) {
  log("lastActivityEvent: userId = ${lastActivityEvent.userId}, seconds = ${lastActivityEvent.seconds}");
});
```


## System messages

In a case you want to send a non text message data, e.g. some meta data about chat,  
some events or so - there is a system notifications API to do so:

```dart
SystemMessagesManager systemMessagesManager = CubeChatConnection.instance.systemMessagesManager;
  
CubeMessage systemMessage = CubeMessage();
systemMessage.recipientId = 563550;
systemMessage.properties["custom_param_1"] = "custom_param_1";
systemMessage.properties["custom_param_2"] = "custom_param_2";
systemMessage.properties["custom_param_3"] = "custom_param_3";

systemMessagesManager.sendSystemMessage(systemMessage);    

// listen system messages
systemMessagesManager.systemMessagesStream.listen((systemMessage) {
    log("Receive NEW system message: $systemMessage");
}).onError((error) {
    log("Receive system message ERROR $error"));
});
```

## Moderation

The moderation capabilities help maintain a safe and respectful chat environment. We have options that allow users to report inappropriate content and manage their personal block lists, giving them more control over their experience.

### Report user

For user reporting to work, it requires the following:
1. Go to [ConnectyCube Daashboard](https://admin.connectycube.com/)
2. select your Application
3. Navigate to **Custom** module via left sidebar
4. Create new table called **UserReports** with the following fields:
  - **reportedUserId** - integer
  - **reason** - string

<img src="/images/chat_widget/chat-widget-report-table.png" alt="Chat widget: report table in ConnectyCube dashboard" />

Once the table is created, you can create a report with the following code snippet and then see all the reports in Dashboard:

```dart
CubeCustomObject cubeCustomObject = CubeCustomObject("UserReports");

cubeCustomObject.fields = {
  'reportedUserId': 45,
  'reason': 'User is spamming with bad words',
};

createCustomObject(cubeCustomObject).then((createdObject) {

}).catchError((onError) {});
```

### Report message

For message reporting to work, the same approach to user reporting above could be used. 

You need to create new table called **MessageReports** with the following fields:
- **reportedMessageId** - integer
- **reason** - string

Once the table is created, you can create a report with the following code snippet and then see all the reports in Dashboard:

```dart
CubeCustomObject cubeCustomObject = CubeCustomObject("MessageReports");

cubeCustomObject.fields = {
  'reportedMessageId': '58e6a9c8a1834a3ea6001f15',
  'reason': 'The message contains phishing links',
};

createCustomObject(cubeCustomObject).then((createdObject) {

}).catchError((onError) {});
```

### Block user

Block list (aka Privacy list) allows enabling or disabling communication with other users. You can create, modify, or delete privacy lists, define a default list.

> The user can have multiple privacy lists, but only one can be active.

#### Create privacy list

A privacy list must have at least one element in order to be created.

You can choose a type of blocked logic. There are 2 types:

- Block in one way. When you blocked a user, but you can send messages to him.
- Block in two ways. When you blocked a user and you also can't send messages to him.

```dart
var listName = 'custom';
      
var items = [
  CubePrivacyListItem(34, CubePrivacyAction.deny, isMutual: false),
  CubePrivacyListItem(48, CubePrivacyAction.deny),
  CubePrivacyListItem(18, CubePrivacyAction.allow)
];
      
      
CubeChatConnection.instance.privacyListsManager?.createList(listName, items).then((users) {
  // privacy list was created successfully
}).catchError((exception) {
  // error occurred during creation privacy list
});
```

> In order to be used the privacy list should be not only set, but also activated(set as default).

#### Activate privacy list

In order to activate rules from a privacy list you should set it as default:

```dart
var listName = 'custom';
      
CubeChatConnection.instance.privacyListsManager?.setDefaultList(listName).then((users) {
        
}).catchError((exception) {
        
});
```

#### Update privacy list

There is a rule you should follow to update a privacy list:

- If you want to update or set new privacy list instead of current one, you should decline current default list first.

```dart
var listName = 'custom';

var items = [
  CubePrivacyListItem(34, CubePrivacyAction.deny, isMutual: false),
  CubePrivacyListItem(48, CubePrivacyAction.deny),
  CubePrivacyListItem(18, CubePrivacyAction.allow)
];

CubeChatConnection.instance.privacyListsManager
    ?.declineDefaultList()
    .then((voidResult) => CubeChatConnection.instance.privacyListsManager
        ?.createList(listName, items))
    .then((list) => CubeChatConnection.instance.privacyListsManager
        ?.setDefaultList(listName))
    .then((updatedList) {
            
});  
```

#### Retrieve privacy list names

To get a list of all your privacy lists' names use the following request:

```dart
CubeChatConnection.instance.privacyListsManager?.getAllLists().then((result) {
    log('active: ${result.activeList}');
    log('default: ${result.defaultList}');
    log('allPrivacyLists: ${result.allPrivacyLists}');
}).catchError((exception) {

});
```

#### Retrieve privacy list with name

To get the privacy list by name you should use the following method:

```dart
var listName = 'custom';

CubeChatConnection.instance.privacyListsManager?.getList(listName).then((items) {
    log('items: $items}');
}).catchError((exception) {

});
```

#### Remove privacy list

To delete a list you can call a method below:

```dart
var listName = 'custom';

CubeChatConnection.instance.privacyListsManager?.removeList(listName).then((voidResult) {

}).catchError((exception) {

});
```

#### Blocked user attempts to communicate with user

Blocked users will be receiving an error when trying to chat with a user in a 1-1 chat and will be receiving nothing in a group chat:

```dart
CubeChatConnection.instance.chatMessagesManager?.chatMessagesStream.handleError((errorPacket){

});
```

## Ping server

Sometimes, it can be cases where TCP connection to Chat server can go down without the application layer knowing about it.

To check that chat connection is still alive or to keep it to be alive there is a ping method:

```dart
const msTimeout = 3000;

CubeChatConnection.instance.pingWithTimeout(msTimeout: msTimeout).then((_) {

}).catchError((e) {
// No connection with server
                 
// Let's try to re-connect
// ...
});
```
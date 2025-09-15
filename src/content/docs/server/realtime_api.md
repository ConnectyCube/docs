---
title: Real-time(XMPP) API
description: Discover a Real-time API - quick and reliable solution which combines benefits of scalable cloud hosted XMPP chat server, auth and incoming IM / chat alerts.
head:
  - tag: title
    content: Real-time(XMPP) API | Connectycube
sidebar: 
    label: Real-Time API
    order: 9
---

Real-time(XMPP) API is a quick and reliable solution which combines benefits of scalable cloud hosted XMPP chat server, seamless authorization and incoming IM / chat alerts. It's robust, quick and auto-scalable AWS powered cloud servers infrastructure. It's the best and most comprehensive solution so far to have your users communicate cross-platform.

The following ConnectyCube modules are built on top of real-time(XMPP) API:

* Chat module
* Voice & Video calling module

ConnectyCube real-time API is based on origin XMPP standards, but with slightly changes.

## XMPP features supported

All standard XMPP libraries are supported (please check the list here [http://xmpp.org/xmpp-software/libraries](http://xmpp.org/xmpp-software/libraries). All standard XEPs and the following additional ones (below) are supported:

* RFC-6120 - [http://xmpp.org/rfcs/rfc6120.html](http://xmpp.org/rfcs/rfc6120.html) - Core: SSL/TLS stream encryption, SASL authentication, Resource binding etc
* RFC-6121 - [http://xmpp.org/rfcs/rfc6121.html](http://xmpp.org/rfcs/rfc6121.html) - Instant Messaging and Presence
* XEP-0016 - [http://xmpp.org/extensions/xep-0016.html](http://xmpp.org/extensions/xep-0016.html) - Privacy Lists
* XEP-0203 - [http://xmpp.org/extensions/xep-0203.html](http://xmpp.org/extensions/xep-0203.html) - Offline Message Storage
* XEP-0280 - [http://xmpp.org/extensions/xep-0280.html](http://xmpp.org/extensions/xep-0280.html) - Message Carbons
* XEP-0198 - [http://xmpp.org/extensions/xep-0198.html](http://xmpp.org/extensions/xep-0198.html) - Stream Management
* XEP-0085 - [http://xmpp.org/extensions/xep-0085.html](http://xmpp.org/extensions/xep-0085.html) - Chat State Notifications
* XEP-0079 - [http://xmpp.org/extensions/xep-0079.html](http://xmpp.org/extensions/xep-0079.html) - Advanced Message Processing
* XEP-0045 - [http://xmpp.org/extensions/xep-0045.html](http://xmpp.org/extensions/xep-0045.html) - Multi User Chat
* XEP-0333 - [http://xmpp.org/extensions/xep-0333.html](http://xmpp.org/extensions/xep-0333.html) - Chat Markers
* XEP-0308 - [http://xmpp.org/extensions/xep-0308.html](http://xmpp.org/extensions/xep-0308.html) - Last Message Correction
* XEP-0012 - [http://xmpp.org/extensions/xep-0012.html](http://xmpp.org/extensions/xep-0012.html) - Last Activity
* XEP-0352 - [http://xmpp.org/extensions/xep-0352.html](http://xmpp.org/extensions/xep-0352.html) - Client State Indication

## Endpoint

All XMPP API access is over TLS, and accessed via the **chat.connectycube.com:5223** domain.

For Web applications it's also possible to use BOSH/WebSockets endpoints (**https://chat.connectycube.com:5281** and **wss://chat.connectycube.com:5291**).

## Authentication in Real-time API

In order to connect to Real-Time API, the following actions should be performed:

* create a user in ConnectyCube dashboard [ConnectyCube dashboard](https://admin.connectycube.com) or via Users REST API.
* authenticate user via Real-Time API.
	* login - when user is authenticated via Real-Time API, he receives a JID (Jabber ID) in the following format:
```
{user_id}-{application_id}@chat.connectycube.com
```
	* user’s password for XMPP connection depends on what type of user authentication was applied for this particular user:
		* Standard `login` + `password` authentication: password is the same
		* Facebook / Twitter / Custom identity authentication: password is the same as ConnectyCube session token

## Handshake / Login Flow
Use this documentation to understand what the typical stanzas used in the ConnectyCube XMPP handshake flow are.

**SASL Authentication Handshake Begin**

Client:

```xml
<open xmlns='urn:ietf:params:xml:ns:xmpp-framing' to='chat.connectycube.com' version='1.0'/>
```
Server:

```xml
<open xmlns='urn:ietf:params:xml:ns:xmpp-framing' from='chat.connectycube.com' id='e4b1d1be-45a9-4d1a-aea1-a5d17de4ecae' version='1.0' xml:lang='en' />
```
Server:

```xml
<stream:features xmlns:stream="http://etherx.jabber.org/streams">
    <sm xmlns="urn:xmpp:sm:3"/>
    <mechanisms xmlns="urn:ietf:params:xml:ns:xmpp-sasl">
        <mechanism>PLAIN</mechanism>
        <mechanism>ANONYMOUS</mechanism>
    </mechanisms>
    <ver xmlns="urn:xmpp:features:rosterver"/>
    <starttls xmlns="urn:ietf:params:xml:ns:xmpp-tls"/>
    <compression xmlns="http://jabber.org/features/compress">
        <method>zlib</method>
    </compression>
</stream:features>
```

Client:

```xml
<auth xmlns='urn:ietf:params:xml:ns:xmpp-sasl' mechanism='PLAIN'>MjY5MDQ1OTQtMjk2NTBAY2hhdC5xdWlja2Jsb3guY29tADI2OTA0NTk0LTI5NjUwAGpzX2phc21pbmUyMjI=</auth>
```

Server:

```xml
<success xmlns="urn:ietf:params:xml:ns:xmpp-sasl"/>
```

**SASL Authentication Handshake End**

Client:

```xml
<open xmlns='urn:ietf:params:xml:ns:xmpp-framing' to='chat.connectycube.com' version='1.0'/>
```

Server:

```xml
<open xmlns='urn:ietf:params:xml:ns:xmpp-framing' from='chat.connectycube.com' id='e4b1d1be-45a9-4d1a-aea1-a5d17de4ecae' version='1.0' xml:lang='en' />
```

Server:

```xml
<stream:features xmlns:stream="http://etherx.jabber.org/streams">
    <sm xmlns="urn:xmpp:sm:3"/>
    <ver xmlns="urn:xmpp:features:rosterver"/>
    <starttls xmlns="urn:ietf:params:xml:ns:xmpp-tls"/>
    <compression xmlns="http://jabber.org/features/compress">
        <method>zlib</method>
    </compression>
    <bind xmlns="urn:ietf:params:xml:ns:xmpp-bind"/>
    <session xmlns="urn:ietf:params:xml:ns:xmpp-session"/>
</stream:features>
```

**Bind Resource Begin**

Client:

```xml
<iq type='set' id='_bind_auth_2' xmlns='jabber:client'><bind xmlns='urn:ietf:params:xml:ns:xmpp-bind'/></iq>
```

Server:

```xml
<iq to="26904594-29650@chat.connectycube.com/1571722472-connectycube-2386480" xmlns="jabber:client" type="result" id="_bind_auth_2"><bind xmlns="urn:ietf:params:xml:ns:xmpp-bind"><jid>26904594-29650@chat.connectycube.com/1571722472-connectycube-2386480</jid></bind></iq>
```

**Bind Resource End**

**Initial Presence Begin**

Client:

```xml
<presence xmlns='jabber:client'/>
```

Server:

```xml
<presence to="26904594-29650@chat.connectycube.com" from="26904594-29650@chat.connectycube.com/1571722472-connectycube-2386480" xmlns="jabber:client"/>
```

**Initial Presence End**

## Server-side chat history

Chat introduces a very simple server-side chat history functionality that allows to moderate, restore messages on a new device via REST, download the chat massages. Connectycube is not able to read the messages - only the account owner has access to them.

Messages with a parameter `save_to_history` set to 1 will be saved to chat history.

## Chat message format

A message's **type** attribute can be **chat** or **groupchat**:

* **chat** is used for 1-1 messages.
* **groupchat** is used for group chats.

**1-1 message:**

```xml
<message id="53fc4604565c128132016612" to="26904594-29650@chat.connectycube.com" type="chat">
    <body xmlns="jabber:client">This is 1-1 message!</body>
    <extraParams xmlns="jabber:client">
        <save_to_history>1</save_to_history>
        <date_sent>1409146118</date_sent>
    </extraParams>
</message>
```

**group chat message:**

```xml
<message id="53ac4604565c128132016614" to="11492_53fc460b515c128132016675@muc.chat.connectycube.com" type="groupchat">
    <body xmlns="jabber:client">This is group chat message!</body>
    <extraParams xmlns="jabber:client">
        <save_to_history>1</save_to_history>
        <date_sent>1409146118</date_sent>
    </extraParams>
</message>
```

By default, messages are not stored on the back-end.
To store messages on server, **save_to_history** parameter should be added to XMPP messages.

There's also a **date_sent** field in the extra parameters. It is optional - if it wasn't supplied, server will automatically add it when it receives the message. In case if the failed message should be re-sent, 'date_sent' field can be used to specify the correct time.
Parameter uses a unix timestamp format.

**silent message:**

```xml
<message id="53ac4604565c128132016616" to="11492_53fc460b515c128132016675@muc.chat.connectycube.com" type="groupchat">
    <body xmlns="jabber:client">This is message with prevented push notification!</body>
    <extraParams xmlns="jabber:client">
        <silent>1</silent>
        <save_to_history>1</save_to_history>
        <date_sent>1409146118</date_sent>
    </extraParams>
</message>
```

By default, back-end create push notification (chat alert) for offline recipients.
You can prevent creating push notification by **silent** parameter set to `1`.

**receive message format:**

```xml
<message xmlns="jabber:client" from="92_54789d40535c12b1a5001172@muc.chat.connectycube.com/1501966" to="1501966-92@chat.connectycube.com/0C1E1229-6B3C-47F3-BFDC-D1CFD351D274" type="groupchat" id="54789d5e6df5e6f921b7acda">
    <body>Nice to met you!</body>
    <extraParams xmlns="jabber:client">
        <save_to_history>1</save_to_history>
        <date_sent>1409146118</date_sent>
        <dialog_id>54789d40535c12b1a5001172</dialog_id>
    </extraParams>
</message>
```

Referring to the response above, server automatically adds a **dialog_id** extra parameter, so a recipient knows which chat dialog this message is related to.


## Chat message statuses
Adding statuses to the chat allows to monitor when the opponent is typing, when message is delivered on the device and read.

#### 1. 'Is typing' status

`is typing' status can be added in 1-1 or group chats.

**composing:**

```xml
<message id="55e416e3854516bc190041a8" type="chat" to="4374458-92@chat.connectycube.com">
    <composing xmlns="http://jabber.org/protocol/chatstates"/>
</message>
```

**paused:**

```xml
<message id="55e4175a854516bc190041a9" type="chat" to="4374458-92@chat.connectycube.com">
    <paused xmlns="http://jabber.org/protocol/chatstates"/>
</message>
```

#### 2. 'Delivered' status

'delivered' status is available for 1-1 chat only, so you send 'delivered' status directly to users.

```xml
<message to="2308497-92@chat.connectycube.com" type="chat" id="55e821cd0ce78744090041b2">
    <received xmlns="urn:xmpp:chat-markers:0" id="55e818f6e24a0998640041ed"/>
    <extraParams xmlns="jabber:client">
        <dialog_id>55e6a9c8a28f9a3ea6001f15</dialog_id>
    </extraParams>
</message>
```

#### 3. 'Read' status

'read' status is available for 1-1 chat only, so you send 'read' status directly to users.

```xml
<message to="2308497-32@chat.connectycube.com" type="chat" id="55e821cd0ce78744090041b2">
    <displayed xmlns="urn:xmpp:chat-markers:0" id="55e818f6e24a0998640041ed"/>
    <extraParams xmlns="jabber:client">
        <dialog_id>55e6a9c8a28f9a3ea6001f15</dialog_id>
    </extraParams>
</message>
```

## Delete message

```xml
<message id="..." to="123429-7883@chat.connectycube.com" type="chat">
    <remove id='origin1' xmlns='urn:xmpp:message-delete:0'/>
    <extraParams xmlns="jabber:client">
       <dialog_id>52e6a9c8a18f3a3ea6001f18</dialog_id>
    </extraParams>
</message>
```

## Edit message

```xml
<message id="..." to="123429-7883@chat.connectycube.com" type="chat">
    <body>How are you today?</body>
    <replace id='origin1' last='true' xmlns='urn:xmpp:message-correct:0'/>
    <extraParams xmlns="jabber:client">
       <dialog_id>52e6a9c8a18f3a3ea6001f18</dialog_id>
    </extraParams>
</message>
```

## Self-destroy message

```xml
<message id="message1" to="123429-7883@chat.connectycube.com" type="chat"> 
    <body>How are you today?</body>    
    <extraParams xmlns="jabber:client">        
        <date_sent>1509146118</date_sent>    
    </extraParams>
    <destroy after="5" xmlns='urn:xmpp:message-destroy-after:0'/>
</message>
```

## File attachments
To send attachments as messages in chat, attachment should be included into **extraParams** part of a message.

Each attachment contains the following attributes:

* **type** - type of the attachment. Recommended types: image, video, audio, location.
* **id** (optional)- a link to a file, for example ID of a file in Content or Custom Objects modules
* **url** (optional) - an url to file in the Internet
* **data** (optional) - an attachment's data. For example, used for location attachments to pass latitude & longitude.
* **size** (optional) - file size in bytes
* **width** (optional) - if attachment is an image - an image's width
* **height** (optional) - if attachment is an image - an image's height
* **duration** (optional) - if attachment is an audio/video - duration of an audio/video file
* **content-type** (optional) - an attachment's content type
* **name** (optional) - an attachment's name

**format:**

```xml
<message id="546dbf438c54ad2aded63b25" type="groupchat" to="2_546d14c19c29532398000496@muc.chat.connectycube.com">
    <body>Nice to met you!</body>
    <extraParams xmlns="jabber:client">
        <save_to_history>1</save_to_history>
        <attachment type="video" id="47863" duration="894"></attachment>
        <attachment type="image" id="123123" width="640" height="480"></attachment>
        <attachment type="audio" id="323232" duration="365"></attachment>
        <attachment type="location" data="{&quot;lat&quot;:50.01383403152402,&quot;lng&quot;:36.22868299484253}"></attachment>
    </extraParams>
</message>
```

## System messages
There is a special channel for any system notifications. The end user can use it to split regular chat messages and other system events.

All such messages should contain **extraParams.moduleIdentifier=SystemNotifications** and use **type=headline**.

You can send system messages directly to user only (group chat is not supported).

**format:**

```xml
<message id="..." type="headline" to="...@chat.connectycube.com">
    <extraParams xmlns="jabber:client">
        <moduleIdentifier>SystemNotifications</moduleIdentifier>
        <param1>value1</param1>
        <param2>value2</param2>
        ...
    </extraParams>
</message>
```

## Stream management
Stream management ([XEP-0198](http://xmpp.org/extensions/xep-0198.html)) defines an XMPP protocol extension for active management of a stream between two users, including features for stanza acknowledgements and stream resumption. This protocol aims to resolve the issue with lost messages in a case of very poor Internet connection.

The basic concept behind stream management is that the initiating entity (a client) and the receiving entity (a server) can exchange "commands" for active management of the stream. The following stream management features are of particular interest because they are expected to improve network reliability and the end-user experience:

* Stanza Acknowledgements -- the ability to know if a stanza or series of stanzas has been received by one's peer.
* Stream Resumption -- the ability to quickly resume a stream that has been terminated.

## Active/Inactive client state
It is common for IM clients to be logged in and 'online' even while the user is not interacting with the application. This protocol allows the client to indicate to the server when the user is not actively using the client, allowing the server know that a user wants to receive push notifications while still is connected to chat.

Client:

```xml
<iq id='hELuW-35' type='set'><mobile xmlns='http://tigase.org/protocol/mobile#v2' enable='true'></mobile></iq>
```
Server:

```xml
<iq id="hELuW-35" xmlns="jabber:client" type="result" to="...@chat.connectycube.com/ffffffff-b91d-cf65-ffff-fffd935038d7"/>
```
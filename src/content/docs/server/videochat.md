---
title: Video Chat
description: Experience seamless video chat with our platform, facilitating productive and visual communication between users.
head:
  - tag: title
    content: Video Chat | Connectycube
sidebar: 
    label: Video chat
    order: 10
---

Video chat or video calling is essentially streaming both audio and video inputs asynchronously between two or more end users. Video calling is a great way to have productive and visual communication between users.

Typically both audio and video calling are used along with 1:1 / IM textual chat communication but there are use cases (such is in gaming or when walking / driving for example) where they are used on their own.

## How it works

ConnectyCube SDK client library works with input sources (camera, microphone), codecs, compression and then the data is streamed peer-to-peer between end users. This way video calling doesn't impact the server much, so the system is highly scalable. Server, however, enables the handshake between end users before streaming starts to take place, and also it resolves NAT traversal in case configuration of networks and firewalls between end users makes call impossible otherwise. This is done with the help of ConnectyCube STUN/TURN server.

## Technologies used

Our latest video chat solution uses the open-source technology [WebRTC](https://webrtc.org/). It is intended for the organisation of streaming media data between browsers or other supporting it applications for peer-to-peer technology without any additional plugins.

Get an overview of WebRTC from [the Google I/O presentation](https://www.youtube.com/watch?v=p2HzZkd2A40).

[WebRTC FAQ](https://webrtc.github.io/webrtc-org/faq/)

To achieve a real-time media communication, several transfer servers for data exchanges and a specific signaling mechanism are required. 		

Their roles are:

* Get network information such as IP addresses and ports and exchange this with other WebRTC clients (known as **peers**) to enable connection even through NATs and firewalls
* Coordinate signaling communication to report errors and initiate or close sessions
* Exchange information about media and client capability such as resolution and codecs
* Communicate streaming audio, video or data

The signaling in the WebRTC module is implemented over the **XMPP protocol** using [Chat API](/server/chat). Our module is a high-level solution around WebRTC technology. Read more about signaling in the next paragraph.

## P2P calling

P2P Video Chat is used mainly for 1-1 calls or for small group calls (up to 4 users). It's based on [Mesh architecture](https://webrtcglossary.com/mesh/).

ConnectyCube own signaling protocol is used.

### Signaling v1.0

Next signaling protocol is used in ConnectyCube WebRTC Video chat [iOS](/ios/videocalling) / [Android](/android/videocalling) / [Web](/js/videocalling) code samples.

Developers also can use this protocol to build WebRTC library and video chat applications for other platforms.

**Note:** All video chat signaling messages have `type="headline"` and an extra parameter `<moduleIdentifier>...</moduleIdentifier>`.
Check these two values to detect the video chat signaling message.

#### Initiate a call

Signal to initiate a call.

###### Format

```xml
<message to="..."  type="headline" id="...">
    <extraParams xmlns="jabber:client">
        <moduleIdentifier>WebRTCVideoChat</moduleIdentifier>
        <signalType>call</signalType>
        <sessionID>...</sessionID>
        <callType>...</callType>
        <sdp>...</sdp>
        <platform>...</platform>
        <callerID>...</callerID>
        <opponentsIDs>
           <opponentID>...</opponentID>
           <opponentID>...</opponentID>
           ...
        </opponentsIDs>
        <userInfo>... </userInfo>
    </extraParams>
</message>
```

###### Parameters

|   Parameter         | Description                                     |            
|---------------------|-----------------------------------------------
| moduleIdentifier | Identifier of a module, holds **WebRTCVideoChat**|
| signalType      | Type of signal, holds **call** value             |                                     
| sessionID       | Unique id  of current video chat session. Users have to use the same sessionID within particular call. Timestamp can be used as a session ID value |                                                                                                                     
| callType        | Type of call. Use `1` for video call, `2` for audio call|                                      
| sdp            | Local session description, value of `RTCSessionDescription.sdp` property [http://dev.w3.org/2011/webrtc/editor/webrtc.html#idl-def-RTCSessionDescription](http://dev.w3.org/2011/webrtc/editor/webrtc.html#idl-def-RTCSessionDescription) , obtained after `createOffer` call. More info [https://webrtchacks.com/sdp-anatomy](https://webrtchacks.com/sdp-anatomy)|                                                              
| platform        | Type of platform: <li>iOS</li> <li>Android</li> <li>Web</li>|
| callerID        | The id of a user who initiates a call. Used for group calls|
| opponentsIDs    | Array of users ids a caller initiates a call with. Used for group calls|
| userInfo        |Optional user info|

Additional custom parameters can be added to a message to pass more information about a caller (like avatar, full_name, etc.)

#### Accept a call

Signal to accept an incoming call.

###### Format

```xml
<message to="..."  type="headline" id="...">
    <extraParams xmlns="jabber:client">
        <moduleIdentifier>WebRTCVideoChat</moduleIdentifier>
        <signalType>accept</signalType>
        <sessionID>...</sessionID>
        <sdp>...</sdp>
        <platform>...</platform>
        <userInfo>...</userInfo>
    </extraParams>
</message>
```

###### Parameters

|   Parameter  | Description
|---------------------|-----------------------------------------------
| moduleIdentifier| Identifier of a module, holds **WebRTCVideoChat**|
| signalType     | Type of signal, holds **accept** value           |
| sessionID       | Unique ID  of current video chat session. Users have to use the same sessionID within particular call. Timestamp can be used as a session ID value. |
| sdp             | Local session description, value of RTCSessionDescription.sdp property [http://dev.w3.org/2011/webrtc/editor/webrtc.html#idl-def-RTCSessionDescription](http://dev.w3.org/2011/webrtc/editor/webrtc.html#idl-def-RTCSessionDescription) , obtained after ‘createOffer’ call. More info [https://webrtchacks.com/sdp-anatomy] (https://webrtchacks.com/sdp-anatomy)|
| platform        | Type of platform: <li>iOS</li> <li>Android</li> <li>Web</li>|
| userInfo       |Optional user info|

Additional custom parameters can be added to a message to pass more information about a caller (like avatar, full_name, etc.)

#### Reject incoming call

Signal to reject an incoming call.

###### Format

```xml
<message to="..."  type="headline" id="...">
    <extraParams xmlns="jabber:client">
        <moduleIdentifier>WebRTCVideoChat</moduleIdentifier>
        <signalType>reject</signalType>
        <sessionID>...</sessionID>
        <platform>...</platform>
        <userInfo><busy>true</busy></userInfo>
    </extraParams>
</message>
```

###### Parameters

|   Parameter         | Description                                     |            
|---------------------|----------------------------------------------|
| moduleIdentifier | Identifier of a module, holds **WebRTCVideoChat**|
| signalType      | Type of signal, holds **reject** value           |
| sessionID      | Unique id  of current video chat session. Users have to use the same sessionID within particular call. Timestamp can be used as a session ID value. |
| platform        | Type of platform: <li>iOS</li> <li>Android</li> <li>Web</li>|
| userInfo        |Optional user info|

Additional custom parameters can be added to a message to pass more information about a caller (like avatar, full_name, etc.)

If a client doesn't support WebRTC, he should send the auto reject request with `user_ info={not_supported: 1}`

#### Reject incoming call by HTTP

Signal to reject an incoming call by HTTP.

###### Endpoint
```
POST https://api.connectycube.com/calls/reject
```

###### Parameters

|   Parameter         | Description                                     |            
|---------------------|----------------------------------------------|
| recipientId | Call participant Id |
| sessionID      | Unique id  of current video chat session. Users have to use the same sessionID within particular call. Timestamp can be used as a session ID value. |
| platform        | Type of platform: <li>iOS</li> <li>Android</li> <li>Web</li> |
| userInfo        | object with additional params |

###### Request example

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d '{"recipientId": 573, "sessionID": "56eddd33-b3dd-42ee-bf33-11ca1c03218a", "platform": "Web", "userInfo": { "busy": true, "fiend_id": 10 }}' \
https://api.connectycube.com/calls/reject
```

###### Response
```json
200 {}
```

#### Hang Up a call

Signal to finish a call.

###### Format

```xml
<message to="..."  type="headline" id="...">
    <extraParams xmlns="jabber:client">
        <moduleIdentifier>WebRTCVideoChat</moduleIdentifier>
        <signalType>hangUp</signalType>
        <sessionID>...</sessionID>
        <userInfo>...</userInfo>
    </extraParams>
</message>
```

###### Parameters

|   Parameter         | Description                                     |            
|---------------------|----------------------------------------------|
| moduleIdentifier | Identifier of a module, holds **WebRTCVideoChat**|
| signalType      | Type of signal, holds **hangUp** value           |
| sessionID       | Unique id  of current video chat session. Users have to use the same sessionID within particular call. Timestamp can be used as a session ID value. |
| platform        | Type of platform: <li>iOS</li> <li>Android</li> <li>Web</li>|
| userInfo        |Optional user info|

Additional custom parameters can be added to a message to pass more information about a caller (like avatar, full_name, etc.).

#### ICE candidates

Signal to send WebRTC ICE candidates.

###### Format

```xml
<message to="..."  type="headline" id="...">
    <extraParams xmlns="jabber:client">
        <moduleIdentifier>WebRTCVideoChat</moduleIdentifier>
        <signalType>iceCandidates</signalType>
        <sessionID>...</sessionID>
        <iceCandidates>
            <iceCandidate>
                <sdpMLineIndex>...</sdpMLineIndex>
            	<sdpMid>...</sdpMid>
            	<candidate>...</candidate>
            </iceCandidate>
            <iceCandidate>
            	<sdpMLineIndex>...</sdpMLineIndex>
            	<sdpMid>...</sdpMid>
            	<candidate>...</candidate>
             </iceCandidate>
             ...
         </iceCandidates>
    </extraParams>
</message>
```

###### Parameters

|   Parameter         | Description                                     
|---------------------|----------------------------------------------|
| moduleIdentifier | Identifier of a module, holds **WebRTCVideoChat**|
| signalType      | Type of signal, holds **iceCandidates** value           |
| sessionID       | Unique id  of current video chat session. Users have to use the same session ID within particular call. Timestamp can be used as a session ID value. |
|iceCandidates        | An array of WebRTC ICE candidates. More info [http://dev.w3.org/2011/webrtc/editor/webrtc.html#idl-def-RTCIceCandidate](http://dev.w3.org/2011/webrtc/editor/webrtc.html#idl-def-RTCIceCandidate)|

#### Update call parameters

Signal to notify the opponent that some call parameters were updated.

###### Format

```xml
<message to="..."  type="headline" id="...">
    <extraParams xmlns="jabber:client">
        <moduleIdentifier>WebRTCVideoChat</moduleIdentifier>
        <signalType>update</signalType>
        <sessionID>...</sessionID>
        <param1>...</param1>
        <param2>...</param2>
        ...
    </extraParams>
</message>
```

###### Parameters

|   Parameter         | Description                                           
|---------------------|-----------------------------------------------
| moduleIdentifier | Identifier of a module, holds **WebRTCVideoChat**|
| signalType      | Type of signal, holds **update** value           |
| sessionID       | Unique id  of current video chat session. Users have to use the same sessionID within particular call. Timestamp can be used as a session ID value. |
Add all changed parameters to a message to pass these updates to an opponent.

#### ICE restart

Signal to restart ICE.

###### Format

```xml
<message to="..."  type="headline" id="...">
    <extraParams xmlns="jabber:client">
        <moduleIdentifier>WebRTCVideoChat</moduleIdentifier>
        <signalType>iceRestart</signalType>
        <sessionID>...</sessionID>
        <sdp>...</sdp>
    </extraParams>
</message>
```

###### Parameters

|   Parameter         | Description                                     |            
|---------------------|-----------------------------------------------
| moduleIdentifier | Identifier of a module, holds **WebRTCVideoChat**|
| signalType      | Type of signal, holds **iceRestart** value             |                                     
| sessionID       | Unique id  of current video chat session. Users have to use the same sessionID within particular call. Timestamp can be used as a session ID value |                                                                                                                                          
| sdp            | Local session description, value of `RTCSessionDescription.sdp` property [http://dev.w3.org/2011/webrtc/editor/webrtc.html#idl-def-RTCSessionDescription](http://dev.w3.org/2011/webrtc/editor/webrtc.html#idl-def-RTCSessionDescription) , obtained after `createOffer` call. More info [https://webrtchacks.com/sdp-anatomy](https://webrtchacks.com/sdp-anatomy)|      

#### ICE restart accept

Signal to accept restart ICE.

###### Format

```xml
<message to="..."  type="headline" id="...">
    <extraParams xmlns="jabber:client">
        <moduleIdentifier>WebRTCVideoChat</moduleIdentifier>
        <signalType>iceRestartAccept</signalType>
        <sessionID>...</sessionID>
        <sdp>...</sdp>
    </extraParams>
</message>
```

###### Parameters

|   Parameter         | Description                                     |            
|---------------------|-----------------------------------------------
| moduleIdentifier | Identifier of a module, holds **WebRTCVideoChat**|
| signalType      | Type of signal, holds **iceRestartAccept** value             |                                     
| sessionID       | Unique id  of current video chat session. Users have to use the same sessionID within particular call. Timestamp can be used as a session ID value |                                                                                                                                          
| sdp            | Local session description, value of `RTCSessionDescription.sdp` property [http://dev.w3.org/2011/webrtc/editor/webrtc.html#idl-def-RTCSessionDescription](http://dev.w3.org/2011/webrtc/editor/webrtc.html#idl-def-RTCSessionDescription) , obtained after `createOffer` call. More info [https://webrtchacks.com/sdp-anatomy](https://webrtchacks.com/sdp-anatomy)|   

## Conference calling

ConnectyCube **Multiparty Video Conferencing API** is built on top of [WebRTC](https://webrtc.org/) protocol and based on top of [WebRTC SFU](https://webrtcglossary.com/sfu/) architecture.

Max people per Conference call is 12.

Video Conferencing is available starting from [Advanced plan](https://connectycube.com/pricing/).

> To get a difference between **P2P calling** and **Conference calling** please read our [ConnectyCube Calling API comparison](https://connectycube.com/2020/04/15/connectycube-calling-api-comparison/) blog page.

### Features supported

* Video/Audio Conference with up to 12 people
* Join-Rejoin video room functionality (like Skype)
* Guest rooms
* Mute/Unmute audio/video streams
* Display bitrate
* Switch video input device (camera)
* Switch audio input device (microphone)

### SDKs supported

* [JS/Web](/js/videocalling-conference)
* [ReactNative](/reactnative/videocalling-conference)
* [Cordova](/cordova/videocalling-conference)
* [iOS](/ios/videocalling-conference)
* [Android](/android/videocalling-conference)

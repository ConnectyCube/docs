---
title: Video Calling
description: Empower your Cordova applications with our Video Calling P2P API. Enable secure and immersive peer-to-peer video calls for enhanced user experience
head:
  - tag: title
    content: Cordova Video Calling P2P API | ConnectyCube
sidebar: 
    label: Video calling
    order: 5
---

ConnectyCube **Video Calling P2P API** is built on top of [WebRTC](https://webrtc.org/) protocol and based on top of [WebRTC Mesh](https://webrtcglossary.com/mesh/) architecture.

Max people per P2P call is 4.

> To get a difference between **P2P calling** and **Conference calling** please read our [ConnectyCube Calling API comparison](https://connectycube.com/2020/04/15/connectycube-calling-api-comparison/) blog page.

## Preparations

[ConnectyCube Chat API](/cordova/messaging) is used as a signaling transport for Video Calling API, so in order to start using Video Calling API you need to [connect user to Chat](/cordova/messaging#connect-to-chat).

### Connect WebRTC lib

For Android - there is nothing extra required. Android Cordova WebView supports all the WebRTC API stack.

For iOS - a [cordova-plugin-iosrtc](https://github.com/cordova-rtc/cordova-plugin-iosrtc) has to be used.

## Create video session

In order to use Video Calling API you need to create a call session object - choose your opponents with whom you will have a call and a type of session (VIDEO or AUDIO):

```javascript
const calleesIds = [56, 76, 34]; // User's ids
const sessionType = ConnectyCube.videochat.CallType.VIDEO; // AUDIO is also possible
const additionalOptions = {};
const session = ConnectyCube.videochat.createNewSession(calleesIds, sessionType, additionalOptions);
```

> **Note**:
> In a case of low bandwidth network, you can try to limit the call bandwidth cap to get better quality vs stability results. It can be done by passing `const additionalOptions = {bandwidth: 256};` or 128 value.


## Access local media stream

In order to have a video chat session you need to get an access to the user's devices (webcam / microphone):

```javascript
const mediaParams = {
  audio: true,
  video: true
};

session
  .getUserMedia(mediaParams)
  .then((localStream) => {})
  .catch((error) => {});
```

This method lets the browser ask the user for permission to use devices. You should allow this dialog to access the stream. Otherwise, the browser can't obtain access and will throw an error for `getUserMedia` callback function.

For more information about possible audio/video constraints, here is a good code sample from WebRTC team how to work with getUserMedia constraints: https://webrtc.github.io/samples/src/content/getusermedia/resolution/

## Call quality

**Limit bandwidth**

Despite WebRTC engine uses automatic quality adjustement based on available Internet bandwidth, 
sometimes it's better to set the max available bandwidth cap which will result in a better and smoother user experience.
For example, if you know you have a bad internet connection, you can limit the max available bandwidth to e.g. 256 Kbit/s.

This can be done either when initiate a call (see below 'Initiate a call' API documentation):

```javascript
session.call({maxBandwidth: 256}); // default is 0 - unlimited
```

which will result in limiting the max vailable bandwidth for ALL participants

or/and during a call:

```javascript
session.setMaxBandwidth(512); // set 0 to remove the limit
```

which will result in limiting the max available bandwidth for current user only.


## Attach local media stream

Then you should attach your local media stream to HTML video element.

For **Web-like environments**, including Cordova - use the following method:

```javascript
session.attachMediaStream("myVideoElementId", localStream, {
    muted: true,
    mirror: true,
  });
```

## Initiate a call

```javascript
const extension = {};
session.call(extension, (error) => {});
```

The extension is used to pass any extra parameters in the request to your opponents.

After this, your opponents will receive a callback call:

```javascript
ConnectyCube.videochat.onCallListener = function (session, extension) {};
```

Or if your opponents are offline or did not answer the call request:

```javascript
ConnectyCube.videochat.onUserNotAnswerListener = function (session, userId) {};
```

## Accept a call

To accept a call the following code snippet is used:

```javascript
ConnectyCube.videochat.onCallListener = function (session, extension) {
  // Here we need to show a dialog with 2 buttons - Accept & Reject.
  // By accepting -> run the following code:
  //
  // 1. await session.getUserMedia (...)
  //
  // 2. Accept call request:
  const extension = {};
  session.accept(extension);
};
```

After this, you will get a confirmation in the following callback:

```javascript
ConnectyCube.videochat.onAcceptCallListener = function (session, userId, extension) {};
```

Also, both the caller and opponents will get a special callback with the remote stream:

```javascript
ConnectyCube.videochat.onRemoteStreamListener = function (session, userID, remoteStream) {
  // attach the remote stream to DOM element
  session.attachMediaStream("remoteOpponentVideoElementId", remoteStream);
};
```

From this point, you and your opponents should start seeing each other.

## Receive a call in background

For mobile apps, it can be a situation when an opponent's user app is either in closed (killed) or background (inactive) state.

In this case, to be able to still receive a call request, you can use Push Notifications. The flow should be as follows:

- a call initiator should send a push notification along with a call request
- when an opponent's app is killed or in background state - an opponent will receive a push notification about an incoming call, and will be able to accept/reject the call. If accepted or pressed on a   push notification - an app will be opened, a user should auto login and connect to chat and then will be able to join an incoming call.

Please refer to Push Notifications API guides regarding how to integrate Push Notifications in your app:

- [Push Notifications API guide: Cordova](/cordova/push-notifications)

For even better integration - CallKit and VoIP push notifications can be used. Please check `CallKit and VoIP push notifications` section on each platform Push Notifications API guide page.

## Reject a call

```javascript
const extension = {};
session.reject(extension);
```

After this, the caller will get a confirmation in the following callback:

```javascript
ConnectyCube.videochat.onRejectCallListener = function (session, userId, extension) {};
```

Sometimes, it could a situation when you received a call request and want to reject, but the call sesison object has not arrived yet. It could be in a case when you integrated CallKit to receive call requests while an app is in background/killed state. To do a reject in this case, the following snippet can be used: 

```javascript
const params = { 
  sessionID: callId, 
  recipientId: callInitiatorID, 
  platform: 'android'
};

await ConnectyCube.videochat.callRejectRequest(params);
```

## End a call

```javascript
const extension = {};
session.stop(extension);
```

After this, the opponents will get a confirmation in the following callback:

```javascript
ConnectyCube.videochat.onStopCallListener = function (session, userId, extension) {};
```

## Mute audio

```javascript
session.mute("audio");
session.unmute("audio");
```

## Mute video

```javascript
session.mute("video");
session.unmute("video");
```

## Switch video cameras

First of all you need to obtain all your device's available cameras:

```javascript
let deviceInfo, deviceId, deviceLabel;

ConnectyCube.videochat
  .getMediaDevices("videoinput")
  .then((devices) => {
    if (devices.length) {
      // here is a list of all available cameras
      for (let i = 0; i !== devices.length; ++i) {
        deviceInfo = devices[i];
        deviceId = deviceInfo.deviceId;
        deviceLabel = deviceInfo.label;
      }
    }
  })
  .catch((error) => {});
```

Then you can choose some `deviceId` and switch the video stream to exact this device:

```javascript
const constraints = { video: deviceId };

session
  .switchMediaTracks(constraints)
  .then((stream) => {})
  .catch((error) => {});
```

## Switch audio output

For switching audio - use the same above flow for switching camera. Just replace a `videoinput` to `audioinput` in `getMediaDevices` and `video` to `audio` in `constraints`.

## Screen Sharing

Not available as for now.

## Group video calls

Because of [Mesh architecture](https://webrtcglossary.com/mesh/) we use for multipoint where every participant sends and receives its media to all other participants, current solution supports group calls with up to 4 people.

Also ConnectyCube provides an alternative solution for up to 12 people - [Multiparty Video Conferencing API](/cordova/videocalling-conference).

## Monitor connection state

There is a callback function to track the session connection state:

```javascript
ConnectyCube.videochat.onSessionConnectionStateChangedListener = (
  session,
  userID,
  connectionState
) => {

};
```

The possible values of connectionState are those of an enum of type `ConnectyCube.videochat.SessionConnectionState`:

- ConnectyCube.videochat.SessionConnectionState.UNDEFINED
- ConnectyCube.videochat.SessionConnectionState.CONNECTING
- ConnectyCube.videochat.SessionConnectionState.CONNECTED
- ConnectyCube.videochat.SessionConnectionState.DISCONNECTED
- ConnectyCube.videochat.SessionConnectionState.FAILED
- ConnectyCube.videochat.SessionConnectionState.CLOSED
- ConnectyCube.videochat.SessionConnectionState.COMPLETED

## Tackling Network changes

If a user's network environment changes (e.g., switching from Wi-Fi to mobile data), the existing call connection might no longer be valid. Normally, in a case of short network interruptions, the ConnectyCube SDK will automatically restore the call so you can see via `onSessionConnectionStateChangedListener` callback with `connectionState` changing to `DISCONNECTED` and then again to `CONNECTED`.

But not all cases are the same, and in some of them the connection needs to be **manually** refreshed due to various issues like NAT or firewall behavior changes or even longer network environment changes, e.g. when a user is offline for more than 30 seconds.

This is where ICE restart helps to re-establish the connection to find a new network path for communication.

The correct and recommended way for an application to handle all such 'bad' cases is to trigger an ICE restart when the connection state goes to either `FAILED` or `DISCONNECTED` for an extended period of time (e.g. > 30 seconds).

Following is the preliminary code snippet regarding how to work with ICE restart:

  - Firstly, we have to disable the call termination logic after the network is disconnected for > 30 seconds by increasing the `videochat.disconnectTimeInterval` value to e.g. 5 mins.

    ```
    const appConfig = {
      videochat: {
        disconnectTimeInterval: 300,
      }
    };

    ConnectyCube.init(credentials, appConfig);
    ```
  - Secondly, define a variable which can track the Internet connection state:
    ```
    let isOnline = window.navigator.onLine;

    window.onoffline = () => {
      isOnline = false;
    };

    window.ononline = () => {
      isOnline = true;
    };
    ```
  - Thirdly, define a function that will perform ICE restart:
    ```
      async maybeDoIceRestart(session, userID) {
        try {
          // firstly let's check if we are still connected to chat
          await ConnectyCube.chat.pingWithTimeout();

          // do ICE restart
          if (session.canInitiateIceRestart(userID)) {
            session.iceRestart(userID);
          }
        } catch (error) {
          console.error(error.message);

          // chat ping request has timed out, 
          // so need to reconnect to Chat

          await ConnectyCube.chat.disconnect();
          await ConnectyCube.chat.connect({
            userId: currentUser.id,
            password: currentUser.password,
          })

          // do ICE restart
          if (session.canInitiateIceRestart(userID)) {
            session.iceRestart(userID);
          }
        }
      }
    ```
  - Fourthly, define a `ConnectyCube.videochat.onSessionConnectionStateChangedListener` callback and try to perform ICE restart if not automatic call restoration happened after 30 seconds:
    ```
    iceRestartTimeout = null;
    needIceRestartForUsersIds = [];

    ConnectyCube.videochat.onSessionConnectionStateChangedListener = (
      session,
      userID,
      connectionState
    ) => {
      console.log(
        "[onSessionConnectionStateChangedListener]",
        userID,
        connectionState
      );

      const { DISCONNECTED, FAILED, CONNECTED, CLOSED } =
        ConnectyCube.videochat.SessionConnectionState;

      if (connectionState === DISCONNECTED || connectionState === FAILED) {
        iceRestartTimeout = setTimeout(() => {
          // Connection not restored within 30 seconds, trying ICE restart...
          if (isOnline) {
            maybeDoIceRestart(session, userID);
          } else {
            // Skip ICE restart, no Internet connection
            this.needIceRestartForUsersIds.push(userID);
          }
        }, 30000);
      } else if (connectionState === CONNECTED) {
        clearTimeout(iceRestartTimeout);
        iceRestartTimeout = null;

        needIceRestartForUsersIds = [];
      } else if (connectionState === CLOSED) {
        needIceRestartForUsersIds = [];
      }
    };
    ```
  - Finally, in a case a user got working Internet connection later, do ICE restart there:
    ```
    window.ononline = () => {
      if (!isOnline) {
        if (session && needIceRestartForUsersIds.length > 0) {
          for (let userID of needIceRestartForUsersIds) {
            maybeDoIceRestart(session, userID);
          }
        }
      }
      isOnline = true;
    };
    ```  
  After these changes the call connection should be restored to working state again.

## Configuration

There are various calling related configs that can be changed.

### alwaysRelayCalls

The `alwaysRelayCalls` config sets the WebRTC `RTCConfiguration.iceTransportPolicy` [config](/js/#default-configuration). Setting it to `true` means the calling media will be routed through TURN server all the time, and not directly P2P between users even if the network path allows it:

```javascript
const appConfig = {
  videochat: {
    alwaysRelayCalls: true,
  },
};
```

## Recording

> **Note**:
> The recording feature may work at Android environment only as for now.  

For the recording feature implementation you can use [MediaStream Recording API](https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API)

The recorder accepts a media stream and record it to file. Both local and remote streams can be recorded and saved to file.

There is also a good article about client-side recording implementation https://webrtchacks.com/jitsi-recording-getdisplaymedia-audio/

## Continue calling in background

If you are developing dedicated apps for iOS and Android - it's required to apply additional configure for the app to continue playing calling audio when it goes into the background.

On iOS: there is no way to continue a video call in background because of some OS restrictions. What is supported there is to continue with voice calling while an app is in background. Basically, the recommended to achieve this is to switch off device camera when an app goes to background and then switch camera on back when an app goes to foreground.

Furthermore, even voice background call are blocked by default on iOS. To unblock - you need to setup proper background mode capabilities in your project. Please find the [Enabling Background Audio link](https://developer.apple.com/documentation/avfoundation/media_playback_and_selection/creating_a_basic_video_player_ios_and_tvos/enabling_background_audio) with more information how to do it properly. Generally speaking, you need to enable `Voice over IP` and `Remote notifications` capabilities:

  ![Setup Xcode VOIP capabilities](../../../assets/xcode/voip_capabilities.png)

For Android, we also recommend to implement the same camera switch flow when go to background and then return to foreground.

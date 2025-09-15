---
title: Video Calling
description: Empower your ReactNative applications with our Video Calling P2P API. Enable secure and immersive peer-to-peer video calls for enhanced user experience
head:
  - tag: title
    content: ReactNative Video Calling P2P API | ConnectyCube
sidebar: 
    label: Video calling
    order: 5
---

ConnectyCube **Video Calling P2P API** is built on top of [WebRTC](https://webrtc.org/) protocol and based on top of [WebRTC Mesh](https://webrtcglossary.com/mesh/) architecture.

Max people per P2P call is 4.

> To get a difference between **P2P calling** and **Conference calling** please read our [ConnectyCube Calling API comparison](https://connectycube.com/2020/04/15/connectycube-calling-api-comparison/) blog page.

## Preparations

[ConnectyCube Chat API](/reactnative/messaging) is used as a signaling transport for Video Calling API, so in order to start using Video Calling API you need to [connect user to Chat](/reactnative/messaging#connect-to-chat).

### Connect WebRTC lib

Since "react-native-connectycube" version 3.34.0, the "react-native-webrtc" has been replaced from dependencies to peerDependencies to support autolinking. Install the "react-native-webrtc" and follow the [Getting started](https://github.com/react-native-webrtc/react-native-webrtc?tab=readme-ov-file#getting-started). Configure your [iOS](https://github.com/react-native-webrtc/react-native-webrtc/blob/master/Documentation/iOSInstallation.md) and [Android](https://github.com/react-native-webrtc/react-native-webrtc/blob/master/Documentation/AndroidInstallation.md) projects.

Until "react-native-connectycube" version 3.34.0, the "react-native-webrtc" is included to "react-native-connectycube". Follow the [Android Manual Linking](https://github.com/react-native-webrtc/react-native-webrtc/blob/1.98.0/Documentation/AndroidInstallation.md) and [iOS Manual Linking](https://github.com/react-native-webrtc/react-native-webrtc/blob/1.98.0/Documentation/iOSInstallation.md) guides.

## Create video session

In order to use Video Calling API you need to create a call session object - choose your opponents with whom you will have a call and a type of session (VIDEO or AUDIO):

```javascript
const calleesIds = [56, 76, 34]; // User's ids
const sessionType = ConnectyCube.videochat.CallType.VIDEO; // AUDIO is also possible
const additionalOptions = {};
const session = ConnectyCube.videochat.createNewSession(calleesIds, sessionType, additionalOptions);
```

> **Note**: in a case of low bandwidth network, you can try to limit the call bandwidth cap to get better quality vs stability results. It can be done by passing `const additionalOptions = {bandwidth: 256};` or 128 value.

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

This can be done when initiate a call (see below 'Initiate a call' API documentation):

```javascript
session.call({maxBandwidth: 256}); // default is 0 - unlimited
```

which will result in limiting the max vailable bandwidth for ALL participants.

## Attach local media stream

Then you should attach your local media stream to a video element:

```javascript
import {RTCView} from 'react-native-connectycube';

// pass a local or remote stream to the RTCView component
...
<RTCView  objectFit="cover" style={styles.rtcView} key={userId} streamURL={localStream.toURL()} />
...
```

## Initiate a call

```javascript
const extension = {};
session.call(extension);
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
  // attach the remote stream to a video element

  // import {RTCView} from 'react-native-connectycube';
  //
  // <RTCView  objectFit="cover" style={styles.rtcView} key={userId} streamURL={remoteStream.toURL()} />
};
```

From this point, you and your opponents should start seeing each other.

## Receive a call in background

See [CallKit section](#callkit) below.

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
  platform: Platform.OS
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

```javascript
localStream.getVideoTracks().forEach(track => track._switchCamera());
```

## Switch audio output

1. connect and install https://github.com/react-native-webrtc/react-native-incall-manager lib
2. Use `InCallManager` class to switch audio output:

```javascript
import InCallManager from 'react-native-incall-manager';

...

let isSpeakerOn = true; // false

InCallManager.setSpeakerphoneOn(isSpeakerOn);
```

Also, pay attention to [InCall Manager lib](https://github.com/react-native-webrtc/react-native-incall-manager) if you need to use one of the options below:
- Manage devices events like wired-headset plugged-in state, proximity sensors and expose functionalities to javascript.
- Automatically route audio to proper devices based on events and platform API.
- Toggle speaker or microphone on/off, toggle flashlight on/off
- Play ringtone/ringback/dtmftone

## Screen Sharing

Request a desktop stream by calling `getDisplayMedia`:

```javascript
session
  .getDisplayMedia()
  .then((localDesktopStream) => {})
  .catch((error) => {});
```

In React Native, the [getDisplayMedia](https://github.com/react-native-webrtc/react-native-webrtc/blob/fe5ce9798cae5eb53fa028309b0217d7c22f255d/src/getDisplayMedia.ts#L9) method does not accept constrains as a parameter due to [react-native-webrtc](https://github.com/react-native-webrtc/react-native-webrtc) limitations.

If the local stream already exists, the next call to getUserMedia or getDisplayMedia will update the tracks in the stream and preserve the track's enabled state for the audio track.

### Screen Sharing on Android 

Follow this guide to configure [Screen Sharing on Android](https://github.com/react-native-webrtc/react-native-webrtc/blob/master/Documentation/AndroidInstallation.md#screen-sharing) and this to support [Screen Capture on Android 10+](https://github.com/react-native-webrtc/react-native-webrtc/blob/master/Documentation/AndroidInstallation.md#screen-capture-support---android-10). Call the `getDisplayMedia` after starting a ForegroundService:

```javascript
import { Platform } from 'react-native';
import notifee, { AndroidImportance } from '@notifee/react-native';

/* ... */

const ScreenSharingComponent() {
  const mediaParams = {
    audio: true,
    video: true,
  };

  const startShareScreen = async () => {
    if (Platform.OS === 'android') {
      const channelId = await notifee.createChannel({
        id: 'screen_capture',
        name: 'Screen Capture',
        lights: false,
        vibration: false,
        importance: AndroidImportance.DEFAULT,
      });

      await notifee.displayNotification({
        title: 'Screen Capture',
        body: 'Capturing...',
        android: {
          channelId,
          asForegroundService: true,
        },
      });
    }
    // Capturing a screen
    const stream = await session.getDisplayMedia();
  };

  const stopShareScreen = async () => {
    if (Platform.OS === 'android') {
      await notifee.stopForegroundService();
    }
    //Get back media stream from camera or call `session.stop(extension)`
    const stream = await session.getUserMedia(mediaParams);
  };

  return <>{/* ... */}</>
}

export default ScreenSharingComponent;
```

### Screen Sharing on iOS

Preform the [Screen Sharing integration for iOS](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-ios-sdk/#screen-sharing-integration) guide from Jitsi. Use `<ScreenCapturePickerView>` component from 'react-native-webrtc' to prepare:

```javascript
import React from 'react';
import { findNodeHandle, Platform, NativeModules } from 'react-native';
import { ScreenCapturePickerView } from 'react-native-webrtc';

/* ... */

const ScreenSharingComponent() {
  const screenCaptureView = React.useRef(null);

  const mediaParams = {
    audio: true,
    video: true,
  };

  const startShareScreen = async () => {
    if (Platform.OS === 'ios') {
      const reactTag = findNodeHandle(screenCaptureView.current);
      await NativeModules.ScreenCapturePickerViewManager.show(reactTag);
    }
    // Capturing a screen
    const stream = await session.getDisplayMedia();
  };

  const stopShareScreen = async () => {
    // Get back media stream from camera or call `session.stop(extension)`
    const stream = await session.getUserMedia(mediaParams);
  };

  return <>
    {/* ... */}
    {Platform.OS === 'ios' && (
      <ScreenCapturePickerView ref={screenCaptureView} />
    )}
  </>
}

export default ScreenSharingComponent;
```

## Group video calls

Because of [Mesh architecture](https://webrtcglossary.com/mesh/) we use for multipoint where every participant sends and receives its media to all other participants, current solution supports group calls with up to 4 people.

Also ConnectyCube provides an alternative solution for up to 12 people - [Multiparty Video Conferencing API](/reactnative/videocalling-conference).

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
    import { fetch, addEventListener } from "@react-native-community/netinfo";

    let isOnline;
    fetch().then(state => {
      isOnline = state.isConnected;
    });

    const unsubscribe = addEventListener(state => {
      isOnline = state.isConnected;
    });
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
    import { addEventListener } from "@react-native-community/netinfo";

    const unsubscribe = addEventListener(state => {
      if (!isOnline && state.isConnected) {
        if (session && needIceRestartForUsersIds.length > 0) {
          for (let userID of needIceRestartForUsersIds) {
            maybeDoIceRestart(session, userID);
          }
        }
      }

      isOnline = state.isConnected;
    });
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

### Echo cancelation issue on some Android devices 

A possible solution can be found here https://github.com/react-native-webrtc/react-native-webrtc/issues/713

## Recording

Not available as for now

## Continue call in background

If you are developing dedicated apps for iOS and Android - it's required to apply additional configuration for the app to keeping the call alive when it goes into the background.

**iOS: **

There is no way to continue a video call in background because of some OS restrictions. What is supported there is to continue with voice calling while an app is in background. Basically, the recommended to achieve this is to switch off device camera when an app goes to background and then switch camera on back when an app goes to foreground.

Furthermore, even voice background call are blocked by default on iOS. To unblock - you need to setup proper background mode capabilities in your project. Please find the [Enabling Background Audio link](https://developer.apple.com/documentation/avfoundation/media_playback_and_selection/creating_a_basic_video_player_ios_and_tvos/enabling_background_audio) with more information how to do it properly. Generally speaking, you need to enable `Voice over IP` and `Remote notifications` capabilities:

  ![Setup Xcode VOIP capabilities](../../../assets/xcode/voip_capabilities.png)

**Android: **

For Android, we also recommend to implement the same camera switch flow when go to background and then return to foreground.

To keep the call while in background, we recomment to use the **react-native-background-actions** library. 

The flow is the following:
- when start a call or go background -> display notification 
- when stop call or return to foreground -> hide notification 

```javascript
// Background Activity
import BackgroundService from 'react-native-background-actions';

startBackgroundMode = () => {
  this.stopBackgroundMode();

  const options = {
    taskName: 'AppName',
    taskTitle: 'You have an active call',
    taskDesc: 'Press to return',
    taskIcon: {
      name: 'ic_notification',
      type: 'mipmap',
    },
    linkingURI: 'appName://foreground',
  };

  BackgroundService.start(async (params) => {
    await new Promise(async () => {});
  }, options);
};

stopBackgroundMode = (force = false) => {
  if (BackgroundService.isRunning() || force) {
    return BackgroundService.stop();
  }
};
```

## CallKit

> A ready [RNVideoChat code sample](https://github.com/ConnectyCube/connectycube-reactnative-samples/tree/master/RNVideoChat) with CallKit integrated is available at GitHub. All the below code snippets will taken from it.

For mobile apps, it can be a situation when an opponent's user app is either in closed (killed) or background (inactive) state.

In this case, to be able to still receive a call request, a flow called CallKit is used. It's a mix of CallKit API + Push Notifications API + VOIP Push Notifications API. 

The complete flow is similar to the following:

- a call initiator should send a push notification (for iOS it's VOIP push notification) along with a call request
- when an opponent's app is killed or in background state - an opponent will receive a push notification about an incoming call, so the CallKit incoming call screen will be displayed, where a user can accept/reject the call.

The following libs should be used to integrate CallKit functionality:  

- [CallKeep](https://github.com/react-native-webrtc/react-native-callkeep) lib for accessing CallKit API
- [react-native-notifications](https://github.com/wix/react-native-notifications) lib along with [ConnectyCube Push Notifications API guide](/reactnative/push-notifications) for both push notifications and VOIP push notifications integration.

Below we provide a detailed guide on additional steps that needs to be performed in order to integrate CallKit into a RN app.

**Initiate a call**

When initiate a call via `session.call()`, additionally we need to send a push notification (standard for Android user and VOIP for iOS). This is required for an opponent(s) to be able to receive an incoming call request when an app is in background or killed state.

The following request will initiate a standard push notification for Android and a VOIP push notification for iOS:


```javascript
const callType = "video" // "voice"
const callInitiatorName = "..."
const callOpponentsIds = [...]

const pushParams = {
    message: `Incoming call from ${callInitiatorName}`,
    ios_voip: 1,
    handle: callInitiatorName,
    initiatorId: callSession.initiatorID,
    opponentsIds: callOpponentsIds.join(","),
    uuid: callSession.ID,
    callType
};
PushNotificationsService.sendPushNotification(callOpponentsIds, pushParams);

...

//  PushNotificationsService:

sendPushNotification(recipientsUsersIds, params) {
  const payload = JSON.stringify(params);
  const pushParameters = {
    notification_type: "push",
    user: { ids: recipientsUsersIds }, 
    environment: __DEV__ ? "development" : "production",
    message: ConnectyCube.pushnotifications.base64Encode(payload),
  };

  ConnectyCube.pushnotifications.events.create(pushParameters)
    .then(result => {
      console.log("[PushNotificationsService][sendPushNotification] Ok");
    }).catch(error => {
      console.warn("[PushNotificationsService][sendPushNotification] Error", error);
    });
}
```
We recommend to simply copy-past the entire [src/services/pushnotifications-service.js](https://github.com/ConnectyCube/connectycube-reactnative-samples/blob/master/RNVideoChat/src/services/pushnotifications-service.js) file from RNVideoChat code sample into your app.

### Receive call request in background/killed state

The goal of CallKit is to receive call request when an app is in background or killed state.
For iOS we will use CallKit and for Android we will use standard capabilities.

**Android**

First of all, we need to setup callbacks to receive push notification - in background and in killed state (there is a dedicated doc regarding how to setup a callback to receive pushes in killed state https://developers.connectycube.com/reactnative/push-notifications/#receive-pushes-in-killed-state-android):

```javascript
import invokeApp from 'react-native-invoke-app';

class PushNotificationsService {
  constructor() {
    console.log("[PushNotificationsService][constructor]");
    this._registerBackgroundTasks();
  }
  
  init() {
  
    Notifications.events().registerNotificationReceivedBackground(async (notification, completion) => {
      console.log("[PushNotificationService] Notification Received - Background", notification.payload, notification?.payload?.message);
  
      if (Platform.OS === 'android') {
        if (await PermissionsService.isDrawOverlaysPermisisonGranted()) {
          invokeApp();

          const dummyCallSession = {
            initiatorID: notificationBundle.initiatorId,
            opponentsIDs: notificationBundle.opponentsIds.split(","),
            ID: notificationBundle.uuid
          }
          store.dispatch(setCallSession(dummyCallSession, true, true));
        } else {
          PushNotificationsService.displayNotification(notification.payload);
        }
      }
  
      // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
      completion({alert: true, sound: true, badge: false});
    });
  }
  
  _registerBackgroundTasks() {
    if (Platform.OS === 'ios') {
      return;
    }

    const { AppRegistry } = require("react-native");

    // https://reactnative.dev/docs/headless-js-android
    //
    AppRegistry.registerHeadlessTask(
      "JSNotifyWhenKilledTask",
      () => {
        return async (notificationBundle) => {
          console.log('[JSNotifyWhenKilledTask] notificationBundle', notificationBundle);

          if (await PermissionsService.isDrawOverlaysPermisisonGranted()) {
            invokeApp();

            const dummyCallSession = {
              initiatorID: notificationBundle.initiatorId,
              opponentsIDs: notificationBundle.opponentsIds.split(","),
              ID: notificationBundle.uuid
            }
            store.dispatch(setCallSession(dummyCallSession, true, true));
          } else {
            PushNotificationsService.displayNotification(notificationBundle);
          }
        }
      },
    );
  }
}
```

What we do is we simply open app (bringing the app to foreground) once a push re incoming call is received and display an incoming call screen. This is done via [react-native-invoke-app](https://github.com/ConnectyCube/react-native-invoke-app) lib.

Also, we have `PermisisonsService` to check if a user granted a `DrawOverlays` permission to make the switch to foreground possible:

```javascript
import { isOverlayPermissionGranted, requestOverlayPermission } from 'react-native-can-draw-overlays';
import { Alert } from "react-native";

class PermisisonsService {
  async checkAndRequestDrawOverlaysPermission() {
    if (Platform.OS !== 'android') {
      return true;
    }

    const isGranted = await this.isDrawOverlaysPermisisonGranted();
    if (!isGranted) {
      Alert.alert(
        "Permission required",
        "For accepting calls in background you should provide access to show System Alerts from in background. Would you like to do it now?",
        [
          {
            text: "Later",
            onPress: () => {},
            style: "cancel"
          },
          { text: "Request", onPress: () => {
            this.requestOverlayPermission();
          }}
        ]
      );
  
    }
  }
    
  async isDrawOverlaysPermisisonGranted() {
    const isGranted = await isOverlayPermissionGranted();
    console.log("[PermisisonsService][isDrawOverlaysPermisisonGranted]", isGranted);
    return isGranted;
  }

  async requestOverlayPermission() {
    const granted = await requestOverlayPermission();
    console.log("[PermisisonsService][requestOverlayPermission]", granted);
    return granted;
  }
}

const permisisonsService = new PermisisonsService();
export default permisisonsService;
```

We recommend to simply copy-past the entire [src/services/permissions-service.js](https://github.com/ConnectyCube/connectycube-reactnative-samples/blob/master/RNVideoChat/src/services/permissions-service.js) file from RNVideoChat code sample into your app.

**iOS**

For iOS we need to setup CallKit. For this a [react-native-callkeep](https://github.com/react-native-webrtc/react-native-callkeep) library will be used. We recommend to connect a version from github rather than froim npm: `"react-native-callkeep": "github:react-native-webrtc/react-native-callkeep#master"`

All the logic is presented in `call-service.js` file:

```javascript
// CallService

import RNCallKeep, { CONSTANTS as CK_CONSTANTS } from 'react-native-callkeep';
import { getApplicationName } from 'react-native-device-info';
import RNUserdefaults from '@tranzerdev/react-native-user-defaults';

initCallKit() {
    if (Platform.OS !== 'ios') {
      return;
    }

    const options = {
      ios: {
        appName: getApplicationName(),
        includesCallsInRecents: false,
      }
    };

    RNCallKeep.setup(options).then(accepted => {
      console.log('[CallKitService][setup] Ok');
    }).catch(err => {
      console.error('[CallKitService][setup] Error:', err.message);
    });

    // Add RNCallKeep Events
    // RNCallKeep.addEventListener('didReceiveStartCallAction', this.didReceiveStartCallAction);
    RNCallKeep.addEventListener('answerCall', this.onAnswerCallAction);
    RNCallKeep.addEventListener('endCall', this.onEndCallAction);
    RNCallKeep.addEventListener('didPerformSetMutedCallAction', this.onToggleMute);
    RNCallKeep.addEventListener('didChangeAudioRoute', this.onChangeAudioRoute);
    RNCallKeep.addEventListener('didLoadWithEvents', this.onLoadWithEvents);
}

onAnswerCallAction = (data) => {
    console.log('[CallKitService][onAnswerCallAction]', data);

    // let { callUUID } = data;

    // Called when the user answers an incoming call via Call Kit
    if (!this.isAccepted) { // by some reason, this event could fire > 1 times
      this.acceptCall({}, true);
    }
};

onEndCallAction = async (data) => {
    console.log('[CallKitService][onEndCallAction]', data);

    let { callUUID } = data;

    if (this.callSession) {
      if (this.isAccepted) {
        this.rejectCall({}, true);
      } else {
        this.stopCall({}, true);
      }
    } else {
      const voipIncomingCallSessions = await RNUserdefaults.get("voipIncomingCallSessions");
      if (voipIncomingCallSessions) {
        const sessionInfo = voipIncomingCallSessions[callUUID];
        if (sessionInfo) {
          const initiatorId = sessionInfo["initiatorId"];

          // most probably this is a call reject, so let's reject it via HTTP API
          ConnectyCube.videochat.callRejectRequest({
            sessionID: callUUID,
            platform: Platform.OS,
            recipientId: initiatorId
          }).then(res => {
            console.log("[CallKitService][onEndCallAction] [callRejectRequest] done")
          });
        }
      }
    }
};

onToggleMute = (data) => {
    console.log('[CallKitService][onToggleMute]', data);

    let { muted, callUUID } = data;
    // Called when the system or user mutes a call

    this.muteMicrophone(muted, true)
};

onChangeAudioRoute = (data) => {
    console.log('[CallKitService][onChangeAudioRoute]', data);

    const output = data.output;
    // could be Speaker or Receiver
};

onLoadWithEvents = (events) => {
    console.log('[CallKitService][onLoadWithEvents]', events);

    // `events` is passed as an Array chronologically, handle or ignore events based on the app's logic
    // see example usage in https://github.com/react-native-webrtc/react-native-callkeep/pull/169 or https://github.com/react-native-webrtc/react-native-callkeep/pull/20
};
```

Also, when perform any operations e.g. start call, accept, reject, stop etc, we need to report back to CallKit lib - to have both app UI and CallKit UI in sync:

```javascript
RNCallKeep.startCall(callUUID, handle, contactIdentifier, handleType, hasVideo);

...

RNCallKeep.answerIncomingCall(callUUID);
 
...

RNCallKeep.rejectCall(callUUID);

...

RNCallKeep.endCall(callUUID);

...

RNCallKeep.setMutedCall(callUUID, isMuted);

...

RNCallKeep.reportEndCallWithUUID(callUUID, reason); 
```

For the `callUUID` we will be using call's `session.ID`.

The last point is to do the needed changes at iOS native code.

When receive a VOIP push notification in background/killed state, we must immediately display an incoming CallKit screen. Otherwise, the app will be banned with an error. To do so, the following changes in `AppDelegate.mm` should be done:

```javascript
#import "RNNotifications.h"
#import "RNEventEmitter.h"
#import "RNCallKeep.h"
...

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{

...

  [RNNotifications startMonitorNotifications];
  [RNNotifications startMonitorPushKitNotifications];
  
  [[NSNotificationCenter defaultCenter] addObserver:self
                                           selector:@selector(handlePushKitNotificationReceived:)
                                               name:RNPushKitNotificationReceived
                                             object:nil];
  // cleanup
  [[NSUserDefaults standardUserDefaults] removeObjectForKey:@"voipIncomingCallSessions"];
  
  return YES;
}

...

- (void)handlePushKitNotificationReceived:(NSNotification *)notification {
  UIApplicationState state = [[UIApplication sharedApplication] applicationState];
  
  if (state == UIApplicationStateBackground || state == UIApplicationStateInactive) {
    
    // save call info to user defaults
    NSMutableDictionary *callsInfo = [[[NSUserDefaults standardUserDefaults] objectForKey:@"voipIncomingCallSessions"] mutableCopy];
    if (callsInfo == nil) {
      callsInfo = [NSMutableDictionary dictionary];
    }
    [callsInfo setObject:@{
      @"initiatorId": notification.userInfo[@"initiatorId"],
      @"opponentsIds": notification.userInfo[@"opponentsIds"],
      @"handle": notification.userInfo[@"handle"],
      @"callType": notification.userInfo[@"callType"]
    } forKey:notification.userInfo[@"uuid"]];
    [[NSUserDefaults standardUserDefaults] setObject:callsInfo forKey:@"voipIncomingCallSessions"];
    
    // show CallKit incoming call screen
    [RNCallKeep reportNewIncomingCall: notification.userInfo[@"uuid"]
                               handle: notification.userInfo[@"handle"]
                           handleType: @"generic"
                             hasVideo: [notification.userInfo[@"callType"] isEqual: @"video"]
                  localizedCallerName: notification.userInfo[@"handle"]
                      supportsHolding: YES
                         supportsDTMF: YES
                     supportsGrouping: YES
                   supportsUngrouping: YES
                          fromPushKit: YES
                              payload: notification.userInfo
                withCompletionHandler: nil];
  } else {
    // when an app is in foreground -> will show the in-app UI for incoming call
  }
}
```

> All the above code snippets can be found in a ready [RNVideoChat code sample](https://github.com/ConnectyCube/connectycube-reactnative-samples/tree/master/RNVideoChat) with CallKit integrated.
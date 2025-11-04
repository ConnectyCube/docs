---
title: Flutter - FAQ
description: Find answers to common questions and troubleshoot potential issues with ConnectyCube Flutter SDK.
head:
  - tag: title
    content: Flutter FAQ | ConnectyCube
sidebar: 
    label: FAQ
    order: 12
---

## Voice & Video calling
<br>
<details>
<summary>After integration of a CallKit it doesn’t work on iOS but not Android</summary>

The reasons for this may include:

- Environment mismatch: Ensure the environment of the token matches the environment of the subscription (development or production).
- Invalid UUID string: Verify that the PARAM_SESSION_ID is a valid UUID string, as iOS requires it for call identification.

**Note:** iOS systems can only use UUID strings for call identification

</details>

<details>
<summary>iOS users are not receiving call notifications, ringtones, or pop-ups, whereas Android users are receiving them correctly (iOS to Android)</summary>

Follow the guide below to check VOIP on iOS:

1. Ensure that the VoIP push notifications credentials have been added to the ConnectyCube admin panel. Navigate to the Admin panel -> Push Notification -> Credentials and verify if the VoIP certificate (or Key data and team ID) has been added there. You can find our guide on how to create and set the certificate by following this [link](<https://developers.connectycube.com/ios/how-to-create-apns-certificate>).

2. Check the VoIP subscription for your user. Go to the Admin panel -> Users -> Users list, search for your user, and confirm if he has a subscription with the type APNS_VOIP. By clicking on the subscription ID, you can access more details about the created subscription.

      **Note1:** Ensure that the subscription environment matches the build type (it is necessary for iOS/macOS platforms). Users from the release app should be subscribed to the ‘production’ environment, while users from the debug build should be subscribed to the ‘development’ environment.

      **Note 2:** When running the app from Xcode on your device, it will generate the debug token, regardless of the selected build type. Therefore, you should subscribe to the ‘development’ environment. If you build your app to run from TestFlight (or similar), the system will return the release token, and you should use the ‘production’ environment.

      **Note 3:** The Flutter check 'parameters.environment = kReleaseMode' will return true even if you select Release build in Xcode and start your app from Xcode.

      **Note 4:** The 'parameters.bundleIdentifier' in the subscription parameters should match the BundleID of your app in Xcode and the BundleID set in your Certificate added to the ConnectyCube admin panel.

3. Upon creating the Call event (typically initializing the call), you can navigate to the Admin panel -> Push Notification -> Queue and find the created events. Here, you will find TWO records about the same event (at the same time). By clicking on the ‘sent’ status, you can access the full report about the sending of your event. You may encounter two scenarios:
- If you encounter an error, the result usually indicates the issue, and you simply need to resolve it.
- If there are no errors, but the push notifications are not received on the device, you need to investigate the issue on the device side. The most common issue related to VoIP push notifications is that your app may not display CallKit for VoIP push notifications due to various issues (such as crashes or being ignored). In this case, iOS will ignore VoIP notifications after approximately five unsuccessful attempts.

</details>

<details>
<summary>Receive Incoming call request in killed state</summary>

Check whether Firebase push notifications are being received at all.
If push notifications are not being received, please follow [our setup guide here](<https://developers.connectycube.com/flutter/push-notifications/#android-and-web>).

Make sure to pay close attention to the section “Browse your saved FCM Service account key” in your ConnectyCube Dashboard.

As an additional tip, we highly recommend running our P2P sample to verify everything is working correctly with your current settings. This can help ensure your configuration is complete and functioning as expected.

</details>

<details>
<summary>User continue to receive calls even after logging out</summary>

if you still receive a call after being logged out, make sure that deleteSubscription() is successfully called during logout. You can refer to the [docs here](<https://developers.connectycube.com/flutter/push-notifications/#unsubscribe>).

Also, ensure that the logout process itself completes successfully.

Additionally, it would be helpful to check whether this behavior is reproducible in the sample app without any modifications from your side.

</details>

<details>
<summary>Is that possible to make a video call with a member(s) in a chat room and also send and receive chat messages?</summary>

You should get the dialog where the video call is initiated <https://developers.connectycube.com/flutter/messaging/#list-dialogs>
     
     getDialogs({'id': dialogId}).then((dialogs) {
    
      });

and init chatMessagesManager, [link for the docs is here](<https://developers.connectycube.com/flutter/messaging/#sendreceive-chat-messages>).
Also check the [code in sample](<https://github.com/ConnectyCube/connectycube-flutter-samples/blob/9d51d082d533038a[…]a3a237f04b3452018d5/chat_sample/lib/src/chat_dialog_screen.dart>) for refference.

CubeChatConnection.instance.chatMessagesManager!.chatMessagesStream.listen(onReceiveMessage);

Now you are able to chatting during the video call.

</details>

<details>
<summary>The stream is not reconnecting if I change network while I am in the middle of a call</summary>

[Documentation 'Tackling network changes'](<https://developers.connectycube.com/js/videocalling/#tackling-network-changes>) for refference.

</details>

<details>
<summary>Is it possible to add new person to the 1-on-1 call while the call is ongoing?</summary>

With P2P calls adding new users during the call isn't available. As an option, you can migrate your calls to conference type to have such ability.

</details>

<details>
<summary>Is it possible to change text of the buttons on the notification about the incoming call?</summary>

Out of the box it's not possible.
CallKit uses [NotificationCompat.CallStyle.forIncomingCall](<https://developer.android.com/reference/androidx/core/app/NotificationCompat.CallStyle#forIncomingCall%28androidx.core.app.Person,android.app.PendingIntent,android.app.PendingIntent%29>) where title and buttons are set by default, but in [NotificationsManager.kt](<https://github.com/ConnectyCube/connectycube-flutter-call-kit/blob/bcd4442946e9407ecf7117a8b3a43be8f6df204e/android/src/main/kotlin/com/connectycube/flutter/connectycube_flutter_call_kit/NotificationsManager.kt#L211>) this style can be changed.

</details>

<details>
<summary>Custom ringtone doesn't play on iOS</summary>

Review the log of your app and search the log with the tag NotificationsManager. There will be printed lines with the selected ringtone. Check if it is present by the displayed path.
For Android it's **app_name/android/app/src/main/res/raw/custom_ringtone.mp3** and for iOS path should be **Resources/ringtones/custom_ringtone.caf**.

If you do not have the resource with the name custom_ringtone in the res directory of your Android project by path app_name/android/app/src/main/res/raw/custom_ringtone.mp3, then delete the parameter ringtone from the [initialization method](<https://github.com/ConnectyCube/connectycube-flutter-call-kit#listen-in-the-foreground>) or set null or empty string there. Additionally, you can delete and install the app again to delete the Notification channel with the previous config.

</details>

## Chat & Messaging
<br>
<details>
<summary>Chat listener is not working when an app is killed</summary>

It is totally expected that the chat listener is not working when an app is killed.
If you want to receive notifications when an app is killed, you have to use Push Notifications.
The steps as the following:
1) Enable Chat Alerts in [Dashboard](<https://developers.connectycube.com/flutter/messaging/#chat-alerts>),
so when recipient is offline (app is killed), a chat server will initiate a push notification instead of chat message.
2) [Configure push notifications](<https://developers.connectycube.com/flutter/push-notifications/>) for your app. 
3) Once the above configuerd, when app is killed you will start receiving push notifications automatically when someone sent you a message.
Additionaly, to help the Chat server better manage user offline/online state, when app goes to background/foreground you need to mark you as active/inactive using the [following APIs](<https://developers.connectycube.com/flutter/messaging/#mark-a-client-as-activeinactive>).
4) When all the above is done, if you can receive push notifications in killed state in DEBUG app build but can’t in RELEASE app build, look at [this issue](<https://github.com/ConnectyCube/connectycube-flutter-sdk-releases/issues/106>).

</details>

<details>
<summary>When the admin sends a message from the web interface to mobile, no chat notifications are received . There is no badge, popup, or system-level notification on the mobile side, even though the message is received in the chat history</summary>

There is a meaning of **“automatic push notification to offline users in chat”** in ConnectyCube.
When a user sends a message to another user that is offline, the push notification can be automatically initiated.
To enable this feature, the following need to be done:
1. go to [ConnectyCube dashboard](<https://admin.connectycube.com>), Chat -> Offline notifications sub menu and configure the automatic push notifications template. Or you can leave the default one as for the start.
2. At Flutter app side, you need to let the user to subscribe for push notifications to be able to receive it. Follow [the guide](<https://developers.connectycube.com/flutter/push-notifications/>), mainly 2 sections: 'Configuration' and 'Subscribe to push notifications'. 

</details>

## Push notifications
<br>
<details>
<summary>Not receiving the VOIP token on iOS</summary>

Check if all necessary background modes are configured in the ios/Runner/Info.plist file. This issue may occur if the Info.plist is missing the required VOIP background modes, which are essential for the app to handle VOIP push notifications properly. 

Additionally, reviewing the [ConnectyCube documentation](<https://developers.connectycube.com/flutter/push-notifications/#voip-push-notifications>) and the [P2P Calls code  sample](<https://developers.connectycube.com/flutter/code-samples/#p2p-calls-code-sample>) could help ensure that the setup aligns with the expected configuration for obtaining the VOIP token.

</details>
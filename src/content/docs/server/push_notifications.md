---
title: Push notifications API
description: Elevate ReactNative app's performance with push notifications API guide. Keep users engaged with real-time updates, ensuring seamless interaction on the go
head:
  - tag: title
    content: Push notifications API | Connectycube
sidebar: 
    label: Push notifications
    order: 6
---

Push notifications are a communication channel built into every mobile device sold today. Push notifications allow apps to reach out to users with short messages that users may respond to. Users don't have to be in the app or using their devices to receive them.

ConnectyCube provides an API to subscribe users for push notifications and to initiate push events.

To send a notification on user's device, the following actions should be initially completed:

On receiver's side:
1. [Create session with a user](/server/auth#create-session-with-user-authorization)
2. [Subscribe user on push notifications](/server/push_notifications#create-subscription)

On sender's side:
1. [Create session with a user](/server/auth#create-session-with-user-authorization)
2. [Create event](/server/push_notifications#create-event)


## Create subscription

###### Endpoint
```
POST https://api.connectycube.com/subscriptions
```

###### Parameters

| Parameter | Required for channel | Description |
|---------- |:---------: |------------------
| notification_channel | all | Declare which notification channels could be used to notify user about events: <li>apns</li> <li>apns_voip</li> <li>gcm</li> <li>web</li>
| push_token[environment] | all | Determines application environments. It allows conveniently separate development and production environments. Allowed values: <li>development</li> <li>production</li>
| push_token[bundle_identifier] | optional | A unique identifier for client's application. In iOS, this is the Bundle Identifier. In Android - package id
| push_token[client_identification_sequence] | `gcm`, `apns`, `apns_voip` | Identifies client device in 3-rd party service like APNS, GCM/FCM. Initially retrieved from 3-rd service and should be send to ConnectyCube to let it send push notifications to the client
| push_token[web_endpoint] | `web` | `endpoint` param in 3-rd party service like [web client subscribe](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription#example).
| push_token[web_auth] | `web` | `keys.auth` param in 3-rd party service like [web client subscribe](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription#example).
| push_token[web_p256dh] | `web` | `keys.p256dh` param in 3-rd party service like [web client subscribe](https://developer.mozilla.org/en-US/docs/Web/API/PushSubscription#example).
| device[platform] | all | Platform of device, which is the source of application running. Allowed values: <li>ios</li> <li>android</li> <li>web</li>
| device[udid] | all | UDID (Unique Device identifier) of device, which is the source of application running. This must be any sequence which uniquely identifies a particular device. This is needed to support schema: 1 User - Multiple devices

###### Request example

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d '{"notification_channel": "apns", "push_token": {"environment": "development", "client_identification_sequence": "98559c1f3028b3fa0ec811d058cef16be27fe2fc507ca243b3d4fab006bfc9b8"}, "device": {"platform": "ios", "udid": "BFE36393-24E4-7689-AF85-428F4A5F2ED9"}}' \
https://api.connectycube.com/subscriptions
```

###### Response
```json
[
  {
    "subscription": {
      "id": 50,
      "notification_channel": {
        "name": "apns"
      },
      "device": {
        "udid": "BFE36393-24E4-7689-AF85-428F4A5F2ED9",
        "platform": {
          "name": "ios"
        }
      }
    }
  }
]
```

## Retrieve subscriptions
Retrieve subscriptions for current user.

```
GET https://api.connectycube.com/subscriptions
```

###### Request example

```bash
curl -X GET \
-H "CB-Token: <TOKEN>" \
https://api.connectycube.com/subscriptions
```

###### Response
```json
[
  {
    "subscription": {
      "id": 55,
      "notification_channel": {
        "name": "apns"
      },
      "device": {
        "udid": "7618C089-4C28-5214-6H3C-763AC0CA79FW",
        "platform": {
          "name": "ios"
        }
      }
    }
  },
  {
    "subscription": {
      "id": 56,
      "notification_channel": {
        "name": "apns"
      },
      "device": {
        "udid": "7618C089-4C28-5214-6H3C-763AC0CA79FW",
        "platform": {
          "name": "ios"
        }
      }
    }
  }
]
```

## Remove subscription
Remove a subscription by its identifier.

###### Endpoint
```
DELETE https://api.connectycube.com/subscriptions/{subscription_id}
```
###### Request example

```bash
curl -X DELETE \
-H "CB-Token:  <TOKEN> "\
https://api.connectycube.com/subscriptions/56
```
###### Response
```
200 OK
```


## Create event
Create event to initiate a push notification delivery.

###### Endpoint
```
POST https://api.connectycube.com/events
```

###### Parameter
| Parameter | Required | Type | Description |
|---------- | :--------: | :-------------: | -------------
| event[notification_type] | yes | enum | Type of notification. Allowed values: <li>push</li>
| event[push_type] | yes | enum | Used only if **notification_type == push**, ignored in other cases. <li>If not present - Notification will be delivered to all possible devices for specified users. Each platform has their own standard format. <li>If specified - Notification will be delivered to the specified platform only.</li> Allowed values: <li>apns</li> <li>apns_voip</li> <li>gcm</li>
| event[environment] | yes | enum | An environment of the notification. Allowed values: <li>development</li> <li>production</li>
| event[event_type] | no | enum | Allowed values: <li>**one_shot** - to send immediately </li>
| event[message] | yes | <li> event[push_type] not present - should be Base64 encoded text. </li> <li>event[push_type] specified - should be formatted as described in [Payload formation rules](/server/push_notifications#payload-formation-rules) </li> | Push notification payload
| event[user][ids] | optional* | string | Users who will receive push notifications. Several IDs comma separated can be specified
| event[external_user][ids] | optional* | string | Send push notifications to users specifying their external IDs. Several external IDs comma separated can be specified
| event[user][tags][any] | optional* | string | Send push notifications to users specifying their tag(s). Recipients must have at least one tag specified in the list of tags
| event[user][tags][all] | optional* | string | Send push notifications to users specifying their tag(s). Recipients must have **all tags** specified in list of tags
| event[user][tags][exclude] | optional* | string | Send push notifications to users who do not have the specified tags

** *Only one of these parameters is required.**

###### Request example
```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "CB-Token:  <TOKEN>" \
-d '{"event": {"notification_type": "push", "environment": "development", "user": { "ids": "271"}, "message": "payload=ew0KICAgICJhcHMiIDogew0KICAgICAgICAiYWxlcnQiIDogew0KICAgICAgICAgICAgInRpdGxlIiA6ICJHYW1lIFJlcXVlc3QiLA0KICAgICAgICAgICAgImJvZHkiIDogIkJvYiB3YW50cyB0byBwbGF5IHBva2VyIg0KICAgICAgICB9LA0KICAgICAgICAiYmFkZ2UiIDogNQ0KICAgIH0sDQogICAgImFjbWUxIiA6ICJiYXIiDQp9", "push_type": "apns"}}' \
https://api.connectycube.com/events
```
###### Response
```json
[{
    "event": {
        "id": 8429,
        "event_type": "one_shot",
        "message": "payload=ew0KICAgICJhcHMiIDogew0KICAgICAgICAiYWxlcnQiIDogew0KICAgICAgICAgICAgInRpdGxlIiA6ICJHYW1lIFJlcXVlc3QiLA0KICAgICAgICAgICAgImJvZHkiIDogIkJvYiB3YW50cyB0byBwbGF5IHBva2VyIg0KICAgICAgICB9LA0KICAgICAgICAiYmFkZ2UiIDogNQ0KICAgIH0sDQogICAgImFjbWUxIiA6ICJiYXIiDQp9",
        "date": null,
        "period": null,
        "name": null,
        "occured_count": 0,
        "created_at": "2018-12-06T11:31:23Z",
        "updated_at": "2018-12-06T11:31:23Z",
        "end_date": null,
        "active": true,
        "application_id": 1,
        "user_id": 271,
        "kind": "API",
        "environment": "development",
        "tag_query": null,
        "notification_channel": {
            "name": "apns"
        }
    }
}]
```

## Payload formation rules

### Universal Push Notifications
Universal push notifications will be delivered to all platforms. To send Universal push notification do not set `event[push_type]` parameter in the 'Create event' request.

There are some standard parameters, which will be translated to particular platform parameters:

* **message** - push text. Will be translated to `aps.alert.body` for iOS and to `data.message` for Android
* **ios_badge** - will be translated to `aps.badge` for iOS. Ignored for Android
* **ios_sound** - will be translated to `aps.sound` for iOS. Ignored for Android
* **ios_content_available=1** - will be translated to `aps.content-available` for iOS. Ignored for Android
* **ios_mutable_content=1** - will be translated to `aps.mutable-content` for iOS. Ignored for Android
* **ios_category** - will be translated to `aps.category` for iOS. Ignored for Android
* **ios_voip=1** - will initiate VoIP push notification for iOS if user has VoIP push subscription. Otherwise - iOS user will receive standard iOS push. For Android - it will be a standard push.
* **ios_push_type** - will be translated to `apns-push-type` header for iOS. Allowed values (`alert`, `background`), default `alert`. Ignored for Android
* **ios_thread_id** - will be translated to `aps.thread-id` for iOS. Ignored for Android
* **expiration** - A UNIX epoch date expressed in seconds (UTC). This value identifies the date when the notification is no longer valid and can be discarded. In short, the value should equal 'current timestamp' + 'ttl offset, in seconds'. Will be translated to `apns-expiration` for iOS and `time-to-live` or `ttl` for Android FCM
* **android_fcm_notification** - will be translated to 'notification.*' param on Android. Ignored for iOS. [Available fields](https://firebase.google.com/docs/reference/fcm/rest/v1/projects.messages#AndroidNotification)
* **ios_loc_data** - object with notification localization settings for iOS. Ignored for Android <br>
Object example:
```json
{
    "title_loc_key": "GREETING_NOTIFICATION",
    "title_loc_args": ["smith"],
    "body_loc_key": "CUBE_NOTIFICATION",
    "body_loc_args": ["hi there", "guest"]
}
```
`title_loc_key` - will be translated to `aps.alert.title-loc-key` <br>
`title_loc_args` - will be translated to `aps.alert.title-loc-args` <br>
`body_loc_key` - will be translated to `aps.alert.loc-key` <br>
`body_loc_args` - will be translated to `aps.alert.loc-args` <br>
None of these parameters are required


Other custom parameters can be used as well according to specific platform push format.

**Example:**

1. Initial JSON message:
```json
{
    "message": "Walking in a flowers garden",
    "ios_badge": 2,
    "ios_sound": "lounge.wav",
    "friend_id": 51,
    "ios_loc_data": {
        "title_loc_key": "GREETING_NOTIFICATION",
        "title_loc_args": ["Tom Silencer"],
    }
}
```

2. Base64-encoded:
```
eyJtZXNzYWdlIjoiV2Fsa2luZyBpbiBhIGZsb3dlcnMgZ2FyZGVuIiwiaW9zX2JhZGdlIjoyLCJpb3Nfc291bmQiOiJsb3VuZ2Uud2F2IiwiZnJpZW5kX2lkIjo1MSwiaW9zX2xvY19kYXRhIjp7InRpdGxlX2xvY19rZXkiOiJHUkVFVElOR19OT1RJRklDQVRJT04iLCJ0aXRsZV9sb2NfYXJncyI6WyJUb20gU2lsZW5jZXIiXX19
```

3. Final message:
```
event[message]=eyJtZXNzYWdlIjoiV2Fsa2luZyBpbiBhIGZsb3dlcnMgZ2FyZGVuIiwiaW9zX2JhZGdlIjoyLCJpb3Nfc291bmQiOiJsb3VuZ2Uud2F2IiwiZnJpZW5kX2lkIjo1MSwiaW9zX2xvY19kYXRhIjp7InRpdGxlX2xvY19rZXkiOiJHUkVFVElOR19OT1RJRklDQVRJT04iLCJ0aXRsZV9sb2NfYXJncyI6WyJUb20gU2lsZW5jZXIiXX19
```

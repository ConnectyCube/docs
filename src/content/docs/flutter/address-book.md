---
title: Address Book
description: Effortlessly upload, sync, and access ConnectyCube users from your phone contacts in your Flutter app with Address Book API.
head:
  - tag: title
    content: Flutter Address Book API | ConnectyCube
sidebar: 
    label: Address Book
    order: 9
---

Address Book API provides an interface to work with phone address book, upload it to server and retrieve already registered ConnectyCube users from your address book.

With conjunction of [User authentication via phone number](/flutter/authentication-and-users#authentication-via-phone-number) you can easily organize a modern state of the art logic in your App where you can easily start chatting with your phone contacts, without adding them manually as friends - the same what you can see in WhatsApp, Telegram, Facebook Messenger and Viber.

## Upload Address Book

First of all you need to upload your Address Book to the backend. It's a normal practice to do a full upload for the 1st time and then upload diffs on future app logins.

```dart
List<CubeContact> contacts = [];
contacts.add(CubeContact("Gordie Kann", "1879108395"));
contacts.add(CubeContact("Wildon Gilleon", "2759108396"));
contacts.add(CubeContact("Gaston Center", "3759108396"));

String uuid = "";  // unique identificator for Addressbook, skip it to use global Addressbook for user
bool force = true; // true - to overwrite Addressbook, false - to update
  
uploadAddressBook(contacts, force, uuid)
  .then((addressBookResult) {})
  .catchError((error) {});
```

-   You also can edit an existing contact by providing a new name for it.
-   You also can upload more contacts, not just all in one request - they will be added to your address book on the backend. If you want to override the whole address book on
the backend - just provide `force = true` option.

-   You also can remove a contact by setting `destroy: true`.
-   A device UDID is used in cases where user has 2 or more devices and contacts sync is off. Otherwise - user has a single global address book.

## Retrieve Address Book

If you want you can retrieve your uploaded address book:

```dart
String uuid = ""; // unique identificator for Addressbook, skip it to use global Addressbook for user

getAddressBook(uuid)
    .then((contactsList) {})
    .catchError((error) {});
```

## Retrieve Registered Users

Using this request you can easily retrieve the ConnectyCube users - you phone Address Book contacts that already  
registered in your app, so you can start communicate with these users right away:

```dart
bool compact = true; // true - server will return only id, phone and addressBookName fields of User. Otherwise - all User's fields will be returned.
String uuid = ""; // unique identificator for Addressbook, skip it to use global Addressbook for user

getRegisteredUsersFromAddressBook(compact, uuid)
    .then((usersList) {})
    .catchError((error) {});
```

## Push notification on new contact joined

There is a way to get a push notification when some contact from your Address Book registered in an app.

You can enable this feature at [ConnectyCube Dashboard](https://admin.connectycube.com), Users module, Settings tab:

![Setup push notification on new contact joined](../../../assets/address_book/setup_push_notification_on_new_contact_joined.png)

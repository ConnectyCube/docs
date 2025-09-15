---
title: Address Book API
description: Effortlessly upload, sync, and access ConnectyCube users from your phone contacts in your application with Address Book API.
head:
  - tag: title
    content: Address Book API | ConnectyCube
sidebar: 
    label: Address Book
    order: 8
---

AddressBook API allows to store the address book contacts on server and notify that someone from the address book is registered in ConnectyCube.

## Upload address book
Upload contacts from the address book on server and / or update list of contacts if it was changed.

With 'Upload address book' request, 3 different actions can be performed:

* create contact(s)
* updated contact(s)
* delete contact(s)

###### Endpoint
```
POST https://api.connectycube.com/address_book
```
###### Parameters

|Parameter | Data type | Description|
|-----|----|--------------
|contacts| hash| Array of contacts hashes generated as 'contact name' and  'phone': <li> **name** - required only for create/update action. Validation: length up to 255 symbols </li> <li>**phone** - required for all types of actions. Validation: min 10 and max 15 chars </li> <li> **destroy** - remove contact from address book. Should be set to '1'
|force| integer| Re-write the whole address book on server. Should be set to '1'
|udid| string| User's device identifier. If specified - all operations will be performed for the specified device only. If not specified - all operations will be performed across all devices. Validation: length up to 64 symbols


###### Request example

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d '{"contacts": [{"name":"Halldor Kun ","phone":"9506728854"},{"name":"Lidija Halil","phone":"5309413409"}], "force": 1, "udid": "d6236da0-f941-11e8-8eb2-f2801f1b9fd1"}' \
https://api.connectycube.com/address_book
```

###### Response

```json
{
  "deleted" : 2,
  "rejected" : {
    "1" : [ "Invalid fields set" ],
    "1" : [ "Length of 'phone' field should be min: 10 and max: 15." ],
    "3" : [ "Length of 'name' field should be min: 1 and max: 255." ]
  },
  "created" : 25,
  "updated" : 5
}
```

## Retrieve address book

Retrieve the contacts from uploaded address book.

###### Endpoint
```
GET https://api.connectycube.com/address_book
```

###### Parameters

|Parameter | Description|
|-----|--------
|udid| User's device identifier. If specified - contacts from that device will be retrieved. If not specified - contacts from the global address book will be retrieved

###### Request example

```bash
curl -X GET \
-H "CB-Token: <TOKEN>" \
https://api.connectycube.com/address_book
```

###### Response

```json
[
  {
    "phone" : "61412675500",
    "name" : "Dacia McCombie"
  },
  {
    "phone" : "61736404001",
    "name" : "Oliver Knox"
  },
  {
    "phone" : "61338804529",
    "name" : "Taila Buckley"
  }   
]

```

## Retrieve already registered contacts/users
Retrieve users who are in the address book and are registered in ConnectyCube.

###### Endpoint

```
GET https://api.connectycube.com/address_book/registered_users

```

###### Parameters

|Parameter| Description
|-----|--------
|udid| User's device identifier. If specified - only contacts from the device will be checked. If not specified - global address book will be checked
|compact| Defines information retrieved for each contact: <li> `compact`=1 - only user's ID, phone and name (with which the user was saved in the Address book) will be retrieved </li> <li> `compact`=0 - all fields from user's profile will be returned

###### Request example

```bash
curl -X GET \
-H "CB-Token: <TOKEN>" \
-d 'udid=A337E8A2-80AD-8ABA-9F5D-579EFF6BACAB&compact=1' \
https://api.connectycube.com/address_book/registered_users
```

###### Response

```json
{
  "items": [
    {
      "user": {
        "id": 212,
        "phone": "614126755001",
        "address_book_name": "Dacia McCombie"
      }
    },
    {
      "user": {
        "id": 8923,
        "phone": "478902328938",
        "address_book_name": "Oliver Knox"
      }
    }
  ]
}

```

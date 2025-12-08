---
title: Meeting API
description: Enabling admins to administrating meetings and recordings.
head:
  - tag: title
    content: Meeting API for administration | Connectycube
sidebar: 
    label: Meeting
    order: 2
---

## Create Meeting

###### Endpoint
```
POST https://api.connectycube.com/admin/meetings
```

###### Parameters

| Parameter           | Data type          | Description                                                             | Value example
|---------------------|--------------------|-------------------------------------------------------------------------|----------------
| user_id             | integer            | User Id is the future meeting host | 32242

Other parameters same as for [Create Meeting API](/server/meetings#create-meeting)

###### Request example

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "CB-Administration-API-Key: <API_KEY>" \
-d '{"user_id": 32242, "name": "Friday weekly sync", "start_date": 1613729948, "end_date": 1613731012, "attendees": [{"id": 245,"email": "email1@domen.com"}, {"email": "email2@domen.com"}], "record": false, "chat": false}' \
https://api.connectycube.com/admin/meetings
```

###### Response

```json
{
  "_id":"6932e0f8652986000d48148a",
  "name":"Friday weekly sync",
  "start_date":1613729948,
  "end_date":1613731012,
  "attendees":[
    {"id":245,"email":"email1@domen.com"},
    {"email":"email2@domen.com"}
  ],
  "public":false,
  "scheduled":false,
  "record":false,
  "created_at":"2025-12-05T13:41:12Z",
  "updated_at":"2025-12-05T13:41:12Z",
  "host_id":32242,
  "notify":false,
  "chat_dialog_id":null,
  "notify_before":null,
  "timezone":null
}
```

## Retrieve Meeting Recordings

###### Endpoint
```
GET https://api.connectycube.com/admin/meetings/recordings/{meeting_id}
```

###### Request example

```bash
curl -X GET \
-H "CB-Administration-API-Key: <API_KEY>" \
https://api.connectycube.com/admin/meetings/recordings/6932e0f8652986000d48148a
```

###### Response

```json
[
  {
    "_id":"6932e49ab470430179b26dcb",
    "room_id":"6932e0f8652986000d48148a",
    "participants_count":1,
    "participants_ids":[10786],
    "file_uid":"cPVjAzs8aLbHFsB9DOAL6fBp",
    "duration":60000,
    "size":1000000,
    "updated_at":"2025-12-05T13:56:42Z",
    "created_at":"2025-12-05T13:56:42Z",
    "download_url":"https://cloud-folder-recordings.s3.us-east-1.amazonaws.com/videos/cPVjAzs8aLbHFsB9DOAL6fBp?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=XXXXXXXXXXXXXXXXXXX%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251205T140817Z&X-Amz-Expires=604800&X-Amz-Signature=hg57ge78r7g7g9gi7ggshtdhgiurrgi&X-Amz-SignedHeaders=host&response-cache-control=max-age%3D604800&x-id=GetObject"
  },
  {
    "_id":"6932e49ab470430179b26dcc",
    "room_id":"6932e0f8652986000d48148a",
    "participants_count":1,
    "participants_ids":[10786],
    "file_uid":"UF4wqqkvZgPt9YaLBkj-P2xS",
    "duration":60000,
    "size":1000000,
    "updated_at":"2025-12-05T13:56:42Z",
    "created_at":"2025-12-05T13:56:42Z",
    "download_url":"https://cloud-folder-recordings.s3.us-east-1.amazonaws.com/videos/UF4wqqkvZgPt9YaLBkj-P2xS?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=XXXXXXXXXXXXXXXXXXXX%2F20251205%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20251205T140721Z&X-Amz-Expires=604800&X-Amz-Signature=fafsdfjrtejlrkth54t67etw768er34tr&X-Amz-SignedHeaders=host&response-cache-control=max-age%3D604800&x-id=GetObject"
  }
]
```

## Delete Meeting Recordings

###### Endpoint
```
DELETE https://api.connectycube.com/admin/meetings/recordings/{meeting_id}
```

###### Request example

```bash
curl -X DELETE \
-H "CB-Administration-API-Key: <API_KEY>" \
https://api.connectycube.com/admin/meetings/recordings/6932e0f8652986000d48148a
```

###### Response

```json
{}
```
---
title: Storage API
description: Manage and optimize data storage to enhance performance and scalability. Explore our documentation for simplified integration and powerful storage solutions.
head:
  - tag: title
    content: Storage API | Connectycube
sidebar: 
    label: Storage
    order: 7
---

**Storage API** allows to store any kind of files in the ConnectyCube cloud. Mainly it is used for chat attachments, users avatars, group chat pictures.

All files in the ConnectyCube are named as **blobs** - binary large object. It is a data type that can store binary objects or data.

## File model

| Parameter | Description |
|---------- | --------------
| id | FIle identifier
| created_at | Date and time when file was created. System creates this parameter automatically
| updated_at | Date and time when file was updated. System creates this parameter automatically
| name | File name, the lenth can be min 1 char and max 100 chars
| status | (**deprecated**) Status of file, can be 'null' or 'complete'
| public | File availability / access. Can be public or private. By default all created files are private
| uid | Unique identifier that points to an object in Amazon S3 service. Mainly used to download file content.
| content_type | Type of file. Format: [mime type](https://en.wikipedia.org/wiki/Media_type)
| size | File size
| blob_object_access | Data that are used for upload or download file 
| last_read_access_ts | (**deprecated**) Last date and time when the file was accessed
| set_completed_at | (**deprecated**) Date and time when 'Completed' status was set for a file with 'Declaring file uploaded' request

## File upload flow

The complete file upload flow looks as follow:

* [Create a file](/server/storage#create-a-file)
* [Upload a file](/server/storage#upload-a-file)
* [Declare file uploaded](/server/storage#declare-file-uploaded)

## Create a file

With a **create a file** request a new file can be created on server and used in the application. To create a new file at least two mandatory parameters `content_type` and `name` should be set to identify what file will be created.
As a response, created file will receive `blob_object_access` parameter with a link on Amazon S3 service where this file will be stored.

###### Endpoint
```
POST https://api.connectycube.com/blobs
```
###### Parameters
| Parameter | Required | Description |
|---------- |--------- |--------------
| blob[content_type] | Yes | Mime content type. This is a type of file to create, it can be image, video, audio, etc.
| blob[name] | Yes | Name of a new file
| blob[public] | No | File visibility. Can be public or private. By default all created files are private (`blob[public]=false`)

###### Request example

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d '{"blob": {"content_type": "image/jpeg", "name": "cat.jpeg"}}' \
https://api.connectycube.com/blobs
```
###### Response
```json
{
    "blob": {
        "id": 46919,
        "uid": "763ef825ad8748239ed07def2c14555100",
        "content_type": "image/jpeg",
        "name": "cat.jpeg",
        "size": null,
        "created_at": "2018-12-10T10:26:01Z",
        "updated_at": "2018-12-10T10:26:01Z",
        "public": true,
        "blob_object_access": {
            "id": 46919,
            "blob_id": 46919,
            "expires": "2018-12-10T11:26:01Z",
            "object_access_type": "Write",
            "params": "https://s3.amazonaws.com/cb-shared-s3?Content-Type=image%2Fjpeg&Expires=Mon%2C%2010%20Dec%202018%2011%3A26%3A01%20GMT&acl=public-read&key=763ef825ad8748239ed07def2c14555100&policy=eyJleHBpcmF0aW9uIjoiMjAxOC0xMi0xMFQxMToyNjowMVoiLCJjb25kaXRpb25zIjpbeyJidWNrZXQiOiJjYi1zaGFyZWQtczMifSx7ImFjbCI6InB1YmxpYy1yZWFkIn0seyJDb250ZW50LVR5cGUiOiJpbWFnZS9qcGVnIn0seyJzdWNjZXNzX2FjdGlvbl9zdGF0dXMiOiIyMDEifSx7IkV4cGlyZXMiOiJNb24sIDEwIERlYyAyMDE4IDExOjI2OjAxIEdNVCJ9LHsia2V5IjoiNzYzZWY4MjVhZDg3NDgyMzllZDA3ZGVmMmMxNDU1NTEwMCJ9LHsieC1hbXotY3JlZGVudGlhbCI6IkFLSUFJRzNXUFQ3UkFMWU9aVzZRLzIwMTgxMjEwL3VzLWVhc3QtMS9zMy9hd3M0X3JlcXVlc3QifSx7IngtYW16LWFsZ29yaXRobSI6IkFXUzQtSE1BQy1TSEEyNTYifSx7IngtYW16LWRhdGUiOiIyMDE4MTIxMFQxMDI2MDFaIn1dfQ%3D%3D&success_action_status=201&x-amz-algorithm=AWS4-HMAC-SHA256&x-amz-credential=AKIAIG3WPT7RALYOZW6Q%2F20181210%2Fus-east-1%2Fs3%2Faws4_request&x-amz-date=20181210T102601Z&x-amz-signature=718eabea1a52a1cf03f926310a22ad7f68daa5b2b66432abaed2a0f90e74952d"
        }
    }
}
```

## Upload a file
Upload a file with the parameters taken from `blob_object_access` field from **create a file** response.

**Note:** The maximum size of the uploaded file is 100 Mb.

###### Endpoint
```
POST https://cb-shared-s3.s3.amazonaws.com
```

###### Parameters
Use parameters and URL from `blob_object_access` received as a response for [Create a file](/server/storage#create-a-file) request. The complete list pf parameters can vary.

| Parameter | Value |
|----------- |------------ |
| Content-Type | image/jpg |
| Expires | Fri, 23 Nov 2018  15.30.33 GMT |
| acl | public-read |
| key | c44be580f3294f1ca18056d62f75864500 |
| policy | eyJleHBpcmF0aW9...OVoifV19 |
| success_action_status | 201 |
| x-amz-algorithm | AWS4-HMAC-SHA256 |
| x-amz-credential | AKIAIG3WPT7RALYOZW6Q/20181123/us-east-1/s3/aws4_request |
| x-amz-date | 20181123T141009Z
| x-amz-signature | 6b76f67cc72313fd5c1f39a75af3ec99bc7363cc6db1adf7e9e0d73091c05299 |
| file | _root to the_ profile_image.jpg |

###### Request example

```bash
curl -X POST
  -F "Content-Type=image/jpeg"
  -F "Expires=Fri, 17 Dec 2018 23:30:00 GMT"
  -F "acl=public-read"
  -F "key=c44be580f3294f1ca18056d62f75864500"
  -F "policy=eyJleHBpcmF0aW9uIjoiMjAxNS0wOS0zMFQxMzZGQ4N2ZlNGIyOTlmZjQxZjYzNjMzYmY5YzEwMCJ9LHsieC1hbXotY3JlZGVudGlhbCI6IkFLSUFJWTdLRk0yM1hHWEo3UjdBLzIwMTUwOTMwL3VzLWVhc3QtMS9zMy9hd3M0X3JlcXVlc3QifSx7IngtYW16LWFsZ29yaXRobSI6IkFXUzQtSE1BQy1TSEEyNTYifSx7IngtYW16LWRhd"
  -F "success_action_status=201"
  -F "x-amz-algorithm=AWS4-HMAC-SHA256"
  -F "x-amz-credential=AKIAIY7KFM23XGXJ7R7A/20150930/us-east-1/s3/aws4_request"
  -F "x-amz-date=20181217T141009Z"
  -F "x-amz-signature=6b76f67cc72313fd5c1f39a75af3ec99bc7363cc6db1adf7e9e0d73091c05299"
  -F "file=@profile_image.jpg"  
https://cb-shared-s3.s3.amazonaws.com
```

###### Response
```
<PostResponse>
  <Location>
    https://cb-shared-s3.s3.amazonaws.com/g6f92bcf84374e4fb8961537f7a7de908
  </Location>
  <Bucket>cb-shared-s3</Bucket>
  <Key>g6f92bcf84374e4fb8961537f7a7de908</Key>
  <ETag>"cv1aae3a4mkiob83bc7h1e21eb7e2m88"</ETag>
</PostResponse>
```

## Declare file uploaded
Declaring file as uploaded by set a 'Complete' status for the uploaded file.

###### Endpoint
```
PUT https://api.connectycube.com/blobs/{blob_id}/complete
```
###### Parameters
 Parameter     | Required      | Description
-------------  | ------------- | -------------  
 blob[size]    | Yes           | Size of the uploaded file, in bytes

###### Request example

```bash
curl -X POST \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d '{"blob": {"size": "347"}}' \
https://api.connectycube.com/blobs/111/complete
```
###### Response
```
200 OK
```

## Get information about file by ID
Retrieving of information about file by specifying its ID.

###### Endpoint
```
GET https://api.connectycube.com/blobs/{blob_id}
```
###### Request example

```bash
curl -X GET \
-H "CB-Token: <TOKEN>" \
https://api.connectycube.com/blobs/8049
```
###### Response
```json
{
    "blob": {
        "id": 8049,
        "uid": "9ad79a5b8bb1430fbc4bbf7be6215cb700",
        "content_type": "image/jpeg",
        "name": "Mixed_Pets.jpg",
        "size": 70980,
        "created_at": "2018-08-02T07:52:51Z",
        "updated_at": "2018-08-02T07:52:51Z",
        "public": true
    }
}
```

## Get files list (**deprecated**)
Get list of files created by the current user. User ID is taken from the token specified in the request.

###### Endpoint

```
GET https://api.connectycube.com/blobs
```

###### Parameters
Parameter     | Required      | Description
------------- | ------------- | -------------  
page          | No            | Number of page to show. The first page  is shown by default
per_page      | No            | Number of results to show per page. Default number of results per page - 10, maximum number of results per page - 100

###### Request example

```bash
curl -X GET \
-H "CB-Token: <TOKEN>" \
https://api.connectycube.com/blobs
```
###### Response
```json
{
    "current_page": 1,
    "per_page": 10,
    "total_entries": 1,
    "items": [
        {
            "blob": {
                "id": 8049,
                "uid": "9ad79a5b8bb1430fbc4bbf7be6215cb700",
                "content_type": "image/jpeg",
                "name": "Pets.jpg",
                "size": 70980,
                "created_at": "2018-08-02T07:52:51Z",
                "updated_at": "2018-08-02T07:52:51Z",
                "blob_status": "complete",
                "set_completed_at": "2018-08-02T07:52:51Z",
                "public": true
            }
        }
    ]
}
```

## Download file by UID
Download file (get file as a redirect to the S3 object) by its UID. `UID` is a parameter created by system automatically with a 'create a file' request. Only file set as complete can be downloaded.

All public file (`blob[public]=true`) can be downloaded without a session token.

###### Endpoit
```
GET https://api.connectycube.com/blobs/{uid}/download
```
###### Request example

```bash
curl -X GET \
-H "CB-Token: <TOKEN>" \
https://api.connectycube.com/blobs/9ad79a5b8bb1430fbc4bbf7be6215cb744/download
```
###### Response
```
301 redirect to file
```

## Get file object by UID
Retrieving of information about file by specifying its UID.

###### Endpoint
```
GET https://api.connectycube.com/blobs/{blob_uid}/object
```
###### Parameters
Parameter     | Required      | Description
------------- | ------------- | -------------  
download_url  | No            | include download url to response

###### Request example

```bash
curl -X GET \
-H "CB-Token: <TOKEN>" \
https://api.connectycube.com/blobs/789AFF0737033E93E179BD7491169D6043B0/object?download_url=1
```
###### Response
```json
{
    "blob": {
        "id": 8049,
        "uid": "789AFF0737033E93E179BD7491169D6043B0",
        "content_type": "image/jpeg",
        "name": "Mixed_Pets.jpg",
        "size": 70980,
        "created_at": "2018-08-02T07:52:51Z",
        "updated_at": "2018-08-02T07:52:51Z",
        "public": true,
        "blob_object_access": {
            "dowload_url": "https://cb-shared-s3.s3.amazonaws.com/789AFF0737033E93E179BD7491169D6043B0?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIATFRX3OIRNHFSRZEEL%2F20221007%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20221007T104904Z&X-Amz-Expires=604800&X-Amz-Signature=1eade6afb3e571c24131a15bf520058uffdv7393521e16e51de1c317c43908b1c5b52&X-Amz-SignedHeaders=host&response-cache-control=max-age%3D604800"
        }
    }
}
```

## Edit a file (**deprecated**)
Update one or more parameters of the file.

###### Endpoint
```
PUT https://api.connectycube.com/blobs/{blob_id}
```
###### Parameters
Parameter     | Required      | Description
------------- | ------------- | -------------  
 blob[content_type] | Optional | Type of file, format: [mime content type](https://en.wikipedia.org/wiki/Media_type)
 blob[name] | Optional | File name with a length up to 100 chars
 blob[new]| Optional | Set to '1' if file content should be changed

###### Request example

```bash
curl -X PUT \
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
-d '{"blob": {"name": "My photo"}}' \
https://api.connectycube.com/blobs/111
```
###### Response
```json
  {
    "blob": {
        "id": 8049,
        "uid": "9ad79a5b8bb1430fbc4bbf7be6215cb700",
        "content_type": "image/jpeg",
        "name": "My photo",
        "size": 70980,
        "created_at": "2018-08-02T07:52:51Z",
        "updated_at": "2018-12-10T10:21:18Z",
        "blob_status": "complete",
        "set_completed_at": "2018-08-02T07:52:51Z",
        "public": true
    }
}
```

## Delete a file
Delete a file from server by its ID.

###### Endpoint
```
DELETE https://api.connectycube.com/blobs/{blob_id}
```
###### Request example

```bash
curl -X DELETE \
-H "CB-Token:  <TOKEN>" \
https://api.connectycube.com/blobs/111
```
###### Response
```
200 OK
```

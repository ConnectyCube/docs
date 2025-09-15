---
title: Statistics API
description: Gain valuable insights into your app's popularity with statistics on daily and cumulative dialogs and messages. Enhance visibility to optimize app's performance.
head:
  - tag: title
    content: Statistics API for administration | Connectycube
sidebar: 
    label: Statistics
    order: 2
---

## Messages sent total

###### Endpoint
```
GET https://api.connectycube.com/admin/stats/messages/sent-total
```
###### Parameters

| Parameter  | Data type          | Description |
|------------|--------------------|--------------
| start_date | integer (timestamp)| Message date sent after to include to statistics
| end_date   | integer (timestamp)| Message date sent before to include to statistics


###### Request example

```bash
curl -X GET \
-H "CB-Administration-API-Key: <API_KEY>" \
-d 'start_date=1676894034&end_date=16768967370' \
https://api.connectycube.com/admin/stats/messages/sent-total
```

###### Response

```json
{
  "total": 167
}
```

## Messages sent per day

###### Endpoint
```
GET https://api.connectycube.com/admin/stats/messages/sent-per-day
```
###### Parameters

| Parameter  | Data type          | Description |
|------------|--------------------|--------------
| start_date | integer (timestamp)| Message date sent after to include to statistics
| end_date   | integer (timestamp)| Message date sent before to include to statistics
| limit      | integer            | Days in one response (Default 100)
| offset     | integer            | Days offset in response (Default 0)


###### Request example

```bash
curl -X GET \
-H "CB-Administration-API-Key: <API_KEY>" \
-d 'start_date=1676894034&end_date=16768967370' \
https://api.connectycube.com/admin/stats/messages/sent-per-day
```

###### Response

```json
{
  "2023-02-20": 56,
  "2023-02-21": 78,
  "2023-02-26": 47,
  ...
}
```

## Dialogs created total

###### Endpoint
```
GET https://api.connectycube.com/admin/stats/dialogs/created-total
```
###### Parameters

| Parameter  | Data type           | Description |
|------------|---------------------|--------------
| start_date | integer (timestamp) | Dialogs created after to include to statistics
| end_date   | integer (timestamp) | Dialogs created before to include to statistics
| types      | array (integer)     | Dialogs types before to include to statistics


###### Request example

```bash
curl -X GET \
-H "CB-Administration-API-Key: <API_KEY>" \
-d 'start_date=1676894057&end_date=16768967671&types[]=2&types[]=3' \
https://api.connectycube.com/admin/stats/dialogs/created-total
```

###### Response

```json
{
  "total": 54
}
```

## Dialogs created per day

###### Endpoint
```
GET https://api.connectycube.com/admin/stats/dialogs/created-per-day
```
###### Parameters

| Parameter  | Data type           | Description |
|------------|---------------------|--------------
| start_date | integer (timestamp) | Dialogs created after to include to statistics
| end_date   | integer (timestamp) | Dialogs created before to include to statistics
| types      | array (integer)     | Dialogs types before to include to statistics
| limit      | integer             | Days in one response (Default 100)
| offset     | integer             | Days offset in response (Default 0)


###### Request example

```bash
curl -X GET \
-H "CB-Administration-API-Key: <API_KEY>" \
-d 'start_date=1676894057&end_date=16768967671&types[]=2&types[]=4' \
https://api.connectycube.com/admin/stats/dialogs/created-per-day
```

###### Response

```json
{
  "2023-02-20": 21,
  "2023-02-21": 15,
  ...
}
```
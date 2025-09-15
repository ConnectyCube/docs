---
title: ConnectyCube Server API
description: Explore a set of clearly defined methods of communication among various components. ConnectyCube provides an easy API to build powerful applications.
head:
  - tag: title
    content: Server API | Connectycube
sidebar: 
    label: Introduction
    order: 1
---

Welcome to ConnectyCube Server API -  set of clearly defined methods of communication among various components.
ConnectyCube provides an easy API to work with different modules of the application:

* Users
* Chats
* Push notifications
* Video calling
* Storage
* Address book
* Custom data

API documentation describes what services an API offers and how to use those services.

## REST API endpoint

**Basic URL:** `https://api.connectycube.com`

## Headers

The only mandatory header required for all types of requests is ConnectyCube **Token** - a credential that can be used by an application and user to access an API. Follow [Create Session](/server/auth#create-session) request to obtain a session token.

For POST and PUT requests also add **Content-Type** header to transfer data in JSON format.

To set headers of the request, use the following example:

```bash
-H "Content-Type: application/json" \
-H "CB-Token: <TOKEN>" \
```


## Request

The Hypertext Transfer Protocol (HTTP) is designed to enable communications between clients and servers.

HTTP works as a request-response protocol between a client and server.

**Methods:**

* **POST** - is used to send data to a server to create a resource
* **GET** - is used to request data from a specified resource
* **PUT** - is used to send data to a server to update a resource
* **DELETE** - deletes the specified resource

**Request body:**

Depends on the request type, request body may contain parameters. Each separate request contains its own set of parameters available to be specified.

For **POST** and **PUT** requests (in JSON format):

```bash
-d '{"entity": {"field_1": "value", "field_2": "value"}}' \
```

For **GET** request:

```bash
-d 'per_page=7&page=2' \
```

## Response

Depends on a request, response can contain a defined set of information or returns the status code only.

Available statuses:

| Code | Status | Description
|------------ |------------- |------------
| 200 | OK | Response for successful HTTP requests. In a **GET** request, the response will contain an entity corresponding to the requested resource. In a **POST** request, the response will contain an entity describing or containing the result of the action
| 201 | Created | The request has been fulfilled, resulting in the creation of a new resource
| 202 | Accepted | The request has been accepted for processing, but the processing has not been completed. The request might or might not be eventually acted upon, and may be disallowed when processing occurs
| 400 | Bad request | The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing)
| 401 | Unauthorized | Authorisation is requeired to process the request
| 403 | Forbidden | Server is refusing action. The user might not have the necessary permissions for a resource, or may need an account of some sort
| 404 | Not found | The requested resource could not be found
| 422 | Unprocessable Entity | The request was well-formed but was unable to be followed due to semantic errors
| 429 | Too Many Requests | The user has sent too many requests in a given amount of time
| 500 | Internal Server Error | Something has gone wrong on the web site's server but the server could not be more specific on what the exact problem is
| 503 | Service Unavailable | The server is currently unavailable. Generally, this is a temporary state

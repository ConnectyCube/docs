---
title: Streaming
description: Leverage ConnectyCube's streaming feature for dynamic real-time interactions in Cordova app. Ideal for interactive sessions, such as teachers broadcasting to multiple students.
head:
  - tag: title
    content: Cordova Streaming API | ConnectyCube
sidebar: 
    label: Streaming
    order: 7
---

ConnectyCube streaming is built on top of [WebRTC](https://webrtc.org/) protocol.

The main use case for streaming is with a teacher and many students where normally students join a call as listeners and only a teacher publishes own media stream:

**Streaming API** is built on top of [Video Conferencing API](/cordova/videocalling-conference), hence same API documentation should be followed.

The only difference is when join a room - a `session.joinAsListener(...)` API should be used at students side instead of `session.join(...)` API at teacher's side. This method allows to join a conference room w/o publishing own media stream.

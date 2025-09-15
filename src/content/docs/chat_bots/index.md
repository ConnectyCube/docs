---
title: Chat Bots Getting Started
description: A complete guide of how to build your own chat bot, improve bot’s intelligence and recommendation about chat bots hosting
head:
  - tag: title
    content: Chat Bot API | ConnectyCube
sidebar: 
    label: Getting started
    order: 1
---

Bots are computer programs - third-party applications, that run inside ConnectyCube platform. Bots have almost same qualities as human: they have profile photos, names, they can send messages and upload files, and they can be added to and removed from group chats.

Use chat bots to enable users to conversationally interact with your service or your product.

A real use case of built chat bots on top of ConnectCube:  
https://connectycube.com/2019/06/12/awesome-chat-bot-built-with-connectycube-platform-makes-the-future-better/

Chat bots are controlled programmatically via [ConnectyCube Javascript SDK](/js/)

## Build your own Chat Bot

### Register a ConnectyCube Account and create Application

Go to [ConnectyCube Dashboard](https://connectycube.com/signup/) and register your free ConnectyCube account.

Upon sign in you will see the main page where you need to find the **New app** button and click on it to create an Application.

At the end you will see the auto-generated values of the **Application ID**, **Authorization key** and **Authorization secret**. These are important - your app needs to use these credentials so that server knows who's there.

### Create Bot user

At ConnectyCube Dashboard, in **Users** module - create a new user to control your chat bot. Then save somewhere the user's ID, login and password. We will need these values later.

### Create Node.js application to control your bot

Open terminal and type the following commands:

```bash
mkdir my-chat-bot
cd my-chat-bot
npm init
```

This will ask you a bunch of questions, and then write a `package.json` file for you. More information on [npm init](https://docs.npmjs.com/cli/init).

The main thing is that we have now a `package.json` file and can start develop our first chat bot.

### Connect ConnectyCube SDK

In terminal type the following command:

```bash
npm install connectycube --save
```

### Create index.js file

In terminal type the following command:

```bash
touch index.js
```

It will create the main entry point for your bot.

Then also open `package.json` file and add command to run our bot:

```json
"scripts": {
  "start": "node index.js"
},
```

Now open the `index.js` file and let's write some logic.

### Making heart beat of your bot

Open `index.js` file and write the following code:

```javascript
const Connectycube = require("connectycube");

// Initialise SDK

const APPLICATION_CREDENTIALS = {
  appId: 0,
  authKey: "...",
};

ConnectyCube.init(APPLICATION_CREDENTIALS);

// Connect to Real-Time Chat
const BOT_USER_CREDENTIALS = {
  userId: 0,
  password: "...",
};

const onError = (error) => {
  console.log("Chat connect is failed", JSON.stringify(error));
  process.exit(1);
};

const onConnected = () => {
  console.log("Bot is up and running");
  // Add chat messages listener
  Connectycube.chat.onMessageListener = onMessageListener;
};

function onMessageListener(userId, msg) {
  // process 1-1 messages
  if (msg.type === "chat" && msg.body) {
    const answerMessage = {
      type: "chat",
      body: msg.body, // echo back original message
      extension: {
        save_to_history: 1,
      },
    };

    Connectycube.chat.send(userId, answerMessage);
  }
}

Connectycube.chat.connect(BOT_USER_CREDENTIALS).then(onConnected).catch(onError);

process.on("exit", function () {
  console.log("Kill bot");
  Connectycube.chat.disconnect();
});
```

This is a simple bot that simply reply back with origin message. Nothing especial. But you got the idea.

You just need to put in `APPLICATION_CREDENTIALS` variable your Application credentials and in `BOT_USER_CREDENTIALS` variable - you bot user credentials.

### Run our bot

In terminal type the following command:

```bash
npm start
```

Now you can write something to your bot and will receive a reply.

The complete source code of chat bot template is available https://github.com/ConnectyCube/connectycube-chatbot-template

### Improve bot's intelligence

Usually, it's not enough just to build simple bot which echoes your messages. It's better to add some intelligence for you bot.

There are lots of AI/ML platforms that can be easily integrated into your bot, e.g.:

- [RiveScript](https://www.rivescript.com/) - is a scripting language for chatterbots, making it easy to write trigger/response pairs for building up a bot's intelligence.
- [DialogFlow](https://dialogflow.com/) - Build natural and rich conversational experiences, from Google
- [wit.ai](https://wit.ai/) - Natural Language for Developers, from Facebook

and many more.

## Host your bot

You can host your chat bot on any virtual server. If you do not have any in your mind - we will recommend the following:

- [Digital Ocean](https://www.digitalocean.com/)
- [Heroku](https://www.heroku.com/)

Above two are very simple in setup.

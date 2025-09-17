import type {CardType} from './types';

export const guides: CardType[] = [
    {
        title: 'Security & Compliance',
        icon: 'security-complience',
        links: [
            {
                title: 'Security and Compliance practices',
                href: '/guides/security-compliance/',
            },
            {
                title: 'Implementing secure chat in Flutter chat apps',
                href: 'https://connectycube.com/2023/08/08/secure-chat-implementing-end-to-end-encryption-in-flutter-chat-apps/?cat=all',
                target: '_blank',
            },
            {
                title: 'Implementing secure chat in Web and React Native chat apps',
                href: 'https://connectycube.com/2023/03/29/end-to-end-encryption-in-web-and-reactnative-chat-apps/?cat=all',
                target: '_blank',
            },
        ]
    },
    {
        title: 'Chatbots and AI',
        icon: 'ai',
        links: [
            {
                title: 'Chat Bots - Getting Started',
                href: '/chat_bots',
                target: '_blank',
            },
            {
                title: 'Build a ConnectyCube ChatGPT Chatbot with the OpenAI API',
                href: 'https://connectycube.com/2023/01/17/build-a-connectycube-chatgpt-chatbot-with-the-openai-api/?cat=all',
                target: '_blank',
            },
            {
                title: 'Use case: Chat Bot for Sharing Economy',
                href: 'https://connectycube.com/2019/06/12/awesome-chat-bot-built-with-connectycube-platform-makes-the-future-better/',
                target: '_blank',
            },
        ]
    },
    {
        title: 'Firebase set up',
        icon: 'firebase',
        links: [
            {
                title: 'Flutter',
                href: '/flutter/firebase-setup-guide/',
            },
            {
                title: 'JavaScript',
                href: '/js/firebase-setup-guide/',
            },
            {
                title: 'iOS',
                href: '/ios/firebase-setup-guide/',
            },
        ]
    },
    {
        title: 'Google Play & App Store',
        icon: 'apns',
        links: [
            {
                title: 'How to generate',
                href: '',
                forked: [
                    {
                        title: "APNS certificates",
                        href: '/ios/how-to-create-apns-certificate/',
                    },
                    {
                        title: "APNS key",
                        href: '/ios/how-to-create-apns-key/',
                    },
                ]
            },
            {
                title: 'How to submit app to App Store',
                href: '/guides/uploading-ios-app-to-store/',
            },
            {
                title: 'How to upload the app to Google Play Store',
                href: '/guides/uploading-android-app-to-store/',
            },
        ]
    },
]
import type {MainFeatureCardType} from './types';

export const mainFeatures: MainFeatureCardType[] = [
    {
        title: 'Chat & Messaging',
        description: 'Real-time chat with media, groups, and more - easy to integrate and customize for any app.',
        icon: 'chat-and-messaging',
        navigateTo: {
                title: 'Explore Docs',
                href: '#chat&messaging',
            },
    },
    {
        title: 'Chat Widget',
        description: 'Plug & play chat for websites packed with all essential chat functionalities. No coding required.',
        icon: 'chat-widget',
        navigateTo: {
                title: 'Explore Docs',
                href: '/chat-widget/getting-started/',
            },
        links: [
            {
                title: 'Open Demo',
                href: 'https://connectycube-chat-widget.onrender.com/',
                target: '_blank'
            },
            {
                title: 'Product page',
                href: 'https://connectycube.com/chat-widget/',
                target: '_blank'
            },
        ]
    },
    {
        title: 'Voice & Video Calling',
        description: 'HD voice and video calls with built-in signaling, TURN/STUN, group calling, and call events.',
        icon: 'voice-and-video-calling',
        navigateTo: {
                title: 'Explore Docs',
                href: '#voice&video-calls',
            },
    },
]
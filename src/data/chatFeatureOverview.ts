import type {FeatureOverviewType} from './types';

export const chatFeatureOverview: FeatureOverviewType = {
    title: 'Chat & Messaging',
    description: 'This section includes step-by-step tutorials to help you get started quickly, ready-to-use code samples, and a full list of available messaging features you can implement. Everything you need to build and customize your in-app chat experience.',
    anchor: "chat&messaging",
    getStartedDescription: "Follow our guide to send your first message and explore ready-to-use code samples packed with available features for a quick start and quick results.",
    platforms: [
        {
            name: 'Flutter',
            icon: 'icon-flutter',
            getStartedSection: {
                links: [
                    {
                        title: 'Send first message',
                        icon: 'send-message',
                        href: '/flutter/getting-started/send-first-chat-message',
                    },
                    {
                        title: 'Code samples',
                        icon: 'code-samples',
                        href: '/flutter/getting-started/code-samples#chat-code-sample',
                    }
                ]
            },
            featuresSection: {
                features: [
                    {
                        name: "Messaging",
                        links: [
                            {
                                title: "Create chat",
                                href: "/flutter/messaging/#create-new-dialog"
                            },
                            {
                                title: "Chat metadata",
                                href: "/flutter/messaging/#chat-metadata"
                            },
                            {
                                title: "Chat history",
                                href: "/flutter/messaging/#list-dialogs"
                            },
                            {
                                title: "Message search",
                                href: "/flutter/messaging/#global-search"
                            },
                            {
                                title: "Read receipts",
                                href: "/flutter/messaging/#read-status"
                            },
                            {
                                title: "Delivery receipts",
                                href: "/flutter/messaging/#delivered-status"
                            },
                            {
                                title: "Typing indicators",
                                href: "/flutter/messaging/#is-typing-status"
                            },
                            {
                                title: "Sent receipts",
                                href: "/flutter/messaging/#sent-status"
                            },
                            {
                                title: "Unread message count",
                                href: "/flutter/messaging/#unread-messages-count"
                            },
                            {
                                title: "Message metadata",
                                href: "/flutter/messaging/#message-metadata"
                            },
                            {
                                title: "Attachments",
                                href: "/flutter/messaging/#attachments"
                            },
                            {
                                title: "Message reactions",
                                href: "/flutter/messaging/#message-reactions"
                            },
                            {
                                title: "Push Notifications",
                                href: "/flutter/push-notifications/"
                            },
                            {
                                title: "Notifications settings",
                                href: "/flutter/messaging/#update-notifications-settings"
                            },
                            {
                                title: "Last activity",
                                href: "/flutter/messaging/#get-last-activity"
                            },
                            {
                                title: "System messages",
                                href: "/flutter/messaging/#system-messages"
                            }
                        ]
                    },
                    {
                        name: "Moderation",
                        links: [
                            {
                                title: "Chat administrators",
                                href: "/flutter/messaging/#add--remove-admins"
                            },
                            {
                                title: "Block users",
                                href: "/flutter/messaging/#privacy-black-list"
                            },
                            {
                                title: "Mute chats",
                                href: "/flutter/messaging/#update-notifications-settings"
                            },
                            {
                                title: "Report user",
                                href: "/flutter/messaging/#report-user"
                            },
                            {
                                title: "Report message",
                                href: "/flutter/messaging/#report-message"
                            }
                        ]
                    },
                    {
                        name: "Analytics",
                        links: [
                            {
                                title: "Messages sent total",
                                href: "/admin_api/statistics/#messages-sent-total"
                            },
                            {
                                title: "Messages sent per day",
                                href: "/admin_api/statistics/#messages-sent-per-day"
                            },
                            {
                                title: "Chats created total",
                                href: "/admin_api/statistics/#dialogs-created-total"
                            },
                            {
                                title: "Chats created per day",
                                href: "/admin_api/statistics/#dialogs-created-per-day"
                            },
                            {
                                title: "Push Notifications logs",
                                href: "/admin_api/statistics/#push-notifications-logs"
                            }
                        ]
                    },
                ]
            }
        },
        {
            name: 'React Native',
            icon: 'icon-react-native',
            getStartedSection: {
                links: [
                    {
                        title: 'Send first message',
                        icon: 'send-message',
                        href: '/reactnative/getting-started/send-first-chat-message'
                    },
                    {
                        title: 'Code samples',
                        icon: 'code-samples',
                        href: '/reactnative/getting-started/code-samples#chat-code-sample',
                    }
                ]
            },
            featuresSection: {
                features: [
                    {
                        name: "Messaging",
                        links: [
                            {
                                title: "Create chat",
                                href: "/reactnative/messaging/#create-new-dialog"
                            },
                            {
                                title: "Chat metadata",
                                href: "/reactnative/messaging/#chat-metadata"
                            },
                            {
                                title: "Chat history",
                                href: "/reactnative/messaging/#list-dialogs"
                            },
                            {
                                title: "Message search",
                                href: "/reactnative/messaging/#search"
                            },
                            {
                                title: "Read receipts",
                                href: "/reactnative/messaging/#read-status"
                            },
                            {
                                title: "Delivery receipts",
                                href: "/reactnative/messaging/#delivered-status"
                            },
                            {
                                title: "Typing indicators",
                                href: "/reactnative/messaging/#is-typing-status"
                            },
                            {
                                title: "Sent receipts",
                                href: "/reactnative/messaging/#sent-status"
                            },
                            {
                                title: "Unread message count",
                                href: "/reactnative/messaging/#unread-messages-count"
                            },
                            {
                                title: "Message metadata",
                                href: "/reactnative/messaging/#message-metadata"
                            },
                            {
                                title: "Attachments",
                                href: "/reactnative/messaging/#attachments-photo--video"
                            },
                            {
                                title: "Message reactions",
                                href: "/reactnative/messaging/#message-reactions"
                            },
                            {
                                title: "Push Notifications",
                                href: "/reactnative/push-notifications/"
                            },
                            {
                                title: "Notifications settings",
                                href: "/reactnative/messaging/#update-notifications-settings"
                            },
                            {
                                title: "Last activity",
                                href: "/reactnative/messaging/#get-last-activity"
                            },
                            {
                                title: "System messages",
                                href: "/reactnative/messaging/#system-messages"
                            }
                        ]
                    },
                    {
                        name: "Moderation",
                        links: [
                            {
                                title: "Chat administrators",
                                href: "/reactnative/messaging/#add--remove-admins"
                            },
                            {
                                title: "Block users",
                                href: "/reactnative/messaging/#privacy-black-list"
                            },
                            {
                                title: "Mute chats",
                                href: "/reactnative/messaging/#update-notifications-settings"
                            },
                            {
                                title: "Report user",
                                href: "/reactnative/messaging/#report-user"
                            },
                            {
                                title: "Report message",
                                href: "/reactnative/messaging/#report-message"
                            }
                        ]
                    },
                    {
                        name: "Analytics",
                        links: [
                            {
                                title: "Messages sent total",
                                href: "/admin_api/statistics/#messages-sent-total"
                            },
                            {
                                title: "Messages sent per day",
                                href: "/admin_api/statistics/#messages-sent-per-day"
                            },
                            {
                                title: "Chats created total",
                                href: "/admin_api/statistics/#dialogs-created-total"
                            },
                            {
                                title: "Chats created per day",
                                href: "/admin_api/statistics/#dialogs-created-per-day"
                            },
                            {
                                title: "Push Notifications logs",
                                href: "/admin_api/statistics/#push-notifications-logs"
                            }
                        ]
                    },
                ]
            }
        },
        {
            name: 'Web',
            icon: 'icon-javascript',
            getStartedSection: {
                links: [
                    {
                        title: 'Send first message',
                        icon: 'send-message',
                        href: '/js/getting-started/send-first-chat-message'
                    },
                    {
                        title: 'Code samples',
                        icon: 'code-samples',
                        href: '/js/getting-started/code-samples#chat-code-sample',
                    }
                ]
            },
            featuresSection: {
                features: [
                    {
                        name: "Messaging",
                        links: [
                            {
                                title: "Create chat",
                                href: "/js/messaging/#create-new-dialog"
                            },
                            {
                                title: "Chat metadata",
                                href: "/js/messaging/#chat-metadata"
                            },
                            {
                                title: "Chat history",
                                href: "/js/messaging/#list-dialogs"
                            },
                            {
                                title: "Message search",
                                href: "/js/messaging/#search"
                            },
                            {
                                title: "Read receipts",
                                href: "/js/messaging/#read-status"
                            },
                            {
                                title: "Delivery receipts",
                                href: "/js/messaging/#delivered-status"
                            },
                            {
                                title: "Typing indicators",
                                href: "/js/messaging/#is-typing-status"
                            },
                            {
                                title: "Sent receipts",
                                href: "/js/messaging/#sent-status"
                            },
                            {
                                title: "Unread message count",
                                href: "/js/messaging/#unread-messages-count"
                            },
                            {
                                title: "Message metadata",
                                href: "/js/messaging/#message-metadata"
                            },
                            {
                                title: "Attachments",
                                href: "/js/messaging/#attachments-photo--video"
                            },
                            {
                                title: "Message reactions",
                                href: "/js/messaging/#message-reactions"
                            },
                            {
                                title: "Push Notifications",
                                href: "/js/push-notifications/"
                            },
                            {
                                title: "Notifications settings",
                                href: "/js/messaging/#update-notifications-settings"
                            },
                            {
                                title: "Last activity",
                                href: "/js/messaging/#get-last-activity"
                            },
                            {
                                title: "System messages",
                                href: "/js/messaging/#system-messages"
                            }
                        ]
                    },
                    {
                        name: "Moderation",
                        links: [
                            {
                                title: "Chat administrators",
                                href: "/js/messaging/#add--remove-admins"
                            },
                            {
                                title: "Block users",
                                href: "/js/messaging/#privacy-black-list"
                            },
                            {
                                title: "Mute chats",
                                href: "/js/messaging/#update-notifications-settings"
                            },
                            {
                                title: "Report user",
                                href: "/js/messaging/#report-user"
                            },
                            {
                                title: "Report message",
                                href: "/js/messaging/#report-message"
                            }
                        ]
                    },
                    {
                        name: "Analytics",
                        links: [
                            {
                                title: "Messages sent total",
                                href: "/admin_api/statistics/#messages-sent-total"
                            },
                            {
                                title: "Messages sent per day",
                                href: "/admin_api/statistics/#messages-sent-per-day"
                            },
                            {
                                title: "Chats created total",
                                href: "/admin_api/statistics/#dialogs-created-total"
                            },
                            {
                                title: "Chats created per day",
                                href: "/admin_api/statistics/#dialogs-created-per-day"
                            },
                            {
                                title: "Push Notifications logs",
                                href: "/admin_api/statistics/#push-notifications-logs"
                            }
                        ]
                    },
                    {
                        name: "Integration",
                        links: [
                            {
                                title: "Chat bot",
                                href: "/chat_bots/"
                            }
                        ]
                    }
                ]
            }
        },
        {
            name: 'Cordova',
            icon: 'icon-cordova',
            getStartedSection: {
                links: [
                    {
                        title: 'Send first message',
                        icon: 'send-message',
                        href: '/cordova/getting-started/send-first-chat-message'
                    },
                    {
                        title: 'Code samples',
                        icon: 'code-samples',
                        href: 'cordova/getting-started/code-samples#do-it-yourself',
                    }
                ]
            },
            featuresSection: {
                features: [
                    {
                        name: "Messaging",
                        links: [
                            {
                                title: "Create chat",
                                href: "/cordova/messaging/#create-new-dialog"
                            },
                            {
                                title: "Chat metadata",
                                href: "/cordova/messaging/#chat-metadata"
                            },
                            {
                                title: "Chat history",
                                href: "/cordova/messaging/#list-dialogs"
                            },
                            {
                                title: "Message search",
                                href: "/cordova/messaging/#search"
                            },
                            {
                                title: "Read receipts",
                                href: "/cordova/messaging/#read-status"
                            },
                            {
                                title: "Delivery receipts",
                                href: "/cordova/messaging/#delivered-status"
                            },
                            {
                                title: "Typing indicators",
                                href: "/cordova/messaging/#is-typing-status"
                            },
                            {
                                title: "Sent receipts",
                                href: "/cordova/messaging/#sent-status"
                            },
                            {
                                title: "Unread message count",
                                href: "/cordova/messaging/#unread-messages-count"
                            },
                            {
                                title: "Message metadata",
                                href: "/cordova/messaging/#message-metadata"
                            },
                            {
                                title: "Attachments",
                                href: "/cordova/messaging/#attachments-photo--video"
                            },
                            {
                                title: "Message reactions",
                                href: "/cordova/messaging/#message-reactions"
                            },
                            {
                                title: "Push Notifications",
                                href: "/cordova/push-notifications/"
                            },
                            {
                                title: "Notifications settings",
                                href: "/cordova/messaging/#update-notifications-settings"
                            },
                            {
                                title: "Last activity",
                                href: "/cordova/messaging/#get-last-activity"
                            },
                            {
                                title: "System messages",
                                href: "/cordova/messaging/#system-messages"
                            }
                        ]
                    },
                    {
                        name: "Moderation",
                        links: [
                            {
                                title: "Chat administrators",
                                href: "/cordova/messaging/#add--remove-admins"
                            },
                            {
                                title: "Block users",
                                href: "/cordova/messaging/#privacy-black-list"
                            },
                            {
                                title: "Mute chats",
                                href: "/cordova/messaging/#update-notifications-settings"
                            },
                            {
                                title: "Report user",
                                href: "/cordova/messaging/#report-user"
                            },
                            {
                                title: "Report message",
                                href: "/cordova/messaging/#report-message"
                            }
                        ]
                    },
                    {
                        name: "Analytics",
                        links: [
                            {
                                title: "Messages sent total",
                                href: "/admin_api/statistics/#messages-sent-total"
                            },
                            {
                                title: "Messages sent per day",
                                href: "/admin_api/statistics/#messages-sent-per-day"
                            },
                            {
                                title: "Chats created total",
                                href: "/admin_api/statistics/#dialogs-created-total"
                            },
                            {
                                title: "Chats created per day",
                                href: "/admin_api/statistics/#dialogs-created-per-day"
                            },
                            {
                                title: "Push Notifications logs",
                                href: "/admin_api/statistics/#push-notifications-logs"
                            }
                        ]
                    },
                ]
            }
        },
        {
            name: 'iOS',
            icon: 'icon-ios',
            getStartedSection: {
                links: [
                    {
                        title: 'Send first message',
                        icon: 'send-message',
                        href: '/ios/getting-started/send-first-chat-message'
                    },
                    {
                        title: 'Code samples',
                        icon: 'code-samples',
                        href: '/ios/getting-started/code-samples#chat-code-sample',
                    }
                ]
            },
            featuresSection: {
                features: [
                    {
                        name: "Messaging",
                        links: [
                            {
                                title: "Create chat",
                                href: "/ios/messaging/#create-new-dialog"
                            },
                            {
                                title: "Chat metadata",
                                href: "/ios/messaging/#chat-metadata"
                            },
                            {
                                title: "Chat history",
                                href: "/ios/messaging/#retrieve-list-of-dialogs"
                            },
                            {
                                title: "Message search",
                                href: "/ios/messaging/#global-search"
                            },
                            {
                                title: "Read receipts",
                                href: "/ios/messaging/#read-status"
                            },
                            {
                                title: "Delivery receipts",
                                href: "/ios/messaging/#delivered-status"
                            },
                            {
                                title: "Typing indicators",
                                href: "/ios/messaging/#is-typing-status"
                            },
                            {
                                title: "Sent receipts",
                                href: "/ios/messaging/#sent-status"
                            },
                            {
                                title: "Unread message count",
                                href: "/ios/messaging/#unread-messages-count"
                            },
                            {
                                title: "Message metadata",
                                href: "/ios/messaging/#message-metadata"
                            },
                            {
                                title: "Attachments",
                                href: "/ios/messaging/#attachments"
                            },
                            {
                                title: "Message reactions",
                                href: "/ios/messaging/#message-reactions"
                            },
                            {
                                title: "Push Notifications",
                                href: "/ios/push-notifications/"
                            },
                            {
                                title: "Notifications settings",
                                href: "/ios/messaging/#update-notifications-settings"
                            },
                            {
                                title: "Last activity",
                                href: "/ios/messaging/#get-last-activity"
                            },
                            {
                                title: "System messages",
                                href: "/ios/messaging/#system-messages"
                            }
                        ]
                    },
                    {
                        name: "Moderation",
                        links: [
                            {
                                title: "Chat administrators",
                                href: "/ios/messaging/#add--remove-admins"
                            },
                            {
                                title: "Block users",
                                href: "/ios/messaging/#privacy-black-list"
                            },
                            {
                                title: "Mute chats",
                                href: "/ios/messaging/#update-notifications-settings"
                            },
                            {
                                title: "Report user",
                                href: "/ios/messaging/#report-user"
                            },
                            {
                                title: "Report message",
                                href: "/ios/messaging/#report-message"
                            }
                        ]
                    },
                    {
                        name: "Analytics",
                        links: [
                            {
                                title: "Messages sent total",
                                href: "/admin_api/statistics/#messages-sent-total"
                            },
                            {
                                title: "Messages sent per day",
                                href: "/admin_api/statistics/#messages-sent-per-day"
                            },
                            {
                                title: "Chats created total",
                                href: "/admin_api/statistics/#dialogs-created-total"
                            },
                            {
                                title: "Chats created per day",
                                href: "/admin_api/statistics/#dialogs-created-per-day"
                            },
                            {
                                title: "Push Notifications logs",
                                href: "/admin_api/statistics/#push-notifications-logs"
                            }
                        ]
                    },
                ]
            }
        },
        {
            name: 'Android',
            icon: 'icon-android',
            getStartedSection: {
                links: [
                    {
                        title: 'Send first message',
                        icon: 'send-message',
                        href: '/android/getting-started/send-first-chat-message'
                    },
                    {
                        title: 'Code samples',
                        icon: 'code-samples',
                        href: '/android/getting-started/code-samples',
                    }
                ]
            },
            featuresSection: {
                features: [
                    {
                        name: "Messaging",
                        links: [
                            {
                                title: "Create chat",
                                href: "/android/messaging/#create-new-dialog"
                            },
                            {
                                title: "Chat metadata",
                                href: "/android/messaging/#chat-metadata"
                            },
                            {
                                title: "Chat history",
                                href: "/android/messaging/#chat-history"
                            },
                            {
                                title: "Message search",
                                href: "/android/messaging/#global-search"
                            },
                            {
                                title: "Read receipts",
                                href: "/android/messaging/#read-status"
                            },
                            {
                                title: "Delivery receipts",
                                href: "/android/messaging/#delivered-status"
                            },
                            {
                                title: "Typing indicators",
                                href: "/android/messaging/#is-typing-status"
                            },
                            {
                                title: "Sent receipts",
                                href: "/android/messaging/#sent-status"
                            },
                            {
                                title: "Unread message count",
                                href: "/android/messaging/#unread-messages-count"
                            },
                            {
                                title: "Message metadata",
                                href: "/android/messaging/#message-metadata"
                            },
                            {
                                title: "Attachments",
                                href: "/android/messaging/#attachments"
                            },
                            {
                                title: "Message reactions",
                                href: "/android/messaging/#message-reactions"
                            },
                            {
                                title: "Push Notifications",
                                href: "/android/push-notifications/"
                            },
                            {
                                title: "Notifications settings",
                                href: "/android/messaging/#update-notifications-settings"
                            },
                            {
                                title: "Last activity",
                                href: "/android/messaging/#last-activity"
                            },
                            {
                                title: "System messages",
                                href: "/android/messaging/#system-messages"
                            }
                        ]
                    },
                    {
                        name: "Moderation",
                        links: [
                            {
                                title: "Chat administrators",
                                href: "/android/messaging/#add--remove-admins"
                            },
                            {
                                title: "Block users",
                                href: "/android/messaging/#privacy-black-list"
                            },
                            {
                                title: "Mute chats",
                                href: "/android/messaging/#update-notifications-settings"
                            },
                            {
                                title: "Report user",
                                href: "/android/messaging/#report-user"
                            },
                            {
                                title: "Report message",
                                href: "/android/messaging/#report-message"
                            }
                        ]
                    },
                    {
                        name: "Analytics",
                        links: [
                            {
                                title: "Messages sent total",
                                href: "/admin_api/statistics/#messages-sent-total"
                            },
                            {
                                title: "Messages sent per day",
                                href: "/admin_api/statistics/#messages-sent-per-day"
                            },
                            {
                                title: "Chats created total",
                                href: "/admin_api/statistics/#dialogs-created-total"
                            },
                            {
                                title: "Chats created per day",
                                href: "/admin_api/statistics/#dialogs-created-per-day"
                            },
                            {
                                title: "Push Notifications logs",
                                href: "/admin_api/statistics/#push-notifications-logs"
                            }
                        ]
                    },
                ]
            }
        },
    ]
}
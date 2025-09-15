import type {FeatureOverviewType} from './types';

export const callsFeatureOverview: FeatureOverviewType = {
    title: 'Voice & Video Calls',
    description: 'This section provides quick-start guides, code samples, and a complete overview of features available for voice and video calling. From 1-1 calls to group conferencing, everything you need to integrate and customize calling functionality is right here.',
    anchor: "voice&video-calls",
    getStartedDescription: "Learn how to initiate your first voice or video call with our detailed guide below, and check out code samples packed with core calling features.",
    platforms: [
        {
            name: 'Flutter',
            icon: 'icon-flutter',
            getStartedSection: {
                links: [
                    {
                        title: 'Make first call',
                        icon: 'first-call',
                        href: '/flutter/getting-started/make-first-call',
                    },
                    {
                        title: 'Code samples',
                        icon: 'code-samples-2',
                        href: '/flutter/getting-started/code-samples#p2p-calls-code-sample',
                    }
                ]
            },
            featuresSection: {
                features: [
                    {
                        name: "P2P calls",
                        links: [
                            {
                                title: "Create call session",
                                href: "/flutter/videocalling/#create-call-session"
                            },
                            {
                                title: "Initiate call",
                                href: "/flutter/videocalling/#initiate-a-call"
                            },
                            {
                                title: "Accept call",
                                href: "/flutter/videocalling/#accept-a-call"
                            },
                            {
                                title: "Reject call",
                                href: "/flutter/videocalling/#reject-a-call"
                            },
                            {
                                title: "Mute microphone",
                                href: "/flutter/videocalling/#mute-audio"
                            },
                            {
                                title: "Mute video",
                                href: "/flutter/videocalling/#mute-video"
                            },
                            {
                                title: "Switch camera",
                                href: "/flutter/videocalling/#switch-video-cameras"
                            },
                            {
                                title: "Screen share",
                                href: "/flutter/videocalling/#screen-sharing"
                            },
                            {
                                title: "Connection state",
                                href: "/flutter/videocalling/#monitor-session-connections-state"
                            },
                            {
                                title: "Tackling network changes",
                                href: "/flutter/videocalling/#tackling-network-changes"
                            },
                            {
                                title: "Recording",
                                href: "/flutter/videocalling/#recording"
                            },
                            {
                                title: "Calls in background",
                                href: "/flutter/videocalling/#receive-a-call-in-background"
                            },
                            {
                                title: "Push notifications",
                                href: "/flutter/push-notifications/"
                            },
                            {
                                title: "Call quality",
                                href: "/flutter/videocalling/#call-quality"
                            },
                            {
                                title: "Whiteboard",
                                href: "/flutter/whiteboard/"
                            }
                        ]
                    },
                    {
                        name: "Meetings",
                        links: [
                            {
                                title: "Create meeting",
                                href: "/flutter/videocalling-conference/#create-meeting"
                            },
                            {
                                title: "Join meeting",
                                href: "/flutter/videocalling-conference/#join-video-room"
                            },
                            {
                                title: "List participants",
                                href: "/flutter/videocalling-conference/#list-online-participants"
                            },
                            {
                                title: "Events",
                                href: "/flutter/videocalling-conference/#events"
                            },
                            {
                                title: "Mute microphone",
                                href: "/flutter/videocalling-conference/#mute-audio"
                            },
                            {
                                title: "Mute video",
                                href: "/flutter/videocalling-conference/#mute-video"
                            },
                            {
                                title: "Switch camera",
                                href: "/flutter/videocalling-conference/#switch-video-cameras"
                            },
                            {
                                title: "Get bitrate",
                                href: "/flutter/videocalling-conference/#monitoring-mic-level-and-video-bitrate-using-stats"
                            },
                            {
                                title: "Get microphone level",
                                href: "/flutter/videocalling-conference/#monitoring-mic-level-and-video-bitrate-using-stats"
                            },
                            {
                                title: "Recording",
                                href: "/flutter/videocalling-conference/#recording"
                            },
                            {
                                title: "Push notifications",
                                href: "/flutter/push-notifications/"
                            },
                            {
                                title: "Whiteboard",
                                href: "/flutter/whiteboard/"
                            }
                        ]
                    }
                ]
            }
        },
        {
            name: 'React Native',
            icon: 'icon-react-native',
            getStartedSection: {
                links: [
                    {
                        title: 'Make first call',
                        icon: 'first-call',
                        href: '/reactnative/getting-started/make-first-call'
                    },
                    {
                        title: 'Code samples',
                        icon: 'code-samples-2',
                        href: '/reactnative/getting-started/code-samples#p2p-calling-code-sample',
                    }
                ]
            },
            featuresSection: {
                features: [
                    {
                        name: "P2P calls",
                        links: [
                            {
                                title: "Create call session",
                                href: "/reactnative/videocalling/#create-video-session"
                            },
                            {
                                title: "Initiate call",
                                href: "/reactnative/videocalling/#initiate-a-call"
                            },
                            {
                                title: "Accept call",
                                href: "/reactnative/videocalling/#accept-a-call"
                            },
                            {
                                title: "Reject call",
                                href: "/reactnative/videocalling/#reject-a-call"
                            },
                            {
                                title: "Mute microphone",
                                href: "/reactnative/videocalling/#mute-audio"
                            },
                            {
                                title: "Mute video",
                                href: "/reactnative/videocalling/#mute-video"
                            },
                            {
                                title: "Switch camera",
                                href: "/reactnative/videocalling/#switch-video-cameras"
                            },
                            {
                                title: "Screen share",
                                href: "/reactnative/videocalling/#screen-sharing"
                            },
                            {
                                title: "Connection state",
                                href: "/reactnative/videocalling/#monitor-connection-state"
                            },
                            {
                                title: "Tackling network changes",
                                href: "/reactnative/videocalling/#tackling-network-changes"
                            },
                            {
                                title: "Recording",
                                href: "/reactnative/videocalling/#recording"
                            },
                            {
                                title: "Calls in background",
                                href: "/reactnative/videocalling/#receive-a-call-in-background"
                            },
                            {
                                title: "Push notifications",
                                href: "/reactnative/push-notifications/"
                            },
                            {
                                title: "Call quality",
                                href: "/reactnative/videocalling/#call-quality"
                            },
                            {
                                title: "Whiteboard",
                                href: "/reactnative/whiteboard/"
                            }
                        ]
                    },
                    {
                        name: "Meetings",
                        links: [
                            {
                                title: "Create meeting",
                                href: "/reactnative/videocalling-conference/#create-meeting"
                            },
                            {
                                title: "Join meeting",
                                href: "/reactnative/videocalling-conference/#join-room"
                            },
                            {
                                title: "List participants",
                                href: "/reactnative/videocalling-conference/#list-online-participants"
                            },
                            {
                                title: "Events",
                                href: "/reactnative/videocalling-conference/#events"
                            },
                            {
                                title: "Mute microphone",
                                href: "/reactnative/videocalling-conference/#muteunmute-audio"
                            },
                            {
                                title: "Mute video",
                                href: "/reactnative/videocalling-conference/#muteunmute-video"
                            },
                            {
                                title: "Switch camera",
                                href: "/reactnative/videocalling-conference/#switch-video-cameras"
                            },
                            {
                                title: "Get bitrate",
                                href: "/reactnative/videocalling-conference/#get-remote-user-bitrate"
                            },
                            {
                                title: "Get microphone level",
                                href: "/reactnative/videocalling-conference/#get-remote-user-mic-level"
                            },
                            {
                                title: "Recording",
                                href: "/reactnative/videocalling-conference/#recording"
                            },
                            {
                                title: "Push notifications",
                                href: "/reactnative/push-notifications/"
                            },
                            {
                                title: "Whiteboard",
                                href: "/reactnative/whiteboard/"
                            }
                        ]
                    }
                ]
            }
        },
        {
            name: 'Web',
            icon: 'icon-javascript',
            getStartedSection: {
                links: [
                    {
                        title: 'Make first call',
                        icon: 'first-call',
                        href: '/js/getting-started/make-first-call'
                    },
                    {
                        title: 'Code samples',
                        icon: 'code-samples-2',
                        href: '/js/getting-started/code-samples#p2p-calling-code-sample',
                    }
                ]
            },
            featuresSection: {
                features: [
                    {
                        name: "P2P calls",
                        links: [
                            {
                                title: "Create call session",
                                href: "/js/videocalling/#create-video-session"
                            },
                            {
                                title: "Initiate call",
                                href: "/js/videocalling/#initiate-a-call"
                            },
                            {
                                title: "Accept call",
                                href: "/js/videocalling/#accept-a-call"
                            },
                            {
                                title: "Reject call",
                                href: "/js/videocalling/#reject-a-call"
                            },
                            {
                                title: "Mute microphone",
                                href: "/js/videocalling/#mute-audio"
                            },
                            {
                                title: "Mute video",
                                href: "/js/videocalling/#mute-video"
                            },
                            {
                                title: "Switch camera",
                                href: "/js/videocalling/#switch-video-cameras"
                            },
                            {
                                title: "Screen share",
                                href: "/js/videocalling/#screen-sharing"
                            },
                            {
                                title: "Connection state",
                                href: "/js/videocalling/#monitor-connection-state"
                            },
                            {
                                title: "Tackling network changes",
                                href: "/js/videocalling/#tackling-network-changes"
                            },
                            {
                                title: "Recording",
                                href: "/js/videocalling/#recording"
                            },
                            {
                                title: "Calls in background",
                                href: "/js/videocalling/#receive-a-call-in-background"
                            },
                            {
                                title: "Push notifications",
                                href: "/js/push-notifications/"
                            },
                            {
                                title: "Call quality",
                                href: "/js/videocalling/#call-quality"
                            },
                            {
                                title: "Whiteboard",
                                href: "/js/whiteboard/"
                            }
                        ]
                    },
                    {
                        name: "Meetings",
                        links: [
                            {
                                title: "Create meeting",
                                href: "/js/videocalling-conference/#create-meeting"
                            },
                            {
                                title: "Join meeting",
                                href: "/js/videocalling-conference/#join-room"
                            },
                            {
                                title: "List participants",
                                href: "/js/videocalling-conference/#list-online-participants"
                            },
                            {
                                title: "Events",
                                href: "/js/videocalling-conference/#events"
                            },
                            {
                                title: "Mute microphone",
                                href: "/js/videocalling-conference/#muteunmute-audio"
                            },
                            {
                                title: "Mute video",
                                href: "/js/videocalling-conference/#muteunmute-video"
                            },
                            {
                                title: "Switch camera",
                                href: "/js/videocalling-conference/#switch-videocameraaudiomicrophone-input-device"
                            },
                            {
                                title: "Get bitrate",
                                href: "/js/videocalling-conference/#get-remote-user-bitrate"
                            },
                            {
                                title: "Get microphone level",
                                href: "/js/videocalling-conference/#get-remote-user-mic-level"
                            },
                            {
                                title: "Recording",
                                href: "/js/videocalling-conference/#recording"
                            },
                            {
                                title: "Push notifications",
                                href: "/js/push-notifications/"
                            },
                            {
                                title: "Whiteboard",
                                href: "/js/whiteboard/"
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
                        title: 'Make first call',
                        icon: 'first-call',
                        href: '/cordova/getting-started/make-first-call'
                    },
                    {
                        title: 'Code samples',
                        icon: 'code-samples-2',
                        href: '/cordova/getting-started/code-samples#p2p-video-chat-code-sample',
                    }
                ]
            },
            featuresSection: {
                features: [
                    {
                        name: "P2P calls",
                        links: [
                            {
                                title: "Create call session",
                                href: "/cordova/videocalling/#create-video-session"
                            },
                            {
                                title: "Initiate call",
                                href: "/cordova/videocalling/#initiate-a-call"
                            },
                            {
                                title: "Accept call",
                                href: "/cordova/videocalling/#accept-a-call"
                            },
                            {
                                title: "Reject call",
                                href: "/cordova/videocalling/#reject-a-call"
                            },
                            {
                                title: "Mute microphone",
                                href: "/cordova/videocalling/#mute-audio"
                            },
                            {
                                title: "Mute video",
                                href: "/cordova/videocalling/#mute-video"
                            },
                            {
                                title: "Switch camera",
                                href: "/cordova/videocalling/#switch-video-cameras"
                            },
                            {
                                title: "Screen share",
                                href: "/cordova/videocalling/#screen-sharing"
                            },
                            {
                                title: "Connection state",
                                href: "/cordova/videocalling/#monitor-connection-state"
                            },
                            {
                                title: "Tackling network changes",
                                href: "/cordova/videocalling/#tackling-network-changes"
                            },
                            {
                                title: "Recording",
                                href: "/cordova/videocalling/#recording"
                            },
                            {
                                title: "Calls in background",
                                href: "/cordova/videocalling/#receive-a-call-in-background"
                            },
                            {
                                title: "Push notifications",
                                href: "/cordova/push-notifications/"
                            },
                            {
                                title: "Call quality",
                                href: "/cordova/videocalling/#call-quality"
                            },
                            {
                                title: "Whiteboard",
                                href: "/cordova/whiteboard/"
                            }
                        ]
                    },
                    {
                        name: "Meetings",
                        links: [
                            {
                                title: "Create meeting",
                                href: "/cordova/videocalling-conference/#create-meeting"
                            },
                            {
                                title: "Join meeting",
                                href: "/cordova/videocalling-conference/#join-room"
                            },
                            {
                                title: "List participants",
                                href: "/cordova/videocalling-conference/#list-online-participants"
                            },
                            {
                                title: "Events",
                                href: "/cordova/videocalling-conference/#events"
                            },
                            {
                                title: "Mute microphone",
                                href: "/cordova/videocalling-conference/#muteunmute-audio"
                            },
                            {
                                title: "Mute video",
                                href: "/cordova/videocalling-conference/#muteunmute-video"
                            },
                            {
                                title: "Switch camera",
                                href: "/cordova/videocalling-conference/#switch-videocameraaudiomicrophone-input-device"
                            },
                            {
                                title: "Get bitrate",
                                href: "/cordova/videocalling-conference/#get-remote-user-bitrate"
                            },
                            {
                                title: "Get microphone level",
                                href: "/cordova/videocalling-conference/#get-remote-user-mic-level"
                            },
                            {
                                title: "Recording",
                                href: "/cordova/videocalling-conference/#recording"
                            },
                            {
                                title: "Push notifications",
                                href: "/cordova/push-notifications/"
                            },
                            {
                                title: "Whiteboard",
                                href: "/cordova/whiteboard/"
                            }
                        ]
                    }
                ]
            }
        },
        {
            name: 'iOS',
            icon: 'icon-ios',
            getStartedSection: {
                links: [
                    {
                        title: 'Make first call',
                        icon: 'first-call',
                        href: '/ios/getting-started/make-first-call'
                    },
                    {
                        title: 'Code samples',
                        icon: 'code-samples-2',
                        href: '/ios/getting-started/code-samples#video-chat-code-sample',
                    }
                ]
            },
            featuresSection: {
                features: [
                    {
                        name: "P2P calls",
                        links: [
                            {
                                title: "Create call session",
                                href: "/ios/videocalling/#initiate-a-call"
                            },
                            {
                                title: "Initiate call",
                                href: "/ios/videocalling/#initiate-a-call"
                            },
                            {
                                title: "Accept call",
                                href: "/ios/videocalling/#accept-a-call"
                            },
                            {
                                title: "Reject call",
                                href: "/ios/videocalling/#reject-a-call"
                            },
                            {
                                title: "Mute microphone",
                                href: "/ios/videocalling/#mute-audio"
                            },
                            {
                                title: "Mute video",
                                href: "/ios/videocalling/#mute-video"
                            },
                            {
                                title: "Switch camera",
                                href: "/ios/videocalling/#switch-camera"
                            },
                            {
                                title: "Screen share",
                                href: "/ios/videocalling/#screen-sharing"
                            },
                            {
                                title: "Connection state",
                                href: "/ios/videocalling/#connection-state"
                            },
                            {
                                title: "Tackling network changes",
                                href: "/ios/videocalling/#tackling-network-changes"
                            },
                            {
                                title: "Recording",
                                href: "/ios/videocalling/#recording"
                            },
                            {
                                title: "Calls in background",
                                href: "/ios/videocalling/#receive-a-call-in-background-callkit"
                            },
                            {
                                title: "Push notifications",
                                href: "/ios/push-notifications/"
                            },
                            {
                                title: "Call quality",
                                href: "/ios/videocalling/#video-quality"
                            },
                        ]
                    },
                    {
                        name: "Meetings",
                        links: [
                            {
                                title: "Create meeting",
                                href: "/ios/videocalling-conference/#create-meeting"
                            },
                            {
                                title: "Join meeting",
                                href: "/ios/videocalling-conference/#join-video-room"
                            },
                            {
                                title: "List participants",
                                href: "/ios/videocalling-conference/#list-online-participants"
                            },
                            {
                                title: "Events",
                                href: "/ios/videocalling-conference/#events"
                            },
                            {
                                title: "Mute microphone",
                                href: "/ios/videocalling-conference/#mute-audio"
                            },
                            {
                                title: "Mute video",
                                href: "/ios/videocalling-conference/#mute-video"
                            },
                            {
                                title: "Switch camera",
                                href: "/ios/videocalling-conference/#switch-video-cameras"
                            },
                            {
                                title: "Get bitrate",
                                href: "/ios/videocalling-conference/#monitoring-mic-level-and-video-bitrate-using-stats"
                            },
                            {
                                title: "Get microphone level",
                                href: "/ios/videocalling-conference/#monitoring-mic-level-and-video-bitrate-using-stats"
                            },
                            {
                                title: "Recording",
                                href: "/ios/videocalling-conference/#recording"
                            },
                            {
                                title: "Push notifications",
                                href: "/ios/push-notifications/"
                            },
                        ]
                    }
                ]
            }
        },
        {
            name: 'Android',
            icon: 'icon-android',
            getStartedSection: {
                links: [
                    {
                        title: 'Make first call',
                        icon: 'first-call',
                        href: '/android/getting-started/make-first-call'
                    },
                    {
                        title: 'Code samples',
                        icon: 'code-samples-2',
                        href: '/android/getting-started/code-samples',
                    }
                ]
            },
            featuresSection: {
                features: [
                    {
                        name: "P2P calls",
                        links: [
                            {
                                title: "Create call session",
                                href: "/android/videocalling/#initiate-a-call"
                            },
                            {
                                title: "Initiate call",
                                href: "/android/videocalling/#initiate-a-call"
                            },
                            {
                                title: "Accept call",
                                href: "/android/videocalling/#accept-a-call"
                            },
                            {
                                title: "Reject call",
                                href: "/android/videocalling/#reject-a-call"
                            },
                            {
                                title: "Mute microphone",
                                href: "/android/videocalling/#mute-audio"
                            },
                            {
                                title: "Mute video",
                                href: "/android/videocalling/#mute-video"
                            },
                            {
                                title: "Switch camera",
                                href: "/android/videocalling/#switch-camera"
                            },
                            {
                                title: "Screen share",
                                href: "/android/videocalling/#screen-sharing"
                            },
                            {
                                title: "Connection state",
                                href: "/android/videocalling/#monitor-session-connection-state"
                            },
                            {
                                title: "Tackling network changes",
                                href: "/android/videocalling/#tackling-network-changes"
                            },
                            {
                                title: "Recording",
                                href: "/android/videocalling/#call-recording"
                            },
                            {
                                title: "Calls in background",
                                href: "/android/videocalling/#receive-a-call-in-background"
                            },
                            {
                                title: "Push notifications",
                                href: "/android/push-notifications/"
                            },
                            {
                                title: "Call quality",
                                href: "/android/videocalling/#configure-media-settings"
                            },
                        ]
                    },
                    {
                        name: "Meetings",
                        links: [
                            {
                                title: "Create meeting",
                                href: "/android/videocalling-conference/#create-meeting"
                            },
                            {
                                title: "Join meeting",
                                href: "/android/videocalling-conference/#join-video-room"
                            },
                            {
                                title: "List participants",
                                href: "/android/videocalling-conference/#list-online-participants"
                            },
                            {
                                title: "Events",
                                href: "/android/videocalling-conference/#events"
                            },
                            {
                                title: "Mute microphone",
                                href: "/android/videocalling-conference/#mute-audio"
                            },
                            {
                                title: "Mute video",
                                href: "/android/videocalling-conference/#mute-video"
                            },
                            {
                                title: "Switch camera",
                                href: "/android/videocalling-conference/#switch-video-cameras"
                            },
                            {
                                title: "Get bitrate",
                                href: "/android/videocalling-conference/#monitoring-mic-level-and-video-bitrate-using-stats"
                            },
                            {
                                title: "Get microphone level",
                                href: "/android/videocalling-conference/#monitoring-mic-level-and-video-bitrate-using-stats"
                            },
                            {
                                title: "Recording",
                                href: "/android/videocalling-conference/#recording"
                            },
                            {
                                title: "Push notifications",
                                href: "/android/push-notifications/"
                            },
                        ]
                    }
                ]
            }
        },
    ]
}
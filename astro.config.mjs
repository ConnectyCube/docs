import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import Icons from 'unplugin-icons/vite';
import config from './config.js';
import starlightVideos from 'starlight-videos'

export default defineConfig({
  site: config.endpoint,
  redirects: {
    '/home': {
      status: 301,
      destination: '/'
    },
    '/chat-widget': {
      status: 301,
      destination: '/chat-widget/getting-started/'
    },
    '/flutter': {
      status: 301,
      destination: '/flutter/getting-started/send-first-chat-message/'
    },
    '/reactnative': {
      status: 301,
      destination: '/reactnative/getting-started/send-first-chat-message/'
    },
    '/js': {
      status: 301,
      destination: '/js/getting-started/send-first-chat-message/'
    },
    '/cordova': {
      status: 301,
      destination: '/cordova/getting-started/send-first-chat-message/'
    },
    '/nativescript': {
      status: 301,
      destination: '/nativescript/getting-started/send-first-chat-message/'
    },
    '/ios': {
      status: 301,
      destination: '/ios/getting-started/send-first-chat-message/'
    },
    '/android': {
      status: 301,
      destination: '/android/getting-started/send-first-chat-message/'
    },
    '/flutter/chat': {
      status: 301,
      destination: '/flutter/messaging'
    },
    '/js/chat': {
      status: 301,
      destination: '/js/messaging'
    },
    '/reactnative/chat': {
      status: 301,
      destination: '/reactnative/messaging'
    },
    '/cordova/chat': {
      status: 301,
      destination: '/cordova/messaging'
    },
    '/nativescript/chat': {
      status: 301,
      destination: '/nativescript/messaging'
    },
    '/ios/chat': {
      status: 301,
      destination: '/ios/messaging'
    },
    '/android/chat': {
      status: 301,
      destination: '/android/messaging',
    },
  },
  integrations: [starlight({
    plugins: [starlightVideos()],
    title: 'Connectycube',
    description: 'ConnectyCube Developers documentation (API docs, code samples, SDK) for integrating instant messaging, video calling and push notifications functionality for mobile and web developers',
    logo: {
      light: './src/assets/logo/logo_light.svg',
      dark: './src/assets/logo/logo_dark.svg',
      alt: 'logo',
      replacesTitle: true,
    },
    favicon: '/favicon-tab.png',
    head: [
      {
        tag: 'link',
        attrs: {
          rel: 'icon',
          href: '/favicon.ico',
          sizes: '32x32',
        },
      },
      {
        tag: 'script',
        content:
          "(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-53S8F5TD');",
      },
      {
        tag: 'script',
        content: "(function(ss,ex){ window.ldfdr=window.ldfdr||function(){(ldfdr._q=ldfdr._q||[]).push([].slice.call(arguments));}; (function(d,s){ fs=d.getElementsByTagName(s)[0]; function ce(src){ var cs=d.createElement(s); cs.src=src; cs.async=1; fs.parentNode.insertBefore(cs,fs); }; ce('https://sc.lfeeder.com/lftracker_v1_'+ss+(ex?'_'+ex:'')+'.js'); })(document,'script'); })('3P1w24ddrZg4mY5n');"
      },
      {
        tag: 'script',
        content: "window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'AW-16905443919');"
      }
    ],
    customCss: ['./src/styles/custom.css', './src/styles/image.css', './src/fonts/font-face.css',],
    components: {
      Header: './src/components/Header.astro',
      SocialIcons: './src/components/SocialIcons.astro',
      MobileMenuFooter: './src/components/MobileMenuFooter.astro',
      SkipLink: './src/components/SkipLink.astro',
      Footer: './src/components/Footer.astro',
    },
    sidebar: [
      // {
      //   label: 'Getting started',
      //   collapsed: true,
      //   items: [
      //     {
      //       label: 'Welcome',
      //       link: '/home/'
      //     }]
      // },
      {
        label: 'Chat Widget',
        collapsed: true,
        autogenerate: { directory: 'chat-widget' },
      },
      {
        label: 'Flutter',
        collapsed: true,
        autogenerate: { directory: 'flutter' },
      },
      {
        label: 'React Native',
        collapsed: true,
        autogenerate: { directory: 'reactnative' },
      },
      {
        label: 'Web',
        collapsed: true,
        autogenerate: { directory: 'js' },
      },
      {
        label: 'Cordova',
        collapsed: true,
        autogenerate: { directory: 'cordova' },
      },
      {
        label: 'NativeScript',
        collapsed: true,
        autogenerate: { directory: 'nativescript' },
      },
      {
        label: 'iOS',
        collapsed: true,
        autogenerate: { directory: 'ios' },
      },
      {
        label: 'Android',
        collapsed: true,
        autogenerate: {
          directory: 'android'
        }
      },
      {
        label: 'Chat Bots',
        collapsed: true,
        autogenerate: { directory: 'chat_bots' },
      },
      {
        label: 'Server API',
        collapsed: true,
        autogenerate: { directory: 'server' },
      },
      {
        label: 'Admin API',
        collapsed: true,
        autogenerate: { directory: 'admin_api' },
      },
      {
        label: 'Guides',
        collapsed: true,
        autogenerate: { directory: 'guides' },
      },
    ]
  })],
  vite: {
    plugins: [Icons({ compiler: 'astro' })],
  },
});
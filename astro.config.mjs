import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import Icons from 'unplugin-icons/vite';
import config from './config.js';
import starlightVideos from 'starlight-videos'
import starlightLlmsTxt from 'starlight-llms-txt'

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'node:url';

const DOCS_DIR = 'src/content/docs';

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(full);
    } else {
      yield full;
    }
  }
}

function routeFromDocsPath(relFromDocs) {
  // Normalize to forward slashes
  const norm = relFromDocs.replaceAll('\\', '/');
  // "getting-started/index.md" -> "getting-started"
  if (norm.endsWith('/index.md') || norm.endsWith('/index.mdx')) {
    return path.posix.dirname(norm);
  }
  // "guide/install.md" -> "guide/install"
  return norm.replace(/\.mdx?$/, '');
}

// To can access the Markdown version of any documentation page by appending /index.html.md to the page URL
const rawMarkdownExporter = {
  name: 'starlight-raw-md',
 hooks: {
    'astro:build:done': async ({ dir }) => {
      // Convert build output URL to a proper path
      console.log("dir", dir)
      const outRoot = fileURLToPath(dir);
      console.log("outRoot", outRoot)

      if (!fs.existsSync(DOCS_DIR)) {
        console.warn(`[starlight-raw-md] Skipped: "${DOCS_DIR}" not found.`);
        return;
      }

      let count = 0;
      for (const file of walk(DOCS_DIR)) {
        if (!/\.mdx?$/.test(file)) continue;
        console.log("file", file)

        const relFromDocs = path.relative(DOCS_DIR, file);
           
        const route = routeFromDocsPath(relFromDocs);

        console.log("route", {relFromDocs, route})
        const outDir = path.join(outRoot, route).toLowerCase().replaceAll(" ", "-") ; // ✅ now a string path

        console.log("outDir", outDir)

        fs.mkdirSync(outDir, { recursive: true });

        const src = fs.readFileSync(file, 'utf-8');
        fs.writeFileSync(path.join(outDir, 'index.html.md'), src);
        count++;
      }

      console.log(`[starlight-raw-md] Exported ${count} Markdown files to /raw/**`)
    },
  },
};

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
     '/guides/ai': {
      status: 301,
      destination: '/guides/ai-assistants-and-llms'
    },
  },
  integrations: [starlight({
    plugins: [starlightVideos(), starlightLlmsTxt({
      // https://delucis.github.io/starlight-llms-txt/configuration/#promote
      promote: [ 
        'js/getting-started/send-first-chat-message', 
        'js/getting-started/make-first-call', 
        'js/messaging', 
        'js/videocalling', 
        'js/videocalling-conference', 
        'js/*', 

        'reactnative/getting-started/send-first-chat-message', 
        'reactnative/getting-started/make-first-call', 
        'reactnative/messaging', 
        'reactnative/videocalling', 
        'reactnative/videocalling-conference', 
        'reactnative/*', 

        'flutter/getting-started/send-first-chat-message', 
        'flutter/getting-started/make-first-call', 
        'flutter/messaging', 
        'flutter/videocalling', 
        'flutter/videocalling-conference', 
        'flutter/*', 

        'cordova/getting-started/send-first-chat-message', 
        'cordova/getting-started/make-first-call', 
        'cordova/messaging', 
        'cordova/videocalling', 
        'cordova/videocalling-conference', 
        'cordova/*', 

        'chat-widget/*', 

        'chat_bots/*', 

        'android/getting-started/send-first-chat-message', 
        'android/getting-started/make-first-call', 
        'android/messaging', 
        'android/videocalling', 
        'android/videocalling-conference', 
        'android/*',

        'ios/getting-started/send-first-chat-message', 
        'ios/getting-started/make-first-call', 
        'ios/messaging', 
        'ios/videocalling', 
        'ios/videocalling-conference', 
        'ios/*',

        'server/*',
      ]
    })],
    title: 'ConnectyCube',
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
        tag: 'meta',
        attrs: {
          property: 'og:type',
          content: 'website',
        },
      },
      {
        tag: 'meta',
        attrs: {
          property: 'og:site_name',
          content: 'ConnectyCube Developers',
        },
      },
      {
        tag: 'meta',
        attrs: {
          property: 'og:image',
          content: `${config.endpoint}/connectycube_preview.jpg`,
        },
      },
      {
        tag: 'meta',
        attrs: {
          property: 'og:image:width',
          content: '1200',
        },
      },
      {
        tag: 'meta',
        attrs: {
          property: 'og:image:height',
          content: '630',
        },
      },
      {
        tag: 'meta',
        attrs: {
          property: 'og:image:type',
          content: 'image/jpg',
        },
      },
      {
        tag: 'meta',
        attrs: {
          name: 'twitter:title',
          content: 'ConnectyCube Developers Documentation',
        },
      },
      {
        tag: 'meta',
        attrs: {
          name: 'twitter:description',
          content: 'Guides for quick and easy integration of ConnectyCube Chat and Calls for Flutter, React Native, Web, Cordova, NativeScript, iOS and Android',
        },
      },
      {
        tag: 'meta',
        attrs: {
          name: 'twitter:site',
          content: '@ConnectyCube',
        },
      },
      {
        tag: 'meta',
        attrs: {
          name: 'twitter:creator',
          content: '@ConnectyCube',
        },
      },
      {
        tag: 'meta',
        attrs: {
          name: 'twitter:url',
          content: 'https://developers.connectycube.com/',
        },
      },
      {
        tag: 'meta',
        attrs: {
          name: 'twitter:image',
          content: `${config.endpoint}/connectycube_preview.jpg`,
        },
      },
      {
        tag: 'meta',
        attrs: {
          property: 'twitter:image:type',
          content: 'image/jpg',
        },
      },
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
    ],
  }), rawMarkdownExporter],
  vite: {
    plugins: [Icons({ compiler: 'astro' })],
  },
});
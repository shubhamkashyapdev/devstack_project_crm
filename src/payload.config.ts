import { buildConfig } from 'payload/config';
import path from 'path';

// Plugins
import imagekitPlugin from "payloadcms-plugin-imagekit";

import Users from './collections/Users';
import { Client } from './collections/Client';
import { Developer } from './collections/Developer';
import { Leads } from './collections/Leads';
import { Documents } from './collections/Documents';
import { Media } from './collections/Media';
const sendEmilPath = path.resolve(__dirname, 'collections/hooks/sendEmail.ts');
const mockEmailModulePath = path.resolve(__dirname, 'mocks/sendEmail.ts');

// Graphics
import Logo from './components/Logo'
import Icon from './components/Icon';

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: "- DevStack",
      favicon: '/assets/favicon.png',
      ogImage: '/assets/logo.png',
    },
    components: {
      graphics: {
        Logo,
        Icon,
      }
    },
    webpack: (config) => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          [sendEmilPath]: mockEmailModulePath,
        }
      }
    })
  },

  collections: [
    Users,
    Client,
    Developer,
    Leads,
    Documents,
    Media,
  ],
  plugins: [
    imagekitPlugin({
      config: {
        publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
        privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
        endpoint: process.env.IMAGEKIT_ENDPOINT,
      },
      collections: {
        media: {
          uploadOption: {
            folder: "media",
          },
          savedProperties: ["url", "AITags"],
        },
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});

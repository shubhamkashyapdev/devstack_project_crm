import { buildConfig } from 'payload/config';
import path from 'path';
// import Examples from './collections/Examples';
import Users from './collections/Users';
import { Client } from './collections/Client';
import { Developer } from './collections/Developer';
import { Leads } from './collections/Leads';
import { Documents } from './collections/Documents';
const sendEmilPath = path.resolve(__dirname, 'collections/hooks/sendEmail.ts');
const mockEmailModulePath = path.resolve(__dirname, 'mocks/sendEmail.ts');
export default buildConfig({
  serverURL: 'http://localhost:3000',
  admin: {
    user: Users.slug,
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
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
});

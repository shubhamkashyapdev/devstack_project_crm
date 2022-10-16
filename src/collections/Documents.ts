import { CollectionConfig } from 'payload/types';

export const Documents: CollectionConfig = {
    slug: 'documents',
    fields: [],
    upload: {
        staticURL: '/documents',
        staticDir: 'documents',
        adminThumbnail: 'thumbnail',
        mimeTypes: ['application/pdf'],
    },
};
import { CollectionConfig } from "payload/types";

export const Client: CollectionConfig = {
    slug: "client",
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
        },
        {
            name: "linkedin_url",
            type: "text",
        }
    ],

}
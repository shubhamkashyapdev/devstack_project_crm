import { CollectionConfig } from "payload/types";

export const Developer: CollectionConfig = {
    slug: "developer",
    fields: [
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
        },
        {
            name: "linkedin_url",
            type: "text",
        },
        {
            name: "github_url",
            type: "text",
        },
    ],

}
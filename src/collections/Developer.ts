import { CollectionConfig } from "payload/types";

export const Developer: CollectionConfig = {
    slug: "developer",
    fields: [
        {
            name: "user",
            label: "Account",
            type: "relationship",
            relationTo: "users",
        },
        {
            name: "linkedin_url",
            label: "Linkedin URL",
            type: "text",
        },
        {
            name: "github_url",
            label: "Github URL",
            type: "text",
        },
    ],

}
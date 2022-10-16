import { CollectionConfig } from "payload/types";

export const Client: CollectionConfig = {
    slug: "client",
    admin: {
        useAsTitle: "Name"
    },
    fields: [
        {
            name: "Name",
            type: "text",
            required: true,
        },
        {
            name: "user",
            type: "relationship",
            relationTo: "users",
        },
        {
            name: "queries",
            type: "array",
            label: "Queries",
            fields: [
                {
                    name: "Question",
                    type: "text"
                },
                {
                    name: "Answer",
                    type: "richText"
                },
            ]
        }
    ],

}
import { CollectionConfig } from "payload/types";

export const Leads: CollectionConfig = {
    slug: "leads",
    admin: {
        useAsTitle: "first_name",
    },
    fields: [
        {
            type: "row",
            fields: [
                {
                    name: "first_name",
                    type: "text",
                    required: true,
                    admin: {
                        width: "50%"
                    }
                },
                {
                    name: "last_name",
                    type: "text",
                    required: true,
                    admin: {
                        width: "50%"
                    }
                },
            ]
        },
        {
            type: "row",
            fields: [
                {
                    name: "email_address",
                    type: "text",
                    required: true,
                    admin: {
                        width: "50%"
                    }
                },
                {
                    name: "phone_number",
                    type: "text",
                    required: true,
                    admin: {
                        width: "50%"
                    }
                },
            ]
        },
        {
            name: "subject",
            type: "text",
            required: true,
        },
        {
            name: "lead_query",
            type: "richText",
            required: true,
        },
        {
            name: "lead_document",
            type: "upload",
            relationTo: "documents"
        },
        {
            name: "lead_status",
            type: "radio",
            options: [
                {
                    label: "Pending",
                    value: "PENDING",
                },
                {
                    label: "Assigned",
                    value: "ASSIGNED",
                },
                {
                    label: "Under Review",
                    value: "UNDER_REVIEW",
                },
                {
                    label: "Completed",
                    value: "Completed",
                },
                {
                    label: "In Progress",
                    value: "IN_PROGRESS",
                },
                {
                    label: "On Hold",
                    value: "ON_HOLD",
                },
            ],
        },
        {
            type: "row",
            fields: [
                {
                    name: "client",
                    type: "relationship",
                    relationTo: "client",
                    admin: {
                        width: "50%",
                    }
                },
                {
                    name: "assigned_to",
                    type: "relationship",
                    relationTo: "users",
                    admin: {
                        width: "50%",
                    }
                }
            ]
        },
        {
            // will be populated when lead status chagned to IN_PROGRESS
            name: "start_date",
            type: "date",
            admin: {
                readOnly: true,
            }
        },
        {
            // will be updated when lead status chagned to COMPLETED
            name: "end_date",
            type: "date",
            admin: {
                readOnly: true,
            }
        }
    ],

}
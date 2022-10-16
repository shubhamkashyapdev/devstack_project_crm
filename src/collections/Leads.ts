import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/admin";

export const Leads: CollectionConfig = {
    slug: "leads",
    admin: {
        useAsTitle: "first_name",

    },
    access: {
        create: () => true,
        read: isAdmin,
        update: isAdmin,
        delete: isAdmin,
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
                        width: "50%",

                    }
                },
            ]
        },
        {
            type: "row",
            fields: [
                {
                    name: "email_address",
                    label: "Email Address",
                    type: "email",
                    required: true,
                    admin: {
                        width: "50%"
                    }
                },
                {
                    name: "phone_number",
                    label: "Phone Number",
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
            label: "Subject",
            type: "text",
            required: true,
        },
        {
            name: "lead_query",
            label: "Lead Query",
            type: "richText",
            required: true,
        },
        {
            name: "lead_document",
            label: "Lead Document",
            type: "upload",
            relationTo: "documents"
        },
        {
            name: "lead_status",
            label: "Lead Status",
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
            defaultValue: "option_1",
        },
        {
            type: "row",
            fields: [
                {
                    name: "client",
                    label: "Client",
                    type: "relationship",
                    relationTo: "client",
                    admin: {
                        width: "50%",
                    }
                },
                {
                    name: "assigned_to",
                    label: "Assigned To",
                    type: "relationship",
                    relationTo: "users",
                    admin: {
                        width: "50%",
                    }
                }
            ]
        },
        {
            name: "start_date",
            label: "Start Date",
            type: "date",
            admin: {
                readOnly: true,
                description: "Project Start Date, will be populated when lead status chagned to IN_PROGRESS"
            }
        },
        {
            name: "end_date",
            label: "End Date",
            type: "date",
            admin: {
                readOnly: true,
                description: "Project End Date, will be populate when lead status chagned to COMPLETED"
            }
        }
    ],

}
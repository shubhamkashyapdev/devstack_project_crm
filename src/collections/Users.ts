import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/admin';
import { OTPPayload, AccountStatus } from '../types';
import { getToken } from '../utils/utils';
import { sendEmail } from './hooks/sendEmail';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'first_name',
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
            width: "50%"
          }
        }
      ],

    },
    {
      name: "role",
      type: "radio",
      options: [
        { label: 'User', value: 'user' },
        { label: 'Admin', value: 'admin' },
        { label: 'Client', value: 'client' },
        { label: 'Developer', value: 'developer' },
      ],
      required: true,
      defaultValue: "option_1",
      admin: {
        layout: 'horizontal',
      }
    },
    {
      name: "isVerified",
      type: "checkbox",
      defaultValue: false,
      required: true,
    },

    {
      name: "account_status",
      type: "radio",
      options: [
        {
          label: "Pending",
          value: "PENDING",
        },
        {
          label: "Active",
          value: "ACTIVE",
        },
        {
          label: "Banned",
          value: "BANNED"
        }
      ],
      defaultValue: 'option_1',
      admin: {
        layout: 'horizontal',
      }
    },
    {
      name: "firebase_token",
      type: "text"
    },
    {
      name: "otp",
      type: "text",
      maxLength: 4,
      required: false,
    },
    {
      name: "phone_number",
      type: "text",
      unique: true,
    },
    {
      type: "row",
      fields: [
        {
          name: "is_email_verified",
          type: "checkbox",
          defaultValue: false,
          admin: {
            width: "50%"
          }
        },
        {
          name: "is_phone_verified",
          type: "checkbox",
          defaultValue: false,
          admin: {
            width: "50%"
          }
        }
      ]
    }
  ],
  hooks: {
    beforeChange: [
      async ({ req, operation, data }) => {
        if (operation === 'create') {
          // generate the email OTP token - max 4 Digits
          let token = getToken()
          if (data.role === 'user') {
            // send the token to user's email address
            sendEmail({ to: data.email, subject: "CresEquity Account Verification Email OTP", html: `<h1>Your Verification Code is: ${token}</h1>` })
            data.otp = token;
            if (req?.user?.role === 'admin') {
              return data
            } else {
              data.isVerified = false;
              return data;
            }
          }
          if (data.role === 'admin' && req?.user?.role !== 'admin') {
            throw new Error("User havig role user is not allowed to create user with admin access");
          }
        }
      },
    ],
    afterLogin: [
      async ({ req: { user } }) => {
        // check if account is verified
        if (user.isVerified) {
          return true
        } else {
          throw new Error("Please Verify Your Account!!")
        }
      }
    ]
  },
  endpoints: [
    {
      path: '/verify',
      method: 'post',
      handler: async (req, res, next) => {
        const payload = req.payload;
        const body: OTPPayload = req.body;
        if (!body?.id || !body?.otp) {
          res.status(400).json({ message: "Please provide a valid otp address and user ID" })
        }
        // get user by provided ID
        try {
          const user = await payload.findByID({
            collection: 'users',
            id: body.id
          });
          if (!user) {
            res.status(404).json("No user found with provided user ID");
          }
          if (user.otp === body.otp) {
            // verify the user account
            await payload.update({
              collection: 'users',
              id: body.id,
              data: {
                isVerified: true,
              }
            })
            res.status(200).json({ message: "OTP verified successfully" })
          } else {
            res.status(400).json({ message: "Invalid OTP Provided" })
          }
        } catch (err) {
          console.log({ err: err.message })
          res.status(500).json({ message: "Internal Server Error" })
        }
      }
    }
  ]
};

export default Users;
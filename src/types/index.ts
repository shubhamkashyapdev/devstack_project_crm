
export type OTPPayload = {
    otp: string;
    id: string;
}

export enum UserRole {
    admin = 'admin',
    user = 'user',
    client = 'client',
    developer = 'developer'
}

export type CreateUserDTO = {
    email: string;
    password: string;
    role?: UserRole;
}

export type AccountStatus = {
    ACTIVE: "ACTIVE",
    PENDING: "PENDING",
    BANNED: "BANNED",
}

export type LeadStatus = {
    PENDING: "PENDING",
    ASSIGNED: "ASSIGNED",
    UNDER_REVIEW: "UNDER_REVIEW",
    COMPLETED: "COMPLETED",
    IN_PROGRESS: "IN_PROGRESS",
    ON_HOLD: "ON_HOLD",
}
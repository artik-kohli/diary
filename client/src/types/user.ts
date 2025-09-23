export interface User {
    username: string;
    email: string;
    displayName: string;
    token: string;
    imageUrl?: string;
}

export interface LoginCreds {
    username: string;
    password: string;
}

export interface RegisterCreds {
    username: string;
    email: string;
    password: string;
    displayName: string;
}
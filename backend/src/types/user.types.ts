export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
}

export interface RegisterUserData {
    name: string;
    email: string;
    password: string;
}

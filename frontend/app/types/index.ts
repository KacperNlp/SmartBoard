export interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string; // API zwraca string, nie Date
}

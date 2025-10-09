export interface ICsvUser {
    name: string;
    surname: string;
    gender: string;
    age: number;
    country: string;
    city: string;
    email: string;
    phone: string;
}

export interface IFileUserDetails {
    id: number;
    name: string;
    earnings: string;
    country: string;
}

export interface IImageResponse {
    id: string;
    imageUrl: string;
    displayOrder: number;
}
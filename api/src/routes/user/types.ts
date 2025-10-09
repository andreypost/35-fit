export interface IDatabaseUser {
    id: string;
    name: string;
    surname: string;
    gender: string;
    age: number;
    country: string;
    city: string;
    email: string;
    phone: string;
    grantedPrivileges: number;
    deniedPrivileges: number;
}

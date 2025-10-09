export interface IUser {
    name: string;
    email: string;
}

export interface IItems { }

export interface IOrder {
    id: string;
    status: string;
    finalTotalPrice: number;
    user: IUser;
    items: IItems;
}

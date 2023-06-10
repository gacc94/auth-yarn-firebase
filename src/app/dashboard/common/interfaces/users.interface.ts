export interface IUser {
    id: number;
    name: string;
    email: string;
    addresses : IAddresses[],
}

export interface IAddresses {
    district: string;
    street: string;
}
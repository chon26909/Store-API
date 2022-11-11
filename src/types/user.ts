export interface IUser {
    id?: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    status: 'enabled' | 'disabled';
}

export type IFilterUser = Pick<IUser, 'email' | 'firstname'>;

export enum USER_STATUS {
    ENABLE = 'enable',
    DISABLE = 'disable'
}

export enum ROLES_USER {
    ADMIN = 'admin',
    SALE = 'sale'
}

// const filterUser = (arg: IFilterUSer): void => {};

// filterUser({ email: "" });

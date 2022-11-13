export interface IUser {
    id: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
    user_status: USER_STATUS;
}

export type IFilterUser = Pick<IUser, 'email' | 'firstname'>;

export enum USER_STATUS {
    ENABLED = 'enabled',
    DISABLED = 'disabled',
    SUSPENDED = 'suspended'
}

export enum ROLES_USER {
    ADMIN = 'admin',
    SALE = 'sale'
}

// const filterUser = (arg: IFilterUSer): void => {};

// filterUser({ email: "" });

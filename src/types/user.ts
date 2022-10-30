export interface IUser {
    uid?: string;
    username: string;
    email: string;
    photoURL: string;
    role: string;
    phone: string;
    status: 'enabled' | 'disabled';
}

export type IFilterUSer = Pick<IUser, 'email' | 'username'>;

// const filterUser = (arg: IFilterUSer): void => {};

// filterUser({ email: "" });

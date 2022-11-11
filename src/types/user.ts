export interface IUser {
    id?: string;
    firstanme: string;
    lastname: string;
    email: string;
    role: string;
    status: 'enabled' | 'disabled';
}

export type IFilterUSer = Pick<IUser, 'email' | 'firstanme'>;

// const filterUser = (arg: IFilterUSer): void => {};

// filterUser({ email: "" });

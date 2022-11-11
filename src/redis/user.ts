import { IUser } from '../types/user';
import redisClient from './redis';

type IUserDataRedis = Pick<IUser, 'id' | 'email' | 'firstname' | 'lastname' | 'role' | 'user_status'>;

export const setUsersData = (data: IUserDataRedis[]) => {
    const json = JSON.stringify(data);
    redisClient.set('users', json);
};

export const getUsersData = () => {
    return redisClient.get('users');
};

import { db } from './mysql';

export const getAllUser = () => {
    return new Promise((resolve, reject) => {
        db.query('SELECT * FROM users', (err, result) => {
            if (err) {
                console.log('err', err);
                reject(err);
            } else {
                console.log('result', result);

                resolve(result);
            }
        });
    });
};

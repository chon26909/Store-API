import Omise from 'omise';

interface ICreateSorceToken {
    token: string;
    amount: number;
}

/**
 * amount THB
 */
export const createSorceToken = (type: 'rabbit_linepay' | 'promptpay' | 'shopeepay', amount: number) => {
    return new Promise<ICreateSorceToken>((resolve, reject) => {
        try {
            const omiseClient = Omise({ publicKey: process.env.OMISE_PUBLIC_KEY });

            omiseClient.sources.create(
                {
                    type: type,
                    amount: amount * 100,
                    currency: 'THB'
                },
                (statusCode, response) => {
                    console.log('response', response);

                    resolve({ token: response.id, amount: response.amount / 100 });
                }
            );
        } catch (error) {
            reject(error);
        }
    });
};

export const createCharge = (sourceToken: string, amount: number, orderId: number) => {
    return new Promise((resolve, reject) => {
        const omiseClient = Omise({ publicKey: process.env.OMISE_PUBLIC_KEY, secretKey: process.env.OMISE_SECRET_KEY });
        omiseClient.charges.create(
            {
                source: sourceToken,
                amount: amount * 100,
                currency: 'THB',
                return_uri: `http://localhost:5173/success?order_id=${orderId}`,
                metadata: {
                    orderId
                }
            },
            (err, resp) => {
                if (err) {
                    return reject(err);
                }
                resolve(resp);
            }
        );
    });
};

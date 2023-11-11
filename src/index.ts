import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import morganMiddleware from './middleware/mogan';
import * as dotenv from 'dotenv';
import { createCharge, createSorceToken } from './services/omiseService';

const app: Application = express();
const PORT = Number(process.env.PORT);

//dotenv.config();

dotenv.config({ path: process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : `.env` });

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());

app.use(express.json());
app.use(morganMiddleware);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.get('/payment', async (req, res) => {
    try {
        const data = await createSorceToken('rabbit_linepay', 1000);
        const response = await createCharge(data.token, 1000, 1);

        console.log('charge received', response);

        res.json(response);
    } catch (error) {
        console.log('error', error);
    }
});

app.get('', (_, res) => res.json({ message: 'Online Store API', env: process.env.NODE_ENV, data: process.env }));

app.listen(PORT, () => console.log(`server listening on port ${PORT} => http://localhost:${PORT}`));

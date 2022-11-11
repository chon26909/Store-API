import express, { Application } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import morganMiddleware from './middleware/mogan';
const app: Application = express();
const PORT: number = 4000;

dotenv.config();

app.use(
    cors({
        origin: ['http://localhost:5173']
    })
);
app.use(express.json());
app.use(morganMiddleware);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/product', productRoutes);

app.listen(PORT, () => console.log(`server listening on port ${PORT} => http://localhost:${PORT}`));

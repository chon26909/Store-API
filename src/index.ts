import express, { Application } from 'express';
import cors from 'cors';
import * as dotenv from 'dotenv';
import bodyParser from 'body-parser';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import morganMiddleware from './middleware/mogan';
const app: Application = express();
const PORT: number = 4000;

dotenv.config({ path: '.env.' + process.env.NODE_ENV });

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());
app.use(express.json());
app.use(morganMiddleware);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/product', productRoutes);

app.get('', (_, res) => res.json({ message: 'Hello' }));

app.listen(PORT, () => console.log(`server listening on port ${PORT} => http://localhost:${PORT}`));

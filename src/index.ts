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

app.listen(PORT, () => {
    console.log(`server listening on port ${PORT} => http://localhost:${PORT}`);
});

// const users = [
//   {
//     id: 1,
//     username: "admin",
//     role: "super admin",
//   },
//   {
//     id: 2,
//     username: "user",
//   },
//   {
//     id: 3,
//     username: "guest",
//   },
//   {
//     id: 4,
//     username: "guest",
//   },
//   {
//     id: 5,
//     username: "guest",
//   },
//   {
//     id: 6,
//     username: "guest",
//   },
// ];

// const result = users.map((user) => {
//   return {
//     ...user,
//     role: "admin",
//   };
// });
// // console.log(result);

// const result1 = result.map((user) => {
//   return user.id === 5 ? { ...user, role: "super admin" } : user;
// });

// // console.log(result1);

// const findUserSuperAdmin = (data: any[], callback?: Function) => {
//   return new Promise<{}[]>((resolve) => {
//     const result = data.filter((user) => user.role === "super admin");

//     // delay time
//     setTimeout(() => {
//       if (callback) {
//         callback(result);
//       }

//       resolve(result);
//     }, 5000);
//   });
// };

// const handleUser = async () => {
//   //  ---------------------- 1 ---------------------- //
//   findUserSuperAdmin(users, (result: any) => {
//     console.log("callback findUserSuperAdmin result 1", result);

//     findUserSuperAdmin(users, (result: any) =>
//       console.log("callback findUserSuperAdmin result 2", result)
//     );
//   });

//   //  ---------------------- 2 ---------------------- //
//   const resultUseAwait_1 = await findUserSuperAdmin(users);
//   console.log("async await findUserSuperAdmin result 1", resultUseAwait_1);
//   const resultUseAwait_2 = await findUserSuperAdmin(users);
//   console.log("async await findUserSuperAdmin result 2", resultUseAwait_2);

//   console.log("next others function work !");
// };

// handleUser();

import connectDB from './config/db.js';
import path from 'path'
import express from 'express';
import cookieParser from 'cookie-parser';
import productsRoute from './routes/productRoute.js';
import userRoute from './routes/userRoute.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
dotenv.config();


const port = process.env.PORT || 4000;
connectDB();
const app = express();

//Body parse 
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use('/api/products',productsRoute);
app.use('/api/users',userRoute);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);


app.get('/api/config/paypal',  (req,res) => res.send({ clientId: process.env.PAYPAL_CLIENT_ID}));

const _dirname = path.resolve();
app.use('/uploads', express.static(path.join(_dirname,'/uploads')));

app.get('/',(req,res)=>{
    res.send('API is running...');
});


app.get('/food',(req,res)=>{
    res.send('API is running woho...');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=> console.log(`Server running on port ${port}`));
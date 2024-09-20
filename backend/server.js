import connectDB from './config/db.js';
import express from 'express';
import productsRoute from './routes/productRoute.js';
import dotenv from 'dotenv';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';
dotenv.config();

const port = process.env.PORT || 4000;
connectDB();
const app = express();

app.use('/api/products',productsRoute);


app.get('/',(req,res)=>{
    res.send('API is running...');
});


app.get('/food',(req,res)=>{
    res.send('API is running woho...');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port,()=> console.log(`Server running on port ${port}`));
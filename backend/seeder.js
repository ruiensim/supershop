import mongoose from "mongoose";
import dotenv from 'dotenv';
import colors from "colors";
import users from "./data/user.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const importData = async () => {
    try{
        
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();
        
        const createdUsers = await User.insertMany(users);

        const adminUser = createdUsers[0]._id;

        const sampleProduct = products.map(product =>{
            return {user:adminUser, ... product};
        });

       await Product.insertMany(sampleProduct);

       console.log('Data Imported'.green.inverse);
       process.exit();
    }catch(error){
        console.log(`${error.message}`.red.inverse);
        process.exit(1);
    }
}

const destroyData = async () => {
    try{
        
        await Order.deleteMany();
        await User.deleteMany();
        await Product.deleteMany();
        

       console.log('Data destrpy'.red.inverse);
       process.exit();
    }catch(error){
        console.log('error'.red.inverse);
        process.exit(1);
    }

}


if(process.argv[2] === '-d'){
    destroyData();
}else{
    importData();
}
import express from 'express';
import productsRouter from './routes/products.js';
import mongoose from 'mongoose';
import userRouter from './routes/users.js';


// Make database connection
await mongoose.connect(process.env.MONGO_URI);


// create an express app
const app = express ();

// Use global middlewares
app.use(express.json());

// use routes
app.use(productsRouter);
app.use(userRouter);

// listen for incoming request 
const port = process.env.PORT || 3100;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})
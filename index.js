import express from 'express';
import productsRouter from './routes/products.js';
import mongoose from 'mongoose';


// Make database connection
await mongoose.connect(process.env.MONGO_URI);


// create an express app
const app = express ();

// Use global middlewares
app.use(express.json());

// use routes
app.use(productsRouter);

// listen for incoming request 
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})
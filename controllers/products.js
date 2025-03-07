import { ProductModel } from "../models/product.js";

export const addProduct = async (req, res, next) => {
    try {
        // Upload product image
        // Validate product information
        // Save product information in the database
        const result = await ProductModel.create(req.body);
        // Return response
        res.json(result);
    } catch (error) {
        next(error);
    }
    
}

export const getProducts = async (req, res, next) => {
    try {
        // Fetch products from database
        const result = await ProductModel.find();
        // Return response
        res.json(result);
    } catch (error) {
        next(error);
    }
}

export const countProducts = (req, res) => {
    res.send('All products count!');
}

export const updateProduct = (req, res) => {
    res.send(`Product with id ${req.params.id} updated!`);
}

export const deleteProduct = (req, res) => {
    res.send(`Product with id ${req.params.id} deleted!`);
}
import { ProductModel } from "../models/product.js";
import { addProductValidator } from "../validators/products.js";

export const addProduct = async (req, res, next) => {
    try {
       console.log(req.file, req.files);
        // Validate product information
        const { error, value } = addProductValidator.validate({
            ...req.body,
            // image: req.file?.filename,
            pictures:req.files?.map((file) => {
                return file.filename;
            }),
        });
        if (error) {
            return res.status(422).json(error);
        }
        // Save product information in the database
        const result = await ProductModel.create(value);
        // Return response
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
    
}

export const getProducts = async (req, res, next) => {
    try {
        const {filter = "{}", sort = "{}" } =  req.query;
        // Fetch products from database
        const result = await ProductModel
            .find(JSON.parse(filter))
            .sort(JSON.parse(sort));
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
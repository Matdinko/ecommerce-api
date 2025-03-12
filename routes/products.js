import { Router } from "express";
import { addProduct, countProducts, deleteProduct, getProducts, updateProduct } from "../controllers/products.js";
import { localUpload, remoteUpload } from "../middlewares/upload.js";

// Create product router 
const productsRouter = Router();

// Define routes
productsRouter.post('/products', remoteUpload.single('image'), addProduct);

productsRouter.get('/products', getProducts);

productsRouter.get('/products/counts', countProducts);

productsRouter.patch('/products/:id', updateProduct);

productsRouter.delete('/products/:id', deleteProduct);

// Export router
export default productsRouter;
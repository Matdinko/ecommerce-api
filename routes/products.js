import { Router } from "express";
import {
  addProduct,
  countProducts,
  deleteProduct,
  getProducts,
  updateProduct,
} from "../controllers/products.js";
import {
  localUpload,
  productImageUpload,
  productPicturesUpload,
  remoteUpload,
} from "../middlewares/upload.js";

// Create product router
const productsRouter = Router();

// Define routes
productsRouter.post(
  "/products",
//   productImageUpload.single("image"),
  productPicturesUpload.array("pictures", 3),
  addProduct
);

productsRouter.get("/products", getProducts);

productsRouter.get("/products/counts", countProducts);

productsRouter.patch("/products/:id", updateProduct);

productsRouter.delete("/products/:id", deleteProduct);

// Export router
export default productsRouter;

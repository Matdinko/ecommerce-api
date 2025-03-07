import { Schema, model } from "mongoose";

const productSchema = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required:true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    quantity: { type: Number, required: true }
}, {
    timestamps: true
});

export const ProductModel = model('Product', productSchema);
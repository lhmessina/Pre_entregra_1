
import mongoose from "mongoose";

const cartCollection = "cart"; // Nombre de mi coleccion

// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
// Instancio en cartSchema la clase Schema y luego la convierto en modelo  --> mongoose.model(modelName, schema)<--  para poder trabajarla 

const cartSchema = new mongoose.Schema({
  products: {
    type: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: "product" }, quantity: Number }],
    default: [],
  },
});

export const cartModel = mongoose.model(cartCollection, cartSchema);





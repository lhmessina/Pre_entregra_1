
//Importo productModel desde product.model donde se definio el schema con la forma de los productos y el nombre de la collection
// luego lo convierto en modelo con --> mongoose.model(productCollection, productSchema) <--

import { productModel } from "./models/products.model.js";




// const getAll = async () => {
//     const products = await productModel.find({ status: true });
//     return products;
//   };
    const getAll = async (query, option) => {
    const products = await productModel.paginate(query, option)
        return products;
     };
  
  const getById = async (id) => {
    const product = await productModel.findById(id);
    return product;
  };
  
  const create = async (data) => {
    const product = await productModel.create(data);
    
  };
  
  const update = async (id, data) => {
    const productUpdate = await productModel.findByIdAndUpdate(id, data, { new: true });
    return productUpdate;
  };
  
  const deleteOne = async (id) => {
    const product = await productModel.findByIdAndUpdate(id, { status: false }, { new: true });
    return product;
  };
  
  // exporto default para importar el product.dao y usar sus metodos en el  router con los req res de
  // los endpoint definidos en product.router
  export default {
    getAll,
    getById,
    create,
    update,
    deleteOne
  }
  

import { cartModel } from "./models/cart.model.js"; // para utilizar los metodos del modelo de cart
import { productModel } from "./models/products.model.js";


const createCart = async () => {
    const cart = await cartModel.create({});
    return cart;
}


const getAll = async () => {
    const cart = await cartModel.find();
    return cart;
  };
  
//populate me permite referenciar documentos de otra colecciones ( productos de cart)
const getById =async (id) => {
    const cart = cartModel.findById(id).populate("products.product")
   
    return cart
}


const addProductToCart = async (cid, pid) => {
const cart = await cartModel.findById(cid);

const productInCart = cart.products.find((element) => element.product == pid);
if (productInCart) {
  productInCart.quantity++;
                   } 
else {
  cart.products.push({ product: pid, quantity: 1 });
     }

await cart.save(); 
return cart;
};



const update_cart = async (cid,cart_id) => {
    

    const cart = cartModel.findByIdAndUpdate(cid,cart_id,{ new: true })
    
    return cart;
}
const delete_cart =async (cid) => {
    

const cart =cartModel.deleteOne({_id : cid})

return (cart);
}

const clear_cart = async (cid) =>{

  const cart = await cartModel.findById(cid);
  
    cart.products = [];
    await cart.save();
    return (cart)
  }



// buscar el cart ( metodo del modelo findByID, cart id ) , buscar en el  el product una vez que encontre el cart , borrar
const delete_prod_from_cart =async (cid,pid) => {
    
    
    const cart = await cartModel.findById(cid)
    

    if (!cart){
       return ( `El carro con ${cid} no existe`)
                           }

   
       else {
             const productInCart = cart.products.find((element) => element.product == pid);
             if (productInCart == undefined)
              {return (`El Producto ${pid} no se encuentra en el carro`)  }
    

                      cart.products = cart.products.filter( (element) => element.product != pid)
                      
                      
    
                      await cart.save()

                      }
                     
                    
           

    return (` El Producto  ${pid} fue eliminado del carrito ${cid}`);
    }

  const update_quantity2cart = async(cid, pid,new_quantity) => {
    
    const cart = await cartModel.findById(cid);
    const product =  cart.products.find((element) => element.product == pid);
    
    product.quantity = new_quantity;
    await cart.save();
    return (cart);
  }

//exporto para que los metodos esten disponibles para quien importe a cart.dao
export default{
    createCart,
    getById,
    getAll,
    addProductToCart,
    update_cart,
    delete_cart,
    delete_prod_from_cart,
    clear_cart,
    update_quantity2cart
}
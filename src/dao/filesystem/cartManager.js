import fs from "fs";
import productManager from "./productManager.js";

const path_carts = "./carts.json"

let carts = [];

const createCar = async ()  => {
    
    
    let  id = carts.length + 1
    
    
    const new_cart ={
        cart_id:id,
        products:[]
    }    
    
    carts.push(new_cart);
    await fs.promises.writeFile(path_carts, JSON.stringify(carts));
    return carts 
}
    
//ID 
// Array de objetos  que contendra productos 

//////////////////////////////////////////////////////////  
const getCart = async () => {
    const cart_tempJson = await fs.promises.readFile(path_carts,"utf8")
    const cart_tempParse = JSON.parse(cart_tempJson)
    //return cart_tempParse
    carts = cart_tempParse ;
    return carts
  };



const getCarByid = async (cid) => { 
    
    const cart_temp = await getCart();
   

    if (cart_temp.length == 0 ){
        const cart_found= [];
        return "no cart id"
    }
    
    
    const cart_found = cart_temp.find((c) => c.cart_id === cid)
    
    if (cart_found == undefined) {
        return "no cart id"
    }

    return cart_found
    
}

const addProduct2cart = async (cid,pid)  => {
     
    const prod = await productManager.getProductById(pid)
    const cart_2_load = await  getCarByid(cid)
    

    if (prod === undefined) return "no_Product";
    if (cart_2_load === undefined) return "no_Cart";

    const productExists =  cart_2_load.products.find((p) => p.product === pid);
    

    if (productExists!= undefined) {

          const a = productExists.quantity +1
          
          const prod2load ={
            product: pid,
            quantity : a}

       
             cart_2_load.products[0].quantity = a

            
            
            await fs.promises.writeFile(path_carts, JSON.stringify(carts));   
            return cart_2_load

            


       }
        
        
    
        const prod2load ={
         product: pid,
         quantity : 1
    }
    
    cart_2_load.products.push(prod2load)
    
     await fs.promises.writeFile(path_carts, JSON.stringify(carts));
    
    return cart_2_load 
    
    
    }
    


export default{

createCar,   
getCarByid,
addProduct2cart
}
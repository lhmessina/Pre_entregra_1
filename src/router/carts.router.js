import {Router} from 'express';
import fs from "fs";
//import cartManager from "../cartManager.js"
import productDao from '../dao/MongoDB/product.dao.js';
import cartDao from '../dao/MongoDB/cart.dao.js';
import { cartModel } from '../dao/MongoDB/models/cart.model.js';
import { productModel } from '../dao/MongoDB/models/products.model.js';

const router = Router();



router.get("/" ,async (req,res)  => {
    try{

        const cart = await cartDao.getAll();

    res.status(201).json({ status: "success", cart });
   
    }
    catch (error){
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }

})

router.post ("/" ,async (req,res)  => {
    try{

        const cart = await cartDao.createCart();

    res.status(201).json({ status: "success", cart });
 
    }
    catch (error){
    console.log(error);
    res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }

})



router.post("/:cid/product/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;

      const product = await productDao.getById(pid);
      if (!product) return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
      const cart = await cartDao.getById(cid);
      if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
      
      const cartUpdate = await cartDao.addProductToCart(cid, pid);
  
      res.status(200).json({ status: "success", payload: cartUpdate });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Erro", msg: "Error interno del servidor" });
    }
  });


router.delete("/:cid/product/:pid", async (req,res) => {
    const {cid, pid} = req.params;
    try{
        console.log( "dentro del delete", cid)
        const cart = await cartDao.delete_prod_from_cart(cid,pid)
       
       res.status(200).json ({status: "success", payload: cart})
    }
    
    
    catch{"error"}
})





////////////////////////////////////////////////////////////////////////////////////
router.get("/:cid", async (req,res) => {
    try{
        const { cid } = req.params;
        const cart_by_id = await cartDao.getById(cid)
        
        if (cart_by_id == null){

            res.status(404).json({ status: "Error", msg: `El carrrito: ${cid}  no exite! ` });

                              }
        else {                      
        res.status(201).json({ status: "success", cart_by_id });
             }   

        }
    catch{res.status(500).json({ status: "Error", msg: "Error interno del servidor" });}
})


// delete cart(id)
router.delete("/:cid", async (req,res) => {
    try{
        const { cid } = req.params;
        
        const cart_by_id = await cartDao.getById(cid);
        
        if (cart_by_id){
            
        const cart = await cartDao.delete_cart(cid)
        res.status(200).json({ status: "success", msg :`El carrrito: ${cid}  ha sido eliminado `})}
        
        else{    
        
            res.status(404).json({ status: "Error", msg: "Cart no encontrado" });
        }
        
       }
    catch{res.status(500).json({ status: "Error", msg: "Error interno del servidor" });}
})

router.put("/:cid/product/:pid", async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const query = req.body;

      const cart = await cartDao.getById(cid);
        if (!cart) return res.status(404).json({ status: "Error", msg: `No se encontró el carrito con el id ${cid}` });
        
      const cart_f = await cartModel.findById(cid)
      const product_f =  cart_f.products.find((element) => element.product == pid)
      
      if (!product_f)  return res.status(404).json({ status: "Error", msg: `No se encontró el producto con el id ${pid}` });
      

      const product = await cartDao.update_quantity2cart(cid,pid,query.quantity)
     
  
      res.status(200).json({ status: "success", payload: product });
       } 
    catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
 });

 router.put("/:cid" ,async (req, res) => {
    try{
    const {cid} = req.params;
    const cart = cartDao.clear_cart(cid);
    res.status(200).json({ status: "success", payload: cart });

    }
    catch{res.status(500).json({ status: "Error", msg: "Error interno del servidor" });}

    
 })




export default router;
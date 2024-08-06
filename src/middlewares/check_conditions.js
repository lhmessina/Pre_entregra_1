import { request,response } from "express";
import productDao from "../dao/MongoDB/product.dao.js"

    
// var myMiddleware = function (param) {
//     if (param === 'A') {
//       return function(req, res, next) { // <---Middleware A
//         // Do A stuff
//         return next();
//       }
//     } else {
//       return function(req, res, next) { // The default middleware
//         // Do default stuff
//         return next();
//     }
//   }




    export const check_conditions = async (req = request, res = response, next) => {
      
   
        try{  
              
            const {pid}  = req.params;
             if (pid){
               
             const productsid = await productDao.getById(pid)
            
            

               if (! productsid) return res.send(`El producto  ${pid} no existe!` )
              
               res.status(200).json({ status: "success", payload: productsid});}

            else{
                
                const products = await productDao.getAll()
                const body = req.body;
                const { title,description,code, price,status,stock,category,thumbnails} = body;

                const newproduct = {
              
                        title,
                        description,
                        code,
                        price,
                        status:true,
                        stock,
                        category,
                        thumbnails
              
          
                                 }
        
    // verificacion cuando los productos debian ser unicos                             
    const productExists = products.docs.find((p) => p.title === title);
    console.log('productexist',productExists)
    if (productExists) return  res.send(`El producto  ${title} ya existe!` )
    
   // verificacion de campos , admite solo  que falte thumbnails
      const checkData = Object.values(newproduct).includes(undefined) && newproduct.thumbnails != "undefined";
    
    console.log('checkdata:',checkData)
    
    if (checkData)  
      {console.log(checkData)
    return res.send(`Todos los campos son obligatorios!` )
      }
    else{
        
        console.log('este es el nuevo prod to add',newproduct)
        return next()
       

    }}}
        

             catch (error){
             console.log(error);
             res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
            
            
            }
          
        }

  
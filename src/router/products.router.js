import {Router} from 'express';
import {check_conditions} from "../middlewares/check_conditions.js" 
import productDao from '../dao/MongoDB/product.dao.js';
import {check_Token} from "../middlewares/check_token_middleware.js" 
const router = Router();


/////////////////////////////////////////////////////COOKIES///////////////////////////



///////////////////////////////////////////////////////////////////////////////////////



//opciones de filtrado recibidas por query

router.get("/", check_Token ,async(req, res) => {
  try{
    ///////////////////////////////////////////
    const { limit, page, sort, category, status,stock } = req.query;
    
    const options = {
      limit: limit || 10,
      page: page || 1,
      sort: {
        price: sort === "asc" ? 1 : -1,
      },
      category:category,
      status:status ,
      learn: true,
    };
      // filtros segun options via query, se puede resolver con switch options

      
      if (category) {
        const products = await productDao.getAll({ category }, options);
        return res.status(200).json({ status: "success", products });
      }
  
      if (status) {
        
        const products = await productDao.getAll({ status }, options);
        return res.status(200).json({ status: "success", products });
      }
      if (stock) {
        const products = await productDao.getAll({ stock }, options);
        return res.status(200).json({ status: "success", products });}

  
      const products = await productDao.getAll({}, options);
      res.status(200).json({ status: "success", products });


  } catch(error){
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
  });
  
//Se verifican las condiciones de los productos en check contions middlewares
router.get("/:pid",check_conditions,  async (req,res) => {
   
     const {pid}  = req.params;
    
      const productsid = await productDao.getById(id)
      //res.status(200).json({ status: "success", payload: productsid});
  })

  router.delete("/:pid", async (req, res) => {
    try {
      const { pid } = req.params;
      
      const product_id = await productDao.getById(pid);
      if (!product_id) return res.status(404).json({ status: "Error", msg: "Producto no encontrado" });
      else{
      if (product_id.status == false){
        return res.status(500).json({ status: "Error", msg: `Producto  ${pid} ya tiene status = FALSE` })}; } 
      
      
      const productsid = await productDao.deleteOne(pid);
      
      res.status(200).json({ status: "success", msg: `El producto con el id ${pid} fue eliminado` });
    } catch (error) {
      console.log(error);
      res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
    }
  });

  

  
router.post("/", check_conditions, async(req, res) => {
    
     try{
      const body = req.body;
      
      const product = await productDao.create(body)
      res.status(200).json({ status: "success", msg: `El producto ${body.title} fue agregado` });
    }
   
      
    
 
   catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});
    
     

router.put("/:pid",  async (req, res) => {
  try{  
    const { pid } = req.params; 
    const dataUser = req.body; 
    
    const product = await productDao.update(pid, dataUser);
    

    res.status(200).json({ status: "success", product });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "Error", msg: "Error interno del servidor" });
  }
});
    

export default router;  //para poder importarlo en app.js
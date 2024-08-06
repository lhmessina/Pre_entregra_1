
import { Router } from "express";
//import productManager from "../dao/filesystem/productManager.js";
import productDao from "../dao/MongoDB/product.dao.js";
const router = Router();





// router.get("/", async(req, res) => {

//       const products = await productDao.getAll()
//       console.log('guajaaaa')
//       res.render("home",{products})}) 


     


export default router;

import { Router } from "express";
import productManager from "../dao/filesystem/productManager.js";
import { io } from "../app.js";

const router = Router();



router.get("/api/realtimeproducts", async (req, res) => {
  try {
    const products = await productManager.getProducts();
    
   
    io.emit("products", products);
    res.render("realTimeProducts");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.post("/api/realtimeproducts", async (req, res) => {
  try {
    
    const { title, price, description } = req.body;
   
    await productManager.addProduct({ title, price, description });
    const products = await productManager.getProducts();
    
    io.emit("products", products);

    res.render("realTimeProducts");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

router.delete("/api/realtimeproducts", async (req, res) => {
  try {
    const { id } = req.body;
    await productManager.deleteProduct(Number(id));
    const products = await productManager.getProducts();
    io.emit("products", products);

    res.render("realTimeProducts");
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;


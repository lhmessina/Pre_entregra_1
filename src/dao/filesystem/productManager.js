import fs from "fs";

let products = [];
let control_del = 0;
const path_producto = "./products.json"



const getProducts = async (limit) => {
    const productsJson = await fs.promises.readFile(path_producto, "utf8");
    const productsParse = JSON.parse(productsJson);
    products = productsParse || [];
    
    if (!limit) return products;
  
    return products.slice(0, limit);
  };

  const getProductById = async (id) => {
    console.log("test")
    products = await getProducts();
    const product = products.find((p) => p.id === id);
  
    return product;
  };



const addProduct = async (product) => {
    await getProducts();  
    
    
    let id = control_del + products.length +1;
     const { title,description,code, price,status,stock,category,thumbnails} = product;
     console.log('id:' ,id)
     console.log('kkkkkk',product)
     const newproduct = {
      id : control_del + products.length +1,
      title,
      description,
      code,
      price,
      status:true,
      stock,
      category,
      thumbnails
      
  
    }

    
  
    console.log('rrrrrr',newproduct.title)
    
    // const productExists = products.find((p) => p.code === code);
    // console.log('productexist',productExists)
    // if (productExists) return  "coderep"
    
    // const checkData = Object.values(newproduct).includes(undefined) && newproduct.thumbnails!= "undefined";
    // console.log('checkdata:',checkData)
    
    // if (checkData)  
    //   {console.log(checkData)
    // return -1
    //   }
        //return -1 }//users.push(user);
    products.push(newproduct);
    console.log('a ver',products)

    await fs.promises.writeFile(path_producto,JSON.stringify(products))
    //res.status(200).json({ status: "success", payload: product });
  };

const deleteProduct = async (id) => {
    await getProducts();
    const product = await getProductById(id);
    if (!product) return false;
    products = products.filter((p) => p.id !== id);
    await fs.promises.writeFile(path_producto, JSON.stringify(products));
    control_del = control_del + 1
    return true;
  };





const updateProduct = async (id, productData) => {
    await getProducts();
  
    const index = products.findIndex((p) => p.id === id);
    products[index] = {
      ...products[index],
      ...productData,
    };
  
    await fs.promises.writeFile(path_producto, JSON.stringify(products));
    const product = await getProductById(id);
    return product;
  };






  export default {

    getProducts,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct,

  }
import { request, response, Router } from "express";
import session from "express-session";
import userDao from "../dao/MongoDB/user.dao.js";

import {createHash, isValidPassword} from "../utils/hashPass.js"
import { createToken } from "../utils/jwt.js";
import {check_Token} from "../middlewares/check_token_middleware.js" 
import passport from "passport";

import { passportCall } from "../middlewares/passport.middleware.js";
const router = Router()



//router.post("/register", passportCall('register'), async (req = request, res = response) => {
  router.post("/register", passport.authenticate('register'), async (req = request, res = response) => {
  try {
    
    ////////////////////////////////////////////
    // Agregado para enviar response al cliente sin usar passportcall 
    if (req.user.first_name == "existe") return res.status(400).json({status : "NOK" , message : "User already exist"})

    ///////////////////////////////////////////
    res.status(201).json({ status: "ok", msg: "User created" , payload: req.user });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", msg: "Internal server error" });
  }
});


///////////////////////Login con passport///////////////////////////////////////////////////////

router.post("/login", passport.authenticate("login"), async (req = request, res= response ) => {
  try {
    
    // done le retorna desde passport un user invalido ( email o pass) para q lo envie al cliente
    if ( req.user == "invalido" ) return res.status(400).json({status : "NOK" , message : "User not exists in DB"})
    
      
      
    
      const token = createToken(req.user);
     // console.log('token creado',token)
    res.cookie("token_by_cookie", token, { httpOnly: true });
    
    return res.status(200).json({ status: "ok", payload: req.user,token });

   } catch (error) {
    console.log(error);
     res.status(500).json({ status: "error", msg: "Internal server error" });
         }
});

//////////////////   Login con JWT //////////////////////////////////////////////////////

// router.post("/login" , async(req,res)  => {
//   try{
//   const {email, password} = req.body
  
//   const user = await userDao.getByemail(email)
  
//   if ( user == null ) return res.status(401).json({status: "Error", msg:"User or password incorrect"})
//   if ( ! isValidPassword(password,user)) return res.status(401).json({status: "Error", msg:"User or password incorrect"})
//     else{
      
//       const token = createToken(user)
      
//       res.cookie('token_by_cookie', token, {httpOnly:true})
//       console.log('el usario tiene el carrito', user.cart._id)
//       res.status(200).json({staus:'ok', message : "Token Created", payload: {user, token} })
//     }  
//   }
//   catch (error){
//     res.status(500).json({status:"Error", msg: "Internal server error"})

//   }
  
// })






//#############################################################################################################
router.get("/current", passport.authenticate('jwt',{session:false}) , async(req,res) => {
  
  res.status(200).json({status: "OK", user:req.user})
}
)



export default router
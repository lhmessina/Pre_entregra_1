import { Router } from "express";
const router = Router()

// req o res desde el pov del servidor res.cookie (server responde seteando la cookie)
// para mostrar : res.send(req.cookies.Nombre_de_la_cookie) ... res.send ( para enviar rta al cliente) req.cookie.nombre_cookie ( lee la cookei)
// setea la cookie en el cliente
router.get("/setcookies" , (req,res) => {

    console.log("guaja2")
    res.cookie("Nombre_de_la_cookie","valor de lo que se guarda en la  cookie", {maxAge:30000}).send("cookie set")
    
  })

router.get("/getcookies", (req,res) => {
    console.log("guaja, get cookie")
    res.send(req.cookies.Nombre_de_la_cookie)  // envia al cliente(borwser) -->"valor de lo que se guarda en la  cookie"
})

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  router.get("/setsignedcookies" , (req,res) => {

    console.log("guaja_signed")
    res.cookie("Nombre_de_la_cookie_signed","valor de la signed  cookie", {maxAge:50000,signed:true}).send("cookie signed set")
    
  })
  router.get("/getsignedcookies", (req,res) => {
    console.log("guaja, get signed cookie")
    res.send(req.signedCookies.Nombre_de_la_cookie_signed)  // envia al cliente(borwser) -->"valor de lo que se guarda en la  cookie"
})

  



router.get("/deletecookies", (req,res) => {
    console.log("guaja, delete cookie")
    res.clearCookie("token_by_cookie").send("cookie deleted")  // envia al cliente(borwser) -->"valor de lo que se guarda en la  cookie"
})

router.post("/setData", (req,res) => {
    const {user, email} =req.body

    console.log("datos plano usuario", user,email)
    
    res.cookie("Nombre_que_le_doy_a_la_cookie",{user, email},{maxAge:300000, signed:true}).send("user set cookie")
    
})

router.get("/getData" , (req,res) => {
   res.send(req.signedCookies.Nombre_que_le_doy_a_la_cookie) 
})
export default router;
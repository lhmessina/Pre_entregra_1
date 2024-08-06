import { request, response } from "express"
import { verifyToken } from "../utils/jwt.js";
export const check_Token = async (req = request, res= response, next) => {
    

    try{
        const token = req.cookies.token_by_cookie;
        
        console.log('middleware',token)
        if (!token) return res.status(401).json({status:"error", msg : "Token not provided"}) 
        
        const test_token = verifyToken(token)
        console.log('test_token',test_token)
        if (!test_token) return res.status(401).json({status:"error", msg : "Invalid Token"}) 
        
        req.user = verifyToken
        next()
    }
    catch (error){

                
    
                 }
}
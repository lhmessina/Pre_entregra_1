import { request, response } from "express"


export const cookieExtractor = (req = request,res =response) => {
    let token = null;
   
    if (req && req.cookies) {
        const token = req.cookies.token_by_cookie
        
     return token
      
    }
  
    return token;
  };
  
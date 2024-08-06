import bcrypt, { genSaltSync } from 'bcrypt'

export const createHash = function (password) {

   const has_pass=  bcrypt.hashSync(password,bcrypt.genSaltSync(10));
   return has_pass;
}



export const isValidPassword = (password,user) => {return bcrypt.compareSync(password,user.password)
    
}
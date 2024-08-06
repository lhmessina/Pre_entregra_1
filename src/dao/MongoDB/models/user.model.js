import mongoose from "mongoose";

const userCollection = "user"; // Nombre de mi coleccion

// Each schema maps to a MongoDB collection and defines the shape of the documents within that collection.
// Instancio en userSchema la clase Schema y luego la convierto en modelo  --> mongoose.model(modelName, schema)<--  para poder trabajarla 

const userSchema = new mongoose.Schema({
  first_name: {
                type: String,
                required :true
              },
  last_name:{
                type: String,
                required :true
              },            
  password:   {
                type: String,
                required :true
              },
  email:      {
                type: String,
                required :true,
                unique:true
              },  
  age:        {
                type: Number,
                required :true
              }, 
              
  cart:        {
                type: mongoose.Schema.Types.ObjectId, ref: "cart",
                
              },  
  role:        {
                type: String,
                defaul :false
              },  
  

});

userSchema.pre("findOne", function () {
  this.populate("cart");
});

export const userModel = mongoose.model(userCollection, userSchema);

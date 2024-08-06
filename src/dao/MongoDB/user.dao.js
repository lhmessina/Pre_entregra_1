import { userModel } from "./models/user.model.js";

// const getAll = async () => {
//     const users = await userModel.find({ status: true });
//     return users;
//   };
const getAll = async (query, option) => {
    const users = await userModel.paginate(query, option)
        return users;
                                        };
  
const getById = async (id) => {
    const user = await userModel.findById(id);
    return user;
                                };
const getByemail = async (email) => {
            const user = await userModel.findOne({email:email});
            //console.log('kkkk',user)
            return user;
                                                                };
  
  const create = async (data) => {
    const user = await userModel.create(data);
    return user
                                 };
  
  const update = async (id, data) => {
    const userUpdate = await userModel.findByIdAndUpdate(id, data, { new: true });
    return userUpdate;
  };
  
  const deleteOne = async (id) => {
    const user = await userModel.findByIdAndUpdate(id, { status: false }, { new: true });
    return user;
  };
  
  // exporto default para importar el user.dao y usar sus metodos en el  router con los req res de
  // los endpoint definidos en user.router
  export default {
    getAll,
    getById,
    getByemail,
    create,
    update,
    deleteOne
  }
  
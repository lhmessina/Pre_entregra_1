import dotenv from "dotenv";

dotenv.config()

export default {

    MONGO_URL :  process.env.MONGO_URL,
    MONGO_A_URL : process.env.MONGO_A_URL,
    PORT : process.env.PORT,
    SECRET_CODE : process.env.SECRET_CODE,
    JWT_SECRET_CODE : process.env.JWT_SECRET_CODE

}
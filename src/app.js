import express from "express";
import handlebars from "express-handlebars";
import _dirname from "./dirname.js";
import { Server } from "socket.io";

import envs  from "./config/env.conf.js" // envs alias del archivo env.config.js desde donde se exportan las variable

//############Nuevo para cookies #############################################################################
import cookieParser from "cookie-parser";   // nuevo agregado cookie-parser
import cookieroute from "./router/cookie.router.js"
//################################################################################################

///////////////////////////////////////////////////////////////////////////////////////////////////////

//################### Agregado para seesion ///////////////////////////////////////////////////////
import session from "express-session";
import sessionroute from "./router/session.router.js";

//#################################################################################################
//################### Agregado para JWT ###############################################



import producroute from "./router/products.router.js"
import cartroute from  "./router/carts.router.js"





import viewsRoutes from "./router/prod_views.routes.js"  // viewsRoutes : nombre generico al export default a prod_views.router
// prod_views  tiene el router.get que toma el producto desde productManager y lo renderiza segun productos.handlebars
import RealTimeviewsRoutes from "./router/realtime_p_views.routes.js"

import { connectMongoDB } from "./config/mongoDB.db.js";
import router from "./router/products.router.js";
//import passport, { initialize } from "passport";
const app = express();

connectMongoDB();
app.use(express.urlencoded({ extended: true }));
app.use(express.json()); 
app.use(cookieParser())
//############################################################################################
app.use(session({
  secret:envs.JWT_SECRET_CODE,
  resave:true,
  saveUninitialized:true

}))
app.use("/api/session", sessionroute)
// ################## Agregado para passport ####################################################//
import passport from "passport";
import { initializePassport } from "./config/passport.config.js";
initializePassport();
app.use(passport.initialize())
app.use(passport.session())

// app.use(initializePassport())

//################### Agregado para cookies ///////////////////////////////////////////////////////
//app.use(cookieParser("V3r43eds")); // se le puede agregar secret app.use(cookieParser("jkgmsn"))
//app.use(cookieParser())
//app.use("/api", cookieroute)


//################### Agregado para seesion ///////////////////////////////////////////////////////
// //app.use(session()
// app.use(session({
//   secret:envs.SECRET_CODE,
//   resave:true,
//   saveUninitialized:true

// }))
// app.use("/api/session", sessionroute)
//################################################################################################
app.engine("handlebars", handlebars.engine());
app.set("views", _dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static("public"));

app.use("/api/products",producroute)


app.use("/", RealTimeviewsRoutes)  //import RealTimeviewsRoutes from "./router/realtime_p_views.routes.js"

app.use("/api/carts",cartroute)


const httpServer = app.listen(envs.PORT, () => {
  console.log (envs.PORT)
  console.log(`Server listening on ${envs.PORT} port`);})
// Configuramos socket
export const io = new Server(httpServer);

io.on("connection", (socket) => {
  console.log("Nuevo usuario Conectado");
});

io.on("products", (data) => {
  console.log(data)
})

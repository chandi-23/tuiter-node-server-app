import express from "express"
import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/user-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import cors from "cors"
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import mongoose from "mongoose";

const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter'

mongoose.connect(CONNECTION_STRING);

const app = express()

app.use(
    session({
      secret: "any string",
      resave: false,
      saveUninitialized: true,
    })
   );
   
app.use(
    cors({
      credentials: true,
      origin: "https://voluble-eclair-87f921.netlify.app",
      methods: ["GET", "POST","PUT","DELETE"]
    })
   );
   app.use(function (req, res, next) {
    res.header(
        "Access-Control-Allow-Origin",
        "https://voluble-eclair-87f921.netlify.app"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, POST, DELETE, PATCH, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});



app.use(express.json())
AuthController(app)
TuitsController(app);
HelloController(app)
UserController(app)
app.listen(process.env.PORT || 4000);
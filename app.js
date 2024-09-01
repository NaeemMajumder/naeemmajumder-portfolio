// dotenv
if(process.env.NODE_ENV != "production"){
    require("dotenv").config();
}

// Express
const express = require("express");
const { connect } = require("http2");
const app = express();

// ejs
const path = require("path")
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));

// ejs-mate
const ejsMate = require("ejs-mate");
app.engine("ejs",ejsMate);

// Public 
app.use(express.static("public"));
app.use(express.static(path.join(__dirname,"/public")));

// Handling Post Requests
app.use(express.urlencoded({extended:true}));

// Cookie-parser
const cookieParser = require("cookie-parser");
app.use(cookieParser(process.env.SECRET));

// Express Session
const session = require("express-session");

// Mongo Store
const MongoStore = require("connect-mongo");

const store = MongoStore.create({
    mongoUrl: process.env.ATLASDB_URL,
    crypto:{
        secret: process.env.SECRET
    },
    touchAfter: 24 * 3600
});
store.on("error",(error)=>{
    console.log("ERROR in MONGO SESSION STORE", error);
});

// Express Session
const sessionOptions = {
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 10 * 24 * 60 * 60 * 1000,
        maxAge: 10 * 24 * 60 * 60 * 1000,
        httpOnly: true
    }
};
app.use(session(sessionOptions));





// Connect Flash
const flash = require("connect-flash");
app.use(flash());

// Passport | Passport-local | Passport-local-mongoose
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

// Admin Schema
const Admin = require("./models/admin.js");

// method-override
const methodOverride = require("method-override");
app.use(methodOverride("_method"));

// Mongoose
const mongoose = require("mongoose");
main().then((result)=>{
    console.log("Mongodb connected");
}).catch((error)=>{
    console.log(error);
});
async function main() {
    await mongoose.connect(process.env.ATLASDB_URL);
}

// ExpressError Class
const ExpressError = require("./utlis/ExpressError.js");

// connect flash local variable
app.use((request,response,next)=>{
    response.locals.deleteFlash = request.flash("delete");
    response.locals.addFlash = request.flash("add");
    response.locals.wrongFlash = request.flash("error");
    next();
})

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

passport.use(new passportLocal(Admin.authenticate()));
passport.serializeUser(Admin.serializeUser());
passport.deserializeUser(Admin.deserializeUser());

// Express-Router Routes
const adminRouter = require("./routers/admin.js");
const rootRouter = require("./routers/root.js");

// Admin All routes
app.use("/admin",adminRouter);

// Root All routes
app.use("/",rootRouter);

// Page for all other routes
app.all("*",(request,response,next)=>{
    next(new ExpressError(404, "Page not found"));
});

// Error Middleware
app.use((error,request,response,next)=>{
    let {statusCode=500, message="something went wrong!"} = error;
    response.status(statusCode).render("./error/errorpath.ejs",{statusCode,message});
});

app.listen(3000,()=>{
    console.log("port 3000 is listening");
})
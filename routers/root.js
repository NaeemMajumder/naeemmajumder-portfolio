// Express
const express = require("express");

// Express-Router
const router = express.Router();

// Multer
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// ExpressError Class
const ExpressError = require("../utlis/ExpressError.js");

// WrapAsync Function
const wrapAsync = require("../utlis/wrapAsync.js");

// Joi Schema Validation
const {contactSchema, reviewSchema} = require("../schema.js");

// Root Controller
const RootController = require("../controller/root.js");

// Validation Method
const validateContact = (request,response,next)=>{
    let {error} = contactSchema.validate(request.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}
const validateReview = (request,response,next)=>{
    let {error} = reviewSchema.validate(request.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}


// Home Route is Root Route
router.get("/",wrapAsync(RootController.rootHomeGet));
router.post("/",validateContact,wrapAsync(RootController.rootHomePost));

// About Me Route
router.get("/about",wrapAsync(RootController.rootAboutGet));

// Projects Route
router.get("/projects",wrapAsync(RootController.rootProjectsGet));

// Review Route
router.get("/review",wrapAsync(RootController.rootReviewGet));
router.post("/review",upload.single("image"),validateReview,wrapAsync(RootController.rootReviewPost));

// Blog Route
router.get("/blog",wrapAsync(RootController.rootBlogGet));


module.exports = router;
// Express
const express = require("express");

// Express-Router
const router = express.Router();

// Passport
const passport = require("passport");

// Multer
const multer = require("multer");
const {storage} = require("../cloudConfig.js");
const upload = multer({storage});

// ExpressError Class
const ExpressError = require("../utlis/ExpressError.js");

// WrapAsync Function
const wrapAsync = require("../utlis/wrapAsync.js");

// Joi Schema Validation
const {projectSchema} = require("../schema.js");

// isLoggedIn Middleware
const {isLoggedIn} = require("../middleware.js");

// Admin Controller
const AdminController = require("../controller/admin.js");

// Validation Method
const validateProject = (request,response,next)=>{
    let {error} = projectSchema.validate(request.body);
    if(error){
        let errMsg = error.details.map((el)=>el.message).join(",");
        throw new ExpressError(400, errMsg);
    }else{
        next();
    }
}


// Admin Login
router.get("/",wrapAsync(AdminController.adminLoginGet));
router.post("/",passport.authenticate("local",{failureRedirect:"/admin",failureFlash:true}),wrapAsync(AdminController.adminLoginPost));

// Logout Admin
router.get("/logout",AdminController.adminLogoutGet);

// Admin Contact
router.get("/contact",isLoggedIn, wrapAsync(AdminController.adminContactGet));
router.delete("/contact/:id",wrapAsync(AdminController.adminContactDelete));

// Admin review
router.get("/review",isLoggedIn, wrapAsync(AdminController.adminReviewGet));
router.delete("/review/:id",wrapAsync(AdminController.adminReviewDelete));

// Admin Blog
router.get("/blog",isLoggedIn, wrapAsync(AdminController.adminBlogGet));

// Admin Project
router.get("/projects",isLoggedIn, wrapAsync(AdminController.adminProjectGet));
router.post("/projects", upload.single("image"), validateProject, wrapAsync(AdminController.adminProjectPost));
router.delete("/projects/:id",wrapAsync(AdminController.adminProjectDelete));

module.exports = router;
// Review Schema
const Contact = require("../models/contact.js");
const Review = require("../models/review.js");
const Project = require("../models/projects.js");

// Admin Login
module.exports.adminLoginGet = async(request,response,next)=>{
    response.render("./admin/admin.ejs");
}
module.exports.adminLoginPost = async(request,response,next)=>{
    request.flash("add","You are logged in");
    response.redirect("/admin/contact");
}


// Logout Admin
module.exports.adminLogoutGet = (request, response, next)=>{
    request.logout((error)=>{
        if(error){
            next(error);
        }
        request.flash("add","You are successfully logged out!!");
        response.redirect("/admin");
    });
}


// Admin Contact
module.exports.adminContactGet = async(request,response,next)=>{
    let contacts = await Contact.find();
    response.render("./admin/a_contact.ejs",{contacts});
}
module.exports.adminContactDelete = async(request,response,next)=>{
    let {id} = request.params;
    let delRev = await Contact.findByIdAndDelete(id);
    request.flash("delete","contact deleted");
    response.redirect("/admin/contact");
}


// Admin review
module.exports.adminReviewGet = async(request,response,next)=>{
    let reviews = await Review.find();
    response.render("./admin/a_review.ejs",{reviews});
}
module.exports.adminReviewDelete = async(request,response,next)=>{
    let {id} = request.params;
    let delRev = await Review.findByIdAndDelete(id);
    request.flash("delete","review deleted");
    response.redirect("/admin/review");
}


// Admin Blog
module.exports.adminBlogGet = async(request,response,next)=>{
    response.render("./admin/a_blog.ejs")
}


// Admin Project
module.exports.adminProjectGet = async(request,response,next)=>{
    let projects = await Project.find();
    response.render("./admin/a_projects.ejs",{projects});
}
module.exports.adminProjectPost = async(request,response,next)=>{
    console.log(request.body);
    let {title, tools, link, description} = request.body;
    let image;

    if(request.file){
        image = request.file.path;
    }

    let newProject = Project({
        title,
        image,
        tools,
        link,
        description
    });
    let saveProject = await newProject.save();
    let projects = await Project.find();
    request.flash("add","add new project");
    return response.redirect("/admin/projects");
}
module.exports.adminProjectDelete = async(request,response,next)=>{
    let {id} = request.params;
    let delProject = await Project.findByIdAndDelete(id);
    request.flash("delete","Project Deleted");
    response.redirect("/admin/projects");
}
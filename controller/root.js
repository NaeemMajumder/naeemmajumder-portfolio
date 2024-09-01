// Review Schema
const Contact = require("../models/contact.js");
const Review = require("../models/review.js");
const Project = require("../models/projects.js");
const { contactSchema } = require("../schema.js");


// Home Route
module.exports.rootHomeGet = (request,response,next)=>{
    response.render("./main/home.ejs");
}
module.exports.rootHomePost = async(request,response,next)=>{
    let{name, number, email, subject, message} = request.body;

    let newContact = Contact({
        name,
        number,
        email,
        subject,
        message
    });
    let saveContact = await newContact.save();
    request.flash("add","Your information is successfully sent");
    response.redirect("/");
}


// About Route
module.exports.rootAboutGet = (request,response,next)=>{
    response.render("./main/about.ejs");
}


// Projects Route
module.exports.rootProjectsGet = async(request,response,next)=>{
    let projects = await Project.find();
    response.render("./main/projects.ejs",{projects});
}


// Review Route
module.exports.rootReviewGet = async(request,response,next)=>{
    let reviews = await Review.find();
    response.render("./main/review.ejs",{reviews});
}
module.exports.rootReviewPost = async (request, response, next) => {
        let { name, profession, rating, post, comment } = request.body;
        let createdAt = new Date(Date.now());
        let image;

        if (request.file) {
            image = request.file.path;
        }

        // Time setup....
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[createdAt.getMonth()];
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const day = dayNames[createdAt.getDay()];

        // Full time Array.
        let time = [month, createdAt.getDate(), createdAt.getFullYear(), day, createdAt.getHours(), createdAt.getMinutes().toString().padStart(2, '0')];

        let newReview = new Review({
            name,
            image,
            profession,
            post,
            rating,
            comment,
            createdAt: time
        });
        await newReview.save();
        request.flash("add", "Your review is successfully saved. Thank you for your review!");
        response.redirect("/review");
};



// Blog Route
module.exports.rootBlogGet = async(request,response,next)=>{
    response.render("./main/blog.ejs");
}
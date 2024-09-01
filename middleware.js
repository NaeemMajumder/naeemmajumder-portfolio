module.exports.isLoggedIn = (request,response,next)=>{
    if(!request.isAuthenticated()){
        request.flash("error","you are not logged in!!");
        response.redirect("/admin");
    }else{
        next();
    }
}
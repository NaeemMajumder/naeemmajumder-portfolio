let wrapAsync = (func) =>{
    return function(request,response,next){
        func(request,response,next).catch((error)=>next(error));
    }
}

module.exports = wrapAsync;
const Joi = require("joi");


module.exports.contactSchema = Joi.object({
    // contact:Joi.object({
        name: Joi.string().required(),
        number: Joi.number().required(),
        email: Joi.string().required(),
        subject: Joi.string().required(),
        message: Joi.string().required()
    // }).required()
}).required();


module.exports.reviewSchema = Joi.object({
    // review:Joi.object({
        name: Joi.string().required(),
        image: Joi.string().allow("",null),
        profession: Joi.string().required(),
        post: Joi.string().required(),
        rating: Joi.number().required().min(1).max(5),
        comment: Joi.string().required()
    // }).required()
}).required();


module.exports.projectSchema = Joi.object({
    tools: Joi.string().required(),
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().allow("",null),
    link: Joi.string().required()
}).required();
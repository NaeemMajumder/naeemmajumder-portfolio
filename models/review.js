// Review Form
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"https://img.freepik.com/premium-vector/male-avatar-icon-unknown-anonymous-person-default-avatar-profile-icon-social-media-user-business-man-man-profile-silhouette-isolated-white-background-vector-illustration_735449-122.jpg",
        set: (v) => v === "" ? "https://img.freepik.com/premium-vector/male-avatar-icon-unknown-anonymous-person-default-avatar-profile-icon-social-media-user-business-man-man-profile-silhouette-isolated-white-background-vector-illustration_735449-122.jpg" : v
    },
    profession:{
        type:String,
        required:true,
    },
    post:{
        type:String,
        required:true
    },
    rating:{
        type:Number,
        min:1,
        max:5,
        default:3
    },
    comment:{
        type:String,
        required:true
    },
    createdAt:{
        type:Array
    }
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
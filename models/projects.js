// Contact Form
const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema({
    tools:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:"https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGV2ZWxvcGVyJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D",
        set: (v) => v === "" ? "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZGV2ZWxvcGVyJTIwaW1hZ2V8ZW58MHx8MHx8fDA%3D" : v
    },
    link:{
        type:String,
        required:true
    }
});


const Project = mongoose.model("Project",projectsSchema);

module.exports = Project;
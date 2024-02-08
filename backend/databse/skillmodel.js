const { default: mongoose } = require("mongoose");

const skillSchema = new mongoose.Schema({
    skill:{
        type:String,
        required:true,
    }
})

module.exports = mongoose.model("Skill", skillSchema);


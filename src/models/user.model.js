import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     name: {
        type: String,
        required: true, // Name is required - / Le nom est requis
        trim: true, // Empty fields at the beginning of the string - Champs vides au début de la chaîne
        unique: true,
    },
    password : {
        type: String,
        required: true,
        minlength: 6, // At least 6 character - Au moins 6 caractère
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("User", userSchema)
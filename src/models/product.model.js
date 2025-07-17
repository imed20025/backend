import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: false 
    },
    price: {
        type: Number, 
        required: true,
        min: 0 
    },
    image: {
        type: String,
        default:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlndpwDalSNF8TzBG6T7kGv73l0IOReNJpKw&s"
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", 
        required: true
    },
    stock: {
        type: Number, 
        required: true,
        min: 0 
    }
});

export default mongoose.model("Product", productSchema);

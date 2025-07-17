import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    }
});

categorySchema.index({ name: 1 }, { unique: true });

export default mongoose.model("Category", categorySchema);

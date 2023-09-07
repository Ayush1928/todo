import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
    id: {type: String, required: true },
    title: {type: String, required: true },
    createdAt: {type: Date, required: true },
    isCompleted: {type: Boolean, required: true }
})

export default mongoose.model("Todo",TodoSchema)
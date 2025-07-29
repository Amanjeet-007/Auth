import { Schema, model } from "mongoose";
import isEmail from "validator/lib/isEmail.js";


// You can change your user schema as you needed 👍
const userSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    email: {
        type: String,
        required: [true, "Please fill Email, it's required."],
        trim: true,
        lowercase: true,
        unique: true,
        validate: {
            validator: isEmail,
            message: "Please provide a valid email address."
        }
    },
    password: {
        type: String,
        required: [true, "Password is required."]
    }
}, { timestamps: true })

// export const User = mongoose.model("User",userSchema); if we only import mongoose not {model} from import
export const User = model("User", userSchema);
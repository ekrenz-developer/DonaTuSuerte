import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  description: { type: String, required: true },
  role: { type: Number, required: true }
}, { 
  versionKey: false
});

const Role = mongoose.model('Role', schema);

export default Role;
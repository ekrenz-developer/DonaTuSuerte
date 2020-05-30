import mongoose, { Schema } from "mongoose";

const schema = new Schema({
  description: { type: String, required: true },
  status: { type: Number, required: true, unique: true }
}, { versionKey: false });

const Status = mongoose.model('Status', schema);

export default Status;
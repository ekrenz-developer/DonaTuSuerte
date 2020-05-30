import mongoose, { Schema } from "mongoose";

import Status from './Status';
import Store from './Store';

const schema = new Schema({
  cuit: { type: String, required: true },
  name: { type: String, required: true },
  status: { type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: true },
  stores: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }] }
}, { 
  versionKey: false
});

const Organization = mongoose.model('Organization', schema);

export default Organization;
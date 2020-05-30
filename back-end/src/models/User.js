import mongoose, { Schema } from "mongoose";

import Draw from './Draw';
import Role from './Role';
import Store from './Store';
import Organization from './Organization';

const schema = new Schema({
  email: String,
  password: String,
  photo: { type: String, default: '' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  dateOfBirth: Date,
  country: String,
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    lat: String,
    lon: String
  },
  phone: { type: String, default: '' },
  conditions: { type: Boolean, required: true },
  score: { type: Number, default: 0 },
  role: { type: mongoose.Schema.Types.ObjectId, ref: 'Role', required: true },
  verified: { type: Boolean, default: false },
  draws: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Draw' }], default: undefined },
  stores: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Store' }], default: undefined },
  organizations: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Organization' }], default: undefined }
}, { versionKey: false });

const User = mongoose.model('User', schema);

export default User;
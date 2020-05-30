import mongoose, { Schema } from 'mongoose';

import Draw from './Draw';

const schema = new Schema({
  name: { type: String, required: true },
  address: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
    lat: String,
    lon: String
  },
  draws: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Draw' }] }
}, { 
  versionKey: false
});

const Store = mongoose.model('Store', schema);

export default Store;
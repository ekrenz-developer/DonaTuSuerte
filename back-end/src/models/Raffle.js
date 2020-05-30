import mongoose, { Schema } from "mongoose";

import User from './User';

const schema = new Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { 
  versionKey: false
});

const Raffle = mongoose.model('Raffle', schema);

export default Raffle;
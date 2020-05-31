import mongoose, { Schema } from "mongoose";

import Status from './Status';
import User from './User';
import Store from './Store';
import Raffle from './Raffle';

const schema = new Schema({
  description: { type: String, required: true },
  prize: { type: Number, required: true },
  photo: { type: String, default: '' },
  startDate: Date,
  endDate: Date,
  drawDate: Date,
  score: { type: Number, required: true },
  status: { type: mongoose.Schema.Types.ObjectId, ref: 'Status', required: true },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Raffle' },
  store: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true },
  scoreRaffle: { type: Number, required: true },
  reqRaffles: { type: Number, required: true },
  raffles: { type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Raffle' }] }
}, { 
  versionKey: false,
  timestamps: true
});

const Draw = mongoose.model('Draw', schema);

export default Draw;
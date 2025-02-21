import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
  text: String,
  sender: String,
  timestamp: { type: Date, default: Date.now }
});

export default mongoose.model('Message', messageSchema);
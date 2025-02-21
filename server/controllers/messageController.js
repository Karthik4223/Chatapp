import Message from '../models/Message.js';

// Get all messages
export const getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new message
export const createMessage = async (req, res) => {
  const { text, sender } = req.body;
  const newMessage = new Message({ text, sender });

  try {
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
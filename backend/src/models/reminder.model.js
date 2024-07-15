// models/reminder.model.js
import mongoose from 'mongoose';

const reminderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  desciption:{
    type:String,
  },
  reminderTime: {
    type: Date,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const Reminder = mongoose.model('Reminder', reminderSchema);

export default Reminder;

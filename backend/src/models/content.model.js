import mongoose from "mongoose";

const contentSchema = new mongoose.Schema({

  user_id:{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', required: true
},

  title:{
    type: String, required: true
},

  content: {
    type: String, required: true
},

  tags: {
    type: String,
},

  created_at: {
    type: Date, default: Date.now
},

});

const Content = mongoose.model('Content', contentSchema);

export default Content

const mongoose = require('mongoose');

const saveSchema = new mongoose.Schema({
  userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  gameDate: { type: Date, required: true, default: Date.now },
  failed: { type: Number, required: true },
  difficulty: {
    type: String,
    required: true,
    enum: ['Easy', 'Normal', 'Hard'],  
  },
  completed: { type: Number, required: true },
  timeTaken: { type: Number, required: true },
});

module.exports = mongoose.model('Save', saveSchema);

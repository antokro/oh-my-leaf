const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  name: {
    firstname: { type: String, trim: true, required: true },
    lastname: { type: String, trim: true, required: true }
  },
  username: { type: String, required: true },
  city: { type: String, trim: true },
  email: { type: String, required: true },
  icon: { type: Number, default: 330 },
  password: { type: String, required: true },
  favourites: { type: [String] },
  listings: { type: [Schema.Types.ObjectId], ref: 'Listing' }
});

module.exports = mongoose.model('User', userSchema);

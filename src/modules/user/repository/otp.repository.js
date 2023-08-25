const db = require(`../../../helpers/database`);
const mongoose = require("mongoose");

const mySchema = new mongoose.Schema({
  code_otp: Number,
  otp_active_period: Date,
  wa_number: String,
  fullname: String,
  user_id: mongoose.Schema.Types.ObjectId
});
// Define model for MongoDB collection
const OTPRepository = mongoose.model('coll_rtpintar_otp', mySchema);
// export model
module.exports = OTPRepository
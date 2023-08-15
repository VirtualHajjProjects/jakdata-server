const db = require(`../../../helpers/database`);
const mongoose = require("mongoose");
const ObjectId = require("mongoose");

const mySchema = new mongoose.Schema({
  username: String,
  display_name: String,
  email: String,
  status_user: Boolean,
  password: String,
  role_id: mongoose.Schema.Types.ObjectId,
  created_date_user: Date
});
// Define model for MongoDB collection
const UserRepository = mongoose.model('jakdata_coll_user', mySchema);
// export model
module.exports = UserRepository
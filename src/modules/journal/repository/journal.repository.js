const db = require(`../../../helpers/database`);
const mongoose = require("mongoose");

const mySchema = new mongoose.Schema({
  title: String,
  files: String,
  created_at: Date,
  created_by: mongoose.Schema.Types.ObjectId,
});
// Define model for MongoDB collection
const JournalRepository = mongoose.model('jakdata_coll_journal', mySchema);
// export model
module.exports = JournalRepository
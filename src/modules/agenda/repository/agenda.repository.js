const db = require(`../../../helpers/database`);
const mongoose = require("mongoose");

const mySchema = new mongoose.Schema({
  title: String,
  files: String,
  created_at: Date,
  created_by: mongoose.Schema.Types.ObjectId,
  tags: Array,
  field_content: String,
  category: String,
});
// Define model for MongoDB collection
const AgendaRepository = mongoose.model('jakdata_coll_agenda', mySchema);
// export model
module.exports = AgendaRepository
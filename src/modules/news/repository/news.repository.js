const db = require(`../../../helpers/database`);
const mongoose = require("mongoose");
const ObjectId = require("mongoose");

const mySchema = new mongoose.Schema({
  title: String,
  categories: String,
  // name_file_image_news: String,
  // url_image_news: String,
  files: String,
  created_at: Date,
  created_by: mongoose.Schema.Types.ObjectId,
  tags: Array,
  field_content: String
});
// Define model for MongoDB collection
const NewsRepository = mongoose.model('jakdata_coll_news', mySchema);
// export model
module.exports = NewsRepository
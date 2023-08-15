const db = require(`../../../helpers/database`);
const mongoose = require("mongoose");
const ObjectId = require("mongoose");

const RoleRepository = new mongoose.Schema({
  role_name: {
    type: String,
    required: true
  }
});

// export model
module.exports = mongoose.model("coll_rtpintar_role", RoleRepository);
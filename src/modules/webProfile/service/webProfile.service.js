const ObjectID = require("mongodb").ObjectId;
const express = require("express");
const BadRequest = require("express");
const { WebProfileRepository } = require("../repository/webProfile.repository");
var querystring = require("querystring");
const axios = require("axios");
const mongoose = require("mongoose");
const moment = require("moment");
mongoose.connect(
  "mongodb+srv://adminjakdata:adminjakdata@jakdatadb.2chyhbr.mongodb.net/jakdata",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);
const db = mongoose.connection;
const jwt = require("jsonwebtoken");

class WebProfileService {
  async getWebProfile() {
    const resultWebProfileData = await WebProfileRepository.find({});

    let response = {
      message: "succes",
      resultWebProfileData,
    };
    return response;
  }
}

module.exports = new WebProfileService();

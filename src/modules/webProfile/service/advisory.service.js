const ObjectID = require("mongodb").ObjectId;
const express = require("express");
const BadRequest = require("express");
const { AdvisoryRepository } = require("../repository/webProfile.repository");
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

class AdvisoryService {
  async detailAdvisory(data) {
    const resultAdvisoryData = await AdvisoryRepository.collection
      .find(
        {
          _id: ObjectID.createFromHexString(data.advisory_id),
        },
        { limit: 1 }
      )
      .toArray();

    let response = {
      message: "succes",
      resultAdvisoryData,
    };
    return response;
  }

  async getAdvisory() {
    const resultAdvisoryData = await AdvisoryRepository.aggregate([
      {
        $lookup: {
          localField: "created_by",
          from: "jakdata_coll_advisory",
          foreignField: "_id",
          as: "advisory",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$advisory", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $project: {
          advisory: 0,
          __v: 0,
        },
      },
    ]);

    let response = {
      message: "succes",
      resultAdvisoryData,
    };
    return response;
  }
}

module.exports = new AdvisoryService();

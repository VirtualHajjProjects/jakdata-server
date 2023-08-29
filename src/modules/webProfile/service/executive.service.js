const ObjectID = require("mongodb").ObjectId;
const express = require("express");
const BadRequest = require("express");
const { ExecutiveRepository } = require("../repository/webProfile.repository");
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

class ExecutiveService {
  async detailExecutive(data) {
    const resultExecutiveData = await ExecutiveRepository.collection
      .find(
        {
          _id: ObjectID.createFromHexString(data.Executive_id),
        },
        { limit: 1 }
      )
      .toArray();

    let response = {
      message: "succes",
      resultExecutiveData,
    };
    return response;
  }

  async getExecutive() {
    const resultExecutiveData = await ExecutiveRepository.aggregate([
      {
        $lookup: {
          localField: "created_by",
          from: "jakdata_coll_executive",
          foreignField: "_id",
          as: "executive",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$executive", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $project: {
          executive: 0,
          __v: 0,
        },
      },
    ]);

    let response = {
      message: "succes",
      resultExecutiveData,
    };
    return response;
  }
}

module.exports = new ExecutiveService();

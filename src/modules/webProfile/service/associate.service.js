const ObjectID = require("mongodb").ObjectId;
const express = require("express");
const BadRequest = require("express");
const { AssociateRepository } = require("../repository/webProfile.repository");
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

class AssociateService {
  async detailAssociate(data) {
    const resultAssociateData = await AssociateRepository.collection
      .find(
        {
          _id: ObjectID.createFromHexString(data.associate_id),
        },
        { limit: 1 }
      )
      .toArray();

    let response = {
      message: "succes",
      resultAssociateData,
    };
    return response;
  }

  async getAssociate() {
    const resultAssociateData = await AssociateRepository.aggregate([
      {
        $lookup: {
          localField: "created_by",
          from: "jakdata_coll_associate",
          foreignField: "_id",
          as: "associate",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$associate", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $project: {
          associate: 0,
          __v: 0,
        },
      },
    ]);

    let response = {
      message: "succes",
      resultAssociateData,
    };
    return response;
  }
}

module.exports = new AssociateService();

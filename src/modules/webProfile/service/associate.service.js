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
      message: "Success",
      resultAssociateData,
    };
    return response;
  }

  async getAssociate(data) {
    const current_page = data.query.page || 0;
    const limit = data.query.limit || 5;
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
          __v: 0,
        },
      },
      {
        $facet: {
          data: [
            { $sort: { created_at: -1 } },
            { $skip: (+parseInt(current_page) - 1) * parseInt(limit) },
            { $limit: parseInt(limit) },
          ],
          total: [
            {
              $count: "count",
            },
          ],
        },
      },
    ]);

    let response = {
      message: "Success",
      resultAssociateData,
    };
    return response;
  }
}

module.exports = new AssociateService();

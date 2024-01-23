const ObjectID = require("mongodb").ObjectId;
const express = require("express");
const BadRequest = require("express");
const { ServicesRepository } = require("../repository/webProfile.repository");
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

class ServicesService {
  async detailServices(data) {
    const resultServicesData = await ServicesRepository.collection
      .find(
        {
          _id: ObjectID.createFromHexString(data.services_id),
        },
        { limit: 1 }
      )
      .toArray();

    let response = {
      message: "Success",
      resultServicesData,
    };
    return response;
  }

  async getServices(data) {
    const current_page = data.query.page || 0;
    const limit = data.query.limit || 5;
    const resultServicesData = await ServicesRepository.aggregate([
      {
        $lookup: {
          localField: "created_by",
          from: "jakdata_coll_services",
          foreignField: "_id",
          as: "services",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$services", 0] }, "$$ROOT"],
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
      resultServicesData,
    };
    return response;
  }
}

module.exports = new ServicesService();

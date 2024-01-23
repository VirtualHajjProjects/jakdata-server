const ObjectID = require("mongodb").ObjectId;
const express = require("express");
const BadRequest = require("express");
const { ClientsRepository } = require("../repository/webProfile.repository");
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

class ClientsService {
  async detailClients(data) {
    const resultClientsData = await ClientsRepository.collection
      .find(
        {
          _id: ObjectID.createFromHexString(data.clients_id),
        },
        { limit: 1 }
      )
      .toArray();

    let response = {
      message: "Success",
      resultClientsData,
    };
    return response;
  }

  async getClients(data) {
    const current_page = data.query.page || 0;
    const limit = data.query.limit || 5;
    const resultClientsData = await ClientsRepository.aggregate([
      {
        $lookup: {
          localField: "created_by",
          from: "jakdata_coll_clients",
          foreignField: "_id",
          as: "clients",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$clients", 0] }, "$$ROOT"],
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
      resultClientsData,
    };
    return response;
  }
}

module.exports = new ClientsService();

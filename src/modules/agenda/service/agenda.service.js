const ObjectID = require("mongodb").ObjectId;
const express = require("express");
const BadRequest = require("express");
// const UserRepository = require("../repository/user.repository");
const AgendaRepository = require("../repository/agenda.repository");
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

class AgendaService {
  async detailAgenda(data) {
    const resultAgendaData = await AgendaRepository.collection
      .find(
        {
          _id: ObjectID.createFromHexString(data.agenda_id),
        },
        { limit: 1 }
      )
      .toArray();

    let response = {
      message: "Success",
      resultAgendaData,
    };
    return response;
  }

  async getAllAgenda(data) {
    const current_page = data.query.page || 0;
    const limit = data.query.limit || 5;
    const resultAgendaData = await AgendaRepository.aggregate([
      {
        $lookup: {
          localField: "created_by",
          from: "jakdata_coll_agenda",
          foreignField: "_id",
          as: "agenda",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$agenda", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $project: {
          field_content: 0,
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
      resultAgendaData,
    };
    return response;
  }
}

module.exports = new AgendaService();

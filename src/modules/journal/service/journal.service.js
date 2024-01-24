const ObjectID = require("mongodb").ObjectId;
const express = require("express");
const BadRequest = require("express");
// const UserRepository = require("../repository/user.repository");
const JournalRepository = require("../repository/journal.repository");
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

class JournalService {
  async detailJournal(data) {
    const resultJournalData = await JournalRepository.collection
      .find(
        {
          _id: ObjectID.createFromHexString(data.journal_id),
        },
        { limit: 1 }
      )
      .toArray();

    let response = {
      message: "Success",
      resultJournalData,
    };
    return response;
  }

  async getAllJournal(data) {
    const current_page = data.query.page || 0;
    const limit = data.query.limit || 5;
    const resultJournalData = await JournalRepository.aggregate([
      {
        $lookup: {
          localField: "created_by",
          from: "jakdata_coll_journal",
          foreignField: "_id",
          as: "journal",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$journal", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $project: {
          files: 0,
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
      resultJournalData,
    };
    return response;
  }
}

module.exports = new JournalService();

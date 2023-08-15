const ObjectID = require("mongodb").ObjectId;
const express = require("express");
const BadRequest = require("express");
// const UserRepository = require("../repository/user.repository");
const ArticleRepository = require("../repository/article.repository");
var querystring = require("querystring");
const axios = require("axios");
const mongoose = require("mongoose");
const moment = require("moment");
mongoose.connect(
  "mongodb+srv://adminjakdata:adminjakdata@jakdatadb.2chyhbr.mongodb.net/jakdata",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
const db = mongoose.connection;
const jwt = require("jsonwebtoken");

class ArticleService {
  async detailArticle(data) {
    //find data article
    const resultArticleData = await ArticleRepository.collection
      .find(
        {
          _id: ObjectID.createFromHexString(data.article_id)
        },
        { limit: 1 }
      )
      .toArray();

    let response = {
      message: "succes",
      resultArticleData
    };
    return response;
  }

  async getAllArticle(data) {
    //find all data article
    // const resultArticleData = await ArticleRepository.collection.find().toArray();

    const resultArticleData = await ArticleRepository.aggregate([
      {
        $lookup: {
          localField: "created_by",
          from: "jakdata_coll_users",
          foreignField: "_id",
          as: "article"
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$article", 0] }, "$$ROOT"]
          }
        }
      },
      {
        $project: {
          article: 0,
          __v: 0
        }
      }
    ]);

    let response = {
      message: "succes",
      resultArticleData
    };
    return response;
  }
}

module.exports = new ArticleService();

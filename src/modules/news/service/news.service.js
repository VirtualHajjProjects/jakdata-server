const ObjectID = require("mongodb").ObjectId;
const express = require("express");
const BadRequest = require("express");
// const UserRepository = require("../repository/user.repository");
// const ArticleRepository = require("../repository/article.repository");
const NewsRepository = require("../repository/news.repository");
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

class NewsService {
  async detailNews(data) {
    //find data news
    const resultNewsData = await NewsRepository.collection
      .find(
        {
          _id: ObjectID.createFromHexString(data.news_id)
        },
        { limit: 1 }
      )
      .toArray();

    let response = {
      message: "succes",
      resultNewsData
    };
    return response;
  }

  async getAllNews(data) {
    //find all data news
    // const resultNewsData = await NewsRepository.collection.find().toArray();
    const resultNewsData = await NewsRepository.aggregate([
      {
        $lookup: {
          localField: "created_by",
          from: "jakdata_coll_users",
          foreignField: "_id",
          as: "news"
        }
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$news", 0] }, "$$ROOT"]
          }
        }
      },
      {
        $project: {
          news: 0,
          __v: 0
        }
      }
    ]);

    let response = {
      message: "succes",
      resultNewsData
    };
    return response;
  }
}

module.exports = new NewsService();

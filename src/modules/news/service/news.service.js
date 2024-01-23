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
    useUnifiedTopology: true,
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
          _id: ObjectID.createFromHexString(data.news_id),
        },
        { limit: 1 }
      )
      .toArray();

    let response = {
      message: "Success",
      resultNewsData,
    };
    return response;
  }

  async getAllNews(data) {
    const current_page = data.query.page || 0;
    const limit = data.query.limit || 5;
    const resultNewsData = await NewsRepository.aggregate([
      {
        $lookup: {
          localField: "created_by",
          from: "jakdata_coll_news",
          foreignField: "_id",
          as: "news",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$news", 0] }, "$$ROOT"],
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
      resultNewsData,
    };
    return response;
  }
}

module.exports = new NewsService();

const ObjectID = require("mongodb").ObjectId;
const express = require("express");
const BadRequest = require("express");
const UserRepository = require("../repository/user.repository");
const RoleRepository = require("../repository/role.repository");
const OtpRepository = require("../repository/otp.repository");
// const HomeRepository = require("../../home/repository/home.repository");
// const RTRepository = require("../../rt/repository/rt.repository");
// const WargaRepository = require("../../rt/repository/warga.repository");
// const PengurusRTRepository = require("../../rt/repository/pengurusRt.repository");
const OTPRepository = require("../repository/otp.repository");
var querystring = require("querystring");
const axios = require("axios");
const mongoose = require("mongoose");
const moment = require("moment");
// mongoose.connect(
//   "mongodb+srv://adminjakdata:adminjakdata@jakdatadb.2chyhbr.mongodb.net/jakdata",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   }
// );

setTimeout(function () {
  mongoose.connect(
    "mongodb+srv://adminjakdata:adminjakdata@jakdatadb.2chyhbr.mongodb.net/jakdata",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
}, 60000);

const db = mongoose.connection;
const jwt = require("jsonwebtoken");

class UserService {
  async detailUser(data) {
    console.log("data", data);
    let email = data.email;
    console.log("email", email);

    //find data user
    const resultUserData = await UserRepository.collection
      .find(
        {
          email: data.email,
        },
        { limit: 1 }
      )
      .toArray();

    let response = {
      message: "succes",
      resultUserData,
    };
    return response;
  }

  async login(data) {
    console.log("data", data);
    let email = data.email;
    console.log("email", email);

    //find data user
    const resultUserData = await UserRepository.aggregate([
      {
        $match: {
          email: data.email,
          password: data.password,
        },
      },
      {
        $lookup: {
          localField: "role_id",
          from: "jakdata_coll_role",
          foreignField: "_id",
          as: "role",
        },
      },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: [{ $arrayElemAt: ["$role", 0] }, "$$ROOT"],
          },
        },
      },
      {
        $project: {
          role: 0,
          __v: 0,
          password: 0,
        },
      },
    ]);
    console.log(resultUserData);

    if (resultUserData.length === 0) {
      return "User Not Found";
    } else {
      let response = {
        message: "succes login",
        resultUserData,
      };
      return response;
    }
  }

  async getAllUser(data) {
    try {
      // Find all data users and convert the cursor to an array
      // const resultUserData = await UserRepository.collection.find().toArray();
      const resultUserData = await UserRepository.aggregate([
        {
          $lookup: {
            localField: "role_id",
            from: "jakdata_coll_role",
            foreignField: "_id",
            as: "role",
          },
        },
        {
          $replaceRoot: {
            newRoot: {
              $mergeObjects: [{ $arrayElemAt: ["$role", 0] }, "$$ROOT"],
            },
          },
        },
        {
          $project: {
            role: 0,
            __v: 0,
            password: 0,
          },
        },
      ]);

      let response = {
        message: "success",
        resultUserData,
      };
      return response;
    } catch (error) {
      console.error("Error in getAllUser:", error);
      throw error;
    }
  }
}

module.exports = new UserService();

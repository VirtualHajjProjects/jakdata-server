const UserController = require("../modules/user/controller/user.controller");
const ArticleController = require("../modules/article/controller/article.controller");
const NewsController = require("../modules/news/controller/news.controller");
const ObjectID = require("mongodb").ObjectId;
const UserRepository = require(`../modules/user/repository/user.repository`);
const NewsRepository = require(`../modules/news/repository/news.repository`);
const ArticleRepository = require(`../modules/article/repository/article.repository`);
const cors = require("cors");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const express = require("express");
const { S3 } = require("aws-sdk");
const S3Bucket = "cyclic-victorious-clam-outerwear-ap-northeast-1";
// const uri = "/.netlify/functions/api/v1";
const uri = "/api/v1";

module.exports = async (app) => {
  app.use(cors());
  app.get("/cors", (req, res) => {
    res.set("Access-Control-Allow-Origin", "*");
  });

  const region = process.env.region;
  // const accessKeyId = atob(process.env.accessKeyId);
  // const secretAccessKey = atob(process.env.secretAccessKey);
  const accessKeyId = process.env.accessKeyId;
  const secretAccessKey = process.env.secretAccessKey;
  const s3 = new S3({
    region,
    accessKeyId,
    secretAccessKey,
  });
  //register super admin
  const upload99 = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1000000000, files: 2 },
  });
  app.post(
    `${uri}/add-superadmin`,
    upload99.array("files", 12),
    async (req, res) => {
      try {
        // Get the files from the request
        const files = req.files;

        //File Array Ke 0
        //Array0
        const s3UploadParamsArray0 = {
          Bucket: S3Bucket,
          Key: files[0].originalname,
          Body: Buffer.from(files[0].buffer),
          ContentType: files[0].mimetype,
        };
        const BucketArray0 = s3UploadParamsArray0.Bucket;
        const KeyArray0 = s3UploadParamsArray0.Key;
        const BodyArray0 = s3UploadParamsArray0.Body;
        const ContentTypeArray0 = s3UploadParamsArray0.ContentType;
        console.log("BucketArray0", BucketArray0);
        console.log("KeyArray0", KeyArray0);
        console.log("BodyArray0", BodyArray0);
        console.log("ContentTypeArray0", ContentTypeArray0);
        const s3UploadResultArray0 = await s3
          .upload(s3UploadParamsArray0)
          .promise();
        const urlArray0 = s3UploadResultArray0.Location;
        console.log("urlArray0", urlArray0);

        console.log("====");

        //JSON
        const username = req.body.username;
        console.log("username", username);
        const display_name = req.body.display_name;
        console.log("display_name", display_name);
        const email = req.body.email;
        console.log("email", email);
        const password = req.body.password;
        console.log("password", password);
        //role id super admin
        const role_id = "64c62b92d6e8dbf721f303de";
        const status_user = "Active";

        console.log("====");

        //SAVE TO DATABASE
        let objectParam = {
          username: username,
          display_name: display_name,
          email: email,
          password: password,
          name_file_image_user: KeyArray0,
          url_image_user: urlArray0,
          created_date_user: new Date(),
          role_id: role_id,
          status_user: status_user,
        };
        console.log("objectParam", objectParam);
        console.log("====");

        const createSuperAdmin = await UserRepository.create(objectParam);
        // return "Succes Create Content";

        // Return success response
        res.json({ message: "success add super admin" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error uploading files" });
      }
    }
  );

  //get detail data user (admin & super admin)
  app.post(`${uri}/detail-user`, UserController.detailUser);

  //create admin
  app.post(
    `${uri}/add-admin`,
    upload99.array("files", 12),
    async (req, res) => {
      try {
        // Get the files from the request
        // const files = req.files;

        //File Array Ke 0
        //Array0
        // const s3UploadParamsArray0 = {
        //   Bucket: S3Bucket,
        //   Key: files[0].originalname,
        //   Body: Buffer.from(files[0].buffer),
        //   ContentType: files[0].mimetype
        // };
        // const BucketArray0 = s3UploadParamsArray0.Bucket;
        // const KeyArray0 = s3UploadParamsArray0.Key;
        // const BodyArray0 = s3UploadParamsArray0.Body;
        // const ContentTypeArray0 = s3UploadParamsArray0.ContentType;
        // console.log("BucketArray0", BucketArray0);
        // console.log("KeyArray0", KeyArray0);
        // console.log("BodyArray0", BodyArray0);
        // console.log("ContentTypeArray0", ContentTypeArray0);
        // const s3UploadResultArray0 = await s3
        //   .upload(s3UploadParamsArray0)
        //   .promise();
        // const urlArray0 = s3UploadResultArray0.Location;
        // console.log("urlArray0", urlArray0);

        console.log("====");

        //JSON
        const username = req.body.username;
        console.log("username", username);
        const display_name = req.body.display_name;
        console.log("display_name", display_name);
        const email = req.body.email;
        console.log("email", email);
        const password = req.body.password;
        console.log("password", password);
        const status_user = req.body.status_user;
        console.log("status_user", status_user);
        //role id super admin
        const role_id = "64c62b78d6e8dbf721f303dd";
        // const status_user = "Active";

        console.log("====");

        //SAVE TO DATABASE
        let objectParam = {
          username: username,
          display_name: display_name,
          email: email,
          password: password,
          // name_file_image_user: KeyArray0,
          // url_image_user: urlArray0,
          created_date_user: new Date(),
          role_id: role_id,
          status_user: Boolean(status_user),
        };
        console.log("objectParam", objectParam);
        console.log("====");

        const createSuperAdmin = await UserRepository.create(objectParam);
        // return "Succes Create Content";

        // Return success response
        res.json({ message: "success add super admin" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error uploading files" });
      }
    }
  );

  //login user
  app.post(`${uri}/login`, UserController.login);

  //create news
  app.post(`${uri}/add-news`, upload99.array("files", 12), async (req, res) => {
    try {
      // Get the files from the request
      const files = req.files;

      //File Array Ke 0
      //Array0
      const s3UploadParamsArray0 = {
        Bucket: S3Bucket,
        Key: files[0].originalname,
        Body: Buffer.from(files[0].buffer),
        ContentType: files[0].mimetype,
      };
      const BucketArray0 = s3UploadParamsArray0.Bucket;
      const KeyArray0 = s3UploadParamsArray0.Key;
      const BodyArray0 = s3UploadParamsArray0.Body;
      const ContentTypeArray0 = s3UploadParamsArray0.ContentType;
      console.log("BucketArray0", BucketArray0);
      console.log("KeyArray0", KeyArray0);
      console.log("BodyArray0", BodyArray0);
      console.log("ContentTypeArray0", ContentTypeArray0);
      const s3UploadResultArray0 = await s3
        .upload(s3UploadParamsArray0)
        .promise();
      const urlArray0 = s3UploadResultArray0.Location;
      console.log("urlArray0", urlArray0);

      console.log("====");

      //JSON
      const title = req.body.title;
      console.log("title", title);
      const categories = req.body.categories;
      console.log("categories", categories);
      const created_by = req.body.created_by;
      console.log("created_by", created_by);
      const tags = req.body.tags;
      console.log("tags", tags);
      const field_content = req.body.field_content;
      console.log(field_content);

      console.log("====");

      //SAVE TO DATABASE
      let objectParam = {
        title: title,
        categories: categories,
        name_file_image_news: KeyArray0,
        url_image_news: urlArray0,
        created_at: new Date(),
        created_by: ObjectID.createFromHexString(created_by),
        tags: tags,
        field_content: field_content,
      };
      console.log("objectParam", objectParam);
      console.log("====");

      const createNews = await NewsRepository.create(objectParam);
      // return "Succes Create Content";

      // Return success response
      res.json({ message: "success create news" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error uploading files" });
    }
  });

  //create article
  app.post(
    `${uri}/add-article`,
    upload99.array("files", 12),
    async (req, res) => {
      try {
        // Get the files from the request
        const files = req.files;

        //File Array Ke 0
        //Array0
        const s3UploadParamsArray0 = {
          Bucket: S3Bucket,
          Key: files[0].originalname,
          Body: Buffer.from(files[0].buffer),
          ContentType: files[0].mimetype,
        };
        const BucketArray0 = s3UploadParamsArray0.Bucket;
        const KeyArray0 = s3UploadParamsArray0.Key;
        const BodyArray0 = s3UploadParamsArray0.Body;
        const ContentTypeArray0 = s3UploadParamsArray0.ContentType;
        console.log("BucketArray0", BucketArray0);
        console.log("KeyArray0", KeyArray0);
        console.log("BodyArray0", BodyArray0);
        console.log("ContentTypeArray0", ContentTypeArray0);
        const s3UploadResultArray0 = await s3
          .upload(s3UploadParamsArray0)
          .promise();
        const urlArray0 = s3UploadResultArray0.Location;
        console.log("urlArray0", urlArray0);

        console.log("====");

        //JSON
        const title = req.body.title;
        console.log("title", title);
        const categories = req.body.categories;
        console.log("categories", categories);
        const created_by = req.body.created_by;
        console.log("created_by", created_by);
        const tags = req.body.tags;
        console.log("tags", tags);
        const field_content = req.body.field_content;
        console.log(field_content);

        console.log("====");

        //SAVE TO DATABASE
        let objectParam = {
          title: title,
          categories: categories,
          name_file_image_article: KeyArray0,
          url_image_article: urlArray0,
          created_at: new Date(),
          created_by: ObjectID.createFromHexString(created_by),
          tags: tags,
          field_content: field_content,
        };
        console.log("objectParam", objectParam);
        console.log("====");

        const createArticle = await ArticleRepository.create(objectParam);
        // return "Succes Create Content";

        // Return success response
        res.json({ message: "success create article" });
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error uploading files" });
      }
    }
  );

  //get all user
  app.post(`${uri}/get-all-user`, UserController.getAllUser);

  //get article detail
  app.post(`${uri}/detail-article`, ArticleController.detailArticle);

  //get news detail
  app.post(`${uri}/detail-news`, NewsController.detailNews);

  //get all article
  app.post(`${uri}/get-all-article`, ArticleController.getAllArticle);

  //get all news
  app.post(`${uri}/get-all-news`, NewsController.getAllNews);

  //get all image in s3
  app.get("/images/:key", UserController.findImage);

  //update user(super admin & admin)
  const upload1001 = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1000000000, files: 2 },
  });
  app.post(
    `${uri}/update-user/:user_id`,
    upload1001.array("files", 12),
    async (req, res) => {
      const file_image = req.files;
      console.log("file_image", file_image);
      console.log("==");
      // let idUser = req.body.user_id
      // console.log("idUser", idUser);

      //find data user
      let resultUser;
      try {
        resultUser = await UserRepository.find({
          _id: ObjectID.createFromHexString(req.params.user_id),
        });
        console.log("resultUser", resultUser);
        // res.json({ resultUser });
      } catch (error) {
        console.error(error);
        throw new BadRequest("gagal");
      }

      let name_file_image_user;
      name_file_image_user = resultUser[0].name_file_image_user;

      let deletedNameImage = resultUser[0].name_file_image_user;

      //upload a new image s3
      const s3ParamsImageArticle = {
        Bucket: S3Bucket,
        Key: file_image[0].originalname,
        Body: file_image[0].buffer,
        ContentType: file_image[0].mimetype,
      };
      const name_file_new = s3ParamsImageArticle.Key;
      console.log("name_file_new", name_file_new);
      const s3UploadFileProfileImageUser = await s3
        .upload(s3ParamsImageArticle)
        .promise();
      const urlImageUser = s3UploadFileProfileImageUser.Location;
      console.log("urlImageUser", urlImageUser);

      //Delete S3 File
      const params = {
        Bucket: S3Bucket,
        Delete: {
          Objects: [{ Key: deletedNameImage }],
        },
      };
      console.log("params", params);
      s3.deleteObjects(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
      });
      //update mongodb
      let objectParam = {
        url_image_article: urlImageUser,
        name_file_image_user: name_file_new,
        email: req.body.email,
        username: req.body.username,
        display_name: req.body.display_name,
        status_user: req.body.status_user,
        password: req.body.password,
      };
      let updateDataUser = await UserRepository.updateOne(
        {
          _id: ObjectID.createFromHexString(req.params.user_id),
        },
        objectParam
      );
      res.json({ message: "Successfully updated" });
    }
  );

  //update article
  const upload100 = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1000000000, files: 2 },
  });
  app.post(
    `${uri}/update-article/:article_id`,
    upload100.array("files", 12),
    async (req, res) => {
      const file_image = req.files;
      console.log("file_image", file_image);
      console.log("==");
      // let idUser = req.body.article_id
      // console.log("idUser", idUser);

      //find data article
      let resultArticle;
      try {
        resultArticle = await ArticleRepository.find({
          _id: ObjectID.createFromHexString(req.params.article_id),
        });
        console.log("resultArticle", resultArticle);
        // res.json({ resultArticle });
      } catch (error) {
        console.error(error);
        throw new BadRequest("gagal");
      }

      let name_file_image_article;
      name_file_image_article = resultArticle[0].name_file_image_article;

      let deletedNameImage = resultArticle[0].name_file_image_article;

      //upload a new image s3
      const s3ParamsImageArticle = {
        Bucket: S3Bucket,
        Key: file_image[0].originalname,
        Body: file_image[0].buffer,
        ContentType: file_image[0].mimetype,
      };
      const name_file_new = s3ParamsImageArticle.Key;
      console.log("name_file_new", name_file_new);
      const s3UploadFileProfileImageUser = await s3
        .upload(s3ParamsImageArticle)
        .promise();
      const urlImageUser = s3UploadFileProfileImageUser.Location;
      console.log("urlImageUser", urlImageUser);

      //Delete S3 File
      const params = {
        Bucket: S3Bucket,
        Delete: {
          Objects: [{ Key: deletedNameImage }],
        },
      };
      console.log("params", params);
      s3.deleteObjects(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
      });
      //update mongodb
      let objectParam = {
        url_image_article: urlImageUser,
        name_file_image_article: name_file_new,
        title: req.body.title,
        categories: req.body.categories,
        tags: req.body.tags,
      };
      let updateDataUser = await ArticleRepository.updateOne(
        {
          _id: ObjectID.createFromHexString(req.params.article_id),
        },
        objectParam
      );
      res.json({ message: "Successfully updated" });
    }
  );

  //update news
  const updloadnews = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1000000000, files: 2 },
  });
  app.post(
    `${uri}/update-news/:news_id`,
    updloadnews.array("files", 12),
    async (req, res) => {
      const file_image = req.files;
      console.log("file_image", file_image);
      console.log("==");
      // let idUser = req.body.news_id
      // console.log("idUser", idUser);

      //find data article
      let resultArticle;
      try {
        resultArticle = await NewsRepository.find({
          _id: ObjectID.createFromHexString(req.params.news_id),
        });
        console.log("resultArticle", resultArticle);
        // res.json({ resultArticle });
      } catch (error) {
        console.error(error);
        throw new BadRequest("gagal");
      }

      let name_file_image_news;
      name_file_image_news = resultArticle[0].name_file_image_news;

      let deletedNameImage = resultArticle[0].name_file_image_news;

      //upload a new image s3
      const s3ParamsImageArticle = {
        Bucket: S3Bucket,
        Key: file_image[0].originalname,
        Body: file_image[0].buffer,
        ContentType: file_image[0].mimetype,
      };
      const name_file_new = s3ParamsImageArticle.Key;
      console.log("name_file_new", name_file_new);
      const s3UploadFileProfileImageUser = await s3
        .upload(s3ParamsImageArticle)
        .promise();
      const urlImageUser = s3UploadFileProfileImageUser.Location;
      console.log("urlImageUser", urlImageUser);

      //Delete S3 File
      const params = {
        Bucket: S3Bucket,
        Delete: {
          Objects: [{ Key: deletedNameImage }],
        },
      };
      console.log("params", params);
      s3.deleteObjects(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
      });
      //update mongodb
      let objectParam = {
        url_image_article: urlImageUser,
        name_file_image_article: name_file_new,
        title: req.body.title,
        categories: req.body.categories,
        tags: req.body.tags,
      };
      let updateDataUser = await NewsRepository.updateOne(
        {
          _id: ObjectID.createFromHexString(req.params.news_id),
        },
        objectParam
      );
      res.json({ message: "Successfully updated" });
    }
  );

  //delete user (super admin & admin)
  app.delete(`${uri}/deleteUser/:user_id`, async (req, res) => {
    try {
      //find a data
      let findData = await UserRepository.find({
        _id: ObjectID.createFromHexString(req.params.user_id),
      });
      console.log("findData", findData);

      let name_file_image_user = findData[0].name_file_image_user;
      console.log("name_file_image_user", name_file_image_user);

      //Delete S3 File
      const params = {
        Bucket: S3Bucket,
        Delete: {
          Objects: [{ Key: name_file_image_user }],
        },
      };
      console.log("params", params);

      s3.deleteObjects(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
      });

      //Delete data mongodb
      let deleteDataUser = await UserRepository.deleteOne({
        _id: ObjectID.createFromHexString(req.params.user_id),
      });

      res.json({ message: "Deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleted" });
    }
  });

  //delete news
  app.delete(`${uri}/deleteNews/:news_id`, async (req, res) => {
    try {
      //find a data
      let findData = await NewsRepository.find({
        _id: ObjectID.createFromHexString(req.params.news_id),
      });
      console.log("findData", findData);

      let name_file_image_news = findData[0].name_file_image_news;
      console.log("name_file_image_news", name_file_image_news);

      //Delete S3 File
      const params = {
        Bucket: S3Bucket,
        Delete: {
          Objects: [{ Key: name_file_image_news }],
        },
      };
      console.log("params", params);

      s3.deleteObjects(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
      });

      //Delete data mongodb
      let deleteDataNews = await NewsRepository.deleteOne({
        _id: ObjectID.createFromHexString(req.params.news_id),
      });

      res.json({ message: "Deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleted" });
    }
  });

  //delete article
  app.delete(`${uri}/deleteArticle/:article_id`, async (req, res) => {
    try {
      //find a data
      let findData = await ArticleRepository.find({
        _id: ObjectID.createFromHexString(req.params.article_id),
      });
      console.log("findData", findData);

      let name_file_image_article = findData[0].name_file_image_article;
      console.log("name_file_image_article", name_file_image_article);

      //Delete S3 File
      const params = {
        Bucket: S3Bucket,
        Delete: {
          Objects: [{ Key: name_file_image_article }],
        },
      };
      console.log("params", params);

      s3.deleteObjects(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log(data);
      });

      //Delete data mongodb
      let deleteDataArticle = await ArticleRepository.deleteOne({
        _id: ObjectID.createFromHexString(req.params.article_id),
      });

      res.json({ message: "Deleted successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error deleted" });
    }
  });
};

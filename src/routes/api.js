const UserController = require("../modules/user/controller/user.controller");
const ArticleController = require("../modules/article/controller/article.controller");
const NewsController = require("../modules/news/controller/news.controller");
const AgendaController = require("../modules/agenda/controller/agenda.controller");
const JournalController = require("../modules/journal/controller/journal.controller");

const cors = require("cors");
const auth = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const sharp = require("sharp");
const express = require("express");
const uri = "/api/v1";
const setMulter = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 1000000000, files: 2, fieldSize: 2 * 1024 * 1024 },
}).array("files", 12);

module.exports = async (app) => {
  app.use(cors());
  app.get("/", (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,content-type"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.send("Cors Allowed");
  });

  // ============== LOGIN ROUTE =============== //
  app.post(`${uri}/login`, UserController.login);

  // ============== ADMIN ROUTE =============== //
  app.post(`${uri}/get-all-user`, UserController.getAllUser);
  app.post(`${uri}/detail-user`, UserController.detailUser);
  app.post(`${uri}/add-superadmin`, setMulter, UserController.addSuperadmin);
  app.post(`${uri}/add-admin`, setMulter, UserController.addAdmin);
  app.post(
    `${uri}/update-user/:user_id`,
    setMulter,
    UserController.updateAdmin
  );
  app.delete(`${uri}/deleteUser/:user_id`, UserController.deleteAdmin);

  // =============== NEWS ROUTE =============== //
  app.post(`${uri}/detail-news`, NewsController.detailNews);
  app.post(`${uri}/get-all-news`, NewsController.getAllNews);
  app.post(`${uri}/add-news`, setMulter, NewsController.addNews);
  app.post(`${uri}/update-news/:news_id`, setMulter, NewsController.updateNews);
  app.delete(`${uri}/deleteNews/:news_id`, NewsController.deleteNews);

  // ============= ARTICLE ROUTE ============== //
  app.post(`${uri}/get-all-article`, ArticleController.getAllArticle);
  app.post(`${uri}/detail-article`, ArticleController.detailArticle);
  app.post(`${uri}/add-article`, setMulter, ArticleController.addArticle);
  app.post(
    `${uri}/update-article/:article_id`,
    setMulter,
    ArticleController.updateArticle
  );
  app.delete(
    `${uri}/deleteArticle/:article_id`,
    ArticleController.deleteArticle
  );

  // ============= AGENDA ROUTE =============== //
  app.post(`${uri}/get-all-agenda`, AgendaController.getAllAgenda);
  app.post(`${uri}/detail-agenda`, AgendaController.detailAgenda);
  app.post(`${uri}/add-agenda`, setMulter, AgendaController.addAgenda);
  app.post(
    `${uri}/update-agenda/:agenda_id`,
    setMulter,
    AgendaController.updateAgenda
  );
  app.delete(`${uri}/delete-agenda/:agenda_id`, AgendaController.deleteAgenda);

  // ============= JOURNAL ROUTE ============== //
  app.post(`${uri}/get-all-journal`, JournalController.getAllJournal);
  app.post(`${uri}/detail-journal`, JournalController.detailJournal);
  app.post(`${uri}/add-journal`, setMulter, JournalController.addJournal);
  app.post(
    `${uri}/update-journal/:journal_id`,
    setMulter,
    JournalController.updateJournal
  );
  app.delete(
    `${uri}/delete-journal/:journal_id`,
    JournalController.deleteJournal
  );
};

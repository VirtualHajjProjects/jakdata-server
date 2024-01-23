const UserController = require("../modules/user/controller/user.controller");
const ArticleController = require("../modules/article/controller/article.controller");
const NewsController = require("../modules/news/controller/news.controller");
const AgendaController = require("../modules/agenda/controller/agenda.controller");
const JournalController = require("../modules/journal/controller/journal.controller");
const WebProfileController = require("../modules/webProfile/controller/webProfile.controller");
const AdvisoryController = require("../modules/webProfile/controller/advisory.controller");
const ExecutiveController = require("../modules/webProfile/controller/executive.controller");
const AssociateController = require("../modules/webProfile/controller/associate.controller");
const ServicesController = require("../modules/webProfile/controller/services.controller");
const ClientsController = require("../modules/webProfile/controller/clients.controller");

const cors = require("cors");
const bodyParser = require("body-parser");
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
const upload = require("../middleware/upload");

module.exports = async (app) => {
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use("/images", express.static("storage"));

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
  app.post(`${uri}/add-superadmin`, UserController.addSuperadmin);
  app.post(`${uri}/add-admin`, UserController.addAdmin);
  app.post(
    `${uri}/update-user/:user_id`,

    UserController.updateAdmin
  );
  app.delete(`${uri}/deleteUser/:user_id`, UserController.deleteAdmin);

  // =============== NEWS ROUTE =============== //
  app.post(`${uri}/detail-news`, NewsController.detailNews);
  app.post(`${uri}/get-all-news`, NewsController.getAllNews);
  app.post(`${uri}/add-news`, NewsController.addNews);
  app.post(`${uri}/update-news/:news_id`, NewsController.updateNews);
  app.delete(`${uri}/deleteNews/:news_id`, NewsController.deleteNews);

  // ============= ARTICLE ROUTE ============== //
  app.post(`${uri}/get-all-article`, ArticleController.getAllArticle);
  app.post(`${uri}/detail-article`, ArticleController.detailArticle);
  app.post(`${uri}/add-article`, ArticleController.addArticle);
  app.post(
    `${uri}/update-article/:article_id`,

    ArticleController.updateArticle
  );
  app.delete(
    `${uri}/deleteArticle/:article_id`,
    ArticleController.deleteArticle
  );

  // ============= AGENDA ROUTE =============== //
  app.post(`${uri}/get-all-agenda`, AgendaController.getAllAgenda);
  app.post(`${uri}/detail-agenda`, AgendaController.detailAgenda);
  app.post(`${uri}/add-agenda`, AgendaController.addAgenda);
  app.post(`${uri}/update-agenda/:agenda_id`, AgendaController.updateAgenda);
  app.delete(`${uri}/delete-agenda/:agenda_id`, AgendaController.deleteAgenda);

  // ============= JOURNAL ROUTE ============== //
  app.post(`${uri}/get-all-journal`, JournalController.getAllJournal);
  app.post(`${uri}/detail-journal`, JournalController.detailJournal);
  app.post(`${uri}/add-journal`, JournalController.addJournal);
  app.post(
    `${uri}/update-journal/:journal_id`,
    JournalController.updateJournal
  );
  app.delete(
    `${uri}/delete-journal/:journal_id`,
    JournalController.deleteJournal
  );

  // ============= PROFILE ROUTE ============== //
  app.post(`${uri}/profile/get-profile`, WebProfileController.getWebProfile);
  app.post(`${uri}/profile/add-profile`, WebProfileController.addWebProfile);
  app.post(
    `${uri}/profile/update-profile/:webProfile_id`,
    WebProfileController.updateWebProfile
  );

  // ============ ADVISORY ROUTE ============== //
  app.post(`${uri}/profile/detail-advisory`, AdvisoryController.detailAdvisory);
  app.post(`${uri}/profile/get-advisory`, AdvisoryController.getAdvisory);
  app.post(`${uri}/profile/add-advisory`, AdvisoryController.addAdvisory);
  app.post(
    `${uri}/profile/update-advisory/:advisory_id`,
    AdvisoryController.updateAdvisory
  );
  app.delete(
    `${uri}/profile/delete-advisory/:advisory_id`,
    AdvisoryController.deleteAdvisory
  );

  // ============ EXECUTIVE ROUTE ============= //
  app.post(
    `${uri}/profile/detail-executive`,
    ExecutiveController.detailExecutive
  );
  app.post(`${uri}/profile/get-executive`, ExecutiveController.getExecutive);
  app.post(`${uri}/profile/add-executive`, ExecutiveController.addExecutive);
  app.post(
    `${uri}/profile/update-executive/:executive_id`,
    ExecutiveController.updateExecutive
  );
  app.delete(
    `${uri}/profile/delete-executive/:executive_id`,
    ExecutiveController.deleteExecutive
  );

  // ============ ASSOCIATE ROUTE ============= //
  app.post(
    `${uri}/profile/detail-associate`,
    AssociateController.detailAssociate
  );
  app.post(`${uri}/profile/get-associate`, AssociateController.getAssociate);
  app.post(`${uri}/profile/add-associate`, AssociateController.addAssociate);
  app.post(
    `${uri}/profile/update-associate/:associate_id`,
    AssociateController.updateAssociate
  );
  app.delete(
    `${uri}/profile/delete-associate/:associate_id`,
    AssociateController.deleteAssociate
  );

  // ============ SERVICES ROUTE ============== //
  app.post(`${uri}/profile/detail-services`, ServicesController.detailServices);
  app.post(`${uri}/profile/get-services`, ServicesController.getServices);
  app.post(`${uri}/profile/add-services`, ServicesController.addServices);
  app.post(
    `${uri}/profile/update-services/:services_id`,
    ServicesController.updateServices
  );
  app.delete(
    `${uri}/profile/delete-services/:services_id`,
    ServicesController.deleteServices
  );

  // ============= CLIENTS ROUTE ============== //
  app.post(`${uri}/profile/detail-clients`, ClientsController.detailClients);
  app.post(`${uri}/profile/get-clients`, ClientsController.getClients);
  app.post(`${uri}/profile/add-clients`, ClientsController.addClients);
  app.post(
    `${uri}/profile/update-clients/:clients_id`,
    ClientsController.updateClients
  );
  app.delete(
    `${uri}/profile/delete-clients/:clients_id`,
    ClientsController.deleteClients
  );
};

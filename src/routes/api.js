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
  app.post(`${uri}/get-all-journal`, JournalController.deleteJournal);
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

  // ============= PROFILE ROUTE ============== //
  app.post(`${uri}/profile/get-profile`, WebProfileController.getWebProfile);
  app.post(
    `${uri}/profile/add-profile`,
    setMulter,
    WebProfileController.addWebProfile
  );
  app.post(
    `${uri}/profile/update-profile/:webProfile_id`,
    setMulter,
    WebProfileController.updateWebProfile
  );

  // ============ ADVISORY ROUTE ============== //
  app.post(`${uri}/profile/detail-advisory`, AdvisoryController.detailAdvisory);
  app.post(`${uri}/profile/get-advisory`, AdvisoryController.getAdvisory);
  app.post(
    `${uri}/profile/add-advisory`,
    setMulter,
    AdvisoryController.addAdvisory
  );
  app.post(
    `${uri}/profile/update-advisory/:advisory_id`,
    setMulter,
    AdvisoryController.updateAdvisory
  );
  app.delete(
    `${uri}/profile/delete-advisory/:advisory_id`,
    setMulter,
    AdvisoryController.deleteAdvisory
  );

  // ============ EXECUTIVE ROUTE ============= //
  app.post(
    `${uri}/profile/detail-executive`,
    ExecutiveController.detailExecutive
  );
  app.post(`${uri}/profile/get-executive`, ExecutiveController.getExecutive);
  app.post(
    `${uri}/profile/add-executive`,
    setMulter,
    ExecutiveController.addExecutive
  );
  app.post(
    `${uri}/profile/update-executive/:executive_id`,
    setMulter,
    ExecutiveController.updateExecutive
  );
  app.delete(
    `${uri}/profile/delete-executive/:executive_id`,
    setMulter,
    ExecutiveController.deleteExecutive
  );

  // ============ ASSOCIATE ROUTE ============= //
  app.post(
    `${uri}/profile/detail-associate`,
    AssociateController.detailAssociate
  );
  app.post(`${uri}/profile/get-associate`, AssociateController.getAssociate);
  app.post(
    `${uri}/profile/add-associate`,
    setMulter,
    AssociateController.addAssociate
  );
  app.post(
    `${uri}/profile/update-associate/:associate_id`,
    setMulter,
    AssociateController.updateAssociate
  );
  app.delete(
    `${uri}/profile/delete-associate/:associate_id`,
    setMulter,
    AssociateController.deleteAssociate
  );

  // ============ SERVICES ROUTE ============== //
  app.post(`${uri}/profile/detail-services`, ServicesController.detailServices);
  app.post(`${uri}/profile/get-services`, ServicesController.getServices);
  app.post(
    `${uri}/profile/add-services`,
    setMulter,
    ServicesController.addServices
  );
  app.post(
    `${uri}/profile/update-services/:services_id`,
    setMulter,
    ServicesController.updateServices
  );
  app.delete(
    `${uri}/profile/delete-services/:services_id`,
    setMulter,
    ServicesController.deleteServices
  );

  // ============= CLIENTS ROUTE ============== //
  app.post(`${uri}/profile/detail-clients`, ClientsController.detailClients);
  app.post(`${uri}/profile/get-clients`, ClientsController.getClients);
  app.post(
    `${uri}/profile/add-clients`,
    setMulter,
    ClientsController.addClients
  );
  app.post(
    `${uri}/profile/update-clients/:clients_id`,
    setMulter,
    ClientsController.updateClients
  );
  app.delete(
    `${uri}/profile/delete-clients/:clients_id`,
    setMulter,
    ClientsController.deleteClients
  );
};

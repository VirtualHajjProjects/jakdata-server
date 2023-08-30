const db = require(`../../../helpers/database`);
const mongoose = require("mongoose");

const ProfileScheme = new mongoose.Schema({
  description: String,
  vision: String,
  mission: String,
  address: String,
  phone: String,
  email: String,
  youtube: String,
  twitter: String,
  instagram: String,
  linkedin: String,
});

const AdvisoryScheme = new mongoose.Schema({
  image: String,
  name: String,
  position: String,
  description: String,
});

const ExecutiveScheme = new mongoose.Schema({
  image: String,
  name: String,
  position: String,
  description: String,
});

const AssociateScheme = new mongoose.Schema({
  image: String,
  name: String,
  position: String,
  description: String,
});

const ServicesScheme = new mongoose.Schema({
  name: String,
  description: String,
  youtube: String,
});

const ClientsScheme = new mongoose.Schema({
  image: String,
  url: String,
});

const WebProfileRepository = mongoose.model(
  "jakdata_coll_webprofile",
  ProfileScheme
);

const AdvisoryRepository = mongoose.model(
  "jakdata_coll_advisory",
  AdvisoryScheme
);

const ExecutiveRepository = mongoose.model(
  "jakdata_coll_executive",
  ExecutiveScheme
);
const AssociateRepository = mongoose.model(
  "jakdata_coll_associate",
  AssociateScheme
);

const ServicesRepository = mongoose.model(
  "jakdata_coll_services",
  ServicesScheme
);
const ClientsRepository = mongoose.model("jakdata_coll_clients", ClientsScheme);

module.exports = {
  WebProfileRepository,
  AdvisoryRepository,
  ExecutiveRepository,
  AssociateRepository,
  ServicesRepository,
  ClientsRepository,
};

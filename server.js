require(`dotenv`).config();
const express = require("express");
const app = express();
const db = require("./src/helpers/database");
const port = process.env.PORT_WEB;
const bodyParser = require("body-parser");
const cors = require("cors");
const serverless = require("serverless-http");
// const router = express.Router();
// const fs = require("fs");
// const https = require("https");

// const private_key = fs.readFileSync("./certs/private_key.key", "utf-8");
// const chain = fs.readFileSync("./certs/chain.pem", "utf-8");
// const certificate = fs.readFileSync("./certs/certificate.pem", "utf-8");

// const credentials = {
//   key: private_key.replace(/\\n/gm, "\n"),
//   cert: certificate.replace(/\\n/gm, "\n"),
//   ca: chain.replace(/\\n/gm, "\n"),
// };

// === HTTP ===
const createServer = async () => {
  app.use(bodyParser.json());
  require(`./src/routes/api`)(app);
  app.use(cors());
};
app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

module.exports = { handleServer: serverless(createServer) };
//==================

// === HTTPS ===
// app.use(bodyParser.json());
// require(`./src/routes/api`)(app);
// app.use(cors());

// const httpsServer = https.createServer(credentials, app);
// httpsServer.listen(port, () => {
//   console.log(`App listening at https://localhost:${port}`);
// });

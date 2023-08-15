const jwt = require("jsonwebtoken");

module.exports = function(req, res, next) {
  const token = req.header("token");
  console.log("token", token)
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, "kunci_rtpintar");
    console.log("decoded", decoded)
    req.user = decoded.payload.resultUser;
    console.log("req.user", req.user)
    // console.log("decoded123", decoded.resultUser)
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
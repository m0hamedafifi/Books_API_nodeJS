const jwt = require("../Util/jwtUtil");

module.exports.authToken = (req, res, nxt) => {
  let token = req.headers["x-auth-login-token"] || req.body.token;
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "No Token Provided" });
  }
  try {
    var userData = jwt.VerifyTokenUser(token);
    console.log("User Data", userData);
    if (!userData) {
      return res
        .status(403)
        .send({ status: false, message: "Failed to authenticate token." });
    }
    req.body.userId = userData.id;
    req.body.userName = userData.email;
    req.body.userAdmin =  userData.admin;

    console.log(req.body);
    nxt();
  } catch (err) {
    // console.error(`Error verifying token : ${err}`);
    return res
      .status(500)
      .send({ status: false, message: "Failed to authenticate token." });
  }
};

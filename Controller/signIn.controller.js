const queries = require("../db/query");
const dbConnection = require("../db/connection");
const util = require("../Util/utilty");
const validationUtil = require("../Util/validation");
const bcrypt = require("bcryptjs");
const jwt = require('../Util/jwtUtil');

//SignIn
exports.getSignInPage = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validate username or password not empty
    if (!email || !password) {
      return res.status(413).send({ status: false, message: "Missing fields" });
    }

    // check what is this username or email
    let userType = util.checkUserNameOrEmail(email);

    // check valid email or username
    if (userType === "username") {
      if (!validationUtil.validateUserName(email)) {
        return res
          .status(406)
          .send({ status: false, message: "Invalid Username" });
      }
    } else if (userType === "email") {
      if (!validationUtil.isValidEmail(email)) {
        return res
          .status(422)
          .send({ status: false, message: "Invalid Email" });
      }
    }

    // check valid password

    if (!validationUtil.isValidPassword(password)) {
      return res.status(405).send({
        status: false,
        message: `
                Invalid Password .`,
      });
    }
    // check user name or email is exist
    let queryCheckUser = queries.queryList.SignInQuery;
    let dataDB = await dbConnection.dbQuery(queryCheckUser, [email]);
    let dbResponse = dataDB.rows[0];
    console.log(dbResponse);
    if (dbResponse == null) {
      return res
        .status(402)
        .send({
          status: false,
          message: "Username or Email is not registered.",
        });
    }

    // check password
    const comparePasswords = await bcrypt.compare(
      password,
      dbResponse.password
    );
    if (!comparePasswords) {
      return res.status(417).json({ status: false, message: "Wrong Password" });
    }

    // generate token
    let token = jwt.generateToken(dbResponse.user_id,dbResponse.username);
    console.log(token);
    res.header("x-auth-login",token)

    return res.status(200).send({
        status: true,
        message: `${dbResponse.username} Logged successfully`
    });
            
  } catch (err) {
    console.log("Error in signIn", err);
    return res
      .status(500)
      .json({ status: false, message: "InternalServer Error!" });
  }
};

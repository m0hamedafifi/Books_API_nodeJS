const queries = require("../db/query");
const dbConnection = require("../db/connection");
const Logger = require("../services/logger");
const auditService = require("../Audit/audit.service");
const auditAction = require("../Audit/audit.action");
const util = require("../Util/utilty");
const validationUtil = require("../Util/validation");
const bcrypt = require("bcryptjs");
const auditLogger = require("../services/Auditing.Logger.Fun");
const sendMail = require("../Util/email");

const logger = new Logger("user.controller");

// Get all users
module.exports.getUserList = async (req, res) => {
  try {
    let userQuery = queries.queryList.getUserListQuery;
    let values = await dbConnection.dbQuery(userQuery);

    if (values.rowCount === 0) throw "No user found";

    auditService.prepareAudit(
      auditAction.actionList.Get_Users_List,
      values.rows,
      200,
      util.dateFormat(),
      "Postman"
    );
    logger.info("return Users", values.rows);

    return res.status(200).send({ status: true, results: values.rows });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).send({ error: "Error at list user" });
  }
};

// Add a User to the database
module.exports.addUser = async (req, res) => {
  try {
    // Checking for required fields in request body
    let data = req.body,
      userName = data.userName,
      password = data.password,
      email = data.email,
      fullName = data.fullName,
      userTypeCode = data.userTypeCode,
      userDisabled = false,
      verifiedUser = false,
      createdBy = "admin",
      createdOn = util.dateFormat();

    console.log(data);
    // Validate input
    if (!data || !userName || !password || !email || !fullName) {
      auditLogger.AuditLoggerSubmit(
        "user.controller",
        "add user",
        [{ status: 413, message: "Missing fields!" }],
        auditAction.actionList.Add_New_User,
        413,
        util.dateFormat(),
        "Postman",
        null
      );
      return res.status(201).send({ status: true, message: "Missing fields!" });
    }

    let validPassword = validationUtil.isValidPassword(password);
    // checking password strength
    // validate Password
    if (validPassword.length > 0) {
      let errList = validPassword.map((item) => ({
        detail: item.message,
      }));
      
      auditService.prepareAudit(
        auditAction.actionList.Add_New_User,
        [{ data: `${userName} Username or email already exists.` }],
        406,
        util.dateFormat(),
        "Postman"
      );
      logger.info("add Users", {
        status: 406,
        data: `The Password must be between 
      8 and 20 characters`,
      });
      return res.status(406).send({
        status: false,
        message: "Your Password must be strong",
        results: errList,
      });
    }
      // validate username

      if (!validationUtil.validateUserName(userName)) {
        return res.status(406).send({
          status: false,
          message: `Username should not contain any special characters`,
        });
      }
      // validate Email

      if (!validationUtil.isValidEmail(email)) {
        return res
          .status(406)
          .send({ status: false, message: "Invalid Email Address" });
      }

    // Check username and email is Exist

    let queryCheckUsers = queries.queryList.CheckUserNameOrEmailIsExists;
    let CheckerUserName = await dbConnection.dbQuery(queryCheckUsers, [
      userName,
      email,
    ]);
    if (CheckerUserName.rows[0].count !== "0") {
      auditService.prepareAudit(
        auditAction.actionList.Add_New_User,
        [{ data: `${userName} Username already exists.` }],
        409,
        util.dateFormat(),
        "Postman"
      );

      logger.info("add Users", {
        status: 409,
        data: `${userName} Username already exists.`,
      });
      return res
        .status(409)
        .json({ status: false, message: "Username or email already exists." });
    }

    let hashedPwd = bcrypt.hashSync(password, 10);
    let addUserQuery = queries.queryList.insertNewUser;
    let values = [
      userName,
      fullName,
      hashedPwd,
      email,
      userTypeCode,
      userDisabled,
      verifiedUser,
      createdBy,
      createdOn,
    ];
    let userId = await dbConnection.dbQuery(addUserQuery, values);

    await mail(userId.rows[0].user_id, userName, email);

    // Prepare Audit Log Data
    auditService.prepareAudit(
      auditAction.actionList.Add_New_User,
      [{ data: `${userName} added successfully` }],
      201,
      util.dateFormat(),
      "Postman"
    );

    logger.info("Add Users", {
      status: 201,
      message: `${userName} added successfully`,
    });

    return res.status(201).send({
      status: true,
      message: ` new user ${fullName} added successfully`,
    });
  } catch (error) {
    console.log("Error: ", error);
    return res
      .status(403)
      .send({ status: false, message: "error at add new user " });
  }
};

exports.verifyUser = async (req, res) => {};

async function mail(id, username, email) {
  const message = ` <h3>Hello ${username} </h3> <br>
  Please click on the following link to verify your account.<br><br>
  ${process.env.BASE_URL}/${id} <br>
  If you did not create an account with this email address please ignore this email. <br>
  Don't reply on this email thanks
  `;
  await sendMail.sendEmail(email, "Verify Email", message);
}

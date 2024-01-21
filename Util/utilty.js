const randomString = require("randomstring");
const moment = require("moment");
module.exports.generateStoreCode = () => {
  const store_code = randomString.generate({
    length: 7,
    charset: "alphanumeric",
    upperCase: true,
  });
  return store_code;
};

module.exports.dateFormat = () => {
  // return moment().format("YYYY-MM-DD HH:mm:ss")
  return moment().format("DD-MM-YYYY HH:mm:ss");
};

// check is user name or email
module.exports.checkUserNameOrEmail = (userNameOrEmail) => {
  let regex = /^[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
  if (regex.test(userNameOrEmail)) {
    return "email";
  } else {
    return "username";
  }
};

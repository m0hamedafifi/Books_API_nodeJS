const randomString = require('randomstring');
const moment = require('moment');
module.exports.generateStoreCode = ()=> {
    const store_code = randomString.generate({ length: 7, charset: 'alphanumeric',upperCase: true });
    return store_code;
};

module.exports.dateFormat = () => {
    // return moment().format("YYYY-MM-DD HH:mm:ss")
    return moment().format("DD-MM-YYYY HH:mm:ss")

  };
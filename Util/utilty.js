const randomString = require('randomstring');

module.exports.generateStoreCode = ()=> {
    const store_code = randomString.generate({ length: 7, charset: 'alphanumeric',upperCase: true });

    return store_code;
};

module.exports.dateFormat = () => {
    return new Date(Date.now()).toLocaleString();
  };
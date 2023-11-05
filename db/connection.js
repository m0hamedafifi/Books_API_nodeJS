const pool = require('./pool');


module.exports.dbQuery = {
return new Promise((resolve, reject) => {
    pool.query(queryText,queryParams)
    .then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err);
    });
})
};
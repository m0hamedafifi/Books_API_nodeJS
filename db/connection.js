const pool = require('./pool');


exports.dbQuery = (queryText, queryParams) =>{
return new Promise((resolve, reject) => {
    pool.query( queryText,queryParams)
    .then((result) => {
        resolve(result);
    }).catch((err) => {
        reject(err);
    });
})
};
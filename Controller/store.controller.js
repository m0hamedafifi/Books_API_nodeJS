const queries = require('../db/query');
const dbConnection = require('../db/connection');

module.exports.getStoreList = (req,res)=> {
    try {
        var storeQuery = queries.queryList.getStoreListQuery;
        var values = await dbConnection.dbQuery(storeQuery);

        return res.status(200).send(JSON.stringify(values))
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).send({error : "Error at list store"})
    }
}
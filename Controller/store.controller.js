const queries = require('../db/query');
const dbConnection = require('../db/connection');

const util = require('../Util/utilty');

module.exports.getStoreList = async (req,res)=> {
    try {
        var storeQuery = queries.queryList.getStoreListQuery;
        let values = await dbConnection.dbQuery(storeQuery);

        return res.status(200).json(JSON.stringify(values.rows))
    } catch (error) {
        console.log("Error: ", error);
        return res.status(500).send({error : "Error at list store"})
    }
}




exports.saveStore = async (req,res) => {

    try {
    
        var createdBy = "admin";
        var createdOn = new Date();
        // req.body
        var storeName = req.body.name;
        var address = req.body.address;
        console.log("storeName : " + storeName   + " ----- address : " + address)
        if(!storeName || !address){
            return res.status(401).json({message:"Please provide name and address of the store"});
        }
        
        let storeCode= util.generateStoreCode();
        let values = [storeName,req.body.description,storeCode,address,createdOn,createdBy];
        console.log(values);
        var saveStore = queries.queryList.saveStoreQuery;
        await dbConnection.dbQuery(saveStore , values);
        return res.status(201).json("Successfully store created ");
    } catch (err) {
        console.log("Error : " + err);
        return res.status(403).send({error : err + '/n Failed to save store'});
    }
    };    
        


// exports.updateStore = async (req,res) => {
    //     // var updatedBy = req.userData.username;
//     // var updatedOn = new Date();



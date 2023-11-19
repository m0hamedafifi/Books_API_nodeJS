const queries = require("../db/query");
const dbConnection = require("../db/connection");
const util = require("../Util/utilty");

module.exports.getStoreList = async (req, res) => {
  try {
    var storeQuery = queries.queryList.getStoreListQuery;
    let values = await dbConnection.dbQuery(storeQuery);

    return res.status(200).json(JSON.stringify(values.rows));
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).send({ error: "Error at list store" });
  }
};

module.exports.getStoreById = async (req, res) => {
  try {
    let storeId = req.params.storeId;
    let storeQuery = queries.queryList.getOneStoreQuery;
    let values = await dbConnection.dbQuery(storeQuery, [storeId]);

    return res.status(200).json(JSON.stringify(values.rows[0]));
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).send({ error: "Error at get one store" });
  }
};

exports.saveStore = async (req, res) => {
  try {
    var createdBy = "admin";
    var createdOn = new Date();
    // req.body
    var storeName = req.body.name;
    var address = req.body.address;
    console.log("storeName : " + storeName + " ----- address : " + address);
    if (!storeName || !address) {
      return res
        .status(401)
        .json({ message: "Please provide name and address of the store" });
    }

    let storeCode = util.generateStoreCode();
    let values = [
      storeName,
      req.body.description,
      storeCode,
      address,
      createdOn,
      createdBy,
    ];
    console.log(values);
    var saveStore = queries.queryList.saveStoreQuery;
    await dbConnection.dbQuery(saveStore, values);
    return res.status(201).json("Successfully store created ");
  } catch (err) {
    console.log("Error : " + err);
    return res.status(403).send({ error: err + "/n Failed to save store" });
  }
};

exports.updateStore = async (req, res) => {


  try {
    let storeId = req.params.storeId;
    var createdBy = "admin";
    var createdOn = new Date();
    // req.body
    let storeName = req.body.name;
    let address = req.body.address;
    let description = req.body.description;
    let storeCode = req.body.storeCode;
    let active = req.body.active;
    if (!storeName || !address) {
      return res
        .status(401)
        .json({ message: "Please provide name and address of the store" });
    }

    let values = [
      storeId,
      storeName,
      description,
      storeCode,
      createdOn,
      createdBy,
      active,
      address,
    ];
    console.log(values);
    var updateStore = queries.queryList.updateStoreQuery;
    await dbConnection.dbQuery(updateStore, values);
    return res.status(201).json(` store ${storeName} updated Successfully `);
  } catch (err) {
    console.log("Error : " + err);
    return res.status(403).send({ error: err + "/n Failed to update store" });
  }
};

module.exports.removeStore= async (req,res)=>{
    
  try {
    let storeId = req.params.storeId;
    var removeStore = queries.queryList.removeStoreQuery;
    await dbConnection.dbQuery(removeStore, [storeId]);
    return res.status(201).json(` store ${storeId} removed Successfully `);
  } catch (err) {
    console.log("Error : " + err);
    return res.status(403).send({ error: err + "/n Failed to remove store" });
  }
};
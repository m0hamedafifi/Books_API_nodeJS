
const express = require('express')
var router = express.Router();
const storeController = require('../Controller/store.controller')

router.post("/stores/add", storeController.saveStore);
router.put("/stores/update/:storeId", storeController.updateStore);
router.delete("/stores/remove/:storeId", storeController.removeStore);
router.get("/stores", storeController.getStoreList);
router.get("/stores/:storeId", storeController.getStoreById);

module.exports=router;
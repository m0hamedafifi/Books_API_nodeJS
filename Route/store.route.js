
const express = require('express')
var router = express.Router();
const storeController = require('../Controller/store.controller')

router.post("/stores/add", storeController.saveStore);
// router.put("/updateStore/:id", storeController.updateStore);
// router.delete("/removeStore/:id", storeController.removeStore);
router.get("/stores", storeController.getStoreList);
// router.get("/findOneStore/:id", storeController.getStoreById);

module.exports=router;
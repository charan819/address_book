// route/addressRoutes.js

const express = require("express");
const router = express.Router();
const addressController = require("../controller/addressController");

router.get("/getAllAddress", addressController.getAllAddress);

router.get("/getAddressById/:id", addressController.getAddressById);

router.post("/createAddress", addressController.createAddress);

router.put("/updateAddress/:id", addressController.updateAddress);

router.delete("/deleteAddress/:id", addressController.deleteAddress);

module.exports = router;
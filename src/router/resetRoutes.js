const express = require("express");
const resetRouter = express.Router();
const ResetController = require("../controller/resetController");

resetRouter.post("/", ResetController.create);
resetRouter.post("/apply", ResetController.apply);

module.exports = resetRouter;
const express = require("express");
const resetRouter = express.Router();
const ResetController = require("../controller/resetController");

resetRouter.post("/", ResetController.create);
resetRouter.post("/apply", ResetController.apply);
resetRouter.post("/company", ResetController.createCompany);
resetRouter.post("/applyCompany", ResetController.applyCompany);

module.exports = resetRouter;
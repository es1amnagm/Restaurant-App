const express = require("express");

const {managerPage} = require("../Controllers/Manager/managerController");
const managerFoodController = require("../Controllers/Manager/managerFoodController");
const managerWorkersController = require("../Controllers/Manager/managerWorkersController");
const allowedForManager = require("../Permissions/managerPermission");
const verifyToken = require("../middlewares/verifyToken");

const router = express.Router();

router.use(verifyToken, allowedForManager);


router.route("/").get(managerPage);
router
  .route("/food")
  .get(managerFoodController.showMales)
  .post(managerFoodController.addMale);

router
  .route("/food/:maleId")
  .get(managerFoodController.selectMale)
  .delete(managerFoodController.deleteMale)
  .patch(managerFoodController.updateMale);

router
  .route("/workers")
  .get( managerWorkersController.showWorkers)
  .post(managerWorkersController.addWorker);

router
  .route("/workers/:workerId")
  .get(managerWorkersController.selectWorker)
  .delete(managerWorkersController.deleteWorker)
  .patch(managerWorkersController.updateWorker);

module.exports = router;

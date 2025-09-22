const Worker = require("../../Data/workersData");
const { SUCCESS, FAIL, ERROR } = require("../../middlewares/requestHandler");
const handle = require("../../middlewares/responseHandler");
const generateJWT = require("../../middlewares/generateJWT");

const bcrypt = require("bcrypt");

const showWorkers = async (req, res) => {
  try {
    const workers = await Worker.find();
    if (workers.length === 0) return handle(res, 200, FAIL, "no data to show");

    return handle(res, 200, SUCCESS, workers);
  } catch (error) {
    return handle(res, 500, ERROR, error);
  }
};

const selectWorker = async (req, res) => {
  try {
    const workerId = req.params.workerId;
    const workerFounded = await Worker.findOne({ _id: workerId });
    if (!workerFounded) return handle(res, 404, FAIL, "this worker not exist");

    return handle(res, 200, SUCCESS, workerFounded);
  } catch (error) {
    return handle(res, 500, ERROR, error);
  }
};

const addWorker = async (req, res) => {
  try {
    const { _id, name, address, phone, salary, position, email, password } =
      req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = await generateJWT({ _id, name, email, password, position });

    const newWorker = await new Worker({
      _id,
      name,
      address,
      phone,
      salary,
      position,
      email,
      password: hashedPassword,
      token,
    });
    await newWorker.save();
    return handle(res, 201, SUCCESS, newWorker);
  } catch (error) {
    console.log(error);
    return handle(res, 500, ERROR, error);
  }
};

const deleteWorker = async (req, res) => {
  try {
    const workerId = req.params.workerId;
    const workerFounded = await Worker.findOne({ _id: workerId });
    if (!workerFounded)
      return handle(res, 404, FAIL, "please enter correct ID");

    await Worker.deleteOne({ _id: workerId });
    return handle(res, 200, SUCCESS, "worker is deleted successfully");
  } catch (error) {
    return handle(res, 500, ERROR, error);
  }
};

const updateWorker = async (req, res) => {
  try {
    const workerId = req.params.workerId;
    const workerFounded = await Worker.findOne({ _id: workerId });
    if (!workerFounded)
      return handle(
        res,
        404,
        FAIL,
        "this worker not found please enter correct ID"
      );

    await Worker.updateOne({ _id: workerId }, { $set: req.body });
    return handle(res, 200, SUCCESS, "worker is updated successfully");
  } catch (error) {
    return handle(res, 500, ERROR, error);
  }
};

module.exports = {
  addWorker,
  deleteWorker,
  updateWorker,
  showWorkers,
  selectWorker,
};

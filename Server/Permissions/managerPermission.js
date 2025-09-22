const JWT = require("jsonwebtoken");
const handle = require("../middlewares/responseHandler");
const { FAIL,ERROR } = require("../middlewares/requestHandler");
const allowForManager = (req, res, next) => {
    try {
      const user = req.currentUser;
      
      if (user.position !== "Manager") {
        return handle(res, 403, FAIL, "Manager only has permission here");
      }

      next();
    } catch (error) {
      return handle(res, 500, ERROR, error.message);
    }
  };

module.exports = allowForManager;

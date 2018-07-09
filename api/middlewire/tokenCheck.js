const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const decode = jwt.verify(req.body.token, process.env.JWT_KEY);
    if (decode) {
      req.userData = decode;
      next();
    } else {
      return res.status(401).json({
        response: error,
      });
    }
  } catch (error) {
    return res.status(401).json({
      response: error,
    });
  }
};

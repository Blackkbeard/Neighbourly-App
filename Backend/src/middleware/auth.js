const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  if (!("authorization" in req.headers)) {
    return res
      .status(401)
      .json({ status: "error", msg: "No auth authorization token found" });
  }
  const token = req.headers["authorization"].replace("Bearer ", "");
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
      req.decoded = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ status: "error", msg: "unauthorised" });
    }
  } else {
    return res.status(401).json({ status: "error", msg: "forbidden" });
  }
};

module.exports = { auth };

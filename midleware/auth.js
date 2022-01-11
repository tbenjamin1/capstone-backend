const auth = (req, res, next) => {
  console.log("authentication");
  next();
};

module.exports = auth;

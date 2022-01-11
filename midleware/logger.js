const logger = (req, res, next) => {
  console.log("middle ware");
  next();
};

module.exports = logger;

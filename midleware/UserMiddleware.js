import verify from "jsonwebtoken";
// 401 unauthorized
// 403 forbidden

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "Not logged in" });

  try {
    const validToken = verify(accessToken, "UsersAuth");
    req.user = validToken;
    if (validToken) {
      return next();
    } else {
      res.json("This user is not allowed");
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

export default validateToken;

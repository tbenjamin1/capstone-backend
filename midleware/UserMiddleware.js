import verify from "jsonwebtoken";

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

const adimnToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) return res.json({ error: "Not logged in" });

  try {
    const validToken = verify(accessToken, "UsersAuth");
    req.user = validToken;
    if (req.user.role === "admin") {
      return next();
    } else {
      res.json("This user is not allowed");
    }
  } catch (err) {
    return res.json({ error: err });
  }
};

export { validateToken, adimnToken };

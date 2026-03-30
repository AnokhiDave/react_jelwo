import jwt from "jsonwebtoken";

const UserMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // verify token with secret from env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // attach user id to request
    req.user = { id: decoded.id };

    next();
  } catch (err) {
    console.log(err.message); // <-- log error to see exact reason
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default UserMiddleware;

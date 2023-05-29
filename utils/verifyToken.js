import { json } from "express";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res
      .status(400)
      .json({ message: "you have not authorized (not accesed token)" });
  }

  jwt.verify(token, process.env.JWT_secret, (err, user) => {
    if (err) {
      return res.status(400).json({ message: "token is not valid" });
    }
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      return res.status(400).json({ message: "you have not authorized" });
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return res.status(400).json({ message: "you have not authorized" });
    }
  });
};

import { Session } from "../entity/Session";
const { getRepository } = require("typeorm");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

module.exports = async (req, res, next) => {
  //next use in the middleware

  if (!req.headers.authorization) {
    return res.status(401).json({ error: "token is require" });
  }

  const token = req.headers.authorization.split(" ")[1] as string;
  console.log(token);

  let sessionRepository = getRepository(Session);
  if (req.headers.authorization) {
    jwt.verify(token, process.env.Token_Secret, async (error, userData) => {
      if (error) {
        if (error.expiredAt) {
          await sessionRepository.delete({ token: token });
          return next(
            res.status(403).json({
              message: "session expired1.",
            })
          );
        }
        return next(
          res.status(403).json({
            message: "auth faild.",
          })
        );
      }
      let tokenData = await sessionRepository.findOne({
        where: {
          token: token,
        },
      });
      if (tokenData) {
        req.headers.userId = userData.userId;
        next();
      } else {
        res.status(403).json({
          message: "session expired2.",
        });
      }
    });
  } else {
    res.status(403).json({
      message: "session expired3.",
    });
  }
};

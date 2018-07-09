const Auth = require("../model/Auth");
const mongoose = require("mongoose");
const passwordHash = require("password-hash");
const jsonwebtoken = require("jsonwebtoken");
exports.auth_login = (req, res, next) => {
  Auth.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user <= 1) {
        res.status(404).json({ response: "Authentication faild" });
      } else {
        if (passwordHash.verify(req.body.password, user[0].password) == true) {
          res.status(200).json({
            response: {
              username: user[0].username,
              token: jsonwebtoken.sign(
                {
                  userid: user[0].id,
                  username: user[0].username,
                  expired: Math.floor(Date.now() / 1000) - 30,
                },
                process.env.JWT_KEY,
              ),
            },
          });
        } else {
          res.status(404).json({ response: "Authentication faild" });
        }
      }
    })
    .catch(err => {
      res.status(200).json({ response: err });
    });
};

// sign up

exports.auth_signup = (req, res, next) => {
  Auth.find({ email: req.body.email })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        res.status(409).json({
          response: "Email Address is Already Exits !",
        });
      } else {
        if (req.body.password.length <= 8) {
          res.status(411).json({
            response: "password length must be greater the 8 ",
          });
        } else {
          const hashPass = passwordHash.generate(req.body.password, { saltLength: 10 });
          if (hashPass) {
            const auth = new Auth({
              _id: mongoose.Types.ObjectId(),
              username: req.body.username,
              name: {
                fristName: req.body.fristName,
                lastName: req.body.lastName,
              },
              bday: req.body.bday,
              email: req.body.email,
              phone: req.body.phone,
              password: hashPass,
            });
            auth
              .save()
              .then(result => {
                res.status(200).json({
                  response: result,
                });
              })
              .catch(err => {
                res.status(422).json({
                  response: err,
                });
              });
          } else {
            res.status(500).json({
              response: "Something Wrong with Password",
            });
          }
        }
      }
    });
};

exports.auth_userinfo = (req, res, next) => {
  Auth.find()
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      res.status(500).json(err);
    });
};

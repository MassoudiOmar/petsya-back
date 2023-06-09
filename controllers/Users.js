var db = require("../database-mysql");
const bcrypt = require("bcrypt");
const validateEmail = require("../helpers/validateEmail");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const cloudinary = require("../utils/cloudinary");
var cloudinar = require("cloudinary");
var cloudinar = require("cloudinary").v2;
require("dotenv").config();

// get user by email
let getOneUser = (email, callback) => {
  const sql = "SELECT * FROM `users` WHERE email = ? ";
  db.query(sql, [email], (err, user) => {
    callback(err, user);
  });
};

// login
let login = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.send("Please fill all the fields");
  } else {
    getOneUser(email, (err, result) => {
      if (err) {
        return res.send(err);
      } else if (!result.length) {
        return res.send("user not found");
      } else {
        try {
          bcrypt.compare(password, result[0].password, function (err, result) {
            if (err) {
              res.send(err);
            } else if (result === false) {
              res.send("login failed");
            } else if (result === true) {
              getOneUser(email, (err, result) => {
                if (err) {
                  console.log(err);
                }
                if (result[0].status === "Activated") {
                  getOneUser(email, (err, result) => {
                    if (err) {
                      res.send(err);
                    }
                    const user = {
                      id: result[0].id,
                      email: result[0].email,
                      image: result[0].image,
                      first_name: result[0].first_name,
                      last_name: result[0].last_name,
                    };
                    jwt.sign(
                      { user },
                      process.env.JWT_SECRET_KEY,
                      (err, token) => {
                        if (err) {
                          return res.send(err);
                        }
                        res.send({
                          UsertokenInfo: token,
                          message: "login succssefull",
                        });
                      }
                    );
                  });
                } else {
                  res.send("sorry, you have no access !");
                }
              });
            } else {
              res.send("not found");
            }
          });
        } catch (err) {
          res.send(err);
        }
      }
    });
  }
};

function generateId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
var register = async (req, res) => {
  try {
    //get info of user
    let { first_name, last_name, email, password, image } = req.body;
    const status = "Activated";
    const id = generateId(10);
    !image
      ? (image =
          "https://e0.pxfuel.com/wallpapers/238/852/desktop-wallpaper-masque-luffy-smiling-one-piece-par-lilzer99-in-2020-anime-anime-one-piece-manga-luffy-smile.jpg")
      : null;
    // check fields
    if (!first_name || !last_name || !email || !password) {
      return res.json({ msg: "please fill in all fields" });
    }
    // check email
    else if (!validateEmail(email)) {
      res.send({ msg: "Please enter a valid email address." });
      // Validation Password
    } else {
      //check user
      const sql = `SELECT * FROM users WHERE email=? `;
      db.query(sql, [email], async (err, result) => {
        if (err) return res.send(err);
        if (result.length) {
          res.send({ msg: "This email is already registered in our system." });
        } else {
          try {
            const salt = await bcrypt.genSalt();
            const password = await bcrypt.hash(req.body.password, salt);
            db.query(
              "INSERT INTO users ( id,first_name, last_name, email, password,status,image) VALUES (?,?,?,?,?,?,?)",
              [id, first_name, last_name, email, password, status, image],
              (err, result) => {
                if (err) {
                  res.send(err);
                } else {
                  // registration success
                  res.send("registration success");
                }
              }
            );
          } catch (err) {
            console.log(err);
          }
        }
      });
    }
  } catch (err) {
    res.json({ msg: err.message });
  }
};

const decodeToken = function (req, res) {
  let token = req.headers.token;
  var decoded = jwtDecode(token);
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, result) => {
    if (err) {
      return res.json({
        title: ("unauthorized", err),
      });
    }
    //token is valid
    res.send(decoded);
  });
};

const getUsers = (req, res) => {
  const sql = "select id ,image , first_name,last_name from users";
  db.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

const getUserById = (req, res) => {
  const { id } = req.params;
  const sql =
    "select id ,image , first_name,last_name ,email from users where id =?";
  db.query(sql, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

const updateInformation = (req, res) => {
  const { id } = req.params;
  const { image, first_name, last_name, email } = req.body;
  if (image.length > 250) {
    cloudinary.uploader.upload(
      `data:image/jpeg;base64,${image}`,
      (error, result) => {
        if (error) {
          console.error(error);
        } else {
          var img = result.secure_url;
          const sql =
            "UPDATE users SET first_name = ?,  last_name = ?,  email = ?,  image = ? WHERE  id = ?";
          db.query(
            sql,
            [first_name, last_name, email, img, id],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                res.send(result);
              }
            }
          );
        }
      }
    );
  } else {
    const sql =
      "UPDATE users SET first_name = ?,  last_name = ?,  email = ?,  image = ? WHERE  id = ?";
    db.query(sql, [first_name, last_name, email, image, id], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  }
};

module.exports = {
  login,
  register,
  decodeToken,
  getUsers,
  getUserById,
  updateInformation,
};

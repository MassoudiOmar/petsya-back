var db = require("../database-mysql");
const bcrypt = require("bcrypt");
const validateEmail = require("../helpers/validateEmail");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const cloudinary = require("../utils/cloudinary");
var cloudinar = require("cloudinary");
var cloudinar = require("cloudinary").v2;
require("dotenv").config();

/*
`user_id` INT NOT NULL,
  `content` INT NOT NULL,
  `attachment` INT NULL DEFAULT NULL,
  `likes` INT NULL DEFAULT NULL,
  `comments` VARCHAR(200) DEFAULT NULL,
  `shares` INT NULL DEFAULT NULL,
*/

// add post
let addPost = (req, res) => {
  const { id } = req.params;
  const { content, attachment, likes, comments, shares } = req.body;
  if (!attachment && content) {
    const sql =
      "INSERT INTO user_has_posts (user_id ,content,attachment,likes,comments,shares) VALUES (?,?,?,?,?,?)";

    db.query(
      sql,
      [id, content, attachment, likes, comments, shares],
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  } else if (attachment && !content) {
    cloudinary.uploader.upload(
      `data:image/jpeg;base64,${attachment}`,
      (error, result) => {
        if (error) {
          console.error(error);
        } else {
          var image = result.secure_url;
          const sql =
            "INSERT INTO user_has_posts (user_id ,content,attachment,likes,comments,shares) VALUES (?,?,?,?,?,?)";

          db.query(
            sql,
            [id, content, image, likes, comments, shares],
            (err, result) => {
              if (err) {
                res.send(err);
              } else {
                res.send(result);
              }
            }
          );
        }
      }
    );
  } else {
    cloudinary.uploader.upload(
      `data:image/jpeg;base64,${attachment}`,
      (error, result) => {
        if (error) {
          console.error(error);
        } else {
          var image = result.secure_url;
          const sql =
            "INSERT INTO user_has_posts (user_id ,content,attachment,likes,comments,shares) VALUES (?,?,?,?,?,?)";

          db.query(
            sql,
            [id, content, image, likes, comments, shares],
            (err, result) => {
              if (err) {
                res.send(err);
              } else {
                res.send(result);
              }
            }
          );
        }
      }
    );
  }
};

let getPost = (req, res) => {
  const sql =
    "SELECT user_has_posts.*, users.image, users.first_name,users.last_name,users.image FROM user_has_posts INNER JOIN users ON users.id = user_has_posts.user_id;";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result.reverse());
    }
  });
};
let getPostByiD = (req, res) => {
  const { id } = req.params;
  const sql =
    "SELECT user_has_posts.*,users.first_name, users.last_name,users.image FROM users INNER JOIN user_has_posts ON users.id = user_has_posts.user_id WHERE user_has_posts.id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result.reverse());
    }
  });
};

const getPostByUserId = (req, res) => {
  const { id } = req.params;
  const sql =
    "SELECT * FROM user_has_posts INNER JOIN users ON user_has_posts.user_id = users.id WHERE users.id = ?";
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result.reverse());
    }
  });
};

module.exports = {
  addPost,
  getPost,
  getPostByiD,
  getPostByUserId
};

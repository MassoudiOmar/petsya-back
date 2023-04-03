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
  if (!content) {
    res.send("please fill all the fields");
  }
  if (!attachment) {
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
  } else if(attachment){
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

let getPost =(req,res)=>{
const sql = 'select * from user_has_posts inner join users where users.id = user_has_posts.user_id'
db.query(sql,(err,result)=>{
    if(err){console.log(err)}
    else{res.send(result)}
})
}

module.exports = {
  addPost,
  getPost
};

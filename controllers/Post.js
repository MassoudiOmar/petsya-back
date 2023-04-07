var db = require("../database-mysql");
const bcrypt = require("bcrypt");
const validateEmail = require("../helpers/validateEmail");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const cloudinary = require("../utils/cloudinary");
var cloudinar = require("cloudinary");
var cloudinar = require("cloudinary").v2;
require("dotenv").config();

// add post
function generateId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

let addPost = (req, res) => {
  const { id } = req.params;
  const { content, attachment } = req.body;
  const post_id = generateId(10);
  if (!attachment && content) {
    const sql =
      "INSERT INTO user_has_posts (id,user_id ,content,attachment) VALUES (?,?,?,?)";
    db.query(sql, [post_id, id, content, attachment], (err, result) => {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  } else if (attachment && !content) {
    cloudinary.uploader.upload(
      `data:image/jpeg;base64,${attachment}`,
      (error, result) => {
        if (error) {
          console.error(error);
        } else {
          var image = result.secure_url;
          const sql =
            "INSERT INTO user_has_posts (id,user_id ,content,attachment) VALUES (?,?,?,?)";

          db.query(sql, [post_id, id, content, image], (err, result) => {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
          });
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
            "INSERT INTO user_has_posts (id,user_id ,content,attachment) VALUES (?,?,?,?)";

          db.query(sql, [post_id, id, content, image], (err, result) => {
            if (err) {
              res.send(err);
            } else {
              res.send(result);
            }
          });
        }
      }
    );
  }
};

/*
[
  {
    "id": "f4oSAHM99H",
    "user_id": "U0TQyn4kck",
    "content": "Test",
    "attachment": null,
    "first_name": "Khayri ",
    "last_name": "Eddin ",
    "image": "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
  }
]
*/

let share_post = (req, res) => {
  const { post_id, sharer_id } = req.params;
  const id = generateId(10);
  const sql1 =
    "SELECT user_has_posts.*,users.first_name, users.last_name,users.image FROM users INNER JOIN user_has_posts ON users.id = user_has_posts.user_id OR users.id = user_has_posts.user_owner_id WHERE user_has_posts.id = ?";
  db.query(sql1, [post_id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
       const sql2 =
         "insert into user_has_posts (id,user_id,user_owner_id,content,attachment,sharer_id) values (?,?,?,?,?,?)";
       db.query(
         sql2,
         [
           id,
           result[0].user_id,
           result[0].user_owner_id,
           result[0].content,
           result[0].attachment,
           sharer_id,
         ],
         (err, result) => {
           if (err) {
             console.log(err);
           } else {
             res.send(result);
           }
         }
       );
        }
  });
};

let getPost = (req, res) => {
  const sql =
  "SELECT  p.id,  p.content AS post_content,  p.attachment AS post_attachment, u1.id AS owner_id, u1.first_name AS post_owner_first_name,  u1.last_name AS post_owner_last_name,u1.image AS post_owner_image,u2.id AS sharer_id,  u2.first_name AS post_sharer_first_name,  u2.last_name AS post_sharer_last_name ,u2.image AS post_sharer_image , l.sender_id AS user_make_like FROM  user_has_posts p  LEFT JOIN users u1 ON p.user_id = u1.id or p.user_owner_id = u1.id LEFT JOIN users u2 ON p.sharer_id = u2.id LEFT JOIN likes l on l.post_id=p.id"
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
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


const getLikes = (req, res) => {
  const { post_id } = req.params;
  const sql = "SELECT users.id, users.first_name, users.last_name, users.image FROM users INNER JOIN likes ON users.id = likes.sender_id WHERE likes.post_id = ?";
  db.query(sql, [post_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const sendComment = (req, res) => {
  const { post_id, sender_id } = req.params;
  const { comment } = req.body;
  const sql = "insert into comments (post_id,sender_id,comment) values(?,?,?)";
  db.query(sql, [post_id, sender_id, comment], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("done");
    }
  });
};

const getcomments = (req, res) => {
  const { post_id } = req.params;
  const sql =
    "SELECT comments.comment, users.id, users.first_name, users.last_name, users.image FROM comments INNER JOIN users ON users.id = comments.sender_id WHERE comments.post_id = ?";
  db.query(sql, [post_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result.reverse());
    }
  });
};


const getPOstsansLikes =(req,res)=>{
  const {post_id} =req.params

const sql = 'SELECT p.* FROM user_has_posts p JOIN likes l ON p.id = l.post_id'
  db.query(sql, [post_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
}

module.exports = {
  addPost,
  getPost,
  getPostByiD,
  getPostByUserId,
  sendComment,
  getLikes,
  getcomments,
  share_post,
  getPOstsansLikes
};

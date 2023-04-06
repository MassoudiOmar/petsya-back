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
    "SELECT user_has_posts.*,users.first_name, users.last_name,users.image FROM users INNER JOIN user_has_posts ON users.id = user_has_posts.user_id WHERE user_has_posts.id = ?";
  db.query(sql1, [post_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      const sql2 =
        "insert into user_shared_post (id,user_id,content,attachment,shared_id) values (?,?,?,?,?)";
      db.query(
        sql2,
        [
          id,
          sharer_id,
          result[0].content,
          result[0].attachment,
          result[0].user_id,
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

let getSharedPost = (req, res) => {
  const sql =
    "SELECT u1.id AS user_owner_id,u1.first_name AS user_first_name ,u1.last_name AS user_last_name ,u1.image AS user_image,u2.id AS user_sharer_id, u2.first_name AS sharer_first_name,u2.last_name AS sharer_last_name,u2.image AS sharer_image,usp.id AS post_id, usp.content, usp.attachment FROM  user_shared_post usp JOIN users u2 ON usp.user_id = u2.id JOIN  users u1 ON usp.shared_id = u1.id;";
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

let getPost = (req, res) => {
  const sql =
    "SELECT user_has_posts.*, users.image, users.first_name,users.last_name,users.image FROM user_has_posts INNER JOIN users ON users.id = user_has_posts.user_id;";
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

const sendLike = (req, res) => {
  const { post_id, sender_id } = req.params;
  const sql = "insert into likes (post_id,sender_id) values(?,?)";
  db.query(sql, [post_id, sender_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("done");
    }
  });
};

const getLikes = (req, res) => {
  const { post_id } = req.params;
  const sql =
    "SELECT users.id, users.first_name, users.last_name, users.image FROM users INNER JOIN likes ON users.id = likes.sender_id WHERE likes.post_id = ?";
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
  sendLike,
  sendComment,
  getLikes,
  getcomments,
  share_post,
  getSharedPost,
  getPOstsansLikes
};

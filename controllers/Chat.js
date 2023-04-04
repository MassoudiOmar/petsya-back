var db = require("../database-mysql");
const bcrypt = require("bcrypt");
const validateEmail = require("../helpers/validateEmail");
const jwt = require("jsonwebtoken");
const jwtDecode = require("jwt-decode");
const cloudinary = require("../utils/cloudinary");
var cloudinar = require("cloudinary");
var cloudinar = require("cloudinary").v2;
require("dotenv").config();



function generateId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
const makeConversation = (req, res) => {
  const { sender_id, reciever_id } = req.params;
  const convertSation_id = generateId(10);
  const sql2 ="SELECT convertSation_id FROM chat WHERE (sender_id = ? AND reciever_id = ?) OR (sender_id = ? AND reciever_id = ?)"
  db.query(sql2, [sender_id, reciever_id,reciever_id,sender_id], (err, result) => {
    if (err) {
      res.send(err);
    } else if (result.length > 0) {
      res.send(result);
    } else if (result.length == 0) {
      const sql =
        "insert into chat (sender_id,reciever_id,convertSation_id) values (?,?,?)";
      db.query(
        sql,
        [sender_id, reciever_id, convertSation_id],
        (err, result) => {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        }
      );
    }
  });
};

let addMessage = (req, res) => {
  const { sender_id, reciever_id, message, convertSation_id } = req.body;
  if (!sender_id || !reciever_id || !message) {
    res.send("nothing");
  } else {
    const status = "pending";
    const timestamp = new Date();
    const sql =
      "insert into chat (convertSation_id,sender_id,reciever_id,message,status,timestamp) values (?,?,?,?,?,?)";
    db.query(
      sql,
      [convertSation_id, sender_id, reciever_id, message, status, timestamp],
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
        }
      }
    );
  }
};

let getChat = (req, res) => {
  const { convertSation_id } = req.params;
  const sql = `SELECT chat.*, users.image FROM chat INNER JOIN users ON users.id = chat.sender_id where convertSation_id =?`;
  db.query(sql, [convertSation_id], (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result.reverse());
    }
  });
};

module.exports = {
  addMessage,
  getChat,
  makeConversation,
};

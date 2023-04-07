var db = require("../database-mysql");
const io = require("../app.js");

/*
`id` INT NOT NULL AUTO_INCREMENT,
  `owner` INT NOT NULL,
  `post_id` INT NOT NULL,
  `receiver_id` INT NULL DEFAULT NULL,
  `date` VARCHAR(45) NULL DEFAULT NULL,
  `seen` VARCHAR(45) NULL DEFAULT NULL,
  `action` VARCHAR(45) NULL DEFAULT NULL,
*/
function generateId(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
let sendLike = (req, res) => {
  let { sender_id, post_id } = req.params;
  let sql1 = "select * from likes where sender_id =? and post_id = ?";
  db.query(sql1, [sender_id, post_id], (err, result) => {
    if (err) {
      console.log(err);
    } else if (result.length > 0) {
      const sql2 = "delete from likes where sender_id=? and post_id = ?";
      db.query(sql2, [sender_id, post_id], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      });
    } else {
      let sql3 = "insert into likes (sender_id,post_id) values(?,?)";
      db.query(sql3, [sender_id, post_id], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);

          let isEventEmitted = false;
          if (!isEventEmitted) {
            io.emit(post_id, "done");
            isEventEmitted = true;
          }
        }
      });
    }
  });
};

let getNotification = (req, res) => {
  let { sender_id } = req.params;
  const sql = `SELECT users_has_notifications.*, users.image,users.first_name,users.last_name FROM users_has_notifications INNER JOIN users ON users.id = users_has_notifications.sender_id where receiver_id = ?`;
  db.query(sql, [sender_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result.reverse());
    }
  });
};

module.exports = { sendLike, getNotification };

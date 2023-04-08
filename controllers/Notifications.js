var db = require("../database-mysql");
const io = require("../app.js");
const time = new Date();

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
  let { sender_id, post_id,userId } = req.params;
  const date = time.getHours() + ":" + time.getMinutes()
  const seen = "no";
  const action = "liked";

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
          const sql4 =
            "insert into users_has_notifications (sender_id,post_id,receiver_id,date,seen,action) value(?,?,?,?,?,?)";
          db.query(
            sql4,
            [
              sender_id,
              post_id,
              userId,
              date,
              seen,
              action,
            ],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                io.emit(post_id, "done");
              res.send(result)
              }
            }
          );
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

let getNotificationNumber = (req, res) => {
  let { sender_id } = req.params;
  const sql = `
  SELECT users_has_notifications.*, users.image, users.first_name, users.last_name 
FROM users_has_notifications 
INNER JOIN users ON users.id = users_has_notifications.sender_id 
WHERE receiver_id = ? 
AND sender_id != ? 
AND users_has_notifications.seen = 'no'

  `;
  db.query(sql, [sender_id,sender_id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(result.length));
    }
  });
};

const updateNotificationSeen=(req,res)=>{
  const {id}=req.params
  const sql ="update users_has_notifications set seen = 'yes' where id = ?"
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(JSON.stringify(result.length));
    }
  });
}

module.exports = { sendLike, getNotification,getNotificationNumber ,updateNotificationSeen};

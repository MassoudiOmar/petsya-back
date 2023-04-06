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
let sendLike = (req,res)=>{
    let {sender_id,receiver_id,post_id} = req.params
    const date = new Date()
    const seen = "no"
    let sql = 'insert into users_has_notifications (sender_id,post_id,receiver_id,date,seen,action) values(?,?,?,?,?,?)'
    db.query(sql,[sender_id,post_id,receiver_id,date,seen,"like"],(err,result)=>{
        if(err){console.log(err)}
        else{
   res.send(result)
       
   let isEventEmitted = false
   if (!isEventEmitted) {
     io.emit(post_id,'done');
     isEventEmitted = true;
   }
        }
    })
}

let getNotification= (req,res)=>{
    let {sender_id}=req.params
    const sql = `SELECT users_has_notifications.*, users.image,users.first_name,users.last_name FROM users_has_notifications INNER JOIN users ON users.id = users_has_notifications.sender_id where receiver_id = ?`;
    db.query(sql,[sender_id],(err,result)=>{
        if(err){console.log(err)}
        else{res.send(result.reverse())}
    })
}

module.exports={sendLike,getNotification}
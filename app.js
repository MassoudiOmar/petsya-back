const express = require('express');
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");


//import routes
const login = require("./routes/Users.routes");
const posts = require("./routes/Post.routes");



//use midllewars
app.use(cors({ origin: "*" }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());



//use routes
app.use("/api/users",login);
app.use("/api/post",posts);



app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

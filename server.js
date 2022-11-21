const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const authentication = require("./middleware/auth");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// const MongoURI = "mongodb+srv://shreyash_ghadge:onepunchman11@cluster0.rk4cjf4.mongodb.net/?retryWrites=true&w=majority";;

mongoose
  .connect(process.env.MongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("Mongo Connection successful"))
  .catch((err) => console.log(err));


app.use(authentication);

app.use("/api/", require("./routes/routes"));


app.use("/", express.static(path.join(__dirname, "/client/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`server up and running on ${PORT}`);
});

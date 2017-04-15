//External modules
var express = require("express");

//Internal Modules
var path =  require("path");
var router = require("./routes/routes");

//Setup
var app = express();

app.set("view engine", "ejs");

app.use(router);
app.use(express.static(path.resolve(__dirname, "public")));

app.listen(3000, function(){

	console.log("Application listening at port ", 3000);

});
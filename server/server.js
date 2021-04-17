var http = require("http");
var host = "localhost";
var port = 8000;
var { json } = require("body-parser");
var jsonParser = json();
var fs = require("fs");

var headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  "Access-Control-Max-Age": 12344345789,
};

var listRequest = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  switch (req.url) {
    case "/developers":
      var developers = fs.readFileSync("developers.json");
      res.writeHead(200, headers);
      res.end(developers);
      break;
    case "/questions":
      var questions = fs.readFileSync("questions.json");
      res.writeHead(200, headers);
      res.end(questions);
      break;
    default:
      res.writeHead(404, headers);
      res.end(JSON.stringify({ error: "Resource not found" }));
  }
};

var server = http.createServer(listRequest);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

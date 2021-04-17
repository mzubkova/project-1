var host = "localhost";
var port = 8000;
var http = require("http");
var fs = require("fs");
var { json } = require("body-parser");
var jsonParser = json();

var headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  "Access-Control-Max-Age": 12344345789,
};

var listRequest = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  switch (req.url) {
    case req.method === "OPTIONS":
      res.writeHead(204, headers);
      res.end();
      break;
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
    case "/questions.xml":
      var questionsXML = fs.readFileSync("questions.xml");
      res.writeHead(200, headers);
      res.end(questionsXML);
      break;
    case "/questions.xml":
      var questionsYaml = fs.readFileSync("questions.yaml");
      res.writeHead(200, headers);
      res.end(questionsYaml);
      break;
    case "/questions.csv":
      var questionsCsv = fs.readFileSync("questions.csv");
      res.writeHead(200, headers);
      res.end(questionsCsv);
      break;
    case "/developers" && req.method === "POST":
      jsonParser(req, res, (error) => {
        if (error) {
          throw error;
        }
        var developers = JSON.parse(fs.readFileSync("developers.json"));
        var data = Object.assign(developers, req.body);
        fs.writeFileSync("developers.json", JSON.stringify(data));
        res.writeHead(200, headers);
        console.log(data);
        response.end("success");
      });
      break;
    case "/questions/new-json" && req.method === "POST":
      jsonParser(req, res, (error) => {
        if (error) {
          throw error;
        }
        var questions = JSON.parse(fs.readFileSync("questions.json"));
        req.body._id = questions.length + 1;
        questions.push(req.body);
        fs.writeFileSync("questions.json", JSON.stringify(data, null, "\t"));
        res.writeHead(200, headers);
        response.end("success");
        console.log("success");
      });
      break;
    case "/questions/" && req.method === "POST":
      jsonParser(req, res, (error) => {
        if (error) {
          throw error;
        }
        var questions = JSON.parse(fs.readFileSync("questions.json"));
        for (var i = 0; i < questions.length; i++) {
          if (questions[i]._id === req.body._id) {
            questions.splice(i, 1);
          }
        }
        fs.writeFileSync("questions.json", JSON.stringify(data, null, "\t"));
        res.writeHead(200, headers);
        console.log("success");
        response.end("success");
      });
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

const http = require("http");
const host = "localhost";
const port = 8000;

var headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE",
  "Access-Control-Max-Age": 12344345789,
};

const questions = JSON.stringify([
  {
    topic: "JavaScript",
    type: "JSON",
    question: "Are there 7 primitive data types in JavaScript?",
    answer: true,
    iso: "2021-03-22",
  },
  {
    topic: "JavaScript",
    type: "JSON",
    question:
      "Is using the unary plus (+ operator) the fastest way to convert a string to a number?",
    answer: true,
    iso: "2021-03-23",
  },
  {
    topic: "JavaScript",
    type: "JSON",
    question:
      "Is it true that it is impossible to create an object that has no prototype?",
    answer: false,
    iso: "2021-03-24",
  },
  {
    topic: "HTML",
    type: "JSON",
    question: "Does the <em> </em> tag make the text bold?",
    answer: false,
    iso: "2021-03-24",
  },
  {
    topic: "HTML",
    type: "JSON",
    question: "Do I have to write alt to <img>?",
    answer: true,
    iso: "2021-03-24",
  },
  {
    topic: "HTML",
    type: "JSON",
    question: "Do I have to write alt to <img>?",
    answer: true,
    iso: "2021-03-25",
  },
  {
    topic: "CSS",
    type: "JSON",
    question: "Is glazed a valid border-style property?",
    answer: false,
    iso: "2021-03-25",
  },
  {
    topic: "CSS",
    type: "JSON",
    question: "Is ems a valid unit in CSS?",
    answer: false,
    iso: "2021-03-25",
  },
  {
    topic: "DOM",
    type: "JSON",
    question: "Are there 12 types of elements in the DOM?",
    answer: false,
    iso: "2021-03-26",
  },
  {
    topic: "Node js",
    type: "JSON",
    question: "Is the call stack part of the V8 engine?",
    answer: true,
    iso: "2021-03-27",
  },
]);

const listQuestions = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  switch (req.url) {
    case "/questions":
      res.writeHead(200, headers);
      res.end(questions);
      break;
    default:
      res.writeHead(404, headers);
      res.end(JSON.stringify({ error: "Resource not found" }));
  }
};

const server = http.createServer(listQuestions);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

const http = require("http");
const host = "localhost";
const port = 8000;

const questions = JSON.stringify([
  {
    topic: "JavaScript",
    question: "Are there 7 primitive data types in JavaScript?",
    answer: true,
    StartDate: {
      __type: "Date",
      iso: "2021-03-22T06:11:00.000Z",
    },
  },
  {
    topic: "JavaScript",
    question:
      "Is using the unary plus (+ operator) the fastest way to convert a string to a number?",
    answer: true,
    StartDate: {
      __type: "Date",
      iso: "2021-03-23T06:11:00.000Z",
    },
  },
  {
    topic: "JavaScript",
    question:
      "Is it true that it is impossible to create an object that has no prototype?",
    answer: false,
    StartDate: {
      __type: "Date",
      iso: "2021-03-24T06:11:00.000Z",
    },
  },
  {
    topic: "HTML",
    question: "Does the <em> </em> tag make the text bold?",
    answer: false,
    StartDate: {
      __type: "Date",
      iso: "2021-03-24T06:11:00.000Z",
    },
  },
  {
    topic: "HTML",
    question: "Do I have to write alt to <img>?",
    answer: true,
    StartDate: {
      __type: "Date",
      iso: "2021-03-24T06:11:00.000Z",
    },
  },
  {
    topic: "HTML",
    question: "Do I have to write alt to <img>?",
    answer: true,
    StartDate: {
      __type: "Date",
      iso: "2021-03-25T06:11:00.000Z",
    },
  },
  {
    topic: "CSS",
    question: "Is glazed a valid border-style property?",
    answer: false,
    StartDate: {
      __type: "Date",
      iso: "2021-03-25T06:11:00.000Z",
    },
  },
  {
    topic: "CSS",
    question: "Is ems a valid unit in CSS?",
    answer: false,
    StartDate: {
      __type: "Date",
      iso: "2021-03-25T06:11:00.000Z",
    },
  },
  {
    topic: "DOM",
    question: "Are there 12 types of elements in the DOM?",
    answer: false,
    StartDate: {
      __type: "Date",
      iso: "2021-03-26T06:11:00.000Z",
    },
  },
  {
    topic: "Node js",
    question: "Is the call stack part of the V8 engine?",
    answer: true,
    StartDate: {
      __type: "Date",
      iso: "2021-03-27T06:11:00.000Z",
    },
  },
]);

const listQuestions = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  switch (req.url) {
    case "/questions":
      res.writeHead(200);
      res.end(questions);
      break;
    default:
      res.writeHead(404);
      res.end(JSON.stringify({ error: "Resource not found" }));
  }
};

const server = http.createServer(listQuestions);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

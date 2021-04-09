const http = require("http");
const host = "localhost";
const port = 8000;

const listQuestions = function (req, res) {
  res.setHeader("Content-Type", "application/json");
  res.writeHead(200);
  res.end(`{"message": "This is a JSON response"}`);
};

const server = http.createServer(listQuestions);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

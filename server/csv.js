const http = require("http");

const host = "localhost";
const port = 8000;

const listQuestions = function (req, res) {
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment;filename=questions.csv");
  res.writeHead(200);
  res.end(`id,name,email\n1,Sammy Shark,shark@ocean.com`);
};

const server = http.createServer(listQuestions);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

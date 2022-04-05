import * as http from "http";

const server = http.createServer();

server.on("request", (request, response) => {
  response.end("那边收到啦！");
  console.log("有人请求了");
});

server.listen("8888");

import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";
import * as path from "path";
import * as fs from "fs";
import * as url from "url";

const server = http.createServer();
const publicDir = path.resolve(__dirname, "public");

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  const { url: originUrl } = request;
  const { pathname } = url.parse(originUrl);
  let fileName = pathname.substring(1);

  if (fileName === "") {
    fileName = "index.html";
  }

  fs.readFile(path.resolve(publicDir, fileName), (error, data) => {
    if (error) {
      if (error.code === "ENOENT") {
        response.statusCode = 404;
        fs.readFile(path.resolve(publicDir, "404.html"), (error, data) => {
          response.end(data);
        });
      } else {
        response.statusCode = 500;
        response.end("服务器繁忙，请稍后再试");
      }
    } else {
      response.end(data);
    }
  });
});

server.listen("8888");

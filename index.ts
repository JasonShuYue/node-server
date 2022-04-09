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
  const fileName = pathname.substring(1);

  fs.readFile(path.resolve(publicDir, fileName), (error, data) => {
    if (error) {
      response.statusCode = 404;
      response.end("404");
    } else {
      response.end(data.toString());
    }
  });
});

server.listen("8888");

import * as http from "http";
import { IncomingMessage, ServerResponse } from "http";

const server = http.createServer();

server.on("request", (request: IncomingMessage, response: ServerResponse) => {
  console.log("request.httpVersion:", request.httpVersion);
  console.log("request.method:", request.method);
  console.log("request.url:", request.url);
  console.log("request.headers:", request.headers);

  const arr = [];
  request.on("data", (chunk) => {
    arr.push(chunk);
  });

  request.on("end", () => {
    const finalBody = Buffer.concat(arr).toString();
    console.log("finalBody:", finalBody);
    response.end("hi!!!");
  });
});

server.listen("8888");

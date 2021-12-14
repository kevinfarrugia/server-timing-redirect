import { createServer } from "http";
import fs from "fs";

const server = createServer((request, response) => {
  request.on("error", (err) => {
    console.error(err);
    response.writeHead(500);
    response.end();
  });

  response.on("error", (err) => {
    console.error(err);
  });

  // don't handle requests for /favicon.ico
  if (request.url === "/favicon.ico") {
    response.writeHead(404);
    response.end();
    return;
  }

  // log the URL and user-agent
  console.log(
    JSON.stringify({
      url: request.url,
      "user-agent": request.headers["user-agent"],
    })
  );

  switch (request.url) {
    case "/301": {
      response.writeHead(301, {
        location: "/",
        "server-timing": ["C; dur=100"],
      });
      response.end();
      break;
    }
    case "/302": {
      response.writeHead(302, {
        location: "/",
        "server-timing": ["D; dur=100"],
      });
      response.end();
      break;
    }
    default: {
      fs.readFile("./index.html", "utf8", (err, data) => {
        if (err) {
          response.writeHead(500);
          response.end(err);
          return;
        }
        response.writeHead(200, {
          "server-timing": ["A; dur=100"],
        });
        response.end(data);
      });
      break;
    }
  }
});

server.listen(3000);

console.log("Server started on http://localhost:3000");

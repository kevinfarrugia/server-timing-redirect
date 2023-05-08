import { createServer } from "http";
import fs from "fs";

const port = process.argv[2];
const target = process.argv[3];

if (!(port && target)) { 
  console.error("You are required to pass a port number and target as arguments. Example: npm start -- 3001 http://localhost:3000");
  process.exit(1);
}

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
        location: target,
        "server-timing": ["C; dur=100"],
        "Timing-Allow-Origin": "*",
      });
      response.end();
      break;
    }
    case "/302": {
      response.writeHead(302, {
        location: target,
        "server-timing": ["D; dur=100"],
        "Timing-Allow-Origin": "*",
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
          "Timing-Allow-Origin": "*",
        });
        response.end(data);
      });
      break;
    }
  }
});

server.listen(port);

console.log(`Server listening on http://localhost:${port}. Redirecting to ${target}.`);

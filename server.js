import { createServer } from "http";

const HTML = `
  <html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body>
    <h1>ua-redirect</h1>
    <ul>
      <li>Go to <a href='/302'>302 redirect</a></li>
      <li>Go to <a href='/301'>301 redirect</a></li>
    </ul>
  </body>
  </html>
`;

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
      });
      response.end();
      break;
    }
    case "/302": {
      response.writeHead(302, {
        location: "/",
      });
      response.end();
      break;
    }
    default: {
      response.writeHead(200);
      response.end(HTML);
      break;
    }
  }
});

server.listen(3000);

console.log("Server started on http://localhost:3000");

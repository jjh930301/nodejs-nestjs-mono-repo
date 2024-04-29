import http from "http";

const server = http.createServer(async (req, res) => {
  if (req.url === "/healthcheck" || req.url === "/livez") {
    res.writeHead(200);
    res.end("OK");
  } else if (req.url === "/readiness" || req.url === "/readyz") {
    try {
      res.writeHead(200);
      res.end("OK");
    } catch (err) {
      res.writeHead(500);
      res.end("Not Ready");
    }
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

export default server;

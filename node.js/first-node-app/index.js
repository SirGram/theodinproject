const http = require("http");
const path = require("path");
const fs = require("fs");

const server = http.createServer((req, res) => {
  /*  console.log(req.url);
  if (req.url === "/") {
    fs.readFile(
      path.join(__dirname, "public", "index.html"),
      (err, content) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    );
  } else if (req.url === "/about") {
    fs.readFile(
      path.join(__dirname, "public", "about.html"),
      (err, content) => {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(content);
      }
    );
  } else if (req.url === "/api/users") {
    const users = [
      {
        name: "Marcos",
        age: 21,
      },
      {
        name: "Anna",
        age: 49,
      },
    ];

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(users))  } */

  let filePath = path.join(
    __dirname,
    "public",
    req.url === "/" ? "index.html" : req.url
  );
  //extension
  let extName = path.extname(filePath);
  let contentType ="text/html" ;
  switch (extName) {
    case ".js":
      contentType = "text/html";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }
  //Read file
  fs.readFile(filePath,  (err,content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        //Page not found
        fs.readFile(
          path.join(__dirname, 'public', "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf8");
          }
        );
      } else {
        //Server error
        res.writeHead(500);
        res.end(`ServerError: ${err.code}`);
      }
    } else {
        //Success
      res.writeHead(200, { "Content-Type": contentType});
      res.end(content, "utf8");
    }
  });
});

const PORT = process.env.PORT || 5001;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

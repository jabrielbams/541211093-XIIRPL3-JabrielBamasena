const http = require("http");

const quotes = [
 { id: 1, text: "Hello" },
 { id: 2, text: "Bhineka tunggal ika" },
 { id: 3, text: "Mati satu tumbuh seribu" },
];

const server = http.createServer((req, res) => {
 // console.log("response");

 // const { headers, url, method } = req;
 // console.log("headers", headers);
 // console.log("url", url);
 // console.log("method", method);
 // res.end("Hallo, Im Jabriel");

 // res.writeHead(404, {
 //  "Content-Type": "application/json",
 //  "X-Powered-By": "Node.js",
 // });

 // res.statusCode = 404;
 // res.setHeader("Content-Type", "application/json");
 // res.setHeader("X-Powered-By", "Node.js");

 // const data = JSON.stringify({
 //  success: true,
 //  error: "Not Found",
 //  data: null,
 // });

 // res.end(data);

 //Listening data from client
 const { method, url } = req;
 let body = [];

 req
  .on("data", (chunk) => {
   body.push(chunk);
  })
  .on("end", () => {
   body = Buffer.concat(body).toString();
   console.log(body);

   let status = 404;
   const response = {
    success: false,
    results: [],
    error: "",
   };

   if (method === "GET" && url === "/quotes") {
    status = 200;
    response.success = true;
    response.results = quotes;
   } else if (method === "POST" && url === "/quotes") {
    const { id, text } = JSON.parse(body);

    if (!id || !text) {
     status = 400;
     response.error = "Please add id and text";
    } else {
     quotes.push({ id, text });
     status = 201;
     response.success = true;
     response.results = quotes;
    }
   }

   res.writeHead(status, {
    "Content-Type": "application/json",
    "X-Powered-By": "Node.js",
   });

   res.end(JSON.stringify(response));
  });
});

const PORT = 3000;

server.listen(PORT, () => {
 console.log(`Server running on port ${PORT}`);
});

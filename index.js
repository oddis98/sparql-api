import http from "http";
import cors from "cors";
import express from "express";
import router from "./routes.js";

const app = express();

const port = process.env.PORT || 5000;
app.set("port", port);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());

app.use("/sparql", router);
app.use("*", (req, res) => {
  return res.status(200).json({
    success: false,
    message: "No such API point",
  });
});

const server = http.createServer(app);
server.listen(port);
server.on("listening", () => {
  console.log(`Listening on port:: http://localhost:${port}/`);
});

"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/app.ts
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_http = require("http");
var import_socket = require("socket.io");
var import_dotenv = __toESM(require("dotenv"));
import_dotenv.default.config();
var clientUrl = process.env.CLIENT_URL;
var app = (0, import_express.default)();
app.use(import_express.default.json());
app.use((0, import_cors.default)({ origin: clientUrl }));
var httpServer = (0, import_http.createServer)(app);
var io = new import_socket.Server(httpServer, {
  cors: {
    origin: clientUrl
  }
});
app.get("/", (_req, res) => {
  res.status(200).json({ message: "Hello World!" });
});
io.on("connection", (socket) => {
  socket.on("message", (message) => {
    io.emit("message", {
      message,
      senderId: socket.id
    });
  });
});
var port = 3001;
httpServer.listen(port);

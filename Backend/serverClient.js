
const path = require("path");
const express = require("express");

function serveClient(app) {
  const clientPath = path.join(__dirname, "../Frontend/dist");

  app.use(express.static(clientPath)); 


  app.get("*", (req, res) => {
    res.sendFile(path.join(clientPath, "index.html"));
  });
}

module.exports = serveClient;

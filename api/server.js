const express = require('express');
const server = express();
const cors = require("cors");
server.use(express.json());
server.use(cors());

const projectRoutes = require('./projects/projects-router');
const actionRoutes = require('./actions/actions-router');


server.use("/api/projects", projectRoutes);
server.use("/api/actions", actionRoutes);
// Sunucunuzu yapılandırın
// Eylem routerınızı /api/actions/actions-router.js içinde oluşturun
// Proje roterlarınızı /api/projects/projects-router.js içinde oluşturun
// Bu dosyanın içinde `server.listen()` YAPMAYIN!

module.exports = server;

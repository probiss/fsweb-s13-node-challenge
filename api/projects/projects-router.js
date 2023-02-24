// "project" routerını buraya yazın!
const express = require("express");
require("dotenv").config();
const Project = require("./projects-model");
const {logger,projectCheck,projectValidation} = require('./projects-middleware');
const { response } = require('../server');
const router = express.Router();
router.use(express.json());

router.use(logger);

router.get('/', (req, res,next) => {
    Project.get()
    .then((project) => res.status(200).json(project))
    .catch((error) =>
        next(error)
    );
});

router.get("/:id", projectCheck, (req, res, next) => {
    res.status(200).json(req.response);
});

router.post("/", projectValidation, (req, res, next) => {
    Project.insert(req.body)
        .then((response) => res.status(201).json(response))
        .catch((error) =>
        next({ code: 500, message: process.env.MESSAGE || "Problem..." })
        );
});

router.put("/:id",projectCheck,projectValidation,(req, res, next) => {
        Project.update(req.params.id, req.body)
        .then((response) => res.status(201).json(response))
        .catch((error) =>
            next({ code: 500, message: process.env.MESSAGE || "Problem..." })
        );
    }
);

router.delete("/:id", projectCheck, (req, res, next) => {
    Project.remove(req.params.id)
        .then((res) => res.status(201).json())
        .catch((error) =>
        next({ code: 500, message: process.env.MESSAGE || "Problem..." })
        );
});

router.get("/:id/actions", projectCheck, (req, res, next) => {
    Project.getProjectActions(req.params.id)
        .then((response) => res.status(200).json(response))
        .catch((error) =>
        next({ code: 500, message: process.env.MESSAGE || "Problem..." })
        );
});

router.use((error, req, res, next) => {
    res.status(error.code).json({ message: error.message });
});

module.exports = router;
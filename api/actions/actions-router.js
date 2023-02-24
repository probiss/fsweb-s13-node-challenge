// "eylem" routerını buraya yazın
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { response } = require('../server');
const router = express.Router();
router.use(express.json());
router.use(cors());
const Action = require("./actions-model");

const { logger,actionCheck,actionValidation } = require("./actions-middlware");

router.use(logger);

router.get("/", (req, res, next) => {
    Action.get()
        .then((response) => res.status(200).json(response))
        .catch((error) =>
            next({ code: 500, message: process.env.MESSAGE || "Problem..." })
        );
});

router.get("/:id", actionCheck, (req, res) => {
    res.status(200).json(req.action);
});

router.post("/", actionValidation, (req, res, next) => {
    Action.insert(req.body)
        .then((response) => res.status(201).json(response))
        .catch((error) =>
            next({ code: 500, message: process.env.MESSAGE || "Problem..." })
        );
});

router.put("/:id", actionCheck, actionValidation, (req, res, next) => {
    Action.update(req.params.id, req.body)
        .then((response) => res.status(201).json(response))
        .catch((error) =>
            next({ code: 500, message: process.env.MESSAGE || "Problem..." })
        );
});

router.delete("/:id", actionCheck, (req, res, next) => {
    Action.remove(req.params.id)
        .then((res) => res.status(201).json())
        .catch((error) =>
            next({ code: 500, message: process.env.MESSAGE || "Problem..." })
        );
});

router.use((error, req, res, next) => {
    res.status(error.code).json({ message: error.message });
});

module.exports = router;

// projects ara yazılımları buraya
const Project = require('./projects-model');

function logger(req, res, next) {
    console.log(
        `${req.method}--${req.originalUrl}--${new Date().toLocaleTimeString()}`
    );
    next();
}

function projectCheck(req, res, next) {
    Project.get(req.params.id)
        .then((response) => {
            if (response) {
                req.response = response;
                next();
            } else {
                next({ code: 404, message: "Böyle bir proje yok." });
            }
        })
        .catch((error) => next({ code: 500, message: "Problem..." }));
}

function projectValidation(req, res, next) {
    const { id, name, description, completed } = req.body;
    if (name && description && (completed === true || completed === false)) {
        next();
    } else {
        next({ code: 400, message: "Eksik bilgi !!!" });
    }
}

module.exports = { logger, projectCheck, projectValidation };
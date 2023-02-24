// eylemlerle ilgili ara katman yazılımları yazın
const Action = require('./actions-model');
const Project = require('../projects/projects-model');

function logger(req, res, next) {
    console.log(
        `${req.method}--${req.originalUrl}--${new Date().toLocaleTimeString()}`
    );
    next();
};

function actionCheck(req, res, next) {
    Action.get(req.params.id)
        .then((res) => {
            if (res) {
                req.res = res;
                next();
            } else {
                next({ code: 404, message: "İstediğiniz böyle bir eylem  yok." })
            }
        })
        .catch((error) => next({ code: 500, message: "Veritabanı problemi." }))
}

function actionValidation(req, res, next) {
    const { id, project_id, description, notes, completed } = req.body;
    project_id && description && notes && (completed === true || completed === false) ? Project.get(project_id)
        .then((res) => {
            res ? next() : next({ code: 401, message: "Böyle bir proje yok." });
        }) : next({ code: 400, message: "Eksik bilgi girildi!!" });
}
module.exports = { logger, actionCheck, actionValidation };
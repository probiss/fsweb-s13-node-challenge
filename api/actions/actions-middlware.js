// eylemlerle ilgili ara katman yazılımları yazın
const Action = require('./actions-model');
const Project = require('../projects/projects-model');

function logger(req, res, next) {
    console.log(
        `${req.method}--${req.originalUrl}--${new Date().toLocaleTimeString()}`
    );
    next();
};

async function actionCheck(req, res, next) {
    try {
        const { id } = req.params;
        const action = await Action.get(id);
        if (action) {
            req.action = action;
            next();
        } else {
            res.status(404).json({ message: "Not found thia action" });
        }
    } catch (error) {
        res.status(500).json({ message: "Problem..." });
    }
}

function actionValidation(req, res, next) {
    const { id, project_id, description, notes, completed } = req.body;
    project_id && description && notes && (completed === true || completed === false) ? Project.get(project_id)
        .then((response) => {
            response ? next() : next({ code: 401, message: "Böyle bir proje yok." });
        }) : next({ code: 400, message: "Eksik bilgi girildi!!" });
}
module.exports = { logger, actionCheck, actionValidation };
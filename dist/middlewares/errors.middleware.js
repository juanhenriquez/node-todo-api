"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchErrors = requestHandler => {
    return function (req, res, next) {
        return requestHandler(req, res, next).catch(next);
    };
};
exports.notFoundErrors = (err, req, res, next) => {
    if (err.error && err.error.type === 'NotFound') {
        return res.status(404).send({ error: {
                type: 'NotFound',
                message: err.error.message
            } });
    }
    return next(err);
};
exports.forbiddenErrors = (err, req, res, next) => {
    if (err.error && err.error.type === 'Forbidden') {
        return res.status(403).send({ error: {
                type: 'Forbidden',
                message: err.error.message
            } });
    }
    return next(err);
};
exports.messageValidationErrors = (err, req, res, next) => {
    if (!err.errors && !err.error)
        return next(err);
    if (err.errors) {
        const errorList = Object.keys(err.errors);
        return res
            .status(400)
            .send({
            errors: errorList.map(key => {
                const { message, kind, path, value } = err.errors[key];
                return { message, kind, path, value };
            })
        });
    }
    else if (err.error) {
        if (err.error === 'TokenError') {
            if (err.type === 'InvalidToken') {
                return res
                    .status(400)
                    .send({ error: { type: err.type, message: err.message } });
            }
        }
    }
};
//# sourceMappingURL=errors.middleware.js.map
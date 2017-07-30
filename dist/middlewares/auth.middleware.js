"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./../models/");
const jsonwebtoken_1 = require("jsonwebtoken");
exports.isAuthenticated = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    const token = req.header('x-auth');
    jsonwebtoken_1.verify(token, 'abc123', (err, decoded) => {
        if (err) {
            // the token is invalid
            return res
                .status(401)
                .send({ error: { type: 'Unauthorized', message: 'You need to login in order to access the requested data' } });
        }
        req.decodedToken = decoded;
        req.token = token;
        return next();
    });
});
exports.canAccess = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield _1.User.findByIdAndToken(req.decodedToken._id, req.token);
        if (user) {
            req.user = user;
            return next();
        }
    }
    catch (e) {
        if (e.type === 'Forbidden') {
            return res
                .status(403)
                .send({ error: e });
        }
        else if (e.type === 'NotFound') {
            return res
                .status(404)
                .send({ error: e });
        }
    }
});
//# sourceMappingURL=auth.middleware.js.map
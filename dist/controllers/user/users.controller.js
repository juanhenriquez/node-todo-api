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
const lodash_1 = require("lodash");
const models_1 = require("./../../models");
class UsersController {
    static create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const body = lodash_1.default.pick(req.body, ['email', 'password']);
            const user = new models_1.User(body);
            const authData = user.generateAuthToken();
            // add a new token to the user's token list
            user.tokens.push(authData);
            // save the user in the db
            yield user.save();
            return res
                .header('x-auth', authData.token)
                .send({ user: user.toJSON(), message: "The account was created successfully!" });
        });
    }
    static show(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user, token } = req;
            if (user) {
                return res
                    .header('x-auth', token)
                    .send({ user });
            }
            else {
                return res
                    .status(403)
                    .send({ error: { type: 'Unauthorized', message: 'You need to login in order to access the requested data' } });
            }
        });
    }
}
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map
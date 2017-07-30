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
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const validator_1 = require("validator");
const jsonwebtoken_1 = require("jsonwebtoken");
const mongooseUniqueValidator = require("mongoose-unique-validator");
exports.UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        minlength: 1,
        required: [true, 'You must supply a email'],
        trim: true,
        unique: true,
        validate: {
            async: false,
            validator: validator_1.isEmail,
            message: '{VALUE} is not a valid email address'
        }
    },
    password: {
        type: String,
        minlength: [6, 'This password is shorter than the minimum allowed length (6).'],
        required: [true, 'You must supply a password']
    },
    createdAt: Date,
    tokens: [{
            access: {
                type: String,
                required: true
            },
            token: {
                type: String,
                required: true
            }
        }]
});
exports.UserSchema.methods.toJSON = function () {
    const user = this.toObject();
    return lodash_1.default.pick(user, ['_id', 'email']);
};
exports.UserSchema.methods.generateAuthToken = function () {
    const user = this;
    const access = 'auth';
    const token = jsonwebtoken_1.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();
    return { token, access };
};
exports.UserSchema.statics.findByIdAndToken = function (id, token) {
    const User = this;
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield User.findById(id);
            if (user) {
                const isCorrectUser = user.tokens.filter(t => {
                    return (t.token === token && t.access === 'auth') ? true : false;
                });
                if (isCorrectUser.length) {
                    resolve(user.toJSON());
                }
                else {
                    reject({ type: 'Forbidden', message: 'You can access to the requested data' });
                }
            }
            else {
                reject({ type: 'NotFound', message: 'This account doesn\'t exist' });
            }
        }
        catch (findByIdError) {
            reject({ type: 'NotFound', message: 'This account doesn\'t exist' });
        }
    }));
};
// generate password
exports.UserSchema.pre('save', function (next) {
    const user = this;
    if (user.isModified('password')) {
        bcryptjs_1.genSalt(10, (err, salt) => {
            bcryptjs_1.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            });
        });
    }
    else {
        next();
    }
});
// set the date of registration
exports.UserSchema.pre('save', function (next) {
    const user = this;
    if (!user.createdAt) {
        this.createdAt = new Date();
    }
    next();
});
// Plugins
exports.UserSchema.plugin(mongooseUniqueValidator, {
    message: 'Sorry, {VALUE} is already in use. Try a different email.'
});
//# sourceMappingURL=user.schema.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user_schema_1 = require("./../schemas/user.schema");
;
exports.User = mongoose.model('User', user_schema_1.UserSchema);
//# sourceMappingURL=user.model.js.map
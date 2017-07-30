"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.TodoSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: [true, 'You must supply a title'],
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: null
    }
});
//# sourceMappingURL=todo.schema.js.map
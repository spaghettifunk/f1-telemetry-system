"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const routes = (0, express_1.Router)();
routes.get('/', (req, res) => {
    return res.json({ message: 'Hello World' });
});
exports.default = routes;
//# sourceMappingURL=routes.js.map
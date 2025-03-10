"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const notFound = (req, res, _next) => {
    res.status(404).json({
        success: false,
        message: 'API no found',
    });
};
exports.notFound = notFound;

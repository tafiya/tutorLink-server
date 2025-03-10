"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-explicit-any */
const handleDuplicateError = (err) => {
    const match = err.message.match(/"([^"]*)"/);
    const exactedMessage = match && match[1];
    const errorSources = [
        {
            path: '',
            message: `${exactedMessage} is already exists`,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Invalid Id',
        errorSources,
    };
};
exports.default = handleDuplicateError;

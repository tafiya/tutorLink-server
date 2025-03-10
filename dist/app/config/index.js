"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join((process.cwd(), '.env')) });
exports.default = {
    NODE_ENV: process.env.NODE_ENV,
    port: process.env.PORT,
    dataBase_url: process.env.DATABASE_URL,
    bcrypt_salts_round: process.env.BCRYPT_SALTS_ROUND,
    jwt_access_token: process.env.JWT_ACCESS_TOKEN,
    jwt_refresh_token: process.env.JWT_REFRESH_TOKEN,
    jwt_access_expireIn: process.env.JWT_ACCESS_EXPIRE_IN,
    jwt_refresh_expireIn: process.env.JWT_REFRESH_EXPIRE_IN,
    sp: {
        sp_endpoint: process.env.SP_ENDPOINT,
        sp_username: process.env.SP_USERNAME,
        sp_password: process.env.SP_PASSWORD,
        sp_prefix: process.env.SP_PREFIX,
        sp_return_url: process.env.SP_RETURN_URL,
    },
};

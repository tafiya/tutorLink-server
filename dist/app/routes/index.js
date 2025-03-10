"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_route_1 = require("../modules/Auth/auth.route");
const user_route_1 = require("../modules/User/user.route");
const request_route_1 = require("../modules/sendRequestTutor/request.route");
const payment_route_1 = require("../modules/payment/payment.route");
const blog_route_1 = require("../modules/blogs/blog.route");
const review_route_1 = require("../modules/reviews/review.route");
const router = (0, express_1.Router)();
const moduleRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: user_route_1.UserRoutes,
    },
    {
        path: '/requests',
        route: request_route_1.RequestRouter,
    },
    {
        path: '/payment',
        route: payment_route_1.PaymentRouter,
    },
    {
        path: '/blogs',
        route: blog_route_1.BlogRoutes,
    },
    {
        path: '/reviews',
        route: review_route_1.ReviewRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;

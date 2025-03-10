import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';

import { RequestRouter } from '../modules/sendRequestTutor/request.route';
import { PaymentRouter } from '../modules/payment/payment.route';
import { BlogRoutes } from '../modules/blogs/blog.route';
import { ReviewRoutes } from '../modules/reviews/review.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },

  {
    path: '/requests',
    route: RequestRouter,
  },
  {
    path: '/payment',
    route: PaymentRouter,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/reviews',
    route: ReviewRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;

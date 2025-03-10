import express from 'express';
import { BlogControllers } from './blog.controller';

const router = express.Router();

router.get("/",BlogControllers.getAllBlogs)

export const BlogRoutes = router;
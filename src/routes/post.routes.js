import { Router } from "express";
import auth from "../middleware/auth.middleware.js";

import {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
} from '../controllers/post.controller.js';

const router = Router();


router.post('/', auth, createPost);
router.get('/', auth, getPosts);
router.get('/:id', auth, getPostById);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);


export default router;

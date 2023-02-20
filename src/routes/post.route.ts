import { isAuthenticated } from './../middleware/isAuthenticated'
import express from 'express'
import {getAll, getPostById, addPost} from '../controllers/post.controller'

const router = express.Router()

router.get('/', getAll)
router.get('/:id', getPostById)
router.post('/', isAuthenticated, addPost)

export default router
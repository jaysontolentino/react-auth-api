import express from 'express'
import {getAll, getById} from './../controllers/user.controller'
import { isAuthenticated } from './../middleware/isAuthenticated'

const router = express.Router()

router.use(isAuthenticated)

router.get('/all', getAll)
router.get('/:id', getById)

export default router
import express from 'express'
import {login, register, refreshToken, getAuthUser, logout} from '../controllers/auth.controller'

const router = express.Router()

router.post('/login', login)
router.post('/register', register)
router.post('/logout', logout)
router.get('/refresh-token', refreshToken)
router.get('/auth-user', getAuthUser)

export default router
import { NextFunction, Request, Response } from 'express'
import { signIn, signUp } from './../services/auth.service'
import { TDecodedToken, createToken, verifyToken } from './../utils/jwt.util'
import createHttpError from 'http-errors'
import { getUser } from './../services/user.service'

export const login = async (req: Request, res: Response, next: NextFunction) => {

    const {body} = req

    try {
        const user = await signIn(body)
        
        const token = await createToken('access_token', {user_id: Number(user.id) , email: user.email as string})
        const refreshToken = await createToken('refresh_token', {user_id: Number(user.id), email: user.email as string}) 
        res.cookie('rtx', refreshToken, {
            sameSite: 'none',
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({
            user,
            token
        })
    } catch (error) {
        next(error)
    }
}

export const register = async (req: Request, res: Response, next: NextFunction) => {

    const { body } = req

    try {
        const user = await signUp(body)

        res.json({
            'success': true,
            user
        })
    } catch (error) {
        next(error)
    }
}

export const refreshToken = async function(req: Request, res: Response, next: NextFunction) {
    try {
        const refreshToken = req.cookies?.rtx

        if(!refreshToken) throw new createHttpError.Forbidden("Failed to refresh token")

        const decoded = await verifyToken<TDecodedToken>('refresh_token', refreshToken)

        const user = await getUser(Number(decoded.user_id))

        if(!user) throw new createHttpError.Forbidden("Failed to refresh token")

        const newToken = await createToken('access_token', {user_id: user.id, email: user.email})
        const newRefreshToken = await createToken('refresh_token', {user_id: user.id, email: user.email})

        res.cookie('rtx', newRefreshToken, {
            sameSite: 'none',
            httpOnly: true,
            secure: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({
            token: newToken
        })

    } catch (error) {
        next(error)
    }
}

export const getAuthUser = async function(req: Request, res: Response, next: NextFunction) {

    console.log('authenticated user: ', req.user)
    try {
        res.json({
            user: req.user
        })
    } catch (error) {
        next(error)
    }
}


export const logout = function(req: Request, res: Response, next: NextFunction) {
    try {
        res.clearCookie('rtx', { httpOnly: true, sameSite: 'none', secure: true })
        res.json({
            success: true
        })
    } catch (error) {
        next(error)
    }
}
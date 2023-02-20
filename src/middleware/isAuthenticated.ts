import { TDecodedToken, verifyToken } from './../utils/jwt.util'
import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import {getUser} from './../services/user.service'

export interface IAuthReq extends Request {
    user: TDecodedToken
}

export const isAuthenticated = async function(req: Request, res: Response, next: NextFunction) {
    try {

        const authHeader = req.headers?.authorization

        const token = authHeader?.split(' ')[1]

        const decoded = await verifyToken('access_token' ,token as string) as TDecodedToken

        if(!decoded) throw new Error
        
        console.log('decoded token: ', decoded)

        const user = await getUser(Number(decoded.user_id))

        if(!user) throw new Error

        req.user = user
        
        return next()

    } catch (error) {

        return next(new createHttpError.Unauthorized)
        
    }
}
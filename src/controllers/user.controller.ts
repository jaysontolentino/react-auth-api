import { NextFunction, Request, Response } from 'express'
import { getAllUsers, getUser } from './../services/user.service'

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await getAllUsers()
        res.json({
            users
        })
    } catch (error) {
        next(error)
    }
}

export const getById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await getUser(Number(req.params.id))
        res.json({
            user
        })
    } catch (error) {
        next(error)
    }
}
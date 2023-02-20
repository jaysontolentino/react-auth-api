import { NextFunction, Request, Response } from 'express'
import { getAllPost, getPost, createPost } from './../services/post.service'

export const getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const posts = await getAllPost()
        res.json({
            posts
        })
    } catch (error) {
        next(error)
    }
}

export const getPostById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const post = await getPost(Number(req.params.id))
        res.json({
            post
        })
    } catch (error) {
        next(error)
    }
}

export const addPost = async (req: Request, res: Response, next: NextFunction) => {

    const {body} = req

    try {
        const post = await createPost({
            ...body,
            authorId: req.user.id
        })
        res.json({
            post
        })
    } catch (error) {
        next(error)
    }
}